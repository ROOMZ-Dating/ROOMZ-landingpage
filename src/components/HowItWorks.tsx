import Eyebrow from "./ui/Eyebrow";

interface Step {
  title: string;
  body: string;
}

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  callout: string;
  steps: Step[];
  /** Puts the visual column first on desktop so the two tracks mirror each other. */
  reverse?: boolean;
  visual: React.ReactNode;
}

/**
 * Steps are numbered because the order is real — a guest cannot browse a room
 * before joining it, and an organizer cannot share a link before creating one.
 */
export default function HowItWorks({
  id,
  eyebrow,
  title,
  callout,
  steps,
  reverse = false,
  visual,
}: Props) {
  return (
    <section
      id={id}
      className="mt-32 grid scroll-mt-24 items-center gap-12 md:grid-cols-2"
    >
      <div className={reverse ? "md:order-2" : undefined}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-5 font-display text-[30px] font-bold leading-tight text-ink md:text-[38px]">
          {title}
        </h2>

        <ol className="mt-8 space-y-7">
          {steps.map((step, i) => (
            <li key={step.title} className="flex items-start gap-4">
              {/* Body face, not the display serif — Fraunces' high-contrast
                  digits are ambiguous at this size (its 3 reads as a 5). */}
              <span
                aria-hidden="true"
                className="nums flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft font-body text-[17px] font-bold text-brand"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-[17px] font-bold text-ink">{step.title}</h3>
                <p className="mt-1 text-[14px] leading-[22px] text-ink-muted">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 rounded-2xl border border-line bg-surface px-5 py-4 text-[15px] font-semibold leading-[24px] text-ink">
          {callout}
        </p>
      </div>

      <div className={reverse ? "md:order-1" : undefined}>{visual}</div>
    </section>
  );
}
