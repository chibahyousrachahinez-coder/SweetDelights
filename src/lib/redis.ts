import Redis from 'ioredis';

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

function createRedisClient() {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    console.warn('REDIS_URL not set, cart functionality will be limited');
    return null;
  }

  return new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  });
}

export const redis = globalForRedis.redis ?? createRedisClient();

if (process.env.NODE_ENV !== 'production' && redis) {
  globalForRedis.redis = redis;
}

export async function getCart(sessionId: string): Promise<CartItem[]> {
  if (!redis) return [];
  const data = await redis.get(`cart:${sessionId}`);
  return data ? JSON.parse(data) : [];
}

export async function setCart(sessionId: string, items: CartItem[]): Promise<void> {
  if (!redis) return;
  await redis.set(`cart:${sessionId}`, JSON.stringify(items), 'EX', 60 * 60 * 24 * 7);
}

export async function clearCart(sessionId: string): Promise<void> {
  if (!redis) return;
  await redis.del(`cart:${sessionId}`);
}

export interface CartItem {
  productId: string;
  quantity: number;
}
