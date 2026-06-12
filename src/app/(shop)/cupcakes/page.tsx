'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCupcakes } from '@/lib/mock-data';
import { useCartStore } from '@/store/cart-store';

export default function CupcakesPage() {
  const cupcakes = getCupcakes();
  const { addItem } = useCartStore();

  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-gradient-to-br from-rose-light/50 via-cream to-blush py-20">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-primary font-medium mb-2">Sweet Treats</p>
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">
              Delicious Cupcakes
            </h1>
            <p className="text-muted-foreground text-lg">
              Our cupcakes are made fresh daily with premium ingredients. 
              Perfect for parties, gifts, or treating yourself!
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{cupcakes.length}</span> cupcakes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cupcakes.map((cupcake) => (
              <Link
                key={cupcake.id}
                href={`/product/${cupcake.slug}`}
                className="group bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square rounded-xl bg-gradient-to-br from-rose-light to-accent/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-5xl">🧁</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <h3 className="font-serif text-lg font-medium group-hover:text-primary transition-colors">
                  {cupcake.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {cupcake.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-semibold text-primary">
                    ${(cupcake.price / 100).toFixed(2)}
                  </p>
                  <button 
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                    onClick={() => addItem({
                      id: cupcake.id,
                      name: cupcake.name,
                      slug: cupcake.slug,
                      price: cupcake.price,
                      image: cupcake.images[0],
                    })}
                    aria-label="Add to cart"
                  >
                    +
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {cupcakes.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto bg-rose-light rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🧁</span>
              </div>
              <h3 className="text-xl font-serif font-medium mb-2">No cupcakes available</h3>
              <p className="text-muted-foreground">Check back soon for our delicious cupcakes!</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
                Cupcakes for Every Occasion
              </h2>
              <p className="text-muted-foreground mb-6">
                Planning a party? Order our cupcakes in bulk and save! We offer special 
                pricing for orders of 24+ cupcakes. Custom flavors and decorations available.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-light flex items-center justify-center">
                    <span className="text-xl">🎉</span>
                  </div>
                  <div>
                    <p className="font-semibold">Party Packs</p>
                    <p className="text-sm text-muted-foreground">24, 48, or 100+ cupcakes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-light flex items-center justify-center">
                    <span className="text-xl">✨</span>
                  </div>
                  <div>
                    <p className="font-semibold">Custom Designs</p>
                    <p className="text-sm text-muted-foreground">Personalized decorations</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-light flex items-center justify-center">
                    <span className="text-xl">🚚</span>
                  </div>
                  <div>
                    <p className="font-semibold">Free Delivery</p>
                    <p className="text-sm text-muted-foreground">On orders over $50</p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="rounded-full mt-8 bg-primary hover:bg-primary/90">
                Order Party Pack
              </Button>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl bg-gradient-to-br from-rose-light to-cream flex items-center justify-center"
                >
                  <span className="text-5xl">🧁</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
