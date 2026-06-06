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

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [recruiter, setRecruiterState] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from URL or localStorage
  useEffect(() => {
    let next = false;
    try {
      const url = new URL(window.location.href);
      const fromUrl = url.searchParams.get("r");
      if (fromUrl === "1") next = true;
      else if (fromUrl === "0") next = false;
      else next = window.localStorage.getItem(KEY) === "1";
    } catch {
      // ignore
    }
    setRecruiterState(next);
    setHydrated(true);
  }, []);

  // Reflect mode on <html> so cursor:none can be gated cleanly in CSS
  useEffect(() => {
    if (typeof document === "undefined") return;
    const cls = document.documentElement.classList;
    if (hydrated && !recruiter) cls.add("cinematic");
    else cls.remove("cinematic");
  }, [recruiter, hydrated]);

  const setRecruiter = useCallback((v: boolean) => {
    setRecruiterState(v);
    try {
      window.localStorage.setItem(KEY, v ? "1" : "0");
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
