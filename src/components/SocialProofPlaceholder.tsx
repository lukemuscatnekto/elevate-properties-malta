/**
 * =============================================================================
 * TODO — Social proof (blocked until verifiable content exists)
 * =============================================================================
 *
 * CONTEXT (audit 2026-05):
 * - `PRODUCT.md` documents brand purpose, ZANZI & Quick Lets network context,
 *   and trust-through-restraint — but NO named client quotes, NO press/awards,
 *   NO verifiable sales/transactions statistics, and NO documented advisory
 *   price floor/ceiling for public copy.
 * - `DESIGN.md` aligns with the same network partners; no additional numbers.
 * - `PremiumTrustStrip.tsx` is ALREADY rendered on the homepage (immediately
 *   after `<Hero />` in `App.tsx`) and surfaces ZANZI franchise + Quick Lets
 *   network among other editorial cells — do not duplicate that as Option A.
 *
 * WHEN CONTENT IS READY — pick ONE implementation path (do not stack fakery):
 *
 * (1) Option B — Single client quote (only if real)
 *     - Add a short quote + attribution approved in writing (e.g. first name
 *       + property type, or full name with consent) to `PRODUCT.md` or a
 *       dedicated `src/data/socialProof.ts` module.
 *     - Implement a minimal blockquote section component (serif quote, small-caps
 *       attribution) matching DESIGN.md: matte `#070809`, thin borders, motion
 *       optional with `useReducedMotion`.
 *     - PLACEMENT (choose one): in `App.tsx`, either
 *       (a) after `<AudienceIntentPaths />` and before `<FeaturedProperties />`, or
 *       (b) after `<FeaturedProperties />` and before `<MarketBriefingOptIn />`
 *       / briefing-adjacent content — whichever reads better in scroll tests.
 *     - Remove this placeholder file or replace its default export with the
 *       new component and import it from `App.tsx` (and intro mockup if parity
 *       is required).
 *
 * (2) Option C — Advisory range line (only if accurate + documented)
 *     - Add the exact approved range and geography line to `PRODUCT.md` (e.g.
 *       "Advisory range: €X – €Y · Malta & Gozo") so marketing and legal share
 *       one source of truth.
 *     - Implement a single quiet editorial line (no stats grid) in the same
 *       placement options as (1).
 *
 * (3) Option A — NOT APPLICABLE while `PremiumTrustStrip` remains the network
 *     affiliation surface on the homepage unless product explicitly wants a
 *     second, non-redundant treatment (e.g. logo lockup strip only — still avoid
 *     duplicating copy already in the trust strip).
 *
 * DO NOT ship: invented testimonials, unnamed quotes, star ratings, review
 * platform badges, or numeric claims not backed by `PRODUCT.md` or confirmed
 * real data.
 * =============================================================================
 */

/**
 * Intentionally renders nothing. Import and use the real social proof
 * component once Option B or C content exists and is documented.
 */
export default function SocialProofPlaceholder() {
  return null;
}
