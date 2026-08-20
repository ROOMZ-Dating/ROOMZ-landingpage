import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api, restoreSession } from "./api/client";
import { clearSession, hasPersistedSession, setSession } from "./auth/session";
import type { BillingStatusOut, TokenResponse, UserProfileOut } from "./api/types";

export type Entitlements = {
  plan: "unlimited" | "per_event";
  canTrends: boolean;
  canPdf: boolean;
  canShareCard: boolean;
  canAggCsv: boolean;
};

/**
 * The single gating source the spec requires — every component derives from
 * this; nothing re-implements the plan table. Server-side enforcement on each
 * endpoint remains the real boundary; this only decides what UI to render.
 */
function deriveEntitlements(billing: BillingStatusOut | null): Entitlements {
  const unlimited = billing?.active_plan === "unlimited_plan";
  return {
    plan: unlimited ? "unlimited" : "per_event",
    canTrends: unlimited,
    canPdf: unlimited,
    canShareCard: unlimited,
    canAggCsv: unlimited,
  };
}

type AuthState = {
  /** false until session restore has been attempted once on load. */
  ready: boolean;
  user: UserProfileOut | null;
  billing: BillingStatusOut | null;
  entitlements: Entitlements;
  /** Called by the login flow after a successful OTP verify. */
  completeSignIn: (tokens: TokenResponse) => Promise<UserProfileOut>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<UserProfileOut | null>(null);
  const [billing, setBilling] = useState<BillingStatusOut | null>(null);

  const loadAccount = useCallback(async () => {
    const me = await api.me();
    setUser(me);
    if (me.is_organizer) {
      setBilling(await api.billing());
    }
    return me;
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (hasPersistedSession() && (await restoreSession())) {
        try {
          await loadAccount();
        } catch {
          clearSession();
        }
      }
      if (alive) setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, [loadAccount]);

  const completeSignIn = useCallback(
    async (tokens: TokenResponse) => {
      setSession(tokens.access_token, tokens.refresh_token);
      return loadAccount();
    },
    [loadAccount],
  );

  const signOut = useCallback(async () => {
    try {
      await api.logout();
    } catch {
      // Server-side revocation failing shouldn't trap the user in a session.
    }
    clearSession();
    setUser(null);
    setBilling(null);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      user,
      billing,
      entitlements: deriveEntitlements(billing),
      completeSignIn,
      signOut,
    }),
    [ready, user, billing, completeSignIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth outside AuthProvider");
  return ctx;
}

export function useOrganizerEntitlements(): Entitlements {
  return useAuth().entitlements;
}
