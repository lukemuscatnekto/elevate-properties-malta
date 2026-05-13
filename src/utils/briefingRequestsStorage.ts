export const BRIEFING_REQUESTS_STORAGE_KEY = 'elevate_briefing_requests';

export type BriefingRequestRecord = {
  name: string;
  email: string;
  timestamp: string;
};

function readAll(): BriefingRequestRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BRIEFING_REQUESTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r): r is BriefingRequestRecord =>
        r != null &&
        typeof r === 'object' &&
        typeof (r as BriefingRequestRecord).name === 'string' &&
        typeof (r as BriefingRequestRecord).email === 'string' &&
        typeof (r as BriefingRequestRecord).timestamp === 'string',
    );
  } catch {
    return [];
  }
}

/** Appends one briefing opt-in record to the JSON array in localStorage. */
export function appendBriefingRequest(record: { name: string; email: string }): void {
  if (typeof window === 'undefined') return;
  const next: BriefingRequestRecord = {
    name: record.name.trim(),
    email: record.email.trim().toLowerCase(),
    timestamp: new Date().toISOString(),
  };
  const all = readAll();
  all.push(next);
  try {
    localStorage.setItem(BRIEFING_REQUESTS_STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* quota / private mode */
  }
}
