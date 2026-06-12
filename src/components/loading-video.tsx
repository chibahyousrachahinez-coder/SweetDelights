'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Spotlight } from '@/components/ui/spotlight';

interface LoadingVideoProps {
  onComplete?: () => void;
  duration?: number;
}

export function LoadingVideo({ onComplete, duration = 3000 }: LoadingVideoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete, duration]);

  useEffect(() => {
    if (!isLoading) {
      const fadeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 800);
      return () => clearTimeout(fadeTimer);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
          }}
        >
          {/* Spotlight Effects */}
          <Spotlight
            className="-top-40 -left-10 md:left-60 md:-top-20"
            fill="rgba(244, 114, 182, 0.15)"
          />
          <Spotlight
            className="top-40 right-0 md:right-60 md:top-20"
            fill="rgba(251, 191, 36, 0.1)"
          />

          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-500/5 blur-3xl"
            />
          </div>

          {/* Floating Cupcakes */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top Left Cupcake */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -15 }}
              animate={{ 
                opacity: 0.9, 
                y: [0, -20, 0],
                rotate: [-15, -10, -15],
              }}
              transition={{
                opacity: { duration: 0.5 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute top-[15%] left-[10%] w-32 h-32 md:w-40 md:h-40"
            >
              <Image
                src="/images/products/pink-cupcake.png"
                alt="Cupcake"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Top Right Cupcake */}
            <motion.div
              initial={{ opacity: 0, y: -50, rotate: 15 }}
              animate={{ 
                opacity: 0.8, 
                y: [-10, 10, -10],
                rotate: [15, 20, 15],
              }}
              transition={{
                opacity: { duration: 0.7, delay: 0.2 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute top-[10%] right-[15%] w-28 h-28 md:w-36 md:h-36"
            >
              <Image
                src="/images/products/lime-cupcake.png"
                alt="Cupcake"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Bottom Left Cupcake */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: 0.7, 
                y: [5, -15, 5],
                x: [0, 10, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.3 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute bottom-[20%] left-[8%] w-24 h-24 md:w-32 md:h-32"
            >
              <Image
                src="/images/products/chocolate-cupcake.png"
                alt="Cupcake"
                fill
                className="object-contain drop-shadow-2xl opacity-80"
              />
            </motion.div>

            {/* Bottom Right Cake */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: 0.85, 
                y: [-5, 15, -5],
                rotate: [5, -5, 5],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.4 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute bottom-[15%] right-[10%] w-36 h-36 md:w-44 md:h-44"
            >
              <Image
                src="/images/products/strawberry-cake.png"
                alt="Cake"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Center Content */}
          <div className="relative z-10 text-center px-4">
            {/* Logo/Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2 
              }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-amber-500/20 backdrop-blur-sm flex items-center justify-center border border-white/10"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-pink-500/30 to-amber-500/30 flex items-center justify-center">
                    <motion.span 
                      className="text-5xl md:text-6xl"
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      🧁
                    </motion.span>
                  </div>
                </motion.div>
                
                {/* Orbiting elements */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl">🍰</div>
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-xl">🎂</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight"
            >
              <span className="text-white">Sweet</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400">
                Delights
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-4 text-lg text-white/60"
            >
              Crafting moments of sweetness...
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '100%' }}
              transition={{ delay: 0.8 }}
              className="mt-10 max-w-xs mx-auto"
            >
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-3 text-sm text-white/40"
              >
                {progress}% Loading...
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
