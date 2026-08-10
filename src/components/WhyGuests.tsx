import { whyGuests } from "@/lib/content";
import Eyebrow from "./ui/Eyebrow";
import StoreBadges from "./ui/StoreBadges";

export default function WhyGuests() {
  return (
    <section className="mt-32">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{whyGuests.eyebrow}</Eyebrow>
        <h2 className="mt-5 font-display text-[30px] font-bold leading-tight text-ink md:text-[38px]">
          {whyGuests.title}
        </h2>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {whyGuests.cards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-line bg-white p-6"
          >
            <h3 className="text-[16px] font-bold leading-[22px] text-ink">
              {card.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[22px] text-ink-muted">
              {card.body}
            </p>
          </div>
        ))}
      </div>

      <StoreBadges className="mt-8 justify-center" />
    </section>
  );
}
