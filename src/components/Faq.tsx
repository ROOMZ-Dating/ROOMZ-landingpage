import { useState } from "react";
import { faq } from "@/lib/content";

function Item({
  q,
  a,
  open,
  onToggle,
  id,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  id: string;
}) {
  return (
    <div className="border-b border-line last:border-0">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-trigger`}
          className="flex w-full items-center justify-between gap-6 py-5 text-left"
        >
          <span className="text-[17px] font-bold leading-[26px] text-ink">
            {q}
          </span>
          <span
            aria-hidden="true"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-pill transition-all duration-300 ${
              open ? "rotate-45 bg-brand text-white" : "bg-brand-soft text-brand"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              className="h-4 w-4"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      </h3>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        hidden={!open}
        className="pb-6 pr-12"
      >
        <p className="text-[15px] leading-[25px] text-ink-muted">{a}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={faq.id} className="mx-auto mt-32 max-w-3xl scroll-mt-24">
      <h2 className="text-center font-display text-[30px] font-bold leading-tight text-ink md:text-[38px]">
        {faq.title}
      </h2>

      <div className="mt-10 rounded-3xl border border-line bg-white px-6 sm:px-8">
        {faq.items.map((item, i) => (
          <Item
            key={item.q}
            id={`faq-${i}`}
            q={item.q}
            a={item.a}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
