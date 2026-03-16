import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { RetroCard } from '@/components/ui/RetroCard';
import type { Article } from '@shared/types';
import { ChevronLeft, User, Calendar, Shield, Share2 } from 'lucide-react';
export function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => api<Article>(`/api/articles/${id}`),
    enabled: !!id,
  });
  if (isLoading) return <div className="flex items-center justify-center py-32 text-premium-gold animate-pulse font-bold tracking-[0.3em]">DECRYPTING_REPORT...</div>;
  if (!article) return <div className="text-center py-32 text-red-500 font-bold">ERR: DATA_PACKET_LOST</div>;
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex justify-between items-center">
        <Link to="/articles" className="inline-flex items-center gap-2 text-[10px] font-bold text-muted-foreground hover:text-premium-gold uppercase tracking-widest transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Insights
        </Link>
        <button className="text-muted-foreground hover:text-premium-gold transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
      <article className="space-y-12">
        <header className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <Shield className="w-3 h-3 text-premium-gold" />
            <span className="text-[10px] font-bold text-premium-silver tracking-widest uppercase">{article.category} Report</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-10 py-8 border-y border-white/5 font-medium text-[10px] text-muted-foreground uppercase tracking-widest">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-premium-charcoal rounded-full flex items-center justify-center text-premium-gold border border-white/5">
                <User className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                 <span className="text-white/40 mb-0.5">Analyst</span>
                 <span className="text-white">{article.author}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-premium-charcoal rounded-full flex items-center justify-center text-premium-gold border border-white/5">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                 <span className="text-white/40 mb-0.5">Date</span>
                 <span className="text-white">{article.date}</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 bg-premium-charcoal rounded-full flex items-center justify-center text-premium-gold border border-white/5">
                 <Shield className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                 <span className="text-white/40 mb-0.5">Verification</span>
                 <span className="text-white">ENCRYPTED</span>
              </div>
            </div>
          </div>
        </header>
        <div className="prose prose-invert max-w-none">
          <div className="text-2xl font-light leading-relaxed text-premium-silver mb-12 italic border-l-4 border-premium-gold pl-8 py-2">
            {article.excerpt}
          </div>
          <div className="space-y-8 text-lg font-light leading-loose text-muted-foreground">
            {article.content.split('\n').map((para, i) => (para.trim() && (
              <p key={i}>{para}</p>
            )))}
          </div>
        </div>
        <section className="pt-16 border-t border-white/5 mt-16">
          <div className="p-10 bg-premium-charcoal border border-white/5 rounded-3xl space-y-4">
            <h4 className="text-xs font-bold text-premium-gold uppercase tracking-[0.2em]">Platform Disclaimer</h4>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              This intelligence report is prepared by GamblingGuru's executive research team. Information is for strategic insight only and does not constitute financial advice. Digital wagering involves risk. High-fidelity encryption protocol active.
            </p>
          </div>
        </section>
      </article>
      <div className="py-16 text-center">
        <button className="px-10 py-4 border border-white/10 text-[10px] font-bold text-premium-silver hover:bg-white hover:text-black transition-all rounded-full uppercase tracking-widest">
          Download Executive Summary
        </button>
      </div>
    </div>
  );
}