"use client";

import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { usePortfolio } from "./PortfolioContext";
import { RecruiterToggle } from "./RecruiterToggle";

const LINKS_FULL = [
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "hobbies", label: "Hobbies" },
  { id: "contact", label: "Contact" },
];

const LINKS_RECRUITER = [
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/**
 * Sticky top nav. Apple-style: minimal, translucent, blurred. The active
 * section is highlighted via IntersectionObserver. The brand mark scrolls
 * back to top.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const { recruiter } = usePortfolio();
  const links = recruiter ? LINKS_RECRUITER : LINKS_FULL;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.1, 0.3, 0.5] }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [links]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-sakura-100/65 backdrop-blur-md border-b border-ink-800/8"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className={`mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 sm:px-10 ${!recruiter ? "lg:pl-24" : ""}`}>
        <a
          href="#top"
          data-hover
          className="flex items-center gap-3 text-ink-800"
          aria-label="Back to top"
        >
          {/* Brush mark — calligraphic 零 inside a hairline circle */}
          <span
            className="grid h-8 w-8 place-items-center rounded-full border border-ink-800/15 bg-white/55"
            aria-hidden
          >
            <span className="font-brush text-base leading-none text-ink-800">零</span>
          </span>
          <span className="font-brush text-base font-medium tracking-tight text-ink-800">
            John Paul Giftson
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`/#${l.id}`}
                data-hover
                aria-current={isActive ? "location" : undefined}
                className={`relative rounded-full px-3 py-1.5 text-sm transition ${
                  isActive
                    ? "text-ink-800"
                    : "text-ink-700/65 hover:text-ink-800"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-white/55" />
                )}
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <RecruiterToggle />
          <a
            href="mailto:johnpaul081023@gmail.com"
            data-hover
            className="hidden rounded-full bg-ink-800 px-4 py-2 text-xs font-medium tracking-tight text-sakura-100 transition hover:bg-crimson lg:inline-block"
          >
            Hire Me
          </a>
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
