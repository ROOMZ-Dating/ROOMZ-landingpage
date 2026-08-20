import { NavLink, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import Wordmark from "@/components/Wordmark";
import { MOCK_MODE } from "../api/client";
import { useAuth } from "../state";

const navLink = ({ isActive }: { isActive: boolean }) =>
  `text-[14px] font-semibold transition-colors ${
    isActive ? "text-brand" : "text-ink-muted hover:text-ink"
  }`;

export default function DashLayout({ children }: { children: ReactNode }) {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-line/50 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex items-center gap-8">
            <a href="/" aria-label="Roomz home" className="flex items-center">
              <Wordmark height={22} />
            </a>
            <nav className="flex items-center gap-6" aria-label="Dashboard">
              <NavLink to="/dashboard" end className={navLink}>
                Portfolio
              </NavLink>
              <NavLink to="/dashboard/account" className={navLink}>
                Account
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {MOCK_MODE && (
              <span
                className="rounded-pill border border-brand-softEdge bg-brand-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand"
                title="VITE_API_URL is not set — showing sample data"
              >
                Demo data
              </span>
            )}
            <span className="hidden text-[13px] text-ink-muted sm:inline">
              {user?.organizer_name ?? user?.name ?? user?.email}
            </span>
            <button
              type="button"
              onClick={async () => {
                await signOut();
                navigate("/login");
              }}
              className="text-[14px] font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-6">{children}</main>
    </div>
  );
}
