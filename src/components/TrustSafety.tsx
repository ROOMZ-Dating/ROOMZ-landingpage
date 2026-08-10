import { trust } from "@/lib/content";
import Eyebrow from "./ui/Eyebrow";

function Check() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand text-white"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
      >
        <path d="m5 13 4 4L19 7" />
      </svg>
    </span>
  );
}

export default function TrustSafety() {
  return (
    <section
      id={trust.id}
      className="mt-32 grid scroll-mt-24 items-center gap-12 md:grid-cols-2"
    >
      <div>
        <Eyebrow>{trust.eyebrow}</Eyebrow>
        <h2 className="mt-5 font-display text-[30px] font-bold leading-tight text-ink md:text-[38px]">
          {trust.title}
        </h2>
      </div>

      <ul className="space-y-4">
        {trust.points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-3.5 rounded-2xl border border-line bg-white px-5 py-4"
          >
            <Check />
            <span className="text-[15px] leading-[24px] text-ink">{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
