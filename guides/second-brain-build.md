# The Second Brain Build

Andrej Karpathy published a pattern for giving an agent durable memory: stop making it re-derive understanding from raw files every session, and compile what it learns into a persistent, interlinked markdown wiki that it maintains itself. The pattern is right. This guide explains how it works, where it breaks, and gives you the prompt that builds one.

Every number below was measured on 2026-07-28 against a live instance of this pattern running at **4,757 indexed files** — including the parts that went wrong. Nothing here is estimated from the guide's own claims.

This guide is also a build brief: copy the prompt in section iv, paste it into the coding agent you already use, and go. It works in one session.

## i. What you're actually building

Three directories and a rules file. That's the whole architecture, and its boringness is the point.

| Layer | Holds | The rule |
|---|---|---|
| `raw/` | Source material, verbatim | Immutable. Never edited, by you or the agent. |
| `wiki/` | Notes the agent writes and maintains | Every note cites what in `raw/` it came from. |
| `SCHEMA.md` | The operating rules | Reloaded at the start of every session. |
| `index.md` | Human-readable front door | What exists, and what's missing. |
| `log.md` | Append-only operation timeline | Date, operation, target, result. Parseable. |

The split between `raw/` and `wiki/` is the load-bearing decision. `raw/` is evidence; `wiki/` is interpretation. Keeping them apart is what lets you re-derive a wrong conclusion six weeks later instead of inheriting your own earlier summary as if it were a source. Collapse the two and the wiki becomes unfalsifiable — every claim in it is supported by another claim in it.

Three operations run the whole system: **ingest**, **query**, **lint**.

Ingest is where the work is, and step three is where people quit: after writing a note for a new source, the agent must go back and update the 5–15 existing notes it touches. Skip that and you don't have a wiki, you have a folder of orphans with good intentions.

## ii. The pattern, pinned

The primary source is Karpathy's gist, pinned here by revision so you can check what this guide was built against rather than taking its word:

| | |
|---|---|
| Source | `gist.github.com/karpathy/442a6bf555914893e9891c11519de94f` |
| Revision | `ac46de1ad27f92b28ac95459c782c07f6b8c964a` |
| sha256 | `dc3efe98ae62f23dd08acad13aba2e95287beb20b6bec2f4af0423557fe37401` |

Read it. It's short, and it's the better document for *why* — this guide exists for *what happens at scale*, which the gist deliberately doesn't cover. It offers no codebase, no evaluator, and no measured maintenance benchmark, and says so.

## iii. Where it breaks — measured, not predicted

The gist argues that LLMs make maintenance nearly free and don't forget cross-references. Here is that claim checked against a live instance of the pattern, one health sweep, 2026-07-28:

| Check | Reading |
|---|---|
| Indexed files | 4,757 (1,053 of them hand-written notes) |
| Retrieval quality, last recorded eval | 41/43 — 95.35% |
| Mirror-drift paths found | **15** |
| Canon review queue | **35**, and it had grown for seven straight days |
| Second-tier pipeline output | stale by ~**132 hours** |
| Third-tier pipeline output | stale by ~**238 hours** |
| Raw extraction queue | 3 pending, 1 failed |

That is not a broken system — retrieval was healthy and no duplicate documents were found. It's a system **compounding with maintenance debt**, which is a different and more useful thing to know about. The debt is visible only because deterministic checks exist to surface it. Without them the same instance would have looked perfect and been quietly wrong.

So take the pattern and leave the optimism. Two specific corrections:

**The hand-maintained `index.md` is the first thing to go.** It works while the wiki fits in context. Past that it stops being a front door and becomes a stale artifact the agent reads and trusts. Karpathy names this himself and points at hybrid local search as the upgrade path — he's right, and it arrives sooner than you expect.

**An agent that resolves contradictions silently will propagate one bad extraction across every note it touches.** Lint should *report* conflicts, not fix them. Picking a side is a judgment call, and the moment it happens invisibly you've lost the ability to find the error later.

## iv. The build brief

Paste this into your agent, in an empty directory.

```
Set up a persistent knowledge wiki that you maintain across sessions,
following Andrej Karpathy's LLM Wiki pattern. Build the scaffold now,
then operate it by the rules below in every future session.

CREATE THIS STRUCTURE

  raw/          Immutable source material. Never edit a file here.
  wiki/         Notes you write and maintain. This is your memory.
  SCHEMA.md     The rules below, so a future session can reload them.
  index.md      Human-readable front door: what exists and where.
  log.md        Append-only timeline of every operation you perform.

THREE LAYERS, AND WHY THE SPLIT MATTERS

  raw/ is evidence. wiki/ is interpretation. Keeping them apart is what
  lets you re-derive a wrong conclusion later instead of trusting your
  own earlier summary as if it were a source.

EVERY WIKI NOTE CARRIES FRONTMATTER

  ---
  source: <path in raw/, or a URL, or "synthesis">
  created: YYYY-MM-DD
  updated: YYYY-MM-DD
  evidence: primary-source | secondary | synthesis | assumption
  ---

  Link related notes with [[wikilinks]]. A link to a note that does not
  exist yet is fine — it marks something worth writing.

THREE OPERATIONS

  INGEST <source>
    1. Copy the source verbatim into raw/. Never edit it.
    2. Write or update a note in wiki/ that summarizes it, citing the
       raw/ path.
    3. Update the 5-15 existing notes it touches — new links, corrected
       claims, sharpened distinctions. This step is the whole point;
       skipping it turns the wiki into a folder of orphans.
    4. Append one line to log.md.

  QUERY <question>
    Answer from wiki/, citing the notes you used. If the answer required
    real work to assemble, save it as a new note. If the wiki cannot
    answer it, say so and record the gap in index.md — do not guess and
    do not fill the hole from your own general knowledge without
    labelling it evidence: assumption.

  LINT
    Sweep for: contradictions between notes, notes stale relative to
    newer sources, orphans nothing links to, broken [[links]], and
    claims with no source. Report them. Do not auto-fix a contradiction
    — surface it and ask, because picking a side silently is how one
    bad extraction propagates.

STANDING RULES

  - Never let a claim you wrote become evidence for a later claim
    without re-checking raw/. That loop is how a wiki compounds its own
    errors.
  - Anything you did not read, you do not summarize.
  - log.md is append-only and parseable: date, operation, target, result.

OPTIONAL VIEWER

  This scaffold is already a valid Obsidian vault — plain markdown,
  [[wikilinks]], YAML frontmatter, nothing proprietary. Open the folder
  in Obsidian and you get the link graph, backlinks, and search for
  free. It is a viewer, not a requirement: everything here works from a
  terminal, and nothing in the wiki depends on it.

Now create the structure, write SCHEMA.md containing these rules, and
initialize index.md and log.md. Then tell me what to ingest first.
```

Three things in that prompt are additions to Karpathy's design, and they exist because of section iii:

- **the `evidence:` field**, so a synthesis can never be mistaken for a source later;
- **the no-self-citation rule**, which is the specific mechanism by which a wiki compounds its own errors;
- **lint reports rather than resolves**, for the reason given above.

Karpathy's design hands the wiki entirely to the agent. That's the one place worth going further.

## v. What this doesn't do

Be clear about the ceiling, because it arrives on a schedule.

This gets you a wiki that **stores and retrieves**. It does not synthesize. There are no claim-level citations, no contradiction detection beyond what lint reports by hand, no review queue standing between a model-authored claim and your canon, no evaluation harness telling you whether retrieval got worse this week.

For a few hundred notes you won't miss any of it. Somewhere north of a thousand, retrieval quietly degrades into keyword luck, and the failure is invisible — the agent still answers, just from the wrong notes. That's the wall this pattern hits, and everything in section iii is what it looks like from the inside.

Grep and read will get you further than you'd think. Then it won't.

---

*The measurements in section iii come from a live instance of this pattern maintained since 2026. If you build one, run your own health sweep before you trust it — the numbers that matter are yours, not these.*
