'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LayoutDashboard, ShoppingBag, LogOut, ChevronDown } from 'lucide-react';
import { signOutUser } from '@/app/actions/auth';

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAdmin = user.role === 'ADMIN';

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = () => {
    if (user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 hover:bg-accent rounded-full transition-colors"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-medium shadow-md shadow-pink-200/50">
          {getInitials()}
        </div>
        <ChevronDown 
          className={`h-4 w-4 text-foreground/70 transition-transform duration-200 hidden md:block ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-pink-100 overflow-hidden z-50"
          >
            {/* User info */}
            <div className="px-4 py-3 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
              <p className="text-sm font-medium text-foreground truncate">
                {user.name || 'User'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
              {isAdmin && (
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-pink-500 text-white rounded-full">
                  Admin
                </span>
              )}
            </div>

            {/* Menu items */}
            <div className="py-2">
              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-pink-50 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-pink-500" />
                  <span>Admin Dashboard</span>
                </Link>
              )}

              <Link
                href="/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-pink-50 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-pink-500" />
                <span>My Orders</span>
              </Link>

              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-pink-50 transition-colors"
              >
                <User className="w-4 h-4 text-pink-500" />
                <span>Profile</span>
              </Link>
            </div>

            {/* Sign out */}
            <div className="border-t border-pink-100">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
