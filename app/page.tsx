"use client";

import { usePortfolio } from "@/components/PortfolioContext";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/projects/Projects";
import { RecruiterView } from "@/components/RecruiterView";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hobbies } from "@/components/sections/Hobbies";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  const { recruiter, hydrated } = usePortfolio();

  if (!hydrated) {
    // Defer to avoid a flash of the wrong mode; render Exhibit by default
    // after first paint via the provider's effect.
    return <FullExperience />;
  }
  return recruiter ? <RecruiterView /> : <FullExperience />;
}

function FullExperience() {
  // Recruiter-priority ordering — projects + experience lead. Hobbies is last
  // (still discoverable, but doesn't block the work narrative).
  return (
    <main className="relative">
      <Hero />
      <Divider kanji="創" />
      <Projects />
      <Divider kanji="業" />
      <Experience />
      <Divider kanji="技" />
      <Skills />
      <Divider kanji="学" />
      <Education />
      <Divider kanji="縁" />
      <Contact />
      <Divider kanji="趣" />
      <Hobbies />
    </main>
  );
}

function Divider({ kanji }: { kanji: string }) {
  return (
    <div
      aria-hidden
      className="relative mx-auto flex max-w-[1400px] items-center gap-6 px-6 sm:px-10"
    >
      <span className="ink-rule flex-1" />
      <span className="font-brush text-xl text-ink-800/40">{kanji}</span>
      <span className="ink-rule flex-1" />
    </div>
  );
}
