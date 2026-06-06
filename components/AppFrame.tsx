"use client";

import { AtmosphereLayers } from "./AtmosphereLayers";
import { EasterEgg } from "./EasterEgg";
import { EasterEggRibbon } from "./EasterEggRibbon";
import { Footer } from "./Footer";
import { KatanaCursor } from "./KatanaCursor";
import { Nav } from "./Nav";
import { PageTransition } from "./PageTransition";
import { usePortfolio } from "./PortfolioContext";
import { SakuraPetals } from "./SakuraPetals";
import { SidebarRail } from "./SidebarRail";

/**
 * App frame: global atmosphere + nav + footer that wrap every route.
 * In recruiter mode, the cinematic layers (cursor, petals, easter egg) are
 * hidden — the recruiter shouldn't have to wade through theme to read the
 * resume.
 */
export function AppFrame({ children }: { children: React.ReactNode }) {
  const { recruiter, hydrated } = usePortfolio();
  const cinematic = !recruiter;

  return (
    <>
      {/* Accessibility — keyboard users land on real content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-800 focus:px-4 focus:py-2 focus:text-sm focus:text-sakura-100"
      >
        Skip to content
      </a>

      <AtmosphereLayers />
      {hydrated && cinematic && <SakuraPetals count={36} />}
      {hydrated && cinematic && <KatanaCursor />}
      {cinematic && <SidebarRail />}
      <Nav />
      <div id="main" className={cinematic ? "lg:pl-16" : ""}>
        <PageTransition>{children}</PageTransition>
      </div>
      {cinematic && <EasterEggRibbon />}
      <Footer />
      {hydrated && cinematic && <EasterEgg />}
    </>
  );
}
