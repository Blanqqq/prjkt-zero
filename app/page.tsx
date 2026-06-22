"use client";

import { usePortfolio } from "@/components/PortfolioContext";
import { RecruiterView } from "@/components/RecruiterView";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hobbies } from "@/components/sections/Hobbies";
import { Skills } from "@/components/sections/Skills";
import { HeroV3 } from "@/components/v3/HeroV3";
import { ProjectsV3 } from "@/components/v3/ProjectsV3";
import { SectionIndex } from "@/components/v3/SectionIndex";

/**
 * Home — the v3 editorial composition, promoted from /v3 to the site root
 * (2026-06-21). Same primitives as before (shared AppFrame, data layer, case
 * studies, Recruiter Mode); the museum composition is retired from root.
 *
 * Recruiter Mode is seeded from the cookie at SSR (see PortfolioContext +
 * layout), so first paint is correct and the resume view wins when active.
 */
export default function Home() {
  const { recruiter } = usePortfolio();
  return recruiter ? <RecruiterView /> : <FullExperience />;
}

function FullExperience() {
  return (
    <main className="relative">
      <HeroV3 />
      <SectionIndex />
      <Divider kanji="人" />
      <About />
      <Divider kanji="創" />
      <ProjectsV3 />
      <Divider kanji="業" />
      <Experience />
      <Divider kanji="技" />
      <Skills />
      <Divider kanji="学" />
      <Education />
      <Divider kanji="趣" />
      <Hobbies />
      <Divider kanji="縁" />
      <Contact />
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
