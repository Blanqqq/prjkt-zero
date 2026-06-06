import type { MetadataRoute } from "next";
import { PROJECTS } from "@/components/projects/projectsConfig";

const SITE = "https://prjkt-zero.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const home: MetadataRoute.Sitemap[number] = {
    url: SITE,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  };
  const projects = PROJECTS.map((p) => ({
    url: `${SITE}/projects/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [home, ...projects];
}
