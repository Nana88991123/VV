# AGENTS.md

## Project Overview
Vue 3 + Vite e-commerce demo (Traditional Chinese UI - write user-facing text in Chinese). Single package, no monorepo.

## Dev Commands
- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build

**No lint, typecheck, or test commands exist.** Verification = build passing + manual check in dev server.

## Architecture
- **Entry:** `src/main.js` → `src/App.vue`
- **Router:** `src/router/index.js` - Vue Router with history mode; admin routes are lazy-loaded children of `/admin`
- **State:** Pinia stores in `src/stores/` (auth, cart, products), Options-style `defineStore`
- **Views:** `src/views/` (public) and `src/views/admin/` (protected)

## Key Gotchas

### Component style: Options API
Nearly every `.vue` file uses **Options API** (`export default { data() {}, methods: {} }`). The only `<script setup>` file is the unused scaffold `src/components/HelloWorld.vue`. Write new code in Options API to match.

### Data sources vs API proxy
- All product/report data is static JSON in `public/data/`, fetched as `/data/products.json` and `/data/sales.json`.
- The Vite proxy (`/api` → hardcoded `http://192.168.100.31:8000` in `vite.config.js`) is used only by `LoginView.vue` (`POST /api/login`). If the backend isn't reachable, login fails; if backend moves, update the proxy target.

### Auth guard
`router.beforeEach` gates routes with `meta.requiresAuth` on the mere presence of a `localStorage.getItem('token')` string — no real validation. Note: the branch meant to redirect logged-in users away from `/login` checks `to.path==='login'` (missing leading `/`), so it never fires.

### Misspelled names are load-bearing
These typos are real and referenced everywhere - do not "fix" them without updating all imports/routes:
- `ProductDerailView.vue` (= Detail) , route name `productdetai`
- `DashbordView.vue`
- Store getter `getProductByCategroy`, state flag `isLoding`

### Dead files & stray dirs
- `src/views/ProductManageView - 333.vue` and `ReportsView222.vue` are backups not referenced by the router - edit the routed originals instead.
- Root `App.vue/` is an empty stray directory; the real root component is `src/App.vue`.

### Case-sensitive import bug
`src/router/index.js:8` imports `../Views/AboutView.vue` (capital V) - works on Windows, breaks on case-sensitive OS/Linux builds. All other imports use lowercase `../views/`.

### Bootstrap
Bootstrap 5 CSS + JS and bootstrap-icons are imported globally in `src/main.js`. Use Bootstrap classes directly in templates.
