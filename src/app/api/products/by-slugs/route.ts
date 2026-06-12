import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { slugs } = await req.json();

    if (!slugs || !Array.isArray(slugs)) {
      return NextResponse.json(
        { error: 'Invalid request. Slugs array is required.' },
        { status: 400 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        slug: {
          in: slugs,
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        stock: true,
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Fetch products by slugs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
