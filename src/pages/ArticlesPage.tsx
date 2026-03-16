import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { RetroCard } from '@/components/ui/RetroCard';
import { BBSChat } from '@/components/BBSChat';
import type { Article } from '@shared/types';
import { FileText, ChevronRight, Activity, TrendingUp } from 'lucide-react';
export function ArticlesPage() {
  const { data: response, isLoading } = useQuery({
    queryKey: ['articles', 'all'],
    queryFn: () => api<{ items: Article[] }>('/api/articles'),
  });
  const articles = response?.items ?? [];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Market Insights</h1>
          <p className="text-lg text-muted-foreground font-light">
            Strategic analysis, regulatory updates, and executive gambling reports.
          </p>
        </div>
        <div className="space-y-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => <div key={i} className="h-32 bg-premium-charcoal/50 animate-pulse rounded-2xl" />)
          ) : (
            articles.map(article => (
              <Link key={article.id} to={`/articles/${article.id}`} className="block group">
                <RetroCard className="transition-all hover:translate-x-1 border-transparent hover:border-premium-gold/20">
                  <div className="flex gap-8">
                    <div className="hidden md:flex flex-col items-center justify-center w-20 shrink-0 border-r border-white/5 pr-8">
                      <div className="p-3 bg-white/5 rounded-xl group-hover:bg-premium-gold/10 transition-colors">
                        <FileText className="w-6 h-6 text-premium-gold" />
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground mt-3 uppercase tracking-tighter">{article.category}</span>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold text-white group-hover:text-premium-gold transition-colors leading-tight">
                          {article.title}
                        </h2>
                        <span className="text-[10px] font-bold text-muted-foreground/60">{article.date}</span>
                      </div>
                      <p className="text-muted-foreground text-sm font-light leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-2">
                           <div className="w-5 h-5 bg-premium-gold/20 rounded-full flex items-center justify-center text-[8px] font-bold text-premium-gold">
                              {article.author[0]}
                           </div>
                           <span className="text-[10px] font-bold text-premium-silver uppercase">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-premium-gold group-hover:underline uppercase tracking-widest">
                          ACCESS REPORT <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </RetroCard>
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="lg:col-span-4 space-y-8">
        <RetroCard title="Live Activity Stream">
          <BBSChat />
        </RetroCard>
        <RetroCard title="System Intelligence">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-premium-gold" />
                <span className="text-xs font-semibold text-muted-foreground">Network Status</span>
              </div>
              <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">OPTIMAL</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-premium-gold" />
                <span className="text-xs font-semibold text-muted-foreground">Market Volatility</span>
              </div>
              <span className="text-[10px] font-bold text-premium-gold bg-premium-gold/10 px-2 py-0.5 rounded-full">LOW</span>
            </div>
            <div className="pt-4 border-t border-white/5 mt-4">
              <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                All data packets are encrypted via 256-bit AES protocol. Updates refreshed every 60 seconds.
              </p>
            </div>
          </div>
        </RetroCard>
      </div>
    </div>
  );
}