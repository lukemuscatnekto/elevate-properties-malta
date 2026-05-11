/**
 * Builds same-route hash links for in-page sections.
 *
 * - On `/`, returns the hash alone (e.g. `#contact`) so anchors behave like normal fragment navigation.
 * - On any other path (e.g. `/intro-preview`), prefixes that path so CTAs stay on the current route
 *   (e.g. `/intro-preview#contact` instead of incorrectly jumping to `/#contact`).
 */
export function anchorHref(pathname: string, hash: string) {
  if (!hash.startsWith('#')) return hash;

  const base = pathname.replace(/\/+$/, '') || '/';
  if (base === '/') return hash;

  return `${base}${hash}`;
}
