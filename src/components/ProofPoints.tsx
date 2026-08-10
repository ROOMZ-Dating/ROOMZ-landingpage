import Eyebrow from "./ui/Eyebrow";

interface Stat {
  figure: string;
  label: string;
  body: string;
  source: string;
}

interface Props {
  eyebrow: string;
  title: string;
  stats: Stat[];
  disclaimer?: string;
  className?: string;
}

/** The figure sits in the same purple chip as the rotating headline word. */
export default function ProofPoints({
  eyebrow,
  title,
  stats,
  disclaimer,
  className = "",
}: Props) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-5 font-display text-[30px] font-bold leading-tight text-ink md:text-[38px]">
          {title}
        </h2>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col rounded-3xl border border-line bg-white p-7 text-center"
          >
            <p className="nums inline-block self-center rounded-2xl bg-brand px-4 py-1.5 font-display text-[36px] font-bold leading-tight text-white sm:text-[44px]">
              {stat.figure}
            </p>
            <p className="mt-3 text-[17px] font-bold leading-[24px] text-ink">
              {stat.label}
            </p>
            <p className="mx-auto mt-2 max-w-[260px] text-[14px] font-medium leading-[22px] text-ink-muted">
              {stat.body}
            </p>
            <p className="mt-auto pt-4 text-[12px] font-medium uppercase tracking-[0.08em] text-ink-light">
              {stat.source}
            </p>
          </div>
        ))}
      </div>

      {disclaimer && (
        <p className="mt-6 text-center text-[13px] leading-[20px] text-ink-light">
          {disclaimer}
        </p>
      )}
    </section>
  );
}
