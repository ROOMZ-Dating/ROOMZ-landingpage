import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Wordmark from "@/components/Wordmark";
import StoreBadges from "@/components/ui/StoreBadges";
import { api, API_CONFIGURED, MOCK_MODE } from "../api/client";
import { ApiError } from "../api/types";
import { track } from "../analytics";
import { useAuth } from "../state";

const CODE_LENGTH = 6;
const EXPIRY_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 3;
const LOCKOUT_MS = 60 * 1000;

type Step = "email" | "verify" | "no-account" | "not-organizer";

/** 1-second tick while any countdown is visible. */
function useNow(active: boolean): number {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [active]);
  return now;
}

export default function LoginPage() {
  const { ready, user, completeSignIn } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [expiresAt, setExpiresAt] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  const now = useNow(step === "verify");
  const expired = step === "verify" && now >= expiresAt;
  const lockedFor = Math.max(0, Math.ceil((lockedUntil - now) / 1000));
  const locked = lockedFor > 0;
  const inputsDisabled = busy || expired || locked;

  // A live session skips the whole flow (spec: session persistence).
  if (ready && user?.is_organizer) return <Navigate to="/dashboard" replace />;

  // Production build with no API configured: an honest notice beats a login
  // form whose "Send code" can only ever fail.
  if (!API_CONFIGURED) {
    return (
      <div className="flex min-h-screen flex-col items-center bg-white px-6 pt-20">
        <a href="/" aria-label="Roomz home">
          <Wordmark height={26} />
        </a>
        <div className="mt-10 w-full max-w-sm text-center">
          <h1 className="font-display text-[26px] font-bold leading-tight text-ink">
            The organizer dashboard isn't live yet.
          </h1>
          <p className="mt-3 text-[15px] leading-[24px] text-ink-muted">
            Organizer login is coming soon. In the meantime, manage your rooms
            in the Roomz app.
          </p>
          <a
            href="/"
            className="mt-6 inline-block text-[14px] font-semibold text-brand underline-offset-4 hover:underline"
          >
            Back to roomzdating.com
          </a>
        </div>
      </div>
    );
  }

  async function sendCode() {
    setBusy(true);
    setError(null);
    try {
      await api.sendOtp(email.trim());
      setDigits(Array(CODE_LENGTH).fill(""));
      setAttempts(0);
      setLockedUntil(0);
      setExpiresAt(Date.now() + EXPIRY_MS);
      setStep("verify");
      window.setTimeout(() => boxes.current[0]?.focus(), 50);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Couldn't send the code. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function submitCode(code: string) {
    setBusy(true);
    setError(null);
    try {
      const tokens = await api.verifyOtp(email.trim(), code);
      if (tokens.is_new_user) {
        setStep("no-account");
        return;
      }
      const me = await completeSignIn(tokens);
      if (!me.is_organizer) {
        setStep("not-organizer");
        return;
      }
      track("web_dashboard_login");
      navigate("/dashboard", { replace: true });
    } catch (e) {
      const wrongCode = e instanceof ApiError && (e.status === 400 || e.status === 401);
      const failed = attempts + 1;
      setAttempts(failed);
      setDigits(Array(CODE_LENGTH).fill(""));
      if (failed >= MAX_ATTEMPTS) {
        setLockedUntil(Date.now() + LOCKOUT_MS);
        setError(null);
      } else {
        setError(wrongCode ? "That code isn't right. Try again." : "Something went wrong. Try again.");
        window.setTimeout(() => boxes.current[0]?.focus(), 50);
      }
    } finally {
      setBusy(false);
    }
  }

  function setDigit(i: number, raw: string) {
    const val = raw.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < CODE_LENGTH - 1) boxes.current[i + 1]?.focus();
    const code = next.join("");
    if (code.length === CODE_LENGTH && !next.includes("")) void submitCode(code);
  }

  function onKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      boxes.current[i - 1]?.focus();
    }
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!text) return;
    e.preventDefault();
    const next = Array(CODE_LENGTH)
      .fill("")
      .map((_, i) => text[i] ?? "");
    setDigits(next);
    boxes.current[Math.min(text.length, CODE_LENGTH - 1)]?.focus();
    if (text.length === CODE_LENGTH) void submitCode(text);
  }

  const shell = (children: React.ReactNode) => (
    <div className="flex min-h-screen flex-col items-center bg-white px-6 pt-20">
      <a href="/" aria-label="Roomz home">
        <Wordmark height={26} />
      </a>
      <div className="mt-10 w-full max-w-sm">{children}</div>
      {MOCK_MODE && (
        <p className="mt-8 max-w-sm text-center text-[12px] text-ink-light">
          Demo mode — no backend connected. Any email works; any 6-digit code
          verifies (000000 always fails).
        </p>
      )}
    </div>
  );

  if (step === "no-account") {
    return shell(
      <div className="text-center">
        <h1 className="font-display text-[26px] font-bold leading-tight text-ink">
          No Roomz account found for this email.
        </h1>
        <p className="mt-3 text-[15px] leading-[24px] text-ink-muted">
          Download the app to get started — accounts are created in the Roomz app.
        </p>
        <StoreBadges className="mt-6 justify-center" />
        <button
          type="button"
          onClick={() => setStep("email")}
          className="mt-8 text-[14px] font-semibold text-brand underline-offset-4 hover:underline"
        >
          Try a different email
        </button>
      </div>,
    );
  }

  if (step === "not-organizer") {
    return shell(
      <div className="text-center">
        <h1 className="font-display text-[26px] font-bold leading-tight text-ink">
          This dashboard is for event organizers.
        </h1>
        <p className="mt-3 text-[15px] leading-[24px] text-ink-muted">
          Your account is a guest account. Become an organizer in the Roomz app,
          then come back here.
        </p>
        <StoreBadges className="mt-6 justify-center" />
        <button
          type="button"
          onClick={() => setStep("email")}
          className="mt-8 text-[14px] font-semibold text-brand underline-offset-4 hover:underline"
        >
          Use a different account
        </button>
      </div>,
    );
  }

  if (step === "verify") {
    return shell(
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          const code = digits.join("");
          if (code.length === CODE_LENGTH) void submitCode(code);
        }}
      >
        <h1 className="text-center font-display text-[26px] font-bold leading-tight text-ink">
          Check your email
        </h1>
        <p className="mt-2 text-center text-[14px] text-ink-muted">
          We sent a 6-digit code to <span className="font-semibold text-ink">{email}</span>.
        </p>

        {expired && (
          <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-[13px] font-semibold text-red-700">
            This code has expired.
          </div>
        )}
        {locked && (
          <div role="alert" aria-live="polite" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-[13px] font-semibold text-red-700">
            Too many attempts. Try again in {lockedFor}s.
          </div>
        )}
        {error && !expired && !locked && (
          <p role="alert" className="mt-5 text-center text-[13px] font-semibold text-red-600">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-center gap-2.5">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (boxes.current[i] = el)}
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              aria-label={`Digit ${i + 1} of ${CODE_LENGTH}`}
              value={digit}
              disabled={inputsDisabled}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              onPaste={onPaste}
              className="h-14 w-11 rounded-xl border border-line text-center text-[22px] font-bold text-ink transition-colors focus:border-brand disabled:bg-surface disabled:text-ink-light"
            />
          ))}
        </div>

        <div className="mt-6 text-center">
          {!locked && (
            <button
              type="button"
              onClick={() => void sendCode()}
              disabled={busy}
              className="text-[14px] font-semibold text-brand underline-offset-4 hover:underline disabled:opacity-50"
            >
              Resend code
            </button>
          )}
          <button
            type="button"
            onClick={() => setStep("email")}
            className="mt-3 block w-full text-[13px] text-ink-muted hover:text-ink"
          >
            Use a different email
          </button>
        </div>
      </form>,
    );
  }

  return shell(
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        if (email.trim()) void sendCode();
      }}
    >
      <h1 className="text-center font-display text-[26px] font-bold leading-tight text-ink">
        Organizer login
      </h1>
      <p className="mt-2 text-center text-[14px] text-ink-muted">
        View analytics and reports for your rooms. Rooms are created in the app.
      </p>

      {error && (
        <p role="alert" className="mt-5 text-center text-[13px] font-semibold text-red-600">
          {error}
        </p>
      )}

      <label htmlFor="login-email" className="mt-6 block text-[13px] font-semibold text-ink">
        Email
      </label>
      <input
        id="login-email"
        type="email"
        required
        autoFocus
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="mt-1.5 w-full rounded-xl border border-line px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-brand"
      />

      <button
        type="submit"
        disabled={busy || !email.trim()}
        className="mt-4 w-full rounded-pill bg-brand px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-50"
      >
        {busy ? "Sending…" : "Send code"}
      </button>
    </form>,
  );
}
