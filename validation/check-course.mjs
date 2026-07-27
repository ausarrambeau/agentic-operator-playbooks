import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const files = {
  "universal one-pager": {
    path: "../one-pagers/eight-moves.md",
    patterns: [
      /# The eight moves/,
      /## 1\. Wake up to the day sorted\./,
      /## 8\. It tidies up while you sleep\./,
      /Sending, posting, deleting and spending need me to say yes each time/,
    ],
  },
  tracking: {
    path: "../tracks/tracking-starter.md",
    patterns: [
      /weekly-map\.md/,
      /current state/i,
      /next action/i,
      /last verified/i,
      /Do not take external action/i,
    ],
  },
  research: {
    path: "../tracks/research-starter.md",
    patterns: [
      /research-brief\.md/,
      /evidence ledger/i,
      /actively search[\s\S]{0,80}against it/i,
      /If you cannot browse, do not invent an answer/i,
    ],
  },
  building: {
    path: "../tracks/building-starter.md",
    patterns: [
      /build-brief\.md/,
      /acceptance checks/i,
      /smallest testable slice/i,
      /verification receipt/i,
      /Do not[\s\S]{0,40}deploy/i,
    ],
  },
  content: {
    path: "../tracks/content-starter.md",
    patterns: [
      /content-brief\.md/,
      /owned proof/i,
      /three original hooks/i,
      /Do not publish/i,
      /draft/i,
    ],
  },
  explore: {
    path: "../tracks/explore-starter.md",
    patterns: [
      /experiment-card\.md/,
      /three ways/i,
      /smallest reversible test/i,
      /safe sample/i,
      /Do not purchase/i,
    ],
  },
};

const publicBoundaryPatterns = [
  /\/Users\//,
  /~\/\./,
  /\.codex/,
  /\.claude/,
  /WHOP_/,
  /API_KEY/,
  /BLOB_READ_WRITE_TOKEN/,
  /biz_[A-Za-z0-9]+/,
  /exp_[A-Za-z0-9]+/,
  /app_[A-Za-z0-9]+/,
  /gpt-[0-9]/i,
];

let failed = false;

for (const [name, contract] of Object.entries(files)) {
  const absolutePath = resolve(here, contract.path);
  let contents;

  try {
    contents = readFileSync(absolutePath, "utf8");
  } catch {
    failed = true;
    console.error(`FAIL ${name}: missing ${contract.path}`);
    continue;
  }

  const missing = contract.patterns.filter((pattern) => !pattern.test(contents));
  if (missing.length > 0) {
    failed = true;
    console.error(`FAIL ${name}: missing ${missing.map(String).join(", ")}`);
  } else {
    console.log(`PASS ${name} contract`);
  }

  const boundaryHits = publicBoundaryPatterns.filter((pattern) => pattern.test(contents));
  if (boundaryHits.length > 0) {
    failed = true;
    console.error(
      `FAIL ${name} public boundary: matched ${boundaryHits.map(String).join(", ")}`,
    );
  } else {
    console.log(`PASS ${name} public boundary`);
  }

  const fenceCount = [...contents.matchAll(/^```/gm)].length;
  if (fenceCount % 2 !== 0) {
    failed = true;
    console.error(`FAIL ${name} Markdown fences: found ${fenceCount}`);
  } else {
    console.log(`PASS ${name} Markdown fences: ${fenceCount} balanced`);
  }
}

if (failed) {
  process.exitCode = 1;
}
