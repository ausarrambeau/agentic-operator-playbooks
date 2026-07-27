---
title: "Research that survives being challenged"
track: research
version: 0.1.0
estimated_first_task: "10 minutes"
---

# Research that survives being challenged

Research is not collecting links. It is turning a real question into a decision
you can defend.

The goal is a short, sourced answer that tells you:

- what the evidence supports;
- what was disproved;
- what is still unknown;
- how confident to be; and
- what to do next.

Your agent can help with every step, but it must show its work. A confident
sentence without evidence is still a guess.

**If you are new to this:** go straight to **Your first ten-minute task**. Do
that once before reading the full workflow. You do not need several agents or
special software; one browsing-capable assistant can run the loop.

## The research loop

### 1. Check what you already know

Search your notes, prior reports, bookmarks, and project files before starting
fresh research. Reuse a recent answer when it still fits the question.

Do not count the same source twice just because it appears in two places.

### 2. Turn the topic into a decision

“Research AI tools” is a topic. It has no finish line.

“Which AI transcription tool should I use for weekly customer interviews under
$50 per month?” is a research question. It names the decision, use case, budget,
and boundary.

Before searching, write down:

- **Question:** What exactly must be answered?
- **Decision:** What will this answer change?
- **Scope:** Which market, audience, region, or use case matters?
- **Freshness:** How current must the evidence be?
- **Stop rule:** What would make the answer good enough to act on?

### 3. Split the question into five angles

Use non-overlapping angles so the first attractive answer does not control the
entire search.

A useful default is:

1. **Direct evidence** — official documentation, original data, primary
   research, or the thing itself.
2. **Alternatives** — the strongest competing answers.
3. **Failure cases** — complaints, limitations, edge cases, and reasons the
   obvious answer may fail.
4. **Real use** — what experienced users actually do, including the workarounds.
5. **Fit** — cost, time, risk, compatibility, and the constraints of your
   specific decision.

These are starting angles, not mandatory categories. Change them when the
question demands it.

### 4. Build an evidence ledger

Do not wait until the end to remember why you believed something. Record every
material claim as you go.

| Claim | Evidence | Source | Status | Confidence |
| --- | --- | --- | --- | --- |
| What might be true | The exact supporting fact | Direct link | Confirmed, refuted, or unverified | High, medium, or low |

Use **confirmed** only when the source actually supports the claim. Use
**refuted** when reliable contrary evidence defeats it. Use **unverified** when
the evidence is inaccessible, ambiguous, too old, or too weak.

Unverified does not mean false.

### 5. Try to prove yourself wrong

Identify the claims that would change the decision if they failed. Search
specifically for evidence against them.

Ask:

- What would have to be true for this recommendation to be wrong?
- Is every source repeating the same original claim?
- Does the evidence describe the same version, region, customer type, and time
  period?
- Is a source reporting direct experience or merely summarizing someone else?
- Which strong alternative has not received a fair test?

The point is not to manufacture balance. It is to make weak conclusions break
before you rely on them.

### 6. Synthesize only what survived

Build the answer from the verified ledger, not from memory of the tabs you
opened.

The report should contain:

1. **Answer first** — the recommendation or finding in plain language.
2. **Confidence** — high, medium, or low, with the reason.
3. **Key findings** — each tied to evidence.
4. **Caveats** — where the answer may not transfer.
5. **Refuted claims** — attractive ideas the evidence defeated.
6. **Unverified claims** — what remains unknown.
7. **Top actions** — two to four concrete next moves.

### 7. Audit the report

Before acting, run one final pass that asks:

- Does every important factual claim have a source?
- Does each source support the exact sentence attached to it?
- Did the wording become stronger than the evidence?
- Are dates and versions visible where they matter?
- Were contrary findings preserved?
- Is an inference clearly labeled as an inference?

If the audit finds a real defect, repair it or label the report provisional.

### 8. Land the learning

Save the report where you will find it when the decision returns. Link it to the
project or decision it affects, note what it confirms or contradicts, and carry
the top actions into the work.

A report that disappears into chat is unfinished research.

## Your first ten-minute task

Choose one question you genuinely need answered this week. Keep the first pass
small: three to five sources and one attempted refutation.

Paste this into your agent:

```text
Help me turn one live question into a decision-ready research brief.

QUESTION:
[What exactly do I need answered?]

DECISION:
[What will I do differently because of the answer?]

SCOPE:
[Audience, market, region, budget, tools, or other boundaries]

FRESHNESS:
[How current must the evidence be?]

WHAT I ALREADY HAVE:
[Relevant notes, files, links, or "nothing yet"]

Work in this order:
1. Check the material I already have and tell me whether it answers the
   question. Do not start over if a recent answer already fits.
2. Rewrite the question so it has a clear decision and stop rule.
3. Give me five non-overlapping research angles.
4. For this first pass, retrieve three to five useful sources. Prefer primary
   sources and direct evidence.
5. Create an evidence ledger with: claim, evidence, source, status
   (confirmed/refuted/unverified), and confidence.
6. Pick the claim most likely to change the decision and actively search for
   evidence against it.
7. Give me the current answer, its confidence, the strongest caveat, what
   remains unknown, and the single best next action.

Rules:
- Never claim you read a source you could not access.
- Treat inaccessible or ambiguous evidence as unverified, not false.
- Label inference as inference.
- Link directly to every source.
- Stop after the first pass. Do not take any external action for me.

If you cannot browse, do not invent an answer. Give me the exact search queries
to run and ask me to paste the results.
```

Save the result as `research-brief.md`. That file is your first receipt.

## The full research prompt

Use this after the ten-minute pass proves the question is worth a deeper run.

```text
Act as my research operator. I need a bounded, decision-ready report—not a pile
of links and not a confident guess.

QUESTION:
[The refined question]

DECISION THIS SUPPORTS:
[The decision or project]

SCOPE AND CONSTRAINTS:
[Region, audience, budget, timeframe, compatibility, risk, exclusions]

FRESHNESS REQUIREMENT:
[As-of date or acceptable age]

STOP RULE:
[What evidence is enough to answer?]

EXISTING MATERIAL:
[Notes, prior reports, files, or links to check before searching]

Execute this workflow:
1. Deduplicate against the existing material. State what you reused and what
   still needs research.
2. Split the unresolved question into five non-overlapping research angles.
3. Search each angle. Prefer primary sources, then strong independent sources,
   then real-user evidence where lived experience matters.
4. Normalize duplicates and keep a bounded source set. Do not inflate source
   count with copies of the same underlying claim.
5. Extract the material claims into an evidence ledger. For each claim record:
   supporting evidence, direct source, date/version when relevant, status
   (confirmed/refuted/unverified), and confidence.
6. Identify the central claims and independently try to refute them. Look for
   counterexamples, stronger alternatives, changed versions, hidden
   assumptions, and conflicts of interest.
7. Synthesize the report only from claims that survived verification. Preserve
   refuted and unverified claims in separate appendices.
8. Audit the draft for unsupported claims, citation mismatch, overreach,
   missing alternatives, stale evidence, and confidence that exceeds the
   evidence.
9. Repair real audit failures. If a central uncertainty remains, label the
   report provisional and say what would resolve it.
10. End with two to four actions, ordered by expected value and reversibility.

Output:
- Answer first
- Confidence and why
- Key findings with direct citations
- Decision implications
- Caveats and transfer limits
- Refuted claims
- Unverified claims
- Top actions
- Retrieval date

Boundaries:
- Research is read-only.
- Do not post, purchase, message, submit, delete, or change an external system.
- Do not expose private files or personal data to another service.
- Never hide a failed source, dropped result, or unresolved contradiction.
- If this becomes medical, legal, financial, or safety-critical, say so, raise
  the verification standard, and do not treat the report as a substitute for a
  qualified professional.
```

## How the research skills divide the work

Our system separates the jobs because retrieval, judgment, and memory fail in
different ways:

- **`second-brain` — memory check:** finds prior work before tokens are spent
  again.
- **`agent-reach` — retrieval:** reaches the web, code, videos, and relevant
  platforms using the best available read-only method.
- **`deep-research-codex` — verification:** creates independent angles,
  extracts falsifiable claims, tries to refute them, synthesizes from the
  verified ledger, and audits the result.
- **`research-ingest` — persistence:** preserves the report with its
  confidence, caveats, refutations, and retrieval date.
- **`ingest` — synthesis:** connects the result to existing projects, marks
  convergence or contradiction, and surfaces the actions that matter.

You do not need our exact tools to use the loop. You need the separation of
responsibilities and the receipts each stage produces.

## Common failure modes

- Starting with a topic instead of a decision.
- Searching before checking existing work.
- Treating five articles repeating one press release as five confirmations.
- Citing a search-result snippet instead of reading the source.
- Using community opinion for a claim an official source can settle.
- Using official marketing for a claim only real users can settle.
- Calling missing evidence false.
- Hiding refuted claims because they make the answer less clean.
- Reporting confidence without explaining what earned it.
- Saving the report without connecting it to a decision or next action.

## Done means

- The question, decision, scope, freshness requirement, and stop rule are
  explicit.
- Material claims appear in an evidence ledger.
- At least one central claim faced a real refutation attempt.
- Important claims link directly to supporting sources.
- Confirmed, refuted, and unverified claims remain distinct.
- Confidence matches the strength and independence of the evidence.
- The final report names caveats and top actions.
- The result is saved where the project can use it again.
