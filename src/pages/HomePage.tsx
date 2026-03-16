import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Trophy, TrendingUp, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RetroCard } from '@/components/ui/RetroCard';
import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import type { Casino, Article } from '@shared/types';
export function HomePage() {
  const { data: casinosData, isLoading: casinosLoading } = useQuery({
    queryKey: ['casinos', 'featured'],
    queryFn: () => api<{ items: Casino[] }>('/api/casinos?limit=3'),
  });
  const { data: articlesData, isLoading: articlesLoading } = useQuery({
    queryKey: ['articles', 'recent'],
    queryFn: () => api<{ items: Article[] }>('/api/articles?limit=5'),
  });
  const casinos = casinosData?.items ?? [];
  const articles = articlesData?.items ?? [];
  return (
    <div className="space-y-16">
      {/* Modern Hero Section */}
      <section className="relative py-20 text-center space-y-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-premium-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-premium-charcoal border border-white/5 rounded-full mb-4">
          <Shield className="w-3 h-3 text-premium-gold" />
          <span className="text-[10px] font-bold text-premium-silver tracking-widest uppercase">
            Certified Elite Gaming Portal
          </span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight gold-gradient-text leading-none">
          EXECUTIVE<br />WAGERING
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light tracking-wide">
          Navigate the global casino landscape with high-fidelity analysis and premium insights.
        </p>
        <div className="flex justify-center gap-6 pt-4">
          <Link to="/casinos" className="px-8 py-4 bg-premium-gold text-premium-black font-bold rounded-lg hover:bg-white transition-all shadow-premium-glow active:scale-95">
            EXPLORE CASINOS
          </Link>
          <Link to="/articles" className="px-8 py-4 bg-premium-charcoal text-white font-bold rounded-lg border border-white/10 hover:border-premium-gold transition-all">
            READ INSIGHTS
          </Link>
        </div>
      </section>
      {/* Market Ticker */}
      <div className="border-y border-white/5 py-6 bg-black/20 flex overflow-hidden whitespace-nowrap">
        <div className="flex animate-none gap-12 px-4 font-medium text-[10px] tracking-[0.2em] text-premium-silver uppercase items-center">
           <span className="flex items-center gap-2"><TrendingUp className="w-3 h-3 text-premium-gold" /> BTC_JACKPOT: $84,203.41</span>
           <span className="flex items-center gap-2"><Star className="w-3 h-3 text-premium-gold" /> TOP_STATION: CYBERSLOTS_2000</span>
           <span className="flex items-center gap-2 text-premium-gold"><Trophy className="w-3 h-3" /> NEW_RECORD_PAYOUT: 42.5 ETH</span>
           <span className="hidden lg:flex items-center gap-2 opacity-50">STATUS: NETWORK_STABLE</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
        {/* Featured Casinos */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Elite Platforms</h2>
              <p className="text-sm text-muted-foreground">Hand-picked premium wagering destinations.</p>
            </div>
            <Link to="/casinos" className="text-xs font-bold text-premium-gold hover:underline flex items-center gap-1">
              VIEW ALL <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {casinosLoading ? (
              Array(2).fill(0).map((_, i) => <div key={i} className="h-64 bg-premium-charcoal rounded-xl animate-pulse" />)
            ) : (
              casinos.map(casino => (
                <RetroCard key={casino.id} title={casino.name}>
                  <div className="space-y-5">
                    <img
                      src={casino.imagePlaceholderUrl}
                      alt={casino.name}
                      className="w-full h-40 object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} className={cn("w-4 h-4", i < casino.rating ? "text-premium-gold fill-premium-gold" : "text-muted")} />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-premium-silver bg-white/5 px-2 py-1 rounded">PLATINUM_RATED</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 font-light">{casino.description}</p>
                    <Link
                      to={`/casinos/${casino.id}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-premium-gold group-hover:translate-x-1 transition-transform"
                    >
                      DETAILED ANALYSIS <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </RetroCard>
              ))
            )}
          </div>
        </div>
        {/* Latest Insights Sidebar */}
        <div className="space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Executive Feed</h2>
              <p className="text-sm text-muted-foreground">Latest market intelligence.</p>
            </div>
          </div>
          <RetroCard title="Recent Publications">
            <div className="space-y-8">
              {articlesLoading ? (
                Array(3).fill(0).map((_, i) => <div key={i} className="h-16 bg-white/5 animate-pulse rounded" />)
              ) : (
                articles.map(article => (
                  <Link key={article.id} to={`/articles/${article.id}`} className="block group border-b border-white/5 pb-5 last:border-0 last:pb-0">
                    <span className="text-[10px] font-bold text-premium-gold tracking-widest uppercase">{article.category}</span>
                    <h3 className="text-sm font-semibold text-premium-silver group-hover:text-premium-gold transition-colors mt-1 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-2">{article.date}</p>
                  </Link>
                ))
              )}
            </div>
            <Link to="/articles" className="block mt-8 text-center text-[10px] font-bold text-muted-foreground hover:text-premium-gold transition-colors uppercase tracking-[0.2em]">
              Access Complete Archives
            </Link>
          </RetroCard>
        </div>
      </div>
    </div>
  );
}