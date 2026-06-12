'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, ShoppingBag, X, Heart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActionSearchBar } from '@/components/ui/action-search-bar';
import { UserMenu } from './user-menu';
import { useCartStore } from '@/store/cart-store';
import { CartDrawer } from './cart-drawer';

interface HeaderClientProps {
  navLinks: Array<{ href: string; label: string }>;
  user: {
    id: string;
    email?: string | null;
    name?: string | null;
    role?: string;
  } | null;
}

export function HeaderClient({ navLinks, user }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, openCart } = useCartStore();
  const cartItemCount = totalItems();

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-semibold text-foreground tracking-wide">
              Sweet<span className="text-primary">Delights</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wider text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
            {user?.email === 'admin@sweetdelights.com' && (
              <Link
                href="/admin/dashboard"
                className="text-sm font-medium tracking-wider text-rose-600 font-semibold hover:text-rose-700 transition-colors relative group"
              >
                Admin Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all group-hover:w-full" />
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button 
              className="p-2 hover:bg-accent rounded-full transition-all duration-200 active:scale-90"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5 text-foreground/70" />
            </button>
            <button className="p-2 hover:bg-accent rounded-full transition-all duration-200 active:scale-90">
              <Heart className="h-5 w-5 text-foreground/70" />
            </button>
            <button 
              className="p-2 hover:bg-accent rounded-full transition-all duration-200 active:scale-90 relative group"
              onClick={openCart}
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-lg"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </button>

            {user ? (
              <div className="ml-2">
                <UserMenu user={user} />
              </div>
            ) : (
              <Link 
                href="/login"
                className="hidden md:flex items-center gap-2 ml-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-md shadow-pink-200/50 active:scale-95"
              >
                Sign In
              </Link>
            )}

            <button
              className="lg:hidden p-2 hover:bg-accent rounded-full transition-all duration-200 active:scale-90 ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <nav className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium tracking-wider text-foreground/80 hover:text-primary py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user?.email === 'admin@sweetdelights.com' && (
                <Link
                  href="/admin/dashboard"
                  className="text-sm font-medium tracking-wider text-rose-600 font-semibold hover:text-rose-700 py-2 border-t border-pink-100 mt-2 pt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              {!user && (
                <Link
                  href="/login"
                  className="text-sm font-medium tracking-wider text-primary py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-lg mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-serif font-medium">Search Our Menu</h3>
                  <button 
                    onClick={() => setSearchOpen(false)}
                    className="p-1 hover:bg-pink-50 rounded-full transition-all duration-200 active:scale-90"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                <ActionSearchBar />
                <p className="text-xs text-center text-gray-400 mt-4">
                  Press ESC to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
