import { split } from "@/lib/content";
import StoreBadges from "./ui/StoreBadges";
import Eyebrow from "./ui/Eyebrow";

/**
 * Roomz has two audiences in one room, so the page splits here rather than
 * carrying a single narrative the way a one-audience product would.
 */
export default function AudienceSplit() {
  return (
    <section className="mt-24">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Organizers — the paying side, so it carries the filled accent. */}
        <div className="flex flex-col rounded-3xl border border-brand-softEdge bg-brand-soft p-7 sm:p-9">
          <Eyebrow className="self-start border-brand/20 bg-white">
            {split.organizers.eyebrow}
          </Eyebrow>
          <h2 className="mt-5 font-display text-[26px] font-bold leading-tight text-ink md:text-[30px]">
            {split.organizers.title}
          </h2>
          <p className="mt-3 text-[16px] leading-[26px] text-ink-muted">
            {split.organizers.body}
          </p>
        </div>

        {/* Guests */}
        <div className="flex flex-col rounded-3xl border border-line bg-white p-7 sm:p-9">
          <Eyebrow className="self-start">{split.guests.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-[26px] font-bold leading-tight text-ink md:text-[30px]">
            {split.guests.title}
          </h2>
          <p className="mt-3 text-[16px] leading-[26px] text-ink-muted">
            {split.guests.body}
          </p>
          <div className="mt-auto pt-7">
            <StoreBadges />
          </div>
        </div>
      </div>
    </section>
  );
}
