import { getOrders } from '@/app/actions/orders';
import { OrdersPageClient } from '@/components/admin/orders-page-client';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return <OrdersPageClient initialOrders={orders} />;
}
