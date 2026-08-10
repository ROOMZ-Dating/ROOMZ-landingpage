import { footer } from "@/lib/content";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="flex flex-col gap-8 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <Wordmark height={28} />
          <p className="mt-3 text-[14px] text-ink-muted">{footer.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
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

      <div className="border-t border-line px-6 py-6 lg:px-8">
        <p className="text-[13px] text-ink-light">{footer.copyright}</p>
      </div>
    </footer>
  );
}
