'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { ShoppingBag, Check } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCartStore();
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0] || '',
    });
    
    // Reset the adding state after animation
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/product/${product.slug}`}>
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-200">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <p className="mt-2 text-xl font-bold text-primary">{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full group/btn relative overflow-hidden transition-all duration-200 active:scale-95" 
          disabled={isOutOfStock || isAdding}
          onClick={handleAddToCart}
        >
          {isAdding ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
