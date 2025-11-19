Project: TripErly — Copilot / AI assistant guidance

This file contains short, actionable information for AI coding agents to be immediately productive in this repository.

High-level architecture
- Next.js 14 (app router) + TypeScript. Top-level app entry: `app/layout.tsx` (wraps providers and Header).
- UI: Tailwind CSS (`tailwind.config.ts`) and component-first under `components/` and `components/ui-elements/`.
- Auth: Firebase client (in `service/firebase.config.ts`) used in the browser; Firebase Admin is used server-side in `app/api/auth/session/route.ts`.
- Session: Server issues a signed JWT cookie. Server utilities live in `service/session.ts` (uses `jose`). Cookie name: `session` (HttpOnly, Secure, SameSite=Lax, 7d).
- AI & search integrations: Google Generative AI usage in `service/gemini.ts` (expects env var `GEMINI_API_KEY`), and SerpAPI dependency available in `package.json` for search/photo routes under `app/api/serp`.

Auth flow (explicit, follow this when editing auth):
- Client: `context/AuthContext.tsx` signs in with Firebase (Google) and gets an ID token.
- Client POSTs { idToken } to `/api/auth/session` (see `app/api/auth/session/route.ts`).
- Server: `route.ts` verifies ID token with Firebase Admin and creates a session JWT via `service/session.ts` -> sets `Set-Cookie: session=...`.
- When changing session cookie behavior or token payload, update both `service/session.ts` and the server route.

Important files to reference
- `app/api/auth/session/route.ts` — server session creation and cookie settings.
- `service/session.ts` — jwt encrypt/decrypt helpers (server-only). Update `SESSION_SECRET` env handling here.
- `service/gemini.ts` — Gemini chat starter; careful: expects `GEMINI_API_KEY` in environment.
- `service/firebase.config.ts` — firebase client config used in browser.
- `context/AuthContext.tsx` and `context/ToastContext.tsx` — client-side contexts and patterns (uses "use client").
- `app/layout.tsx` — provider order: ToastContext -> AuthContext -> Header -> children. Keep provider order when adding global providers.
- `next.config.mjs` — image domains (update if adding external image sources).

Conventions and patterns (project-specific)
- Use Next.js app-router server components by default; add `"use client"` in files that use browser-only features (contexts, firebase, hooks). Most `context/*.tsx` and many components are client.
- Toast pattern: update `ToastContext` via `setShowToast({ status, type, message })` to show popups. See `components/ui-elements/Toast.tsx`.
- Firebase auth tokens: client must call `/api/auth/session` to exchange ID token for HttpOnly session cookie; do not rely solely on client token for server-side rendering.
- Server-only modules: `service/session.ts` imports `server-only` — keep crypto and secret handling confined to server routes.

Dev/build/test commands
- Run locally: `npm run dev` (uses `next dev`).
- Build: `npm run build`; Start production: `npm run start`.
- Lint: `npm run lint` (Next's ESLint setup).

Environment and secrets
- Required local env vars (examples):
  - `SESSION_SECRET` — used by `service/session.ts` for signing JWTs.
  - `GEMINI_API_KEY` — used by `service/gemini.ts`.
- Repo contains a service account JSON referenced by `app/api/auth/session/sa.json` — the server route currently uses that file for Firebase Admin initialization. If you switch to env-based credentials, update `route.ts` accordingly.

Quick do/don't for edits
- DO update both client and server when changing auth/session shapes.
- DO run the dev server after changing env/secrets (Next caches env on start).
- DON'T expose secrets in client code. Verify any new config is used only in server-only modules or `next.config` publicRuntime if intended.
- When adding external image hosts, also update `next.config.mjs` image domains to avoid runtime image blocking.

Examples to copy/adapt
- Creating a session (server): look at `app/api/auth/session/route.ts` — sets cookie with `Max-Age=604800` (7 days).
- Verifying session (server): use `service/session.ts` -> `decrypt(sessionCookie)` for payload.
- Starting Gemini chat: `service/gemini.ts` demonstrates `model.startChat({ generationConfig, history })`.

If anything here is incomplete or you want more details (auth edge-cases, deployment notes, tests), tell me which area to expand and I will iterate.
