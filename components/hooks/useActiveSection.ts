"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view via a single IntersectionObserver.
 *
 * Replaces the two near-identical observers the top Nav and the SidebarRail
 * each used to run (audit A6) — now both consume one source of truth, so they
 * can never disagree at section boundaries.
 *
 * `ids` may change between renders (e.g. recruiter vs full nav); the observer
 * re-arms only when the *set* of ids actually changes.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>("");
  const key = ids.join(",");

  useEffect(() => {
    const idList = key ? key.split(",") : [];
    const targets = idList
      .map((id) => document.getElementById(id))
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
  }, [key]);

  return active;
}
