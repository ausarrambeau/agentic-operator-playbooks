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
  video: {
    path: "../tracks/video-starter.md",
    patterns: [
      /video-notes\.md/,
      /transcript/i,
      /asserted[\s\S]{0,80}demonstrated/i,
      /SAID-TO-BE-SHOWN/,
      /TRANSCRIPT ONLY/,
      /timestamp/i,
      /do not invent an answer/i,
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
  "ingest skill": {
    path: "../skills/ingest/SKILL.md",
    patterns: [
      /Storage alone is never done|not done.{0,40}notes are written/i,
      /SAID-TO-BE-SHOWN/,
      /DEMONSTRATED.{0,15} is forbidden/,
      /Tier 1 = act on these/,
      /Repetition is not corroboration/i,
      /Dedup check first/i,
      /shot table/i,
      /scope:/,
    ],
  },
  "ingest skill script": {
    path: "../skills/ingest/scripts/video-prep.sh",
    patterns: [/MAX_SCENE_FRAMES/, /TRANSCRIPT_STATUS/, /whisper-cli/],
  },
  "skills readme": {
    path: "../skills/README.md",
    allowRuntimePaths: true,
    patterns: [/skills\/ingest/, /WHISPER_MODEL/],
  },
  verify: {
    path: "../tracks/verify-starter.md",
    patterns: [
      /verify-receipt\.md/,
      /paste the output/i,
      /passing tests and working software[\s\S]{0,20}are two different claims/i,
      /must name what it did not check/i,
      /Do not take any external action/,
    ],
  },
  authority: {
    path: "../tracks/authority-starter.md",
    patterns: [
      /authority-map\.md/,
      /\*\*reversible\*\*, \*\*needs a yes\*\*, \*\*never\*\*/,
      /every one produced the warning[\s\S]{0,60}only[\s\S]{0,20}two[\s\S]{0,20}stopped/,
      /ends the turn/,
      /yesterday's yes does not carry/,
      /Do not take any external action/,
    ],
  },
  recall: {
    path: "../tracks/recall-starter.md",
    patterns: [
      /memory-index\.md/,
      /one fact per file/i,
      /not found[\s\S]{0,40}(is a|correct answer|legal answer)/i,
      /never append a correction/i,
      /absolute date/i,
      /Do not take any external action/i,
    ],
  },
  capture: {
    path: "../tracks/capture-starter.md",
    patterns: [
      /capture-<source>-<date>\.md/,
      /SAID-TO-BE-SHOWN/,
      /`text-source` or `transcript-only`, .{0,10}DEMONSTRATED.{0,10} is forbidden/,
      /retrieved_at/,
      /scope:/,
      /on-screen text/i,
      /Repetition is not corroboration/,
      /without asking me\s+first/i,
    ],
  },
  // The canonical agent-ready playbook. Copied byte-identical from the
  // content-harness artifact the reel promises — it must name the CLI's real
  // install path for agents whose PATH misses it, so runtime paths are
  // allowed here the same way they are for the skills readme.
  "content radar playbook": {
    path: "../playbooks/content-radar.md",
    allowRuntimePaths: true,
    patterns: [
      /# Content Radar/,
      /PRINT A RECEIPT FOR EVERY METERED CALL/,
      /A TIMED-OUT CALL IS STILL BILLED/,
      /flat \$0\.01 per call/i,
      /clips_tab_pinned_user_ids/,
      /partial_data/,
      /never write 0/,
      /owner-only/i,
    ],
  },
  "content radar starter": {
    path: "../tracks/content-radar-starter.md",
    patterns: [
      /playbooks\/content-radar\.md/,
      /content-radar-<date>-<topic>\.json/,
      /receipt for every metered call/i,
      /still billed/i,
      /pinned/i,
      /not the lever/i,
      /Null is not zero/i,
      /owner-only/i,
      /Do not give your agent a payment method/,
    ],
  },
  "content radar cheatsheet": {
    path: "../one-pagers/content-radar-cheatsheet.md",
    patterns: [
      /playbooks\/content-radar\.md/,
      /\$0\.01 per CALL/,
      /still billed/i,
      /pinned/i,
      /owner-only/i,
      /Literal AND/i,
    ],
  },
};

// Never permitted anywhere: real machine paths, secrets, and platform IDs.
const publicBoundaryPatterns = [
  /\/Users\//,
  /ObsidianMe/,
  /second-brain/,
  /brain\.js/,
  /WHOP_/,
  /API_KEY/,
  /BLOB_READ_WRITE_TOKEN/,
  /biz_[A-Za-z0-9]+/,
  /exp_[A-Za-z0-9]+/,
  /app_[A-Za-z0-9]+/,
  /gpt-[0-9]/i,
];

// Home-relative runtime directories. Forbidden in member-facing prose, because
// there they signal our own machine layout leaking in — but install docs have to
// name them, so an entry may opt out with `allowRuntimePaths`.
const runtimePathPatterns = [/~\/\./, /\.codex/, /\.claude/];

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

  const activeBoundaryPatterns = contract.allowRuntimePaths
    ? publicBoundaryPatterns
    : [...publicBoundaryPatterns, ...runtimePathPatterns];
  const boundaryHits = activeBoundaryPatterns.filter((pattern) => pattern.test(contents));
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
