export type Social = {
  id: "github" | "linkedin" | "youtube";
  label: string;
  handle: string;
  href: string;
};

export const SOCIALS: Social[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "@Blanqqq",
    href: "https://github.com/Blanqqq",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/john-paul-70a213277",
    href: "https://www.linkedin.com/in/john-paul-70a213277",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@notblanq",
    href: "https://www.youtube.com/@notblanq",
  },
];
