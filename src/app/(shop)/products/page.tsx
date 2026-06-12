'use client';

import Link from 'next/link';
import { Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockCategories, getProducts } from '@/lib/mock-data';
import { useCartStore } from '@/store/cart-store';

interface ProductsPageProps {
  searchParams: { category?: string; search?: string };
}

const categoryEmojis: Record<string, string> = {
  cakes: '🎂',
  cupcakes: '🧁',
  pastries: '🥐',
  desserts: '🍰',
};

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, search } = searchParams;
  const products = getProducts(category, search);
  const categories = mockCategories;
  const { addItem } = useCartStore();

  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-gradient-to-br from-rose-light/50 via-cream to-blush py-16">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-primary font-medium mb-2">Our Menu</p>
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">
              {category
                ? categories.find((c) => c.slug === category)?.name || 'Products'
                : 'All Products'}
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore our delicious selection of handcrafted treats, made fresh daily with love.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 shrink-0">
              <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-serif text-lg font-medium mb-4">Categories</h2>
                <nav className="space-y-2">
                  <Link
                    href="/products"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      !category
                        ? 'bg-primary text-white'
                        : 'hover:bg-rose-light'
                    }`}
                  >
                    <span className="text-xl">🍪</span>
                    <span className="font-medium">All Products</span>
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.slug}`}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        category === cat.slug
                          ? 'bg-primary text-white'
                          : 'hover:bg-rose-light'
                      }`}
                    >
                      <span className="text-xl">{categoryEmojis[cat.slug] || '🍰'}</span>
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{products.length}</span>{' '}
                  {products.length === 1 ? 'product' : 'products'}
                </p>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="rounded-full">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <select className="px-4 py-2 rounded-full border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl">
                  <div className="w-24 h-24 mx-auto bg-rose-light rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter to find what you&apos;re looking for.
                  </p>
                  <Button asChild className="rounded-full">
                    <Link href="/products">View All Products</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative aspect-square bg-gradient-to-br from-rose-light to-cream overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 bg-gradient-to-br from-primary/30 to-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <span className="text-5xl">
                              {categoryEmojis[product.category.slug] || '🍰'}
                            </span>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                          {product.category.name}
                        </div>
                        {product.stock < 10 && (
                          <div className="absolute top-4 left-4 bg-primary text-white rounded-full px-3 py-1 text-sm font-medium">
                            Limited
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ))}
                          <span className="text-sm text-muted-foreground ml-2">(4.9)</span>
                        </div>
                        <h3 className="text-lg font-serif font-medium group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-xl font-semibold text-primary">
                            ${(product.price / 100).toFixed(2)}
                          </p>
                          <Button 
                            size="sm" 
                            className="rounded-full bg-primary hover:bg-primary/90"
                            onClick={() => addItem({
                              id: product.id,
                              name: product.name,
                              slug: product.slug,
                              price: product.price,
                              image: product.images[0],
                            })}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
