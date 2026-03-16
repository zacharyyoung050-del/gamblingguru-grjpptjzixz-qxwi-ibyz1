import { IndexedEntity } from "./core-utils";
import type { User, Chat, ChatMessage, Casino, Article } from "../shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS, MOCK_CASINOS, MOCK_ARTICLES } from "../shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
export class CasinoEntity extends IndexedEntity<Casino> {
  static readonly entityName = "casino";
  static readonly indexName = "casinos";
  static readonly initialState: Casino = { id: "", name: "", rating: 0, description: "", imagePlaceholderUrl: "", tags: [], url: "" };
  static seedData = MOCK_CASINOS;
}
export class ArticleEntity extends IndexedEntity<Article> {
  static readonly entityName = "article";
  static readonly indexName = "articles";
  static readonly initialState: Article = { id: "", title: "", excerpt: "", content: "", author: "", date: "", category: "" };
  static seedData = MOCK_ARTICLES;
}
export type ChatBoardState = Chat & { messages: ChatMessage[] };
const SEED_CHAT_BOARDS: ChatBoardState[] = MOCK_CHATS.map(c => ({
  ...c,
  messages: MOCK_CHAT_MESSAGES.filter(m => m.chatId === c.id),
}));
export class ChatBoardEntity extends IndexedEntity<ChatBoardState> {
  static readonly entityName = "chat";
  static readonly indexName = "chats";
  static readonly initialState: ChatBoardState = { id: "", title: "", messages: [] };
  static seedData = SEED_CHAT_BOARDS;
  async listMessages(): Promise<ChatMessage[]> {
    const { messages } = await this.getState();
    return messages;
  }
  async sendMessage(userId: string, text: string): Promise<ChatMessage> {
    const msg: ChatMessage = { id: crypto.randomUUID(), chatId: this.id, userId, text, ts: Date.now() };
    await this.mutate(s => ({ ...s, messages: [...s.messages, msg] }));
    return msg;
  }
}