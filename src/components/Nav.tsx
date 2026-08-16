import { useState } from "react";
import { nav } from "@/lib/content";
import Wordmark from "./Wordmark";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/50 bg-white/70 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-8">
          <a href="/" aria-label="Roomz home" className="flex items-center">
            <Wordmark height={24} />
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            {nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[14px] font-semibold text-ink transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={nav.secondary.href}
            className="hidden text-[14px] font-semibold text-ink-muted transition-colors hover:text-ink sm:inline"
          >
            {nav.secondary.label}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-line bg-white px-4 pb-5 pt-3 md:hidden"
        >
          <ul className="flex flex-col">
            {nav.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-[16px] font-semibold text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={nav.secondary.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-[16px] font-semibold text-ink-muted"
              >
                {nav.secondary.label}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
