"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Route-level fade-up. The pathname is the motion key — when it changes,
 * Framer remounts the children and re-runs the entry animation. Keeps every
 * route feeling like part of the same product, even across hard navigations.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
