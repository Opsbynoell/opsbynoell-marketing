import { Hero } from "@/components/hero";
import { ProofBand } from "@/components/proof-band";
import { TensionBand } from "@/components/tension-band";
import { InterruptionBand } from "@/components/interruption-band";
import { CaseStudy } from "@/components/case-study";
import { Verticals } from "@/components/verticals";
import { AboutTeaser } from "@/components/about-teaser";
import { ClosingCta } from "@/components/closing-cta";

export default function Home() {
  return (
    <>
      {/* Recognition */}
      <Hero />

      {/* Proof */}
      <ProofBand />

      {/* Tension */}
      <TensionBand />

      {/* Bridge */}
      <InterruptionBand />

      {/* Proof — Case Study */}
      <CaseStudy />

      {/* Relief — Verticals */}
      <Verticals />

      {/* Trust — About */}
      <AboutTeaser />

      {/* Action — CTA */}
      <ClosingCta />
    </>
  );
}
