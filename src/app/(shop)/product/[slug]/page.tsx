import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Truck, Clock, Award, Heart, Minus, Plus, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { mockProducts } from '@/lib/mock-data';

interface ProductPageProps {
  params: { slug: string };
}

const categoryEmojis: Record<string, string> = {
  cakes: '🎂',
  cupcakes: '🧁',
  pastries: '🥐',
  desserts: '🍰',
};

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function generateStaticParams() {
  return mockProducts.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = mockProducts.find((p) => p.slug === params.slug);

  if (!product) notFound();

  const isOutOfStock = product.stock <= 0;
  const emoji = categoryEmojis[product.category.slug] || '🍰';

  return (
    <div className="min-h-screen bg-cream">
      <div className="container py-8">
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-rose-light via-cream to-blush">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/30 rounded-full flex items-center justify-center">
                  <span className="text-9xl">{emoji}</span>
                </div>
              </div>
              <button className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-light transition-colors">
                <Heart className="w-6 h-6 text-foreground/70" />
              </button>
              {product.stock < 10 && product.stock > 0 && (
                <div className="absolute top-4 left-4 bg-primary text-white rounded-full px-4 py-2 text-sm font-medium">
                  Limited Stock
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="mb-4">
              <Link
                href={`/products?category=${product.category.slug}`}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline bg-rose-light px-4 py-2 rounded-full"
              >
                <span>{emoji}</span>
                {product.category.name}
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-medium">{product.name}</h1>

            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-muted-foreground">(4.9) · 128 reviews</span>
            </div>

            <div className="mt-6">
              <span className="text-4xl font-semibold text-primary">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="mt-4">
              {isOutOfStock ? (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  Out of Stock
                </span>
              ) : product.stock < 10 ? (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Only {product.stock} left - Order soon!
                </span>
              ) : (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  In Stock - Ready to ship
                </span>
              )}
            </div>

            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-border rounded-full">
                <button className="w-12 h-12 flex items-center justify-center hover:bg-rose-light rounded-l-full transition-colors">
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-semibold">1</span>
                <button className="w-12 h-12 flex items-center justify-center hover:bg-rose-light rounded-r-full transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <Button 
                size="lg" 
                className="flex-1 rounded-full h-12 bg-primary hover:bg-primary/90" 
                disabled={isOutOfStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-cream rounded-2xl">
                <Truck className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-center text-muted-foreground">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-cream rounded-2xl">
                <Clock className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-center text-muted-foreground">Fresh Daily</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-cream rounded-2xl">
                <Award className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-center text-muted-foreground">Premium Quality</span>
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <h2 className="text-lg font-serif font-medium mb-4">Product Details</h2>
              <dl className="space-y-3">
                <div className="flex justify-between py-3 border-b border-border/50">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-medium text-right">{product.category.name}</dd>
                </div>
                <div className="flex justify-between py-3 border-b border-border/50">
                  <dt className="text-muted-foreground">Freshness</dt>
                  <dd className="font-medium text-right">Baked Daily</dd>
                </div>
                <div className="flex justify-between py-3 border-b border-border/50">
                  <dt className="text-muted-foreground">Storage</dt>
                  <dd className="font-medium text-right">Keep refrigerated</dd>
                </div>
                <div className="flex justify-between py-3 border-b border-border/50">
                  <dt className="text-muted-foreground">Best Before</dt>
                  <dd className="font-medium text-right">3-5 days</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-serif font-medium mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockProducts.filter(p => p.slug !== product.slug).slice(0, 4).map((item) => (
              <Link 
                key={item.id} 
                href={`/product/${item.slug}`}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square rounded-xl bg-gradient-to-br from-rose-light to-cream flex items-center justify-center mb-4">
                  <span className="text-4xl">{categoryEmojis[item.category.slug] || '🍰'}</span>
                </div>
                <h3 className="font-serif font-medium line-clamp-1">{item.name}</h3>
                <p className="text-primary font-semibold mt-1">{formatPrice(item.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
