# Research starter — learner-path validation

Validated: 2026-07-27

This is a four-path acceptance simulation of the playbook contract. It is not a
human usability study. The purpose is to catch a broken route before the file
is wired into the Digital Twin app.

## 1. Beginner using a browsing-capable assistant

**Situation:** The member mostly chats with AI, has no research system, and
wants to answer one real question.

**Observed path:**

1. The beginner callout sends them directly to the ten-minute task.
2. The prompt asks for a question, decision, scope, freshness requirement, and
   existing material without requiring research jargon.
3. The run is bounded to three to five sources and one refutation attempt.
4. The member gets one named artifact: `research-brief.md`.

**Verdict:** PASS. The first receipt is concrete and the advanced workflow is
optional.

## 2. Member whose work is in notes or Google Docs

**Situation:** The member pastes an existing note into `WHAT I ALREADY HAVE`.

**Observed path:**

1. The prompt checks the pasted material before searching.
2. It requires the agent to say whether the existing material already answers
   the question.
3. It forbids starting over when a recent answer still fits.
4. If more evidence is needed, the pasted note becomes context rather than a
   source the agent silently discards.

**Verdict:** PASS. The route works without a repository or structured knowledge
base.

## 3. Member whose work is already in a repository

**Situation:** The member points the full prompt at relevant project files.

**Observed path:**

1. `EXISTING MATERIAL` accepts files and prior reports.
2. The first execution step separates reusable evidence from unresolved
   questions.
3. Duplicate URLs and repeated underlying claims are normalized before the
   evidence ledger is built.
4. The report is saved back into the project context instead of disappearing
   into chat.

**Verdict:** PASS. Existing project knowledge is reused before external search.

## 4. Agent without browsing

**Situation:** The member's assistant cannot open links or search the web.

**Observed path:**

1. The prompt explicitly forbids inventing an answer.
2. The agent must provide exact search queries.
3. It must ask the member to paste the results before making factual claims.

**Verdict:** PASS. The route degrades into a human-assisted evidence handoff
instead of hallucinated research.

## Publication verification

- Public repository:
  `https://github.com/ausarrambeau/digital-twin-playbooks`
- Raw playbook:
  `https://raw.githubusercontent.com/ausarrambeau/digital-twin-playbooks/main/tracks/research-starter.md`
- Raw request returned HTTP 200.
- Local and downloaded SHA-256:
  `f1020d3b22d43cbe0083d2f8a12a75438dc80c04bf3ce8b44ebfbd2e0a323dd5`

## Automated contract check

Run:

```sh
node validation/check-research-starter.mjs
```

The check covers all four route requirements, private-path and credential
markers, and balanced Markdown code fences.

