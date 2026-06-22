/**
 * Single source of truth for the site's public origin.
 *
 * Override per-environment with NEXT_PUBLIC_SITE_URL (e.g. when a custom domain
 * like https://giftson.dev goes live). Defaults to the current Vercel
 * deployment. Trailing slashes are stripped so URL joins stay predictable.
 *
 * Consumed by app/layout.tsx (metadataBase + JSON-LD), sitemap.ts, robots.ts —
 * fixes the prior mismatch where metadataBase pointed at a domain the build
 * wasn't served from (audit A1).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prjkt-zero.vercel.app"
).replace(/\/+$/, "");
