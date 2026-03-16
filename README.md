# Cloudflare Workers React Starter Template

[![Deploy to Cloudflare][![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/zacharyyoung050-del/gamblingguru-retro-casino-hub)]

A production-ready full-stack starter template built on Cloudflare Workers, Pages, and React. Features a modern React frontend with shadcn/ui, Tailwind CSS, Tanstack Query, and a robust backend API powered by Hono with Durable Objects for scalable, stateful data storage (users, chats, messages).

Perfect for building real-time apps like chat applications, dashboards, or any full-stack project leveraging Cloudflare's edge network.

## Features

- **Full-Stack Architecture**: React 18 frontend served via Cloudflare Pages, Hono API on Workers with CORS.
- **Durable Objects for State**: Entity-based storage (Users, ChatBoards) with automatic indexing, pagination, CRUD, and seeding.
- **Modern UI**: shadcn/ui components, Tailwind CSS with custom New York style, dark mode, animations.
- **Data Fetching**: Tanstack Query integration with typed API client.
- **Type-Safe**: Full TypeScript support across frontend, backend, and shared types.
- **Development Workflow**: Vite HMR, hot-reloading API routes, Bun scripts.
- **Production-Ready**: Error boundaries, logging, client error reporting, health checks.
- **Demo Data**: Seeded users, chats, and messages for instant testing.
- **Sidebar Layout**: Optional responsive sidebar with shadcn/ui.
- **Deployment**: One-command deploy to Cloudflare Workers/Pages.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Tanstack Query, React Router, Sonner (toasts), Lucide icons, Framer Motion.
- **Backend**: Cloudflare Workers, Hono, Durable Objects (GlobalDurableObject + IndexedEntity pattern).
- **Data**: In-memory SQLite via Durable Objects (no external DB needed).
- **Tools**: Bun, Wrangler, ESLint, Tailwind Animate.
- **Shared**: TypeScript types and mock data between FE/BE.

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (package manager)
- [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`bunx wrangler@latest login`)
- Cloudflare account (free tier sufficient)

### Installation

1. Clone or download the repo.
2. Install dependencies:

   ```bash
   bun install
   ```

3. Generate Worker types (one-time):

   ```bash
   bun run cf-typegen
   ```

### Development

Start the dev server (frontend + API proxy):

```bash
bun run dev
```

- Frontend: http://localhost:3000 (Vite HMR)
- API: http://localhost:3000/api/* (proxied to Worker)
- Edit `src/pages/HomePage.tsx` for UI, `worker/user-routes.ts` for API routes.

Test API endpoints directly:

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/users
```

### Build & Preview

Build for production:

```bash
bun run build
```

Preview production build:

```bash
bun run preview
```

## API Endpoints

All endpoints follow `{ success: boolean, data?: T, error?: string }` format.

- `GET /api/health` - Health check.
- `GET/POST /api/users` - List/create users (paginated).
- `GET/POST /api/chats` - List/create chats.
- `GET/POST /api/chats/:chatId/messages` - List/add messages.
- `DELETE /api/users/:id`, `POST /api/users/deleteMany` - Delete.
- `DELETE /api/chats/:id`, `POST /api/chats/deleteMany` - Delete.
- `POST /api/client-errors` - Client-side error reporting.

Shared types in `shared/types.ts`. Extend in `worker/entities.ts` and `worker/user-routes.ts`.

## Deployment

### Deploy to Cloudflare

1. Configure `wrangler.jsonc` with your account ID if needed.
2. One-command deploy (builds frontend + deploys Worker):

   ```bash
   bun run deploy
   ```

This deploys:
- Static assets to Cloudflare Pages.
- Worker handles `/api/*` routes.
- Durable Objects auto-migrate via `migrations`.

Or use the button:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/zacharyyoung050-del/gamblingguru-retro-casino-hub)

**Custom Domain**: Set in Cloudflare dashboard post-deploy.

### Environment Variables

Define in `wrangler.jsonc` under `vars` or dashboard:
- No required vars (all config in code).

## Customization

- **Frontend**: Replace `src/pages/HomePage.tsx`. Add routes in `src/main.tsx`.
- **Backend Entities**: Extend `IndexedEntity` in `worker/entities.ts`. Routes auto-available in `worker/user-routes.ts`.
- **UI Components**: Use shadcn/ui (`bunx shadcn@latest add <component>`).
- **Tailwind**: Edit `tailwind.config.js` / `src/index.css`.
- **Theme**: Toggle via `ThemeToggle` hook.
- **Layout**: Use `AppLayout` for sidebar.

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server |
| `bun run build` | Build for prod |
| `bun run preview` | Preview prod build |
| `bun run lint` | Lint code |
| `bun run deploy` | Deploy to Cloudflare |
| `bun run cf-typegen` | Generate Worker types |

## Troubleshooting

- **Worker routes not loading**: Restart dev server.
- **Type errors**: Run `bun run cf-typegen`.
- **Durable Objects**: Data persists across deploys (SQLite-backed).
- **CORS**: Pre-configured for `*`.

## License

MIT License. See [LICENSE](LICENSE) for details.