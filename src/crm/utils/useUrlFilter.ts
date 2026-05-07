import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Thin wrapper around useSearchParams for filter state.
 * Strips 'All' and empty values so the URL stays clean.
 */
export function useUrlFilter() {
  const [params, setParams] = useSearchParams();

  const get = useCallback(
    (key: string, fallback = '') => params.get(key) ?? fallback,
    [params],
  );

  const set = useCallback(
    (key: string, value: string) => {
      setParams(prev => {
        const next = new URLSearchParams(prev);
        if (!value || value === 'All') {
          next.delete(key);
        } else {
          next.set(key, value);
        }
        return next;
      }, { replace: true });
    },
    [setParams],
  );

  const clearAll = useCallback(
    (preserve: string[] = []) => {
      setParams(prev => {
        const next = new URLSearchParams();
        preserve.forEach(k => {
          const v = prev.get(k);
          if (v) next.set(k, v);
        });
        return next;
      }, { replace: true });
    },
    [setParams],
  );

  const hasAny = useCallback(
    (keys: string[]) => keys.some(k => !!params.get(k)),
    [params],
  );

  return { get, set, clearAll, hasAny, params };
}
