/** In-page hashes from routes other than `/` must include `/` so the browser loads the marketing shell. */
export function anchorHref(pathname: string, hash: string) {
  if (!hash.startsWith('#')) return hash;
  return pathname === '/' ? hash : `/${hash}`;
}
