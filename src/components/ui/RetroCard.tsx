import React from 'react';
import { cn } from '@/lib/utils';
interface RetroCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'pink' | 'cyan' | 'green'; // Kept for prop stability, ignored visually
  title?: string;
}
export function RetroCard({ children, className, title }: RetroCardProps) {
  return (
    <div className={cn(
      "group bg-premium-charcoal border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-premium-gold/30 hover:shadow-premium-glow",
      className
    )}>
      {title && (
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-black/20">
          <span className="font-semibold text-xs text-premium-gold uppercase tracking-wider">{title}</span>
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}