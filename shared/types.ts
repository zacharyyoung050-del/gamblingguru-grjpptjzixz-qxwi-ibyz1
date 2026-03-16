export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  detail?: string;
}
export interface User {
  id: string;
  name: string;
}
export interface Casino {
  id: string;
  name: string;
  rating: number; // 1-5
  description: string;
  imagePlaceholderUrl: string;
  tags: string[];
  url: string;
}
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}