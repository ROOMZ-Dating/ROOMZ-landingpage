import Nav from "./components/Nav";
import Hero from "./components/Hero";
import AudienceSplit from "./components/AudienceSplit";
import ProofPoints from "./components/ProofPoints";
import HowItWorks from "./components/HowItWorks";
import { OrganizerVisual, GuestVisual } from "./components/StepVisuals";
import WhyOrganizers from "./components/WhyOrganizers";
import WhyGuests from "./components/WhyGuests";
import TrustSafety from "./components/TrustSafety";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import {
  howOrganizers,
  howGuests,
  proofAudience,
  proofData,
} from "./lib/content";

export default function App() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-brand focus:px-5 focus:py-2.5 focus:text-[14px] focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Nav />

      <main className="px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Hero />
          <AudienceSplit />

          {/* Why the opportunity exists at all — before the mechanics. */}
          <ProofPoints
            className="mt-32"
            eyebrow={proofAudience.eyebrow}
            title={proofAudience.title}
            stats={proofAudience.stats}
          />

          <HowItWorks
            id={howOrganizers.id}
            eyebrow={howOrganizers.eyebrow}
            title={howOrganizers.title}
            callout={howOrganizers.callout}
            steps={howOrganizers.steps}
            visual={<OrganizerVisual />}
          />

          <HowItWorks
            id={howGuests.id}
            eyebrow={howGuests.eyebrow}
            title={howGuests.title}
            callout={howGuests.callout}
            steps={howGuests.steps}
            reverse
            visual={<GuestVisual />}
          />

          <WhyOrganizers />

          {/* The ROI argument lands directly after the organizer benefits. */}
          <ProofPoints
            className="mt-32"
            eyebrow={proofData.eyebrow}
            title={proofData.title}
            stats={proofData.stats}
            disclaimer={proofData.disclaimer}
          />

          <WhyGuests />
          <TrustSafety />
          <Faq />
          <FinalCta />
        </div>
      </main>

      <Footer />
    </>
  );
}
