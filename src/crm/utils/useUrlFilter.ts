// Small wrapper around react-router's useSearchParams that exposes a
// per-key filter API. Empty / "All" / default values are stripped from the URL
// so the URL stays clean when no filters are active.

import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useUrlFilter() {
  const [params, setParams] = useSearchParams();

  const get = useCallback(
    (key: string, fallback = ''): string => params.get(key) ?? fallback,
    [params]
  );

  const set = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params);
      // Strip "neutral" values so the URL stays tidy.
      if (!value || value === 'All') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const clearAll = useCallback(
    (preserve: string[] = []) => {
      const next = new URLSearchParams();
      for (const key of preserve) {
        const v = params.get(key);
        if (v) next.set(key, v);
      }
      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const hasAny = useCallback(
    (keys: string[]): boolean => keys.some((k) => !!params.get(k)),
    [params]
  );

  return { params, get, set, clearAll, hasAny, setParams };
}
