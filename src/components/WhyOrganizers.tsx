import { whyOrganizers } from "@/lib/content";
import Eyebrow from "./ui/Eyebrow";

export default function WhyOrganizers() {
  return (
    <section id={whyOrganizers.id} className="mt-32 scroll-mt-24">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{whyOrganizers.eyebrow}</Eyebrow>
        <h2 className="mt-5 font-display text-[30px] font-bold leading-tight text-ink md:text-[38px]">
          {whyOrganizers.title}
        </h2>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {whyOrganizers.points.map((point) => (
          <div
            key={point.title}
            className="rounded-3xl border border-line bg-white p-7"
          >
            <h3 className="text-[17px] font-bold text-ink">{point.title}</h3>
            <p className="mt-2 text-[15px] leading-[24px] text-ink-muted">
              {point.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl bg-brand-soft px-6 py-8 text-center sm:px-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
          {whyOrganizers.audienceLabel}
        </p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          {whyOrganizers.audiences.map((audience) => (
            <li
              key={audience}
              className="rounded-pill border border-brand/15 bg-white px-4 py-2 text-[14px] font-semibold text-ink"
            >
              {audience}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
