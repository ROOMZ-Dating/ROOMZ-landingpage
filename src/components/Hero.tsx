import { hero } from "@/lib/content";
import Button, { ArrowRight } from "./ui/Button";
import StoreBadges from "./ui/StoreBadges";
import RotatingWord from "./RotatingWord";
import RoomPreview from "./RoomPreview";

export default function Hero() {
  return (
    <section
      id="top"
      className="flex flex-col items-center pt-14 text-center lg:pt-20"
    >
      <h1 className="max-w-5xl font-display text-[34px] font-bold leading-[1.18] text-ink sm:text-[44px] md:text-[64px]">
        {hero.leadIn} <RotatingWord words={hero.rotating} />
      </h1>

      <p className="mt-6 max-w-2xl text-[17px] leading-[27px] text-ink-muted md:text-[18px]">
        {hero.subhead}
      </p>

      <div className="mt-8 flex w-full justify-center px-4">
        <Button href={hero.primaryCta.href} size="lg">
          {hero.primaryCta.label}
          <ArrowRight className="ml-1.5" />
        </Button>
      </div>

      <StoreBadges className="mt-5 justify-center" />

      <div className="mt-14 w-full max-w-5xl">
        <RoomPreview />
      </div>
    </section>
  );
}
