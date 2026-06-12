import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const updatedOrder = await prisma.order.update({
        where: { stripeSessionId: session.id },
        data: {
          status: 'PAID',
          stripePaymentId: session.payment_intent as string,
        },
        include: { items: true },
      });

      for (const item of updatedOrder.items) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: { slug: true, stock: true },
        });
        if (product && product.stock <= 0) {
          revalidatePath(`/product/${product.slug}`);
        }
      }

      console.log(`Order ${session.metadata?.orderId} successfully processed.`);
    }

    if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;

      const order = await prisma.order.findUnique({
        where: { stripeSessionId: session.id },
        include: { items: true },
      });

      if (order && order.status === 'PENDING') {
        for (const item of order.items) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        }

        await prisma.order.update({
          where: { id: order.id },
          data: { status: 'CANCELLED' },
        });

        console.log(`Order ${order.id} expired, stock restored.`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook processing failure:', message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }
}
