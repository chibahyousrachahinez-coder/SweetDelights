'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';

interface CleanVideoEmbedProps {
  videoId: string;
  title?: string;
  subtitle?: string;
  aspectRatio?: 'vertical' | 'horizontal' | 'square';
  className?: string;
}

export function CleanVideoEmbed({
  videoId,
  title,
  subtitle,
  aspectRatio = 'vertical',
  className = '',
}: CleanVideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const aspectClasses = {
    vertical: 'aspect-[9/16]',
    horizontal: 'aspect-video',
    square: 'aspect-square',
  };

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&disablekb=1&fs=0&iv_load_policy=3&playsinline=1`;

  return (
    <div className={`relative group ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`relative ${aspectClasses[aspectRatio]} w-full max-w-sm mx-auto overflow-hidden rounded-3xl shadow-2xl shadow-pink-300/30`}
      >
        {!isPlaying ? (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-100 to-amber-100 flex items-center justify-center cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl"
            >
              <Play className="w-8 h-8 text-pink-500 ml-1" fill="currentColor" />
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/40 to-transparent">
              {title && (
                <p className="text-white font-serif text-lg font-medium">{title}</p>
              )}
              {subtitle && (
                <p className="text-white/80 text-sm">{subtitle}</p>
              )}
            </div>
          </div>
        ) : (
          <>
            <iframe
              ref={iframeRef}
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={false}
              style={{ border: 0 }}
            />
            
            {/* Overlay to hide YouTube branding */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top gradient to hide title */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />
              
              {/* Bottom gradient to hide YouTube logo */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Side gradients for cleaner look */}
              <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent" />
              <div className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-black/20 to-transparent" />
            </div>

            {/* Custom controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
              <div>
                {title && (
                  <p className="text-white font-serif text-sm font-medium drop-shadow-lg">{title}</p>
                )}
              </div>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors pointer-events-auto"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </>
        )}
        
        {/* Decorative border */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20 pointer-events-none" />
      </motion.div>
    </div>
  );
}

export function VideoShowcaseSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-pink-50/30 to-rose-50/50 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video */}
          <div className="order-2 lg:order-1">
            <CleanVideoEmbed
              videoId="Q_cdF2AGh2w"
              title="Behind the Scenes"
              subtitle="Watch our bakers in action"
              aspectRatio="vertical"
            />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-sm text-pink-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              Crafted with Love
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground">
              The Art of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 block">
                Baking Magic
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Every creation starts with passion and ends with perfection. Watch as our skilled 
              bakers transform the finest ingredients into edible masterpieces that bring joy 
              to every celebration.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <p className="text-3xl font-serif font-semibold text-pink-500">10+</p>
                <p className="text-sm text-muted-foreground">Years of Experience</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-serif font-semibold text-pink-500">50k+</p>
                <p className="text-sm text-muted-foreground">Cakes Delivered</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-serif font-semibold text-pink-500">100%</p>
                <p className="text-sm text-muted-foreground">Fresh Ingredients</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-serif font-semibold text-pink-500">4.9★</p>
                <p className="text-sm text-muted-foreground">Customer Rating</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
