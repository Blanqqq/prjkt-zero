export type KatanaVariant = {
  id: string;
  label: string;
  kanji: string;
  subtitle: string;
  targetId: string;
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
    blade: { base: "#2C2620", edge: "#D4A84F", spine: "#1B1612", hamon: "#E6C375", sheen: "#FFEFC4" },
    tsuba: "flower",
    tsubaColor: "#8C6A2C",
    wrap: { primary: "#1A1410", secondary: "#D4A84F", pattern: "tortoise" },
    pommel: "#8C6A2C",
    engraving: "achievement",
    flame: { inner: "#FFF1B8", outer: "#D4A84F", spark: "#FFE08A" },
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
    blade: { base: "#2A1418", edge: "#FF6F9E", spine: "#1A0A0E", hamon: "#FFB1CC", sheen: "#FFE0EB" },
    tsuba: "petal",
    tsubaColor: "#9D1B32",
    wrap: { primary: "#2A1418", secondary: "#FF6F9E", pattern: "scale" },
    pommel: "#9D1B32",
    engraving: "interest",
    flame: { inner: "#FFFFFF", outer: "#FF6F9E", spark: "#FFB1CC" },
  },
  {
    id: "ct",
    label: "Contact",
    kanji: "縁",
    subtitle: "The Pact",
    targetId: "contact",
    blade: { base: "#1C0D11", edge: "#9D1B32", spine: "#120709", hamon: "#C92847", sheen: "#FFD9E1" },
    tsuba: "wave",
    tsubaColor: "#5A0F1B",
    wrap: { primary: "#120709", secondary: "#9D1B32", pattern: "wave" },
    pommel: "#5A0F1B",
    engraving: "seal",
    flame: { inner: "#FFE5EA", outer: "#9D1B32", spark: "#FFFFFF" },
  },
];
