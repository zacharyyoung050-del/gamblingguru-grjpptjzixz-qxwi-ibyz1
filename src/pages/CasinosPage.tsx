import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { RetroCard } from '@/components/ui/RetroCard';
import type { Casino } from '@shared/types';
import { ShieldCheck, Search, Filter, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function CasinosPage() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { data: response, isLoading } = useQuery({
    queryKey: ['casinos', 'all'],
    queryFn: () => api<{ items: Casino[] }>('/api/casinos'),
  });
  const casinos = useMemo(() => response?.items ?? [], [response]);
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    casinos.forEach(c => c.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [casinos]);
  const filteredCasinos = useMemo(() => {
    return casinos.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !selectedTag || c.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [casinos, search, selectedTag]);
  return (
    <div className="space-y-12">
      <div className="max-w-3xl space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Verified Platforms</h1>
        <p className="text-lg text-muted-foreground font-light leading-relaxed">
          The industry's most rigorous analysis of premium wagering stations. Every node is verified for stability, security, and elite player treatment.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 p-6 bg-premium-charcoal border border-white/5 rounded-2xl">
        <div className="flex-1 flex items-center gap-4 bg-black/40 px-5 py-3 rounded-xl border border-white/5 group focus-within:border-premium-gold/50 transition-all">
          <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-premium-gold" />
          <input
            type="text"
            placeholder="Search platform name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-muted-foreground mr-2" />
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 text-[10px] font-bold rounded-lg border transition-all ${!selectedTag ? 'bg-premium-gold text-premium-black border-premium-gold shadow-premium-glow' : 'border-white/10 text-muted-foreground hover:border-white/20'}`}
          >
            ALL CATEGORIES
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 text-[10px] font-bold rounded-lg border transition-all ${selectedTag === tag ? 'bg-premium-gold text-premium-black border-premium-gold shadow-premium-glow' : 'border-white/10 text-muted-foreground hover:border-white/20'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => <div key={i} className="h-80 bg-premium-charcoal/50 rounded-2xl animate-pulse" />)
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredCasinos.map(casino => (
              <motion.div
                key={casino.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <RetroCard className="h-full flex flex-col">
                  <div className="space-y-6 flex-1 flex flex-col">
                    <div className="aspect-[16/10] relative overflow-hidden rounded-xl border border-white/5 group">
                      <img
                        src={casino.imagePlaceholderUrl}
                        alt={casino.name}
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10">
                        <ShieldCheck className="w-4 h-4 text-premium-gold" />
                      </div>
                    </div>
                    <div className="space-y-4 flex-1">
                       <div className="flex justify-between items-center">
                         <h3 className="text-xl font-bold text-white group-hover:text-premium-gold transition-colors">{casino.name}</h3>
                         <div className="flex gap-0.5 text-premium-gold">
                          {Array(5).fill(0).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < casino.rating ? "fill-premium-gold" : "text-white/10 fill-transparent"}`} />
                          ))}
                         </div>
                       </div>
                       <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-3">
                         {casino.description}
                       </p>
                       <div className="flex flex-wrap gap-2 pt-2">
                        {casino.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-bold px-2 py-1 bg-white/5 text-premium-silver border border-white/5 rounded uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      to={`/casinos/${casino.id}`}
                      className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-white/5 hover:bg-premium-gold hover:text-premium-black text-white font-bold text-xs rounded-xl transition-all active:scale-95"
                    >
                      ACCESS FULL REVIEW <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </RetroCard>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      {!isLoading && filteredCasinos.length === 0 && (
        <div className="text-center py-32 rounded-3xl border border-dashed border-white/5">
          <p className="text-muted-foreground font-light text-lg">No platforms match your current search parameters.</p>
        </div>
      )}
    </div>
  );
}