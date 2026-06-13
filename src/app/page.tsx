'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LoadingVideo } from '@/components/loading-video';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';
import { ArrowRight, Star, Truck, Clock, Award, ChevronRight, Sparkles, Heart, Quote, ShoppingBag } from 'lucide-react';
import DisplayCards from '@/components/ui/display-cards';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { VideoShowcaseSection } from '@/components/ui/clean-video-embed';
import { useCartStore } from '@/store/cart-store';

const featuredProducts = [
  {
    id: 1,
    name: 'Strawberry Shortcake',
    slug: 'strawberry-dream-cake',
    category: 'Cakes',
    price: 3899, // in cents
    image: '/images/products/strawberry-cake.png',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Chocolate Dream Cupcake',
    slug: 'chocolate-dream-cupcake',
    category: 'Cupcakes',
    price: 499, // in cents
    image: '/images/products/chocolate-cupcake.png',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Pink Sprinkle Cupcake',
    slug: 'pink-sprinkle-cupcake',
    category: 'Cupcakes',
    price: 399, // in cents
    image: '/images/products/pink-cupcake.png',
    rating: 5.0,
  },
  {
    id: 4,
    name: 'Key Lime Cupcake',
    slug: 'key-lime-cupcake',
    category: 'Cupcakes',
    price: 449, // in cents
    image: '/images/products/lime-cupcake.png',
    rating: 4.7,
  },
];

export default function HomePage() {
  const [showContent, setShowContent] = useState(false);
  const { addItem } = useCartStore();

  return (
    <>
      <LoadingVideo onComplete={() => setShowContent(true)} duration={800} />

      <div
        className={`transition-opacity duration-700 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Hero Section with Background Image */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=2000&auto=format&fit=crop"
              alt="Beautiful cupcakes background"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50/95 via-pink-50/80 to-pink-50/60" />
            {/* Additional gradient from left to ensure text is readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent" />
          </div>

          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20 z-[5]"
            fill="rgba(244, 114, 182, 0.2)"
          />
          
          {/* Floating decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
            <div className="absolute top-20 left-[10%] w-20 h-20 rounded-full bg-pink-200/30 blur-2xl animate-float" />
            <div className="absolute top-40 right-[15%] w-32 h-32 rounded-full bg-amber-200/30 blur-3xl animate-float-delayed" />
            <div className="absolute bottom-32 left-[20%] w-24 h-24 rounded-full bg-rose-200/30 blur-2xl animate-float" />
          </div>

          <div className="container relative z-10 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div className="space-y-8 animate-scale-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full text-sm text-foreground/70 backdrop-blur-sm shadow-sm">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Freshly Baked Every Day
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight">
                  Bite into
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500">
                    Happiness.
                  </span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                  Indulge in our handcrafted cakes and pastries, made with love and the finest ingredients. 
                  Every bite tells a story of passion and perfection.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg shadow-pink-500/25 border-0"
                  >
                    Order Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="rounded-full px-8 border-foreground/20 hover:bg-foreground/5 backdrop-blur-sm bg-white/50"
                  >
                    View Menu
                  </Button>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 border-2 border-white shadow-sm"
                        />
                      ))}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">2,500+</span>
                      <span className="text-muted-foreground ml-1">Happy Customers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right content - Product Images and Floating Cards */}
              <div className="relative hidden lg:block h-[600px]">
                {/* Top Right - Pink Cupcake in Card */}
                <div className="absolute top-8 right-12 w-44 h-44 bg-white rounded-2xl shadow-xl p-4 z-20 animate-scale-in">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/products/pink-cupcake.png"
                      alt="Pink Cupcake"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Middle - Green/Lime Cupcake (smaller) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-lime-100 to-lime-200 rounded-2xl shadow-lg p-3 z-10 animate-float">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/products/lime-cupcake.png"
                      alt="Lime Cupcake"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Bottom Right - Cake Slice in Card */}
                <div className="absolute bottom-20 right-4 w-52 h-52 bg-white rounded-2xl shadow-xl p-4 z-20 animate-scale-in" style={{ animationDelay: '0.3s' }}>
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/products/strawberry-cake.png"
                      alt="Strawberry Cake"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Free Delivery card - top center */}
                <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-5 shadow-2xl z-30 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                      <Truck className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-base">Free Delivery</p>
                      <p className="text-sm text-muted-foreground">On orders $50+</p>
                    </div>
                  </div>
                </div>

                {/* Rating card - bottom right corner */}
                <div className="absolute bottom-2 right-2 bg-white rounded-2xl p-4 shadow-2xl z-30 animate-scale-in" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                    </div>
                    <div>
                      <p className="font-semibold">4.9 Rating</p>
                      <p className="text-sm text-muted-foreground">2000+ Reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="bg-white py-8 border-y border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Truck, title: 'Free Delivery', desc: 'Orders over $50', color: 'from-green-100 to-green-200' },
                { icon: Clock, title: 'Fresh Daily', desc: 'Baked every morning', color: 'from-blue-100 to-blue-200' },
                { icon: Award, title: 'Best Quality', desc: 'Premium ingredients', color: 'from-amber-100 to-amber-200' },
                { icon: Star, title: 'Top Rated', desc: '5-star reviews', color: 'from-pink-100 to-pink-200' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-6 h-6 text-foreground/70" />
                  </div>
                  <div>
                    <p className="font-semibold">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products with Spotlight */}
        <section className="py-20 bg-gradient-to-b from-white to-rose-50/50">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-primary font-medium mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Our Specialties
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-medium">
                Handcrafted Delights
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Each treat is a masterpiece, crafted with passion and precision to make your moments unforgettable.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <Card 
                  key={product.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-square bg-gradient-to-br from-rose-50 to-amber-50 overflow-hidden p-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-500 p-4"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium shadow-sm">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                    </div>
                    <h3 className="text-lg font-serif font-medium group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xl font-semibold text-primary">
                        ${(product.price / 100).toFixed(2)}
                      </p>
                      <Button 
                        size="sm" 
                        className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 shadow-md"
                        onClick={() => addItem({
                          id: product.id,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          image: product.image,
                        })}
                      >
                        <ShoppingBag className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                <Link href="/products">
                  View All Products
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Video Showcase Section */}
        <VideoShowcaseSection />

        {/* Promotional Banner with Dark Theme */}
        <section className="relative py-20 overflow-hidden">
          <Card className="container bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-3xl relative overflow-hidden border-0">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(251, 191, 36, 0.2)" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
              <div className="text-white space-y-6">
                <div className="inline-block bg-white/10 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
                  Limited Time Offer
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-medium">
                  Delicious
                  <br />
                  <span className="text-amber-300">Cupcakes</span>
                </h2>
                <p className="text-white/70 max-w-md text-lg">
                  Let&apos;s face it, a delicious chocolate cream cake goes a long way for many people.
                </p>
                <Button size="lg" className="rounded-full px-8 bg-white text-amber-900 hover:bg-amber-50 shadow-lg">
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="hidden md:flex justify-center items-center">
                <div className="relative w-80 h-80 animate-float">
                  <Image
                    src="/images/products/chocolate-cupcake.png"
                    alt="Chocolate Cupcake"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* 3D Scroll Showcase Section */}
        <section className="bg-gradient-to-b from-rose-50 via-pink-50 to-amber-50 overflow-hidden">
          <ContainerScroll
            titleComponent={
              <div className="space-y-4">
                <p className="text-primary font-medium flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Our Showcase
                </p>
                <h2 className="text-4xl md:text-6xl font-serif font-medium text-foreground">
                  Crafted with
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 ml-3">
                    Love
                  </span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Every creation is a masterpiece, baked fresh daily with premium ingredients
                </p>
              </div>
            }
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full p-4">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                <Image
                  src="/images/products/strawberry-cake.png"
                  alt="Strawberry Cake"
                  fill
                  className="object-contain p-4 hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <Image
                  src="/images/products/chocolate-cupcake.png"
                  alt="Chocolate Cupcake"
                  fill
                  className="object-contain p-4 hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-lime-100 to-green-100 flex items-center justify-center">
                <Image
                  src="/images/products/lime-cupcake.png"
                  alt="Lime Cupcake"
                  fill
                  className="object-contain p-4 hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center col-span-2">
                <Image
                  src="/images/products/pink-cupcake.png"
                  alt="Pink Cupcake"
                  fill
                  className="object-contain p-4 hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-end justify-center p-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg">
                    <span className="text-sm font-medium text-foreground">Fresh Daily</span>
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                <div className="text-center p-4">
                  <span className="text-6xl">🎂</span>
                  <p className="mt-2 font-serif font-medium">Custom Orders</p>
                </div>
              </div>
            </div>
          </ContainerScroll>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-b from-rose-50/50 to-white">
          <div className="container">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-rose-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-serif font-medium">
                    Get Sweet Updates
                  </h2>
                  <p className="text-muted-foreground">
                    Subscribe to our newsletter and get exclusive offers, early access to new products, and 10% off your first order!
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-6 py-3 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <Button className="rounded-full px-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 border-0">
                      Subscribe
                    </Button>
                  </div>
                </div>
                <div className="hidden md:grid grid-cols-2 gap-4">
                  {featuredProducts.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      className="aspect-square rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 p-4 relative overflow-hidden"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Testimonials Section */}
        <section className="py-20 bg-gradient-to-b from-white to-rose-50/30 overflow-hidden">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-primary font-medium mb-2 flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 fill-primary" />
                Customer Love
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-medium">
                What Our Customers Say
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Don&apos;t just take our word for it - hear from our happy customers who&apos;ve experienced the sweetness!
              </p>
            </div>

            <div className="flex justify-center items-center min-h-[400px]">
              <DisplayCards 
                cards={[
                  {
                    icon: <Star className="size-4 text-amber-400 fill-amber-400" />,
                    title: "Sarah M.",
                    description: "Best wedding cake ever! Absolutely stunning!",
                    date: "2 days ago",
                    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-pink-200/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/30 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                  },
                  {
                    icon: <Heart className="size-4 text-pink-400 fill-pink-400" />,
                    title: "James K.",
                    description: "The cupcakes were a hit at our party!",
                    date: "1 week ago",
                    className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-pink-200/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-white/30 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                  },
                  {
                    icon: <Quote className="size-4 text-rose-400" />,
                    title: "Emily R.",
                    description: "Fresh, delicious, and beautifully decorated!",
                    date: "Just now",
                    className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
                  },
                ]}
              />
            </div>

            {/* Additional Reviews Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {[
                {
                  name: "Michael T.",
                  review: "Ordered a birthday cake for my daughter. She was over the moon! The attention to detail was incredible.",
                  rating: 5,
                  product: "Princess Castle Cake",
                },
                {
                  name: "Lisa P.",
                  review: "The chocolate cupcakes are to die for! I keep coming back for more every week.",
                  rating: 5,
                  product: "Chocolate Dream Cupcakes",
                },
                {
                  name: "David W.",
                  review: "Professional service and amazing taste. Our wedding guests couldn't stop complimenting the cake!",
                  rating: 5,
                  product: "Wedding Tier Cake",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100/50"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-foreground/80 italic mb-4">&ldquo;{testimonial.review}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.product}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">
              Complete Your Sweet Collection
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              From birthdays to weddings, we have the perfect cake for every celebration. Order now and make your moments sweeter!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 border-0" asChild>
                <Link href="/cakes">
                  Browse Cakes
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <Link href="/contact">
                  Custom Orders
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
