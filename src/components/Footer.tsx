import { footer } from "@/lib/content";
import Wordmark from "./Wordmark";

/**
 * Loaded by the vendor snippet in index.html, so it's absent until that script
 * runs — and stays absent if a content blocker eats it.
 */
declare global {
  interface Window {
    silktideConsentManager?: {
      getInstance: () =>
        | {
            showBackdrop: () => void;
            toggleModal: (open: boolean) => void;
          }
        | undefined;
    };
  }
}

/** Mirrors what Silktide's own "Preferences" button does. */
function openCookiePreferences() {
  const manager = window.silktideConsentManager?.getInstance();
  if (!manager) return;
  manager.showBackdrop();
  manager.toggleModal(true);
}
import {
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
} from "./ui/SocialIcons";

const ICONS: Record<string, (props: { className?: string }) => JSX.Element> = {
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  YouTube: YouTubeIcon,
};

const SHELL =
  "inline-flex h-10 w-10 items-center justify-center rounded-pill border transition-colors";

/**
 * Renders as a real link once a profile URL exists, and as an inert control
 * until then.
 *
 * The tempting shortcut — an <a> with no href — is what the reference site
 * does, and it's broken twice over: a hrefless anchor isn't keyboard-focusable
 * and isn't exposed as a link, so its aria-label never reaches assistive tech.
 * This mirrors the placeholder treatment the store badges already use.
 */
function Social({ label, href }: { label: string; href: string }) {
  const Icon = ICONS[label];
  if (!Icon) return null;

  if (!href) {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={`${label} — coming soon`}
        title="Coming soon"
        className={`${SHELL} cursor-default border-line text-ink-light`}
      >
        <Icon />
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Roomz on ${label}`}
      className={`${SHELL} border-line text-ink-muted hover:border-brand-softEdge hover:bg-brand-soft hover:text-brand`}
    >
      <Icon />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="flex flex-col gap-8 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        {/* All three blocks share the row equally so the icons land on the
            page's centre line, rather than at the midpoint of the gap between
            two unequal neighbours. */}
        <div className="lg:flex-1">
          <Wordmark height={23} />
          <p className="mt-3 text-[14px] text-ink-muted">{footer.tagline}</p>
        </div>

        <ul className="flex items-center gap-3 lg:flex-1 lg:justify-center">
          {footer.social.map((account) => (
            <li key={account.label}>
              <Social label={account.label} href={account.href} />
            </li>
          ))}
        </ul>

        <nav aria-label="Footer" className="lg:flex-1">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-end">
            {footer.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[14px] font-semibold text-ink-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex flex-col-reverse items-center gap-3 border-t border-line px-6 py-6 sm:flex-row sm:justify-between lg:px-8">
        <p className="text-[13px] text-ink-light">{footer.copyright}</p>

        <button
          type="button"
          onClick={openCookiePreferences}
          className="text-[13px] text-ink-light underline-offset-4 transition-colors hover:text-ink-muted hover:underline"
        >
          Cookie preferences
        </button>
      </div>
    </footer>
  );
}
