# Elevate Properties Malta

Luxury black-and-gold marketing site for **Elevate Properties Malta**, built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS v4**.

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** 10+

## Local setup

```bash
npm install
```

Copy environment defaults:

```bash
cp .env.example .env.local
```

Edit `.env.local` before launch (forms + optional URL):

```env
VITE_SITE_URL=https://your-production-domain.example
VITE_FORM_PROVIDER=none
# For Formspree:
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/yourFormId
```

## Scripts

| Command           | Purpose                                      |
|-------------------|----------------------------------------------|
| `npm run dev`     | Dev server (default script uses port `3000`) |
| `npm run lint`    | TypeScript check (`tsc --noEmit`)            |
| `npm run build`   | Production build → `dist/`                   |
| `npm run preview` | Preview the production build locally         |

To run on port **5173**:

```bash
npm run dev -- --port 5173 --host 0.0.0.0
```

## Forms (production)

All public submissions go through `src/utils/formSubmission.ts`.

### Recommended: Formspree

1. Create a form at [Formspree](https://formspree.io) and copy the form endpoint.
2. Set:

```env
VITE_FORM_PROVIDER=formspree
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/yourFormId
```

3. Deploy. Payloads include `formType` (`contact`, `valuation`, etc.), timestamps, and field data.

### Netlify Forms

Netlify expects **`data-netlify`** HTML forms at build time. This SPA submits via JavaScript only — either add hidden static forms per Netlify’s docs or POST from serverless functions. Details remain in code comments in `submitForm`.

### EmailJS

Set env vars from `.env.example` and implement `submitToEmailJs` in `formSubmission.ts` using the EmailJS SDK (keys stay out of git).

### Demo mode

With `VITE_FORM_PROVIDER=none`, submissions succeed locally after a short delay. **Do not ship production like this.** UI copy reminds editors to configure env vars.

### CRM mirror (optional)

On successful `contact`, `valuation`, or `viewing` submissions, the app may mirror a lead into browser **`localStorage`** for the internal `/crm/*` demo (`mirrorToCRM` in `formSubmission.ts`). This is **not** shared across devices or with real agents until you add a real backend.

## SEO before launch

Update these to your **live** domain and verified contact details:

- `index.html` — `<title>`, meta description, `canonical`, Open Graph / Twitter URLs, JSON-LD.
- `public/robots.txt` — `Sitemap:` line.
- `public/sitemap.xml` — all `<loc>` values (hash URLs are optional; crawlers mainly use the homepage).
- `src/config/site.ts` — phone, email, social URLs, `domainUrl`.

Favicon: `public/favicon.svg` (referenced from `index.html`).

## Deployment (Netlify & Vercel)

### Build output (both platforms)

| Setting | Value |
|--------|--------|
| **Install command** | `npm install` (default) |
| **Build command** | `npm run build` |
| **Publish / output directory** | **`dist`** (Vite default) |

Repo includes:

- **`netlify.toml`** — Netlify build + SPA fallback to `index.html` (needed for direct visits to `/crm/...`).
- **`vercel.json`** — SPA rewrite so client-side routes resolve after refresh.

### Environment variables (dashboard)

`VITE_*` variables are baked in at **build time**. Set them in the Netlify or Vercel project **Environment variables** UI (Production / Preview as needed), then trigger a new deploy.

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_FORM_PROVIDER` | Recommended | `none` (demo), `formspree`, `netlify`, or `emailjs` |
| `VITE_FORMSPREE_ENDPOINT` | If using Formspree | e.g. `https://formspree.io/f/xxxxx` |
| `VITE_SITE_URL` | Optional | Canonical site URL for future use / docs |
| `VITE_EMAILJS_*` | If using EmailJS | See `.env.example` |

See **Forms** above and `.env.example` for full list.

### Netlify (quick reference)

1. **New site from Git** → pick this repo.  
2. Netlify reads **`netlify.toml`**: build `npm run build`, publish **`dist`**.  
3. **Site configuration → Environment variables**: add `VITE_FORM_PROVIDER`, `VITE_FORMSPREE_ENDPOINT`, etc.  
4. Deploy. Optional: assign custom domain under **Domain management**.

### Vercel (quick reference)

1. **Add New → Project** → import repo.  
2. Framework **Vite** is auto-detected; build **`npm run build`**, output **`dist`**.  
3. **`vercel.json`** adds SPA rewrites for `/crm/*` refreshes.  
4. **Settings → Environment Variables**: add the same `VITE_*` keys.  
5. Redeploy. Optional: **Domains** → add production domain.

### Local production preview

```bash
npm run build
npm run preview
```

## Launch checklist

- [ ] Replace placeholders in `src/config/site.ts`.
- [ ] Set production `VITE_FORM_PROVIDER` + endpoints.
- [ ] Replace example URLs in `index.html`, `robots.txt`, and `sitemap.xml`.
- [ ] Run `npm run lint` and `npm run build`.
- [ ] Smoke-test mobile / tablet / desktop and all nav anchors (`#hero`, `#properties`, `#list-property`, `#about`, `#services`, `#contact`).

## Internal CRM

The `/crm/*` routes provide a separate demo CRM shell (lazy-loaded). It is optional for launch and does not affect the public homepage.
