import Link from "next/link";

export const metadata = { title: "Lost in the museum" };

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-[70vh] max-w-[900px] flex-col items-center justify-center px-6 pt-32 pb-20 text-center sm:px-10">
      <div className="flex items-center gap-3">
        <span className="block h-px w-10 bg-ink-800/30" />
        <span className="heading-eyebrow">404 · 迷子</span>
        <span className="block h-px w-10 bg-ink-800/30" />
      </div>

      <h1 className="brush-behind heading-display mt-6 text-[clamp(56px,10vw,140px)] text-ink-800">
        Wrong hall.
      </h1>

      <p className="mt-4 max-w-md text-body">
        This exhibit isn't on the floorplan. Walk back to the lobby and pick a
        katana — every section is one blade away.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink-800 px-5 py-3 text-sm font-medium tracking-tight text-sakura-100 transition hover:bg-crimson"
        >
          ← Back to the lobby
        </Link>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full border border-ink-800/15 bg-white/55 px-5 py-3 text-sm font-medium tracking-tight text-ink-800 transition hover:border-ink-800/30"
        >
          Jump to The Garage →
        </Link>
      </div>
    </main>
  );
}
