/**
 * Create notes folder + markdown for today (or --date).
 * Folder: src/content/notes/YYYY/MM/Www/  (ISO week, ww zero-padded)
 * File:   YYYY-MM-DD.md  (week is not part of the filename)
 *
 * Usage:
 *   node scripts/new-note.mjs
 *   node scripts/new-note.mjs --date=2026-04-15
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

/** ISO 8601 week number 1–53 */
function getISOWeekNumber(date) {
  const d = new Date(date.valueOf());
  const dayNum = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - dayNum + 3);
  const firstThursday = d.valueOf();
  d.setMonth(0, 1);
  if (d.getDay() !== 4) {
    d.setMonth(0, 1 + ((4 - d.getDay() + 7) % 7));
  }
  return 1 + Math.round((firstThursday - d) / 604800000);
}

function parseArgs(argv) {
  let dateStr = null;
  for (const a of argv) {
    if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/new-note.mjs [--date=YYYY-MM-DD]

  --date   default: today (local)`);
      process.exit(0);
    }
    if (a.startsWith("--date=")) dateStr = a.slice(7).trim();
  }
  return { dateStr };
}

function resolveDate(dateStr) {
  if (!dateStr) return new Date();
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!m) {
    console.error(`Invalid --date=${dateStr} (expected YYYY-MM-DD)`);
    process.exit(1);
  }
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const day = Number(m[3]);
  const d = new Date(y, mo, day, 12, 0, 0, 0);
  if (
    d.getFullYear() !== y ||
    d.getMonth() !== mo ||
    d.getDate() !== day
  ) {
    console.error(`Invalid calendar date: ${dateStr}`);
    process.exit(1);
  }
  return d;
}

function buildFrontmatter(isoDate) {
  const title =
    "\u30bf\u30a4\u30c8\u30eb\u3092\u7de8\u96c6\u3057\u3066\u304f\u3060\u3055\u3044";
  const desc =
    "\u8a18\u4e8b\u306e\u8981\u7d04\u3092\u66f8\u3044\u3066\u304f\u3060\u3055\u3044\u3002";
  const tag1 = "\u30e1\u30a4\u30f3KW";
  const tag2 = "\u30b5\u30d6KW1";
  const tag3 = "\u30b5\u30d6KW2";
  const opening =
    "\u3053\u3093\u306b\u3061\u306f\u3001\u3055\u3057\u3057\u3067\u3059\u3002";

  return `---
title: "${title}"
publishDate: ${isoDate}
category: "Jurnal"
tags: ["${tag1}", "${tag2}", "${tag3}"]
description: "${desc}"
---

${opening}

`;
}

function main() {
  const { dateStr } = parseArgs(process.argv.slice(2));
  const d = resolveDate(dateStr);
  const y = String(d.getFullYear());
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const isoDate = `${y}-${mo}-${day}`;
  const week = getISOWeekNumber(d);
  const wDir = `W${String(week).padStart(2, "0")}`;

  const relDir = path.join("src", "content", "notes", y, mo, wDir);
  const dir = path.join(ROOT, relDir);
  const baseName = `${isoDate}.md`;
  const filePath = path.join(dir, baseName);

  fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(filePath)) {
    console.log(`Already exists: ${path.relative(ROOT, filePath)}`);
    return;
  }

  const body = buildFrontmatter(isoDate);
  fs.writeFileSync(filePath, body, "utf8");
  console.log(`Created: ${path.relative(ROOT, filePath)}`);
}

main();
