import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Privacy and CRM always open at the top. Marketing home scrolls to a section when the
 * location includes a hash (e.g. after client navigation from /privacy to /#contact).
 * When landing on / from another in-app route without a hash, reset scroll to the top.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef<string | undefined>(undefined);

  useLayoutEffect(() => {
    const previous = prevPathname.current;
    prevPathname.current = pathname;

    if (pathname === '/privacy' || pathname.startsWith('/crm')) {
      window.scrollTo(0, 0);
      return;
    }

    if (pathname === '/' && hash && hash.length > 1) {
      const id = decodeURIComponent(hash.replace(/^#/, ''));
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
      return;
    }

    if (pathname === '/' && previous !== undefined && previous !== '/') {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
