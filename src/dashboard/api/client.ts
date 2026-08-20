import {
  ApiError,
  type BillingStatusOut,
  type RoomAnalyticsOut,
  type RoomOut,
  type TokenResponse,
  type UserProfileOut,
} from "./types";
import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  setSession,
} from "../auth/session";
import { mockApi } from "./mock";

/**
 * Three states, resolved at build time:
 *  - VITE_API_URL set        → real backend, any build.
 *  - unset, dev server       → the fixture backend, so the dashboard is fully
 *                              exercisable before the real API is deployed.
 *  - unset, production build → NOT mock: fake logins must never work on the
 *                              live domain. The login page shows a "not live
 *                              yet" notice until the env var is configured.
 */
const API_URL: string | undefined = import.meta.env.VITE_API_URL;
export const MOCK_MODE = import.meta.env.DEV && !API_URL;
export const API_CONFIGURED = Boolean(API_URL) || MOCK_MODE;

const BASE = `${API_URL ?? ""}/api/v1`;

async function rawRequest<T>(
  path: string,
  init: RequestInit = {},
  auth = true,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };
  const token = getAccessToken();
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...init, headers });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      if (typeof body?.detail === "string") detail = body.detail;
    } catch {
      // Non-JSON error body — statusText is fine.
    }
    throw new ApiError(res.status, detail);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

let refreshing: Promise<boolean> | null = null;

/** One refresh at a time — parallel 401s share the same attempt. */
async function tryRefresh(): Promise<boolean> {
  refreshing ??= (async () => {
    const rt = getRefreshToken();
    if (!rt) return false;
    try {
      const t = await rawRequest<TokenResponse>(
        "/auth/refresh",
        { method: "POST", body: JSON.stringify({ refresh_token: rt }) },
        false,
      );
      setSession(t.access_token, t.refresh_token);
      return true;
    } catch {
      clearSession();
      return false;
    } finally {
      refreshing = null;
    }
  })();
  return refreshing;
}

/** Authenticated request: on 401, refresh once and retry once. */
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  try {
    return await rawRequest<T>(path, init);
  } catch (e) {
    if (e instanceof ApiError && e.status === 401 && (await tryRefresh())) {
      return rawRequest<T>(path, init);
    }
    throw e;
  }
}

const realApi = {
  sendOtp: (email: string) =>
    rawRequest<void>("/auth/otp/send", { method: "POST", body: JSON.stringify({ email }) }, false),

  verifyOtp: (email: string, code: string) =>
    rawRequest<TokenResponse>(
      "/auth/otp/verify",
      { method: "POST", body: JSON.stringify({ email, code }) },
      false,
    ),

  refresh: async (): Promise<TokenResponse> => {
    const rt = getRefreshToken();
    if (!rt) throw new ApiError(401, "No session");
    return rawRequest<TokenResponse>(
      "/auth/refresh",
      { method: "POST", body: JSON.stringify({ refresh_token: rt }) },
      false,
    );
  },

  logout: async (): Promise<void> => {
    const rt = getRefreshToken();
    if (!rt) return;
    await rawRequest<void>(
      "/auth/logout",
      { method: "POST", body: JSON.stringify({ refresh_token: rt }) },
      false,
    );
  },

  me: () => request<UserProfileOut>("/users/me"),
  billing: () => request<BillingStatusOut>("/payments/me"),
  myRooms: () => request<RoomOut[]>("/rooms/me"),
  room: (roomId: string) => request<RoomOut>(`/rooms/${roomId}`),
  roomAnalytics: (roomId: string) =>
    request<RoomAnalyticsOut>(
      `/rooms/${roomId}/analytics?include=funnel,timeline,demographics,join_source,peak_hours`,
    ),
};

export const api = MOCK_MODE ? mockApi : realApi;

/** Restore a previous session; resolves false when there is none or it expired. */
export async function restoreSession(): Promise<boolean> {
  if (!getRefreshToken()) return false;
  try {
    const t = await api.refresh();
    setSession(t.access_token, t.refresh_token);
    return true;
  } catch {
    clearSession();
    return false;
  }
}
