'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cart-store';
import { cn } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalItems, totalPrice } = useCartStore();

  const total = totalPrice();
  const itemCount = totalItems();

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-pink-50/95 via-rose-50/95 to-amber-50/95 backdrop-blur-lg shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="relative border-b border-pink-200 bg-white/80 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-rose-100/50" />
              <div className="relative p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-pink-200 to-rose-200 rounded-xl">
                    <ShoppingBag className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground">
                      Your Cart
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                  <button
                    onClick={closeCart}
                    className="p-2 hover:bg-pink-100 rounded-xl transition-all duration-200 active:scale-95"
                    aria-label="Close cart"
                  >
                    <X className="w-6 h-6 text-muted-foreground" />
                  </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <div className="w-24 h-24 mb-6 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Add some delicious treats to get started!
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-pink-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-pink-50">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-8 h-8 text-pink-300" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-pink-600 font-semibold mt-1">
                            ${(item.price / 100).toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-pink-50 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-pink-100 rounded transition-all duration-200 active:scale-90"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4 text-pink-600" />
                            </button>
                            <span className="w-8 text-center font-semibold text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-pink-100 rounded transition-all duration-200 active:scale-90"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4 text-pink-600" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200 active:scale-90 group"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer with Total and Checkout */}
            {items.length > 0 && (
              <div className="border-t border-pink-200 bg-white/80 backdrop-blur-sm p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-lg">
                  <span className="text-muted-foreground font-medium">Subtotal</span>
                  <span className="font-display font-bold text-2xl text-foreground">
                    ${(total / 100).toFixed(2)}
                  </span>
                </div>

                {/* Shipping Note */}
                <p className="text-sm text-muted-foreground text-center">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white",
                    "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 bg-size-200 bg-pos-0",
                    "hover:bg-pos-100 transition-all duration-500",
                    "shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  )}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="w-full px-6 py-3 border-2 border-pink-300 text-pink-600 rounded-xl font-medium hover:bg-pink-50 transition-all duration-200 active:scale-95"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
