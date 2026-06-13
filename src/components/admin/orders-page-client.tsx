'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, Loader2 } from 'lucide-react';
import { updateOrderStatus } from '@/app/actions/orders';
import { useRouter } from 'next/navigation';

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
  user: {
    email: string;
    name?: string | null;
  };
  orderItems: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }>;
}

interface OrdersPageClientProps {
  initialOrders: Order[];
}

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All Orders', color: 'gray' },
  { value: 'PENDING', label: 'Pending', color: 'yellow' },
  { value: 'PAID', label: 'Paid', color: 'green' },
  { value: 'SHIPPED', label: 'Shipped', color: 'blue' },
  { value: 'DELIVERED', label: 'Delivered', color: 'purple' },
  { value: 'CANCELLED', label: 'Cancelled', color: 'red' },
];

export function OrdersPageClient({ initialOrders }: OrdersPageClientProps) {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const filteredOrders = initialOrders.filter((order) => {
    if (selectedStatus === 'ALL') return true;
    return order.status === selectedStatus;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    const result = await updateOrderStatus(orderId, newStatus);
    
    if (result.success) {
      router.refresh();
    }
    
    setUpdatingStatus(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800';
      case 'DELIVERED':
        return 'bg-purple-100 text-purple-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
          Orders Management
        </h1>
        <p className="text-muted-foreground">
          View and manage customer orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-5 h-5 text-muted-foreground" />
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedStatus(option.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedStatus === option.value
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200/50'
                : 'bg-white border border-pink-200 text-foreground hover:bg-pink-50'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-12 text-center">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6 flex items-center justify-between">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                    <p className="font-medium text-foreground">#{order.id.slice(0, 8)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Customer</p>
                    <p className="font-medium text-foreground">
                      {order.user.name || order.user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total</p>
                    <p className="font-medium text-foreground text-lg">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                    <p className="font-medium text-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    disabled={updatingStatus === order.id}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {STATUS_OPTIONS.filter((opt) => opt.value !== 'ALL').map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() =>
                      setExpandedOrder(expandedOrder === order.id ? null : order.id)
                    }
                    className="p-2 hover:bg-pink-50 rounded-lg transition-colors"
                  >
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        expandedOrder === order.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Order Details (Expanded) */}
              {expandedOrder === order.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-pink-100 bg-pink-50/30 p-6"
                >
                  <h3 className="font-medium text-foreground mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {updatingStatus === order.id && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
