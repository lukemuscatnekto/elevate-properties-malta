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

Edit `.env.local` before launch (forms + optional URL). **All `VITE_*` vars are inlined at build time** — redeploy after every change.

| Variable | Values | Purpose |
|---------|--------|--------|
| `VITE_SITE_URL` | `https://elevatepropertiesmalta.com` (see `.env.example`) | Optional reference URL (documented here for ops consistency). |
| `VITE_FORM_PROVIDER` | **`formspree`** (production), **`none`** (browser demo only), **`netlify`**, **`emailjs`** | Wired in `src/utils/formSubmission.ts`. |
| `VITE_FORMSPREE_ENDPOINT` | `https://formspree.io/f/xxxxxxx` | **Required** when `VITE_FORM_PROVIDER=formspree`. Placeholders like `PASTE_FORMSPREE…` are rejected until replaced. |

```env
VITE_SITE_URL=https://elevatepropertiesmalta.com
VITE_FORM_PROVIDER=formspree
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

### Create `.env.local` (local machine)

1. From the project root: `cp .env.example .env.local` (Windows: `copy .env.example .env.local`).
2. Edit **`.env.local`** (never commit it — it should stay in `.gitignore`).
3. Set **`VITE_FORM_PROVIDER=formspree`** and paste your real **`VITE_FORMSPREE_ENDPOINT`** from Formspree.
4. **Restart** `npm run dev` so Vite reloads env vars.

### Test forms locally

1. With **Formspree** env set, run `npm run dev`, open the site, submit **Contact**, **List property**, and a **Viewing** from a featured listing modal.
2. Confirm the submission appears in your Formspree dashboard / notification inbox. Payloads include **`formType`**, **`pageUrl`**, and (when the browser sends it) **`referrer`**.
3. With **`VITE_FORM_PROVIDER=none`**, submits succeed in-browser only (no email) — useful for layout checks without burning Formspree quota.

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

All public submissions go through **`src/utils/formSubmission.ts`** (`submitForm`). Three flows share one optional **Formspree** endpoint:

| `formType` | UI | Typical fields POSTed |
|------------|-----|----------------------|
| `contact` | `#contact` enquiry | `name`, `email`, `phone`, `type`, `budget`, `message`, `pageUrl`, optional `referrer`, `subject`, timestamps |
| `valuation` | `#list-property` confidential briefing | `name`, `email`, `phone`, `location`, `message`, `pageUrl`, optional `referrer`, `subject`, timestamps |
| `viewing` | Property modal — private viewing | `name`, `email`, `phone`, `message`, `propertyTitle`, `propertyId`, `propertyPrice`, `propertyLocation`, `pageUrl`, optional `referrer`, `subject`, timestamps |

`message` is always a string (auto-filled when the visitor leaves the notes box empty on valuation/viewing). Spam: honeypot **`_gotcha`** (must stay empty). Tripped honeypots are dropped client-side without CRM mirroring.

### Formspree (recommended)

1. Sign up at [Formspree](https://formspree.io), create **one** form, open **Installation** → use the **endpoint URL** (`https://formspree.io/f/xxxxxxxx`).
2. **Netlify / Vercel** — add environment variables (**Production**, and Preview if needed), then **redeploy**:

```env
VITE_FORM_PROVIDER=formspree
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

   (`VITE_*` are inlined by Vite at **build time** — a config-only change requires a new build.)

3. In Formspree, enable spam filtering / notification email as needed. Incoming JSON includes `subject` (human-readable summary) plus `formType` for inbox rules.

4. Smoke-test **all three forms** after deploy (especially the listing modal viewing flow).

### Netlify Forms

Netlify expects **`data-netlify`** HTML forms at build time. This SPA submits via JavaScript only — either add hidden static forms per Netlify’s docs or POST from serverless functions. Details remain in code comments in `submitForm`.

### EmailJS

Set env vars from `.env.example` and implement `submitToEmailJs` in `formSubmission.ts` using the EmailJS SDK (keys stay out of git).

### Demo mode (`VITE_FORM_PROVIDER=none`)

Submissions resolve in the browser only (no outbound email). **Do not ship production like this.** The dev toolbar may still hint to configure env vars.

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
| `VITE_FORM_PROVIDER` | Recommended | `formspree` (live), `none` (local demo), `netlify`, or `emailjs` |
| `VITE_FORMSPREE_ENDPOINT` | If using Formspree | `https://formspree.io/f/xxxxx` (must be HTTPS on `formspree.io` / `formspree.com`) |
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

- [x] Business email **`info@elevatepropertiesmalta.com`** is set in `src/config/site.ts` and `index.html` JSON-LD (`email`).
- [ ] Add **`instagramUrl`**, **`facebookUrl`**, **`linkedinUrl`** HTTPS URLs to `site.ts`, or leave empty to keep icons hidden with the documented note.
- [ ] Set **`VITE_FORM_PROVIDER=formspree`** + **`VITE_FORMSPREE_ENDPOINT`** on the host, redeploy; verify contact, valuation, and viewing emails in Formspree.
- [ ] Audit **`address`** in `site.ts` / JSON-LD for accurate disclosure rules.
- [ ] Run `npm run lint` and `npm run build`.
- [ ] Smoke-test mobile / tablet / desktop and anchors: `#hero`, `#properties`, `#about`, `#services`, `#trust`, `#contact`, `#list-property`.

Public domain is **`elevatepropertiesmalta.com`** in `index.html`, `robots.txt`, `sitemap.xml`, and `site.ts` (`domainUrl`). Primary phone (**Nico Dalton**) **`+356 9981 6646`** is in JSON-LD and `siteConfig`. Internal CRM fixtures under `src/crm/data/*` remain fictitious demo data only.

## Internal CRM

The `/crm/*` routes provide a separate demo CRM shell (lazy-loaded). It is optional for launch and does not affect the public homepage.
