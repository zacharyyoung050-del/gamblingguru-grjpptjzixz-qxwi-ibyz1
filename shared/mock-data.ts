import type { User, Chat, ChatMessage, Casino, Article } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'CYBER_PUNK_99' },
  { id: 'u2', name: 'RETRO_GAMER' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'GLOBAL_LOBBY' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Welcome to the Grid.', ts: Date.now() },
];
export const MOCK_CASINOS: Casino[] = [
  {
    id: 'cas-1',
    name: 'CyberSlots 2000',
    rating: 5,
    description: 'The premier destination for high-stakes digital wagering in the neon sprawl.',
    imagePlaceholderUrl: 'https://images.unsplash.com/photo-1596838132731-dd36aae527ec?auto=format&fit=crop&q=80&w=400',
    tags: ['NEON', 'BITCOIN', 'FAST_PAYOUT'],
    url: '#'
  },
  {
    id: 'cas-2',
    name: 'Neon Nights Casino',
    rating: 4,
    description: 'Where the music never stops and the jackpots glow brighter than the streetlights.',
    imagePlaceholderUrl: 'https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?auto=format&fit=crop&q=80&w=400',
    tags: ['RETRO', 'LIVE_DEALER'],
    url: '#'
  },
  {
    id: 'cas-3',
    name: '8-Bit Palace',
    rating: 3,
    description: 'Simple, classic, and pixel-perfect gambling for the nostalgic soul.',
    imagePlaceholderUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=400',
    tags: ['PIXEL', 'LOW_STAKES'],
    url: '#'
  }
];
export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Surfing the Web for Jackpots',
    excerpt: 'How to find the best digital casinos in the wild frontier of the early internet.',
    content: 'Full article content here...',
    author: 'Admin_Max',
    date: '1998-05-22',
    category: 'GUIDE'
  },
  {
    id: 'art-2',
    title: 'Top 5 8-Bit Slots You Need to Play',
    excerpt: 'We review the most pixel-perfect slot machines currently occupying the servers.',
    content: 'Full article content here...',
    author: 'PixelProphet',
    date: '1999-12-01',
    category: 'REVIEW'
  }
];