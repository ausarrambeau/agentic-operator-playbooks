import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const playbook = readFileSync(
  resolve(here, "../tracks/research-starter.md"),
  "utf8",
);

const scenarios = {
  "beginner with browsing": [
    /If you are new to this/,
    /one browsing-capable assistant/,
    /three to five useful sources/,
    /single best next action/,
  ],
  "notes or Google Docs": [
    /WHAT I ALREADY HAVE:/,
    /Check the material I already have/,
    /Do not start over if a recent answer already fits/,
  ],
  "work already in a repo": [
    /EXISTING MATERIAL:/,
    /Deduplicate against the existing material/,
    /Normalize duplicates and keep a bounded source set/,
  ],
  "agent without browsing": [
    /If you cannot browse, do not invent an answer/,
    /exact search queries/,
    /ask me to paste the results/,
  ],
};

const publicBoundaryPatterns = [
  /\/Users\//,
  /\.codex/,
  /\.claude/,
  /WHOP_/,
  /API_KEY/,
  /BLOB/,
  /biz_[A-Za-z0-9]+/,
  /exp_[A-Za-z0-9]+/,
  /app_[A-Za-z0-9]+/,
  /gpt-[0-9]/i,
];

let failed = false;

for (const [scenario, requirements] of Object.entries(scenarios)) {
  const missing = requirements.filter((pattern) => !pattern.test(playbook));
  if (missing.length > 0) {
    failed = true;
    console.error(
      `FAIL ${scenario}: missing ${missing.map(String).join(", ")}`,
    );
  } else {
    console.log(`PASS ${scenario}`);
  }
}

const boundaryHits = publicBoundaryPatterns.filter((pattern) =>
  pattern.test(playbook),
);
if (boundaryHits.length > 0) {
  failed = true;
  console.error(
    `FAIL public boundary: matched ${boundaryHits.map(String).join(", ")}`,
  );
} else {
  console.log("PASS public boundary");
}

const fenceCount = [...playbook.matchAll(/^```/gm)].length;
if (fenceCount % 2 !== 0) {
  failed = true;
  console.error(`FAIL Markdown fences: found ${fenceCount}`);
} else {
  console.log(`PASS Markdown fences: ${fenceCount} balanced`);
}

if (failed) {
  process.exitCode = 1;
}

