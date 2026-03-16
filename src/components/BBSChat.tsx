import React, { useState, useRef, useEffect } from 'react';
import { api } from '@/lib/api-client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ChatMessage } from '@shared/types';
import { Send, User as UserIcon, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
export function BBSChat() {
  const queryClient = useQueryClient();
  const [text, setText] = useState('');
  const [nickname] = useState(() => `VIP_${Math.floor(100 + Math.random() * 899)}`);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: messages = [] } = useQuery({
    queryKey: ['chat', 'c1'],
    queryFn: () => api<ChatMessage[]>('/api/chats/c1/messages'),
    refetchInterval: 5000,
  });
  const mutation = useMutation({
    mutationFn: (newText: string) => api<ChatMessage>('/api/chats/c1/messages', {
      method: 'POST',
      body: JSON.stringify({ userId: nickname, text: newText })
    }),
    onSuccess: (newMsg) => {
      queryClient.setQueryData(['chat', 'c1'], (old: ChatMessage[] = []) => [...old, newMsg]);
      setText('');
    }
  });
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || mutation.isPending) return;
    mutation.mutate(text.trim());
  };
  return (
    <div className="flex flex-col h-[400px] font-sans">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"
      >
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <UserIcon className="w-4 h-4 text-premium-gold" />
             </div>
             <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-premium-silver uppercase">{msg.userId}</span>
                  <span className="text-[8px] text-muted-foreground opacity-60">{new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {msg.text}
                </p>
             </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-black/40">
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5 focus-within:border-premium-gold/30 transition-all">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share insight..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder:text-muted-foreground"
          />
          <button type="submit" className="text-premium-gold hover:scale-110 transition-transform disabled:opacity-50" disabled={mutation.isPending}>
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between">
           <div className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-green-500" />
              <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Community Active</span>
           </div>
           <span className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest">ID: {nickname}</span>
        </div>
      </form>
    </div>
  );
}