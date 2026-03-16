import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity, CasinoEntity, ArticleEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  if ((globalThis as any).userRoutesAdded) return;
  (globalThis as any).userRoutesAdded = true;

  // CASINOS
  app.get('/api/casinos', async (c) => {
    try {
      await CasinoEntity.ensureSeed(c.env);
      const cq = c.req.query('cursor');
      const lq = c.req.query('limit');
      const page = await CasinoEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
      return ok(c, page);
    } catch (err) {
      console.error('Failed to list casinos:', err);
      return bad(c, 'Failed to fetch platform data');
    }
  });
  app.get('/api/casinos/:id', async (c) => {
    const id = c.req.param('id');
    try {
      const casino = new CasinoEntity(c.env, id);
      if (!await casino.exists()) return notFound(c, 'Platform not found');
      const state = await casino.getState();
      return ok(c, state);
    } catch (err) {
      console.error(`Failed to fetch casino ${id}:`, err);
      return bad(c, 'Critical platform error');
    }
  });
  // ARTICLES
  app.get('/api/articles', async (c) => {
    try {
      await ArticleEntity.ensureSeed(c.env);
      const cq = c.req.query('cursor');
      const lq = c.req.query('limit');
      const page = await ArticleEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
      return ok(c, page);
    } catch (err) {
      console.error('Failed to list articles:', err);
      return bad(c, 'Failed to fetch executive insights');
    }
  });
  app.get('/api/articles/:id', async (c) => {
    const id = c.req.param('id');
    try {
      const article = new ArticleEntity(c.env, id);
      if (!await article.exists()) return notFound(c, 'Insight report not found');
      const state = await article.getState();
      return ok(c, state);
    } catch (err) {
      console.error(`Failed to fetch article ${id}:`, err);
      return bad(c, 'Critical insight error');
    }
  });
  // USERS
  app.get('/api/users', async (c) => {
    try {
      await UserEntity.ensureSeed(c.env);
      const cq = c.req.query('cursor');
      const lq = c.req.query('limit');
      const page = await UserEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
      return ok(c, page);
    } catch (err) {
      return bad(c, 'System user retrieval failure');
    }
  });
  // CHATS
  app.get('/api/chats', async (c) => {
    try {
      await ChatBoardEntity.ensureSeed(c.env);
      const cq = c.req.query('cursor');
      const lq = c.req.query('limit');
      const page = await ChatBoardEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
      return ok(c, page);
    } catch (err) {
      return bad(c, 'Community link unstable');
    }
  });
  app.get('/api/chats/:chatId/messages', async (c) => {
    try {
      const chat = new ChatBoardEntity(c.env, c.req.param('chatId'));
      if (!await chat.exists()) return notFound(c, 'Feed not found');
      const msgs = await chat.listMessages();
      return ok(c, msgs);
    } catch (err) {
      return bad(c, 'Feed synchronization failed');
    }
  });
  app.post('/api/chats/:chatId/messages', async (c) => {
    try {
      const chatId = c.req.param('chatId');
      const { userId, text } = (await c.req.json()) as { userId?: string; text?: string };
      if (!isStr(userId) || !text?.trim()) return bad(c, 'Payload invalid');
      const chat = new ChatBoardEntity(c.env, chatId);
      if (!await chat.exists()) return notFound(c, 'Feed destination invalid');
      const msg = await chat.sendMessage(userId, text.trim());
      return ok(c, msg);
    } catch (err) {
      return bad(c, 'Transmission failure');
    }
  });
}