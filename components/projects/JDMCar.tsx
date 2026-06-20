"use client";

import Image from "next/image";
import type { Project } from "./projectsConfig";

/**
 * Renders a project's JDM car — the wireframe-on-black render shipped in
 * /public/cars. Every project sets `carImageSrc`; the minimal placeholder
 * below only covers the unlikely case one is missing.
 *
 * (The previous version carried ~200 lines of hand-built SVG car silhouettes
 * — RX7/R34/Supra/NSX — that became dead code once every project had an image
 * render. Removed: audit A5.)
 */
export function JDMCar({ project }: { project: Project }) {
  const { carImageSrc, carModel } = project;

  if (!carImageSrc) {
    return (
      <div className="grid aspect-[3/2] w-full max-w-[760px] place-items-center rounded-xl bg-[#06060A] text-[11px] uppercase tracking-[0.22em] text-sakura-100/50">
        {carModel}
      </div>
    );
  }

  return (
    <div className="cinema-frame inline-block w-full max-w-[760px]">
      <Image
        src={carImageSrc}
        alt={carModel}
        width={1536}
        height={1024}
        sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
        className="cinema-img h-auto w-full object-contain drop-shadow-[0_24px_30px_rgba(17,17,17,0.24)]"
      />
    </div>
  );
}
