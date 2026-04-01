import { Hero } from "./sections/Hero";
import { WhoWeAre } from "./sections/WhoWeAre";
import { WhatWeDo } from "./sections/WhatWeDo";
import { TypicalEngagements } from "./sections/TypicalEngagements";
import { HowItWorks } from "./sections/HowItWorks";
import { FinalCta } from "./sections/FinalCta";
import { Footer } from "./sections/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <SectionDivider />
      <WhoWeAre />
      <SectionDivider />
      <WhatWeDo />
      <SectionDivider />
      <TypicalEngagements />
      <SectionDivider />
      {/* <SelectedWork />
      <SectionDivider /> */}
      <HowItWorks />
      <SectionDivider />
      {/* <WhyVelris />
      <SectionDivider /> */}
      <FinalCta />
      <Footer />
    </main>
  );
}
