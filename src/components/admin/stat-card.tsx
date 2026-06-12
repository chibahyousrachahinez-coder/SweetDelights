'use client';

import { motion } from 'framer-motion';
import { DollarSign, Package, TrendingUp, Users, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Map icon names to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  package: Package,
  dollarSign: DollarSign,
  trendingUp: TrendingUp,
  users: Users,
};

interface StatCardProps {
  title: string;
  value: string | number;
  iconName: string; // Changed from icon to iconName
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

export function StatCard({ title, value, iconName, subtitle, trend, delay = 0 }: StatCardProps) {
  const Icon = iconMap[iconName] || Package; // Fallback to Package if icon not found
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative group"
    >
      <div className="relative bg-white rounded-2xl p-6 border border-pink-100 shadow-sm hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-300">
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-rose-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          {/* Icon */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl">
              <Icon className="w-6 h-6 text-pink-600" />
            </div>
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
                  trend.isPositive
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                )}
              >
                <span>{trend.isPositive ? "+" : "-"}</span>
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>

          {/* Value */}
          <div className="mb-1">
            <motion.h3
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, type: "spring" }}
              className="text-3xl font-bold text-foreground"
            >
              {value}
            </motion.h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Title */}
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}
