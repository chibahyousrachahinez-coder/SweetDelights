'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Cake, 
  ShoppingBag, 
  Settings, 
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { signOutUser } from '@/app/actions/auth';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Manage Menu', href: '/admin/menu', icon: Cake },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-white border-r border-pink-100 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-pink-100">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-xl font-serif font-semibold text-foreground">
              Sweet<span className="text-primary">Delights</span>
            </span>
          </motion.div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-pink-100 rounded-lg transition-colors"
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 text-foreground/70 transition-transform duration-300",
              isCollapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200/50"
                  : "text-foreground/70 hover:bg-pink-100 hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium text-sm"
                >
                  {item.name}
                </motion.span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="ml-auto w-2 h-2 rounded-full bg-white"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Admin info & Sign out */}
      <div className="border-t border-pink-100 p-4">
        <button
          onClick={handleSignOut}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors w-full",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-medium text-sm"
            >
              Log Out
            </motion.span>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
