import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Crown, Star, Newspaper, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
interface RetroLayoutProps {
  children: React.ReactNode;
}
export function RetroLayout({ children }: RetroLayoutProps) {
  return (
    <div className="min-h-screen relative flex flex-col bg-premium-black">
      {/* Premium Navigation */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <Crown className="w-8 h-8 text-premium-gold" />
              <span className="text-xl font-bold tracking-widest gold-gradient-text uppercase">
                GamblingGuru
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-10">
              <NavLink 
                to="/casinos" 
                className={({ isActive }) => cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-premium-gold",
                  isActive ? "text-premium-gold" : "text-muted-foreground"
                )}
              >
                CASINOS
              </NavLink>
              <NavLink 
                to="/articles" 
                className={({ isActive }) => cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-premium-gold",
                  isActive ? "text-premium-gold" : "text-muted-foreground"
                )}
              >
                INSIGHTS
              </NavLink>
            </nav>
            <div className="flex items-center gap-4">
               <button className="hidden md:block px-5 py-2 text-xs font-semibold bg-premium-gold text-premium-black rounded-full hover:bg-white transition-colors">
                  JOIN VIP
               </button>
               <button className="md:hidden text-muted-foreground">
                  <Menu className="w-6 h-6" />
               </button>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
      {/* Modern Footer */}
      <footer className="border-t border-white/5 bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2">
            <span className="text-lg font-bold gold-gradient-text uppercase">GamblingGuru</span>
            <p className="text-xs text-muted-foreground max-w-xs">
              The premier destination for elite casino analysis and executive gambling insights.
            </p>
          </div>
          <div className="flex gap-8 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            <Link to="/" className="hover:text-premium-gold">Privacy</Link>
            <Link to="/" className="hover:text-premium-gold">Terms</Link>
            <Link to="/" className="hover:text-premium-gold">Responsible Play</Link>
          </div>
          <div className="text-[10px] text-muted-foreground">
            © 2025 GAMBLINGGURU ELITE HUB. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}