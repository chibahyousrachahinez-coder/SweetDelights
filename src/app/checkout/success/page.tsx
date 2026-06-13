'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const orderNumber = searchParams.get('orderNumber');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#f43f5e', '#fbbf24'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#f43f5e', '#fbbf24'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-pink-100 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Order Confirmed! 🎉
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your order! We&apos;re preparing your delicious treats with love.
            </p>

            {/* Order Details */}
            {orderNumber && (
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-pink-600" />
                  <h2 className="text-xl font-display font-semibold">Order Details</h2>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Order Number:</span>
                    <span className="font-mono font-bold text-pink-600">{orderNumber}</span>
                  </div>
                  {orderId && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Order ID:</span>
                      <span className="font-mono text-xs">{orderId.slice(0, 20)}...</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* What's Next */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-display font-semibold text-lg mb-4 text-center">
                What happens next?
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 flex-shrink-0 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-pink-600">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Order Confirmation Email</p>
                    <p className="text-xs text-muted-foreground">
                      We&apos;ve sent a confirmation to your email with all the details.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 flex-shrink-0 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-pink-600">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Preparation</p>
                    <p className="text-xs text-muted-foreground">
                      Our bakers will start preparing your fresh treats.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 flex-shrink-0 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-pink-600">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Delivery</p>
                    <p className="text-xs text-muted-foreground">
                      Your order will be delivered fresh to your door within 1-2 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                asChild
              >
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-pink-300 hover:bg-pink-50"
                asChild
              >
                <Link href="/products">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
