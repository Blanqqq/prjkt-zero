"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Single client context for the portfolio. Holds the recruiter-mode toggle
 * and persists it to localStorage + URL (`?r=1`). Wrap the whole app once.
 */
type Ctx = {
  recruiter: boolean;
  setRecruiter: (v: boolean) => void;
  toggleRecruiter: () => void;
  hydrated: boolean;
};

const PortfolioCtx = createContext<Ctx | null>(null);
const KEY = "pz_recruiter";

export function PortfolioProvider({
  children,
  initialRecruiter = false,
}: {
  children: React.ReactNode;
  /** Server-read cookie value so first paint matches the user's last choice. */
  initialRecruiter?: boolean;
}) {
  const [recruiter, setRecruiterState] = useState(initialRecruiter);
  const [hydrated, setHydrated] = useState(false);

  // Reconcile with URL (?r=) and localStorage after mount. The cookie already
  // seeded the correct value at SSR, so this only matters for ?r= deep links or
  // a localStorage value set in another tab.
  useEffect(() => {
    let next = initialRecruiter;
    try {
      const url = new URL(window.location.href);
      const fromUrl = url.searchParams.get("r");
      if (fromUrl === "1") next = true;
      else if (fromUrl === "0") next = false;
      else {
        const stored = window.localStorage.getItem(KEY);
        if (stored !== null) next = stored === "1";
      }
    } catch {
      // ignore
    }
    setRecruiterState(next);
    setHydrated(true);
  }, [initialRecruiter]);

  // Reflect mode on <html> so cursor:none can be gated cleanly in CSS.
  // classList.toggle with explicit boolean is atomic and avoids any race
  // where the class lingers after a Recruiter switch.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle(
      "cinematic",
      hydrated && !recruiter
    );
    return () => {
      // On unmount (route change wouldn't trigger this, but just in case),
      // strip the class so we never leave a Recruiter session with cursor:none.
      document.documentElement.classList.remove("cinematic");
    };
  }, [recruiter, hydrated]);

  const setRecruiter = useCallback((v: boolean) => {
    setRecruiterState(v);
    try {
      window.localStorage.setItem(KEY, v ? "1" : "0");
      // Cookie lets the server render the correct view on the next load (no flash).
      document.cookie = `${KEY}=${v ? "1" : "0"}; path=/; max-age=31536000; samesite=lax`;
      const url = new URL(window.location.href);
      if (v) url.searchParams.set("r", "1");
      else url.searchParams.delete("r");
      window.history.replaceState(null, "", url.toString());
    } catch {
      // ignore
    }
  }, []);

  const toggleRecruiter = useCallback(
    () => setRecruiter(!recruiter),
    [recruiter, setRecruiter]
  );

  const value = useMemo(
    () => ({ recruiter, setRecruiter, toggleRecruiter, hydrated }),
    [recruiter, setRecruiter, toggleRecruiter, hydrated]
  );

  return <PortfolioCtx.Provider value={value}>{children}</PortfolioCtx.Provider>;
}

export function usePortfolio() {
  const ctx = useContext(PortfolioCtx);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
}
