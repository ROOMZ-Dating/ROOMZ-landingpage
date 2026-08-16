import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import LegalContent from "./LegalContent";
import type { LegalDocument } from "@/lib/legal/types";

export default function LegalPage({ doc }: { doc: LegalDocument }) {
  const topLevel = doc.sections.filter((s) => s.level === 1);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-brand focus:px-5 focus:py-2.5 focus:text-[14px] focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main-content" className="px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-16 md:py-20">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-5 font-display text-[32px] font-bold leading-tight text-ink md:text-[40px]">
            {doc.title}
          </h1>
          <p className="mt-3 text-[14px] text-ink-light">
            Effective {doc.effectiveDate} · Last updated {doc.lastUpdated}
          </p>

          <nav
            aria-label="Table of contents"
            className="mt-8 rounded-3xl border border-line bg-surface px-6 py-6 sm:px-8"
          >
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
              On this page
            </p>
            <ol className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {topLevel.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-[14px] font-semibold text-ink-muted transition-colors hover:text-brand"
                  >
                    {section.number}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-4">
            <LegalContent sections={doc.sections} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
