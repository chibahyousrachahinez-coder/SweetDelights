'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getCurrentUser } from './auth';

interface OrderItemInput {
  productId: string;
  quantity: number;
  unitPrice: number;
}

interface CreateOrderInput {
  items: OrderItemInput[];
  totalAmount: number;
  guestEmail?: string;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    notes?: string;
  };
}

export async function createOrder(input: CreateOrderInput) {
  try {
    const user = await getCurrentUser();

    // Create the order with items in a transaction
    const order = await prisma.order.create({
      data: {
        userId: user?.id || null,
        guestEmail: user ? null : input.guestEmail || input.shippingAddress.email,
        status: 'PENDING',
        totalAmount: input.totalAmount,
        shippingAddress: input.shippingAddress,
        items: {
          create: input.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    // Update product stock
    for (const item of input.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    revalidatePath('/admin/orders');
    revalidatePath('/admin/dashboard');

    return {
      success: true,
      orderId: order.id,
      orderNumber: `SD-${order.createdAt.getTime().toString().slice(-6)}`,
    };
  } catch (error) {
    console.error('Create order error:', error);
    return {
      success: false,
      error: 'Failed to create order. Please try again.',
    };
  }
}

export async function getOrders(status?: string) {
  try {
    const user = await getCurrentUser();
    
    // Must be authenticated
    if (!user) {
      return [];
    }

    // Only admins can view all orders
    const where: any = user.role === 'ADMIN' ? {} : { userId: user.id };
    
    if (status && status !== 'ALL') {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders;
  } catch (error) {
    console.error('Get orders error:', error);
    return [];
  }
}

export async function getOrderById(orderId: string) {
  try {
    const user = await getCurrentUser();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    if (!order) {
      return null;
    }

    // Check authorization - only admin or order owner can view
    if (!user) {
      return null;
    }
    
    if (user.role !== 'ADMIN' && order.userId !== user.id) {
      return null;
    }

    return order;
  } catch (error) {
    console.error('Get order error:', error);
    return null;
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const user = await getCurrentUser();

    // Only admins can update order status
    if (!user || user.role !== 'ADMIN') {
      return {
        success: false,
        error: 'Admin access required',
      };
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: status as any },
    });

    revalidatePath('/admin/orders');
    revalidatePath('/admin/dashboard');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Update order status error:', error);
    return {
      success: false,
      error: 'Failed to update order status',
    };
  }
}

export async function getMyOrders() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return [];
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders;
  } catch (error) {
    console.error('Get my orders error:', error);
    return [];
  }
}
