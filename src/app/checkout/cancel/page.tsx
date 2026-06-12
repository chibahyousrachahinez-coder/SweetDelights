'use client';

import { motion } from 'framer-motion';
import { XCircle, Home, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-pink-100 text-center">
          {/* Cancel Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center"
          >
            <XCircle className="w-12 h-12 text-red-600" />
          </motion.div>

          {/* Cancel Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Payment Cancelled
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              No worries! Your order has not been processed and no charges were made.
            </p>

            {/* Info Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-display font-semibold text-lg mb-3 text-center">
                What would you like to do?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 bg-pink-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-3 h-3 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Continue Shopping</p>
                    <p className="text-xs text-muted-foreground">
                      Browse more of our delicious treats and add items to your cart.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 bg-pink-100 rounded-full flex items-center justify-center">
                    <ArrowLeft className="w-3 h-3 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Return to Checkout</p>
                    <p className="text-xs text-muted-foreground">
                      Your cart items are still saved. Try checking out again.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-pink-50 rounded-2xl p-4 mb-8">
              <p className="text-sm text-muted-foreground">
                Having trouble with payment?{' '}
                <Link href="/contact" className="text-pink-600 font-semibold hover:underline">
                  Contact our support team
                </Link>
                {' '}for assistance.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                asChild
              >
                <Link href="/checkout">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Return to Checkout
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-pink-300 hover:bg-pink-50"
                asChild
              >
                <Link href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
