'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getCurrentUser } from './auth';

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  costPrice: z.number().nonnegative('Cost price must be non-negative').optional(),
  stock: z.number().int().nonnegative('Stock must be a non-negative integer'),
  categoryId: z.string().min(1, 'Category is required'),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

// Authorization helper
async function checkAdminAccess() {
  const user = await getCurrentUser();
  
  if (!user) {
    return { authorized: false, error: 'Authentication required' };
  }
  
  if (user.role !== 'ADMIN') {
    return { authorized: false, error: 'Admin access required' };
  }
  
  return { authorized: true };
}

export async function getProducts(filter?: { categoryId?: string; search?: string }) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (filter?.categoryId) {
      where.categoryId = filter.categoryId;
    }

    if (filter?.search) {
      where.OR = [
        { name: { contains: filter.search, mode: 'insensitive' } },
        { description: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return { success: true, products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, error: 'Failed to fetch products' };
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: { name: true },
        },
      },
    });

    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    return { success: true, product };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { success: false, error: 'Failed to fetch product' };
  }
}

export async function createProduct(formData: FormData) {
  // Check admin authorization
  const authCheck = await checkAdminAccess();
  if (!authCheck.authorized) {
    return { success: false, error: authCheck.error };
  }

  try {
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string) * 100, // Convert to cents
      costPrice: parseFloat(formData.get('costPrice') as string || '0') * 100, // Convert to cents
      stock: parseInt(formData.get('stock') as string),
      categoryId: formData.get('categoryId') as string,
      imageUrl: formData.get('imageUrl') as string || '',
    };

    const validatedData = productSchema.parse(data);

    await prisma.product.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        costPrice: validatedData.costPrice || 0,
        stock: validatedData.stock,
        categoryId: validatedData.categoryId,
        images: validatedData.imageUrl ? [validatedData.imageUrl] : [],
        slug: validatedData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      },
    });

    revalidatePath('/admin/menu');
    revalidatePath('/products');
    
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    console.error('Error creating product:', error);
    return { success: false, error: 'Failed to create product' };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  // Check admin authorization
  const authCheck = await checkAdminAccess();
  if (!authCheck.authorized) {
    return { success: false, error: authCheck.error };
  }

  try {
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string) * 100, // Convert to cents
      costPrice: parseFloat(formData.get('costPrice') as string || '0') * 100, // Convert to cents
      stock: parseInt(formData.get('stock') as string),
      categoryId: formData.get('categoryId') as string,
      imageUrl: formData.get('imageUrl') as string || '',
    };

    const validatedData = productSchema.parse(data);

    await prisma.product.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        costPrice: validatedData.costPrice || 0,
        stock: validatedData.stock,
        categoryId: validatedData.categoryId,
        images: validatedData.imageUrl ? [validatedData.imageUrl] : [],
        slug: validatedData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      },
    });

    revalidatePath('/admin/menu');
    revalidatePath('/products');
    
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    console.error('Error updating product:', error);
    return { success: false, error: 'Failed to update product' };
  }
}

export async function deleteProduct(id: string) {
  // Check admin authorization
  const authCheck = await checkAdminAccess();
  if (!authCheck.authorized) {
    return { success: false, error: authCheck.error };
  }

  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath('/admin/menu');
    revalidatePath('/products');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: 'Failed to delete product' };
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    return { success: true, categories };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { success: false, error: 'Failed to fetch categories' };
  }
}
