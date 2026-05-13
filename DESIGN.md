# Elevate Properties Malta: design system (marketing site)

## Brand

- **Primary identity:** Elevate Properties Malta (public-facing legal and SEO lead).
- **Trust and network partners:** **ZANZI** and **QUICK LETS**; the site may present as **Elevate by ZANZI & QUICK LETS** where visually appropriate.
- **Network context:** **Quick Lets** (also written Quicklets in some collateral) appears where lettings or network reach is relevant; use **restrained purple** (existing Quick Lets cues) sparingly, never as a second primary palette competing with Zanzi blue.

## Mood

- Cinematic, premium, **Maltese luxury real estate**: boutique scale, trustworthy, calm confidence.
- Editorial restraint: one visual story leads (hero), lower sections support action without competing noise.

## Colour

- **Matte blacks / charcoals:** deep shell `#070809`–`#0b0d11`, layered for depth (avoid flat single `#000` fields).
- **Deep navy:** section shifts toward `#080a10`–`#0a0c12` with subtle cool bias.
- **Silver–white typography:** `#f3f3f3` / `#e8eaee` hierarchy on headings; body `#b8b8b8`–`#c9ced6`.
- **Zanzi blue accent:** `#009FE3` for focus rings, hover borders, key CTAs, thin accent lines (note: Tailwind `brand-copper` token is mapped to this blue in code).
- **Avoid:** warm gold/bronze decorative ramps, neon glow, rainbow gradients, heavy “SaaS card” shadows.

## UI principles

- **Minimal, refined, high contrast:** fewer boxes; prefer borders and spacing over fills.
- **No cheap glassmorphism:** blur only where it aids legibility over imagery; otherwise matte panels with thin `border-white/[0.06–0.12]`.
- **No clutter:** limit uppercase micro-labels; prefer short sentence case or restrained small caps with generous tracking only where needed.
- **Cards:** luxury listing cards use **image-first hierarchy**, thin frame, soft shadow, **gentle image zoom** on hover (no aggressive lift on layout).
- **Separators:** subtle `border-t`, hairline blue gradients, or `divide-*` between peers; avoid chunky section breaks.

## Typography

- **Headings:** Playfair (serif), controlled tracking, not oversized poster type on body sections.
- **UI / labels:** Inter (sans), readable sizes on mobile (avoid `9px` labels in dense forms where possible).
- **Hierarchy:** clear title → supporting line → action; avoid duplicating the hero brand block outside the hero.

## Components

- **Primary CTA:** reuse `.epm-btn-primary` patterns: dark panel, silver type, blue hover border/glow restrained.
- **Inputs:** dark fill `brand-panel` / near-black, `border-white/12`, **focus:** blue border `rgba(0,159,227,0.45–0.55)`.
- **Trust strip:** editorial single band, dividers, **few or no icons** on the default homepage strip.
- **Services:** differentiated from property cards: **stacked editorial rows** or asymmetric layout, not the same rounded icon-card grid as listings.

## Motion

- **Slow, subtle:** `opacity` + short `y` reveals in view; ease `[0.22, 1, 0.36, 1]` (or CSS `ease-out`).
- **Hover:** border / shadow / **image scale ≤ 1.04**; no bounce, no layout-shift hover.
- Respect **`prefers-reduced-motion`** where motion components are used.

## Responsiveness

- **Desktop (1920):** max-width containers (`max-w-7xl` / `max-w-6xl` where appropriate), no wasted ultra-wide stretch.
- **Laptop / tablet:** grids collapse to 2 then 1 column; maintain tap targets ≥ 44px.
- **Mobile:** no horizontal overflow; forms single column; hero search stacking preserved; intentional horizontal scroll **only** for narrow feature strips if needed.

## Anti-patterns (explicit)

- Generic SaaS marketing template (repeated three-icon feature rows).
- Black corporate slabs with no depth or separation.
- Over-blurred panels and duplicated glass cards section-to-section.
- Excessive uppercase `tracking-[0.35em]` labels on every block.

---

*This file complements `PRODUCT.md`. Update when the public marketing UI shifts materially.*
