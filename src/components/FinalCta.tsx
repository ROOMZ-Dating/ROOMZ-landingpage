import { finalCta } from "@/lib/content";
import StoreBadges from "./ui/StoreBadges";

export default function FinalCta() {
  return (
    <section
      id={finalCta.id}
      className="my-32 scroll-mt-24 rounded-3xl bg-ink-black p-10 text-center text-white md:p-16"
    >
      <h2 className="mx-auto max-w-3xl font-display text-[30px] font-bold leading-tight md:text-[44px]">
        {finalCta.title}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-[17px] leading-[27px] text-white/70">
        {finalCta.sub}
      </p>

      <StoreBadges tone="dark" className="mt-8 justify-center" />
    </section>
  );
}
