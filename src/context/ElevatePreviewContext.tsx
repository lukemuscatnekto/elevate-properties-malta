import { createContext, useContext } from 'react';

/** True only inside `/intro-preview` — shared sections read this to apply additive styling without affecting `/`. */
export const ElevatePreviewContext = createContext(false);

export function useElevatePreviewMode(): boolean {
  return useContext(ElevatePreviewContext);
}
