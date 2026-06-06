/**
 * Default loading skeleton — shown when the next route hasn't streamed yet.
 * Brush mark pulses, no spinner kitsch.
 */
export default function Loading() {
  return (
    <main className="relative mx-auto flex min-h-[60vh] max-w-[1400px] flex-col items-center justify-center px-6 sm:px-10">
      <div className="flex items-center gap-4">
        <span
          className="relative grid h-12 w-12 place-items-center rounded-full border border-ink-800/15 bg-white/55"
          aria-hidden
        >
          <span className="font-brush text-2xl leading-none text-ink-800 animate-pulse">
            零
          </span>
        </span>
        <div>
          <div className="text-[10px] uppercase tracking-[0.32em] text-ink-700/55">
            Opening exhibit
          </div>
          <div className="mt-1 h-1 w-32 overflow-hidden rounded-full bg-ink-800/8">
            <span
              className="block h-full w-1/3 rounded-full bg-ink-800"
              style={{
                animation: "shimmer 1.4s ease-in-out infinite",
                backgroundImage:
                  "linear-gradient(90deg, transparent, #111, transparent)",
              }}
            />
          </div>
        </div>
      </div>
      <span className="mt-8 text-[10px] uppercase tracking-[0.28em] text-ink-700/45">
        刻 · A moment
      </span>
    </main>
  );
}
