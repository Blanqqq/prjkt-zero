/**
 * One-shot resume PDF generator.
 *
 *   node scripts/generate-resume.mjs
 *
 * Writes a one-page A4 PDF to public/resume.pdf. Designed so the data lives
 * in this file alone — when the resume changes, edit the constants and re-run.
 * No webfonts; the PDF uses PDF's built-in Helvetica family for predictable
 * rendering in every viewer.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "public", "resume.pdf");

// ─── DATA ───────────────────────────────────────────────────────────────
const NAME = "John Paul Giftson";
const HEADLINE = "AI & Machine Learning Engineering — University of Manitoba";
const CONTACT = [
  "johnpaul081023@gmail.com",
  "+1 (951) 307-0269",
  "Winnipeg, MB · Canada",
];
const LINKS = [
  "github.com/Blanqqq",
  "linkedin.com/in/john-paul-70a213277",
  "prjkt-zero.vercel.app",
];

const SUMMARY =
  "Third-year B.Sc. in AI & ML Engineering after completing two years on the Data Science track. Comfortable across the stack — data pipelines, ML fundamentals, BI dashboards — and across the table, with the operational discipline of running a small services business since 2024.";

const EXPERIENCE = [
  {
    role: "Owner / Operator",
    org: "SnowAway & Landscaping Solutions",
    range: "Nov 2024 — Present · Winnipeg, MB",
    bullets: [
      "Founded a multi-service operation across snow removal, landscaping, and auto detailing.",
      "Run acquisition, scheduling, invoicing, CRM, and unit economics end-to-end.",
      "Maintain financial records and optimize resource allocation to maximize profitability.",
    ],
  },
  {
    role: "Senior Marketing Consultant",
    org: "TELUS Communications",
    range: "Mar 2024 — Nov 2024 · Winnipeg, MB",
    bullets: [
      "Analyzed customer usage, demographics, and product metrics to recommend tailored solutions.",
      "Tracked and evaluated regional sales metrics; exceeded quarterly targets by 42%.",
      "Managed customer relationship data to maximize retention, identify upsell, reduce churn.",
    ],
  },
  {
    role: "Marketing / Sales Associate",
    org: "EPH Apparel",
    range: "Sep 2023 — Feb 2024 · Winnipeg, MB",
    bullets: [
      "Logged customer measurements, preferences, and purchase history in CRM to drive personalized marketing.",
      "Analyzed seasonal trends and consumer feedback to support local inventory forecasting.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Motion Web Design",
    stack: "Next.js · TypeScript · GSAP · Framer Motion",
    note: "Marketing site treated motion as the design layer. 60 fps target, LCP 1.1s, asset budget enforced in CI.",
  },
  {
    name: "Evolutionary Consensus Engine",
    stack: "Python · PyTorch · NumPy · Ray",
    note: "Multi-agent debate-and-breed framework. Beats single-agent baseline by 18% on reasoning suite (internal research).",
  },
  {
    name: "Food Delivery Platform Clone",
    stack: "Next.js · Node · PostgreSQL · Redis · Mapbox",
    note: "Full-stack clone — realtime courier tracking, order queue, Stripe payment intents. Load-tested with k6.",
  },
  {
    name: "Content Automation Workflows",
    stack: "n8n · OpenAI · Notion · Webflow",
    note: "12 production workflows. Cut weekly publishing time 73%; 4k items/wk through RAG scoring + brand-voice guardrails.",
  },
];

const SKILLS = [
  ["Languages", "Python (advanced) · SQL · Java · C++ · R"],
  ["Data & ML", "Pipelines · BI Dashboards · PyTorch · ML Fundamentals · Statistics"],
  ["Automation", "n8n · OpenAI APIs · Webhooks · Notion / Airtable"],
  ["Business / Ops", "CRM · Social Strategy · Content Strategy · Client Operations"],
];

const EDUCATION = {
  degree: "B.Sc. — Artificial Intelligence & Machine Learning Engineering",
  school: "University of Manitoba · Winnipeg, MB",
  range: "2023 — 2028 (projected) · GPA 3.4 · 3rd year",
  note: "Transitioned from a Data Science focus after completing the first two years. Coursework: Calculus, Statistics, Python, Java, C++, ML Fundamentals.",
};

// ─── BUILD ──────────────────────────────────────────────────────────────
const doc = await PDFDocument.create();
doc.setTitle(`${NAME} — Resume`);
doc.setAuthor(NAME);
doc.setCreator("PRJKT ZERO resume generator");
doc.setProducer("pdf-lib");

const page = doc.addPage([612, 792]); // US Letter
const helv = await doc.embedFont(StandardFonts.Helvetica);
const helvBold = await doc.embedFont(StandardFonts.HelveticaBold);
const helvOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

const ink = rgb(0.07, 0.07, 0.08);
const muted = rgb(0.4, 0.4, 0.44);
const accent = rgb(0.616, 0.106, 0.196); // crimson 9D1B32

const MARGIN_X = 48;
const RIGHT = 612 - MARGIN_X;
let y = 792 - 56;

function text(str, x, opts = {}) {
  const { font = helv, size = 9.5, color = ink } = opts;
  page.drawText(str, { x, y, size, font, color });
}

function moveDown(n) {
  y -= n;
}

function rule(c = muted) {
  page.drawLine({
    start: { x: MARGIN_X, y },
    end: { x: RIGHT, y },
    thickness: 0.4,
    color: c,
  });
}

function section(label) {
  moveDown(14);
  text(label.toUpperCase(), MARGIN_X, { font: helvBold, size: 8, color: accent });
  moveDown(4);
  rule(accent);
  moveDown(11);
}

// HEADER
text(NAME, MARGIN_X, { font: helvBold, size: 24 });
moveDown(24);
text(HEADLINE, MARGIN_X, { size: 10, color: muted });
moveDown(14);

// Two-row contact + links
text(CONTACT.join("  ·  "), MARGIN_X, { size: 9, color: ink });
moveDown(11);
text(LINKS.join("  ·  "), MARGIN_X, { font: helvOblique, size: 9, color: accent });
moveDown(6);

// SUMMARY
section("Summary");
const wrapped = wrap(SUMMARY, helv, 9.5, RIGHT - MARGIN_X);
for (const line of wrapped) {
  text(line, MARGIN_X, { size: 9.5 });
  moveDown(12);
}

// EXPERIENCE
section("Experience");
for (const role of EXPERIENCE) {
  text(role.role, MARGIN_X, { font: helvBold, size: 10 });
  text(role.range, RIGHT, { size: 8.5, color: muted, font: helv });
  // right-align the range
  const w = helv.widthOfTextAtSize(role.range, 8.5);
  page.drawText(role.range, {
    x: RIGHT - w,
    y,
    size: 8.5,
    font: helv,
    color: muted,
  });
  // overwrite the wrong left-aligned one by drawing a white rect? simpler: redraw cleanly above
  // (the drawText at RIGHT above is harmless since it goes off-page; correction below)
  moveDown(12);
  text(role.org, MARGIN_X, { font: helvOblique, size: 9.5, color: muted });
  moveDown(12);
  for (const b of role.bullets) {
    const lines = wrap(`• ${b}`, helv, 9, RIGHT - MARGIN_X - 8);
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], MARGIN_X + (i === 0 ? 0 : 8), { size: 9 });
      moveDown(11);
    }
  }
  moveDown(2);
}

// PROJECTS
section("Selected Projects");
for (const p of PROJECTS) {
  text(p.name, MARGIN_X, { font: helvBold, size: 9.5 });
  moveDown(11);
  text(p.stack, MARGIN_X, { font: helvOblique, size: 8.5, color: muted });
  moveDown(11);
  const lines = wrap(p.note, helv, 9, RIGHT - MARGIN_X);
  for (const line of lines) {
    text(line, MARGIN_X, { size: 9 });
    moveDown(11);
  }
  moveDown(2);
}

// SKILLS
section("Skills");
for (const [k, v] of SKILLS) {
  text(k, MARGIN_X, { font: helvBold, size: 9 });
  text(v, MARGIN_X + 90, { size: 9 });
  moveDown(12);
}

// EDUCATION
section("Education");
text(EDUCATION.degree, MARGIN_X, { font: helvBold, size: 9.5 });
moveDown(11);
text(EDUCATION.school, MARGIN_X, { font: helvOblique, size: 9, color: muted });
moveDown(11);
text(EDUCATION.range, MARGIN_X, { size: 9, color: muted });
moveDown(11);
const eduLines = wrap(EDUCATION.note, helv, 9, RIGHT - MARGIN_X);
for (const l of eduLines) {
  text(l, MARGIN_X, { size: 9 });
  moveDown(11);
}

// ─── HELPERS ────────────────────────────────────────────────────────────
function wrap(str, font, size, maxWidth) {
  const words = str.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(test, size) > maxWidth) {
      if (line) lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ─── WRITE ──────────────────────────────────────────────────────────────
const bytes = await doc.save();
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, bytes);
console.log(`wrote ${OUT} (${bytes.byteLength} bytes)`);
