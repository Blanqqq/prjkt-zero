"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Global error boundary. Same museum tone as /404 so a runtime crash doesn't
 * dump a stack trace on a recruiter.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Soft-log so a deployed crash leaves a breadcrumb in the console
    // without surfacing technical noise to the visitor.
    // eslint-disable-next-line no-console
    console.error("[prjkt-zero] render error", error);
  }, [error]);

  return (
    <main className="relative mx-auto flex min-h-[70vh] max-w-[900px] flex-col items-center justify-center px-6 pt-32 pb-20 text-center sm:px-10">
      <div className="flex items-center gap-3">
        <span className="block h-px w-10 bg-ink-800/30" />
        <span className="heading-eyebrow">Floor closed · 静</span>
        <span className="block h-px w-10 bg-ink-800/30" />
      </div>

      <h1 className="brush-behind heading-display mt-6 text-[clamp(48px,8vw,120px)] text-ink-800">
        Something cracked.
      </h1>

      <p className="mt-4 max-w-md text-body">
        An exhibit threw an unexpected error. You can try the same hallway
        again — or step back to the lobby and pick a different katana.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-full bg-ink-800 px-5 py-3 text-sm font-medium tracking-tight text-sakura-100 transition hover:bg-crimson"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-ink-800/15 bg-white/55 px-5 py-3 text-sm font-medium tracking-tight text-ink-800 transition hover:border-ink-800/30"
        >
          ← Back to the lobby
        </Link>
      </div>

      {error.digest && (
        <p className="mt-10 font-mono text-[11px] text-ink-700/45">
          ref · {error.digest}
        </p>
      )}
    </main>
  );
}
