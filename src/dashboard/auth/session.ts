/**
 * Access token lives in memory only. The refresh token is persisted so a
 * returning organizer skips straight to /dashboard.
 *
 * INTERIM: persistence is localStorage. The dashboard spec's end state is an
 * httpOnly cookie set by the backend (which today returns the refresh token in
 * the JSON body and accepts it in request bodies — no cookie support yet).
 * When that backend work lands, delete this storage adapter and the
 * refresh_token plumbing in api/client.ts: the cookie rides along on
 * credentialed requests and nothing needs to be stored client-side.
 */

const REFRESH_KEY = "roomz_dash_rt";

let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setSession(access: string, refresh: string): void {
  accessToken = access;
  try {
    localStorage.setItem(REFRESH_KEY, refresh);
  } catch {
    // Storage unavailable (private mode) — session just won't survive reloads.
  }
}

export function getRefreshToken(): string | null {
  try {
    return localStorage.getItem(REFRESH_KEY);
  } catch {
    return null;
  }
}

export function clearSession(): void {
  accessToken = null;
  try {
    localStorage.removeItem(REFRESH_KEY);
  } catch {
    // ignore
  }
}

/** True if a previous visit left a refresh token to try restoring from. */
export function hasPersistedSession(): boolean {
  return getRefreshToken() !== null;
}
