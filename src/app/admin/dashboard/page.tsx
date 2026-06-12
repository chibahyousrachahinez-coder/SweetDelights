import { StatCard } from '@/components/admin/stat-card';
import { prisma } from '@/lib/prisma';

async function getDashboardStats() {
  try {
    // Get all completed orders (PAID, SHIPPED, DELIVERED)
    const completedOrders = await prisma.order.findMany({
      where: { 
        status: { 
          in: ['PAID', 'SHIPPED', 'DELIVERED'] 
        } 
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                costPrice: true,
                price: true,
              }
            }
          }
        }
      }
    });

    // Calculate Total Revenue (الأرباح/المدخول)
    const totalRevenue = completedOrders.reduce(
      (sum, order) => sum + order.totalAmount, 
      0
    );

    // Calculate Total Products Sold (المبيعات)
    const totalProductsSold = completedOrders.reduce(
      (sum, order) => {
        const orderQuantity = order.items.reduce(
          (qtySum: number, item: any) => qtySum + item.quantity, 
          0
        );
        return sum + orderQuantity;
      }, 
      0
    );

    // Calculate Total Cost and Net Profit (الربح أو الخسارة الصافية)
    const totalCost = completedOrders.reduce(
      (sum, order) => {
        const orderCost = order.items.reduce(
          (costSum: number, item: any) => costSum + ((item.product.costPrice || 0) * item.quantity),
          0
        );
        return sum + orderCost;
      },
      0
    );

    const netProfit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 
      ? ((netProfit / totalRevenue) * 100).toFixed(1) 
      : '0.0';

    return {
      totalProductsSold,
      totalRevenue,
      totalCost,
      netProfit,
      profitMargin,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalProductsSold: 0,
      totalRevenue: 0,
      totalCost: 0,
      netProfit: 0,
      profitMargin: '0.0',
    };
  }
}

async function getRecentOrders() {
  try {
    const orders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { email: true, name: true },
        },
      },
    });
    return orders;
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return [];
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const recentOrders = await getRecentOrders();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Products Sold */}
        <StatCard
          title="Total Products Sold (المبيعات)"
          value={stats.totalProductsSold.toLocaleString()}
          iconName="package"
          trend={{ value: 12.5, isPositive: true }}
          delay={0}
        />
        
        {/* Card 2: Total Revenue */}
        <StatCard
          title="Total Revenue (الأرباح/المدخول)"
          value={`$${(stats.totalRevenue / 100).toFixed(2)}`}
          iconName="dollarSign"
          trend={{ value: 8.2, isPositive: true }}
          delay={0.1}
        />
        
        {/* Card 3: Net Profit/Loss */}
        <StatCard
          title="Net Profit (الربح الصافي)"
          value={`$${(stats.netProfit / 100).toFixed(2)}`}
          iconName="trendingUp"
          subtitle={`${stats.profitMargin}% profit margin`}
          trend={{ 
            value: parseFloat(stats.profitMargin), 
            isPositive: stats.netProfit >= 0 
          }}
          delay={0.2}
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-pink-100">
          <h2 className="text-xl font-serif font-semibold text-foreground">
            Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-pink-50/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-pink-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {order.user?.name || order.user?.email || order.guestEmail || 'Guest'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'PAID'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
