'use client';

import { useEffect } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { Cake, Heart, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';

const ShowcaseContent = () => {
  return (
    <div className='max-w-4xl mx-auto bg-gradient-to-br from-pink-50 to-amber-50 rounded-3xl p-8 md:p-12 shadow-xl'>
      <h2 className='text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground'>
        Welcome to SweetDelights
      </h2>
      
      <p className='text-lg mb-8 text-muted-foreground leading-relaxed'>
        Discover our world of handcrafted cakes and pastries. Every creation is made with love, 
        premium ingredients, and attention to detail that makes each bite a moment of pure happiness.
      </p>

      <div className='grid md:grid-cols-2 gap-6 mb-10'>
        <div className='flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-100'>
          <div className='p-3 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500'>
            <Cake className='w-6 h-6 text-white' />
          </div>
          <div>
            <h3 className='font-semibold text-foreground mb-1'>Artisan Cakes</h3>
            <p className='text-sm text-muted-foreground'>Custom designs for every celebration</p>
          </div>
        </div>

        <div className='flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-100'>
          <div className='p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500'>
            <Heart className='w-6 h-6 text-white' />
          </div>
          <div>
            <h3 className='font-semibold text-foreground mb-1'>Made with Love</h3>
            <p className='text-sm text-muted-foreground'>Fresh ingredients, baked daily</p>
          </div>
        </div>

        <div className='flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-100'>
          <div className='p-3 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500'>
            <Star className='w-6 h-6 text-white' />
          </div>
          <div>
            <h3 className='font-semibold text-foreground mb-1'>5-Star Quality</h3>
            <p className='text-sm text-muted-foreground'>Trusted by thousands of happy customers</p>
          </div>
        </div>

        <div className='flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-pink-100'>
          <div className='p-3 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500'>
            <Sparkles className='w-6 h-6 text-white' />
          </div>
          <div>
            <h3 className='font-semibold text-foreground mb-1'>Special Occasions</h3>
            <p className='text-sm text-muted-foreground'>Weddings, birthdays & more</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        <Link
          href='/products'
          className='inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg shadow-pink-300/30'
        >
          Browse Our Menu
        </Link>
        <Link
          href='/'
          className='inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-pink-300 text-pink-600 font-medium hover:bg-pink-50 transition-all duration-300'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default function ShowcasePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType='video'
        mediaSrc='https://youtube.com/shorts/Q_cdF2AGh2w'
        bgImageSrc='https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?q=80&w=1920&auto=format&fit=crop'
        title='Sweet Moments Await'
        date='✨ SweetDelights Bakery'
        scrollToExpand='↓ Scroll to Explore'
        textBlend={false}
      >
        <ShowcaseContent />
      </ScrollExpandMedia>
    </div>
  );
}
