import { getOrders } from '@/app/actions/orders';
import { OrdersPageClient } from '@/components/admin/orders-page-client';

export default async function AdminOrdersPage() {
  const result = await getOrders();
  const orders = result.success ? result.orders || [] : [];

  return <OrdersPageClient initialOrders={orders} />;
}
