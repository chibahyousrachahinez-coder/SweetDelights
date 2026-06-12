'use client';

import Link from 'next/link';
import { Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCakes } from '@/lib/mock-data';
import { useCartStore } from '@/store/cart-store';

export default function CakesPage() {
  const cakes = getCakes();
  const { addItem } = useCartStore();

  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-gradient-to-br from-rose-light/50 via-cream to-blush py-20">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-primary font-medium mb-2">Our Collection</p>
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">
              Handcrafted Cakes
            </h1>
            <p className="text-muted-foreground text-lg">
              Each cake is a masterpiece, made with love and the finest ingredients. 
              Perfect for birthdays, weddings, and every sweet celebration.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{cakes.length}</span> cakes
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cakes.map((cake) => (
              <Link
                key={cake.id}
                href={`/product/${cake.slug}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square bg-gradient-to-br from-rose-light to-cream overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 bg-gradient-to-br from-primary/30 to-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-6xl">🎂</span>
                    </div>
                  </div>
                  {cake.stock < 10 && (
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
                  <h3 className="text-xl font-serif font-medium group-hover:text-primary transition-colors">
                    {cake.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                    {cake.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-2xl font-semibold text-primary">
                      ${(cake.price / 100).toFixed(2)}
                    </p>
                    <Button 
                      size="sm" 
                      className="rounded-full bg-primary hover:bg-primary/90"
                      onClick={() => addItem({
                        id: cake.id,
                        name: cake.name,
                        slug: cake.slug,
                        price: cake.price,
                        image: cake.images[0],
                      })}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {cakes.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto bg-rose-light rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🎂</span>
              </div>
              <h3 className="text-xl font-serif font-medium mb-2">No cakes available</h3>
              <p className="text-muted-foreground">Check back soon for our delicious cakes!</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
                Custom Cakes Available
              </h2>
              <p className="text-white/80 mb-6">
                Have a special request? We create custom cakes for weddings, birthdays, 
                corporate events, and any celebration. Contact us to discuss your dream cake!
              </p>
              <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                Request Custom Cake
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
