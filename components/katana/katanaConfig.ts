export type KatanaVariant = {
  id: string;
  label: string;
  kanji: string;
  subtitle: string;
  targetId: string;
  /**
   * Optional drop-in render. Path relative to /public (e.g. "/katanas/edu.png").
   * If set, the Katana component renders the image instead of the SVG.
   * Recommended dimensions: 600 × 1400 PNG with transparent background.
   */
  imageSrc?: string;
  blade: {
    base: string;
    edge: string;
    spine: string;
    hamon: string;
    sheen: string;
  };
  tsuba: "disc" | "square" | "flower" | "gear" | "petal" | "wave";
  tsubaColor: string;
  wrap: {
    primary: string;
    secondary: string;
    pattern: "diamond" | "scale" | "stripe" | "circuit" | "wave" | "tortoise";
  };
  pommel: string;
  engraving: "formulas" | "circuit" | "achievement" | "mechanical" | "interest" | "seal";
  flame: {
    inner: string;
    outer: string;
    spark: string;
  };
};

export const KATANAS: KatanaVariant[] = [
  {
    id: "edu",
    label: "Education",
    kanji: "学",
    subtitle: "The Forging",
    targetId: "education",
    blade: { base: "#EDEFF3", edge: "#FFFFFF", spine: "#B8BDC7", hamon: "#9AA3B2", sheen: "#FFFFFF" },
    tsuba: "disc",
    tsubaColor: "#D9DDE4",
    wrap: { primary: "#1A1A1A", secondary: "#C8CCD4", pattern: "diamond" },
    pommel: "#A8AEB8",
    engraving: "formulas",
    flame: { inner: "#FFFFFF", outer: "#CFE6FF", spark: "#FFFFFF" },
  },
  {
    id: "proj",
    label: "Projects",
    kanji: "創",
    subtitle: "The Build",
    targetId: "projects",
    blade: { base: "#0F1A26", edge: "#55D6FF", spine: "#0A1320", hamon: "#7BE3FF", sheen: "#A9EEFF" },
    tsuba: "gear",
    tsubaColor: "#1A2230",
    wrap: { primary: "#0E1620", secondary: "#55D6FF", pattern: "circuit" },
    pommel: "#0F1A26",
    engraving: "circuit",
    flame: { inner: "#FFFFFF", outer: "#55D6FF", spark: "#7BE3FF" },
  },
  {
    id: "exp",
    label: "Experience",
    kanji: "業",
    subtitle: "The Campaigns",
    targetId: "experience",
    // Recolored to the warm copper-orange of the supplied katana render.
    blade: { base: "#2A1A14", edge: "#E8843A", spine: "#1A0E0A", hamon: "#F2A968", sheen: "#FFD4A8" },
    tsuba: "flower",
    tsubaColor: "#7A4218",
    wrap: { primary: "#1A0E0A", secondary: "#E8843A", pattern: "tortoise" },
    pommel: "#7A4218",
    engraving: "achievement",
    flame: { inner: "#FFE0BE", outer: "#E8843A", spark: "#FFC080" },
  },
  {
    id: "skill",
    label: "Skills",
    kanji: "技",
    subtitle: "The Arsenal",
    targetId: "skills",
    blade: { base: "#1B1620", edge: "#C9B6FF", spine: "#0F0C14", hamon: "#A98CFF", sheen: "#E2D8FF" },
    tsuba: "square",
    tsubaColor: "#2A2236",
    wrap: { primary: "#161220", secondary: "#A98CFF", pattern: "circuit" },
    pommel: "#2A2236",
    engraving: "mechanical",
    flame: { inner: "#FFFFFF", outer: "#A98CFF", spark: "#E2D8FF" },
  },
  {
    id: "hob",
    label: "Hobbies",
    kanji: "趣",
    subtitle: "Off Duty",
    targetId: "hobbies",
    // Recolored to the muted neon-green of the supplied render.
    blade: { base: "#0E1814", edge: "#5BCB7F", spine: "#08120D", hamon: "#9FE5B6", sheen: "#D8F5E2" },
    tsuba: "petal",
    tsubaColor: "#1B3A26",
    wrap: { primary: "#08120D", secondary: "#5BCB7F", pattern: "scale" },
    pommel: "#1B3A26",
    engraving: "interest",
    flame: { inner: "#E5FBEC", outer: "#5BCB7F", spark: "#A9EBC0" },
  },
  {
    id: "ct",
    label: "Contact",
    kanji: "縁",
    subtitle: "The Pact",
    targetId: "contact",
    // Recolored to the cleaner red of the supplied render — vivid but not punchy.
    blade: { base: "#1C0E10", edge: "#D32E3F", spine: "#140709", hamon: "#E55E6E", sheen: "#FFD4DA" },
    tsuba: "wave",
    tsubaColor: "#5A1119",
    wrap: { primary: "#140709", secondary: "#D32E3F", pattern: "wave" },
    pommel: "#5A1119",
    engraving: "seal",
    flame: { inner: "#FFE0E4", outer: "#D32E3F", spark: "#FFFFFF" },
  },
];
