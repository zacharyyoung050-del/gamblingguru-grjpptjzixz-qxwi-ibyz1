import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { RetroCard } from '@/components/ui/RetroCard';
import type { Casino } from '@shared/types';
import { Star, ShieldCheck, ChevronLeft, Zap, Globe, Award, ExternalLink } from 'lucide-react';
export function CasinoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: casino, isLoading } = useQuery({
    queryKey: ['casino', id],
    queryFn: () => api<Casino>(`/api/casinos/${id}`),
    enabled: !!id,
  });
  if (isLoading) return <div className="flex items-center justify-center py-32 text-premium-gold animate-pulse font-bold tracking-[0.3em]">SYNCHRONIZING_STATION...</div>;
  if (!casino) return <div className="text-center py-32 text-red-500 font-bold">404: PLATFORM_NOT_FOUND</div>;
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <Link to="/casinos" className="inline-flex items-center gap-2 text-[10px] font-bold text-muted-foreground hover:text-premium-gold uppercase tracking-widest transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Directory
      </Link>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-premium-gold/10 border border-premium-gold/20 rounded-full">
              <span className="text-[10px] font-bold text-premium-gold tracking-widest uppercase">Verified Hub</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">{casino.name}</h1>
            <div className="flex items-center gap-3">
              <div className="flex gap-1 text-premium-gold">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className={`w-8 h-8 ${i < casino.rating ? 'fill-premium-gold' : 'text-white/10'}`} />
                ))}
              </div>
              <span className="text-2xl font-light text-muted-foreground ml-2">/ 5.0</span>
            </div>
          </div>
          <div className="p-8 bg-premium-charcoal border border-white/5 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <Award className="w-24 h-24" />
            </div>
            <h3 className="text-xs font-bold text-premium-gold mb-4 tracking-[0.2em] uppercase">Executive Analysis</h3>
            <p className="text-xl font-light leading-relaxed text-premium-silver italic">
              "{casino.description}"
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                  <span>Stability Index</span>
                  <span className="text-premium-gold">98%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-premium-gold w-[98%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                  <span>Payback Ratio</span>
                  <span className="text-premium-gold">96.5%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-premium-gold w-[96.5%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="aspect-[4/3] relative rounded-3xl border border-white/5 shadow-premium-heavy overflow-hidden group">
            <img
              src={casino.imagePlaceholderUrl}
              alt={casino.name}
              className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-6 bg-premium-charcoal border border-white/5 rounded-2xl hover:border-premium-gold/30 transition-all">
              <ShieldCheck className="w-6 h-6 text-premium-gold mb-3" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase">SSL Secure</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-premium-charcoal border border-white/5 rounded-2xl hover:border-premium-gold/30 transition-all">
              <Globe className="w-6 h-6 text-premium-gold mb-3" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Global Access</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-premium-charcoal border border-white/5 rounded-2xl hover:border-premium-gold/30 transition-all">
              <Award className="w-6 h-6 text-premium-gold mb-3" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Top Tier</span>
            </div>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <RetroCard title="Operational Protocols">
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="mt-1 p-1 bg-premium-gold/10 rounded-lg"><Zap className="w-4 h-4 text-premium-gold" /></div>
              <div className="space-y-1">
                 <p className="text-sm font-bold text-premium-silver">Instant Crypto Transmissions</p>
                 <p className="text-xs text-muted-foreground font-light">Near-zero latency for blockchain wagering and liquid withdrawals.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="mt-1 p-1 bg-premium-gold/10 rounded-lg"><Zap className="w-4 h-4 text-premium-gold" /></div>
              <div className="space-y-1">
                 <p className="text-sm font-bold text-premium-silver">Certified RNG Integrity</p>
                 <p className="text-xs text-muted-foreground font-light">Verified algorithms ensuring absolute fairness across all gaming nodes.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="mt-1 p-1 bg-premium-gold/10 rounded-lg"><Zap className="w-4 h-4 text-premium-gold" /></div>
              <div className="space-y-1">
                 <p className="text-sm font-bold text-premium-silver">Elite VIP Treatment</p>
                 <p className="text-xs text-muted-foreground font-light">Dedicated account managers and custom-tailored wagering limits.</p>
              </div>
            </li>
          </ul>
        </RetroCard>
        <div className="flex flex-col justify-center items-center space-y-8 p-10 bg-premium-gold/5 border border-premium-gold/20 rounded-3xl text-center">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white">READY TO PLAY?</h3>
            <p className="text-sm text-muted-foreground font-light max-w-xs mx-auto">Access the platform directly via our secure executive uplink.</p>
          </div>
          <button className="flex items-center gap-3 px-12 py-5 bg-premium-gold text-premium-black font-bold text-sm rounded-full shadow-premium-glow hover:bg-white transition-all transform hover:-translate-y-1 active:translate-y-0">
            VISIT PLATFORM <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}