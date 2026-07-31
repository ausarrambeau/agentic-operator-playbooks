---
name: ingest
description: Batch knowledge ingestion with a mandatory synthesis close-out — turn videos, reels, posts, articles, and papers into checkable notes, then extract ranked insights, cross-link them to your active work, and update a running synthesis. Use whenever you are handed one or more sources to ingest, summarize, or "add to my notes" — even a single link. Storage alone is never done.
---

# Ingest — batch ingestion + forced synthesis

**The standing rule:** AI-summarized storage is the commoditized half. Any model
can turn a video into a paragraph. The value is application and connection — what
this source means next to everything else you already know, and what you should
do about it.

An ingestion batch is **not done** when the notes are written. It is done when
insights are ranked, cross-linked, and surfaced.

If you stop after the notes, you did the half that a machine already does for
free and skipped the half that makes it yours.

## Where things go

This skill is storage-agnostic. It needs three places, and it does not care what
you call them or what tool they live in — a folder of Markdown, a notes app, a
repository, a wiki. Set these once at the top of your own copy:

| Place | Holds | Suggested |
| --- | --- | --- |
| **Notes** | One note per source | `notes/capture-<source>-<date>.md` |
| **Raw** | Transcripts, frames, metadata, post JSON | `raw/<YYYY-MM-DD>-<id>/` |
| **Synthesis** | The ranked, cross-source layer | `synthesis/` |

The synthesis folder has a fixed internal shape, and it matters more than the
other two because it is the part that survives scale:

- `synthesis/_index.md` — a thin manifest: batch number → shard file → topic.
  Start here. Never let this file grow bodies.
- `synthesis/B<nnn> <topic-slug>.md` — one shard per batch, zero-padded.
- `synthesis/Tier1-01.md`, `Tier2-01.md`, `Tier3-01.md` — the live ranked heads,
  newest first. Higher part numbers are archive.
- `synthesis/B000 standing rule and dispositions.md` — the standing rule plus one
  paragraph per batch recording what was admitted and what was skipped.

**Why sharded rather than one long file:** a single running synthesis note is
fine for ten batches and unreadable at a hundred. Worse, it eventually becomes
too large to load, and the frontmatter of a file that big tends to break in ways
nobody notices for months. Shard from the start. It costs nothing early and
saves a migration later.

## Procedure

### 0. Dedup check first

Before ingesting anything, check whether each source already has a note. Search
your notes for the title, the author, and the core claim. Skip duplicates and say
so out loud.

This is step zero because re-ingesting does more than waste effort — it
**corrupts the synthesis**. Two notes on one source look exactly like two
independent sources agreeing, and convergence is the single most persuasive
signal in the whole system. Double-counting one voice is how you end up confident
about something one person said once.

### 1. Ingest each source → one note

Produce a note with frontmatter (`description`, `source`, `created`, `modality`)
and a summary that captures **claims and evidence, not topics**. "He talked about
pricing" is not a note. "He claims a 3-tier price ladder outperformed a single
price by 40%, asserted, no data shown" is a note.

Timestamped chapters for anything with a timeline.

The note carries exactly these sections, in this order, even when one of them is
empty — write "none" rather than dropping it:

```text
# capture: <title>
Provenance (source, method, retrieved_at, scope)
Modality
Numbers at retrieval
Question
## The answer          (quoted, with timestamps where they exist)
## Claims              (table: claim, location, grade)
## Unverified
## Convergence and contradiction
## Verdict and next action
```

That is the same shape the capture playbook produces by hand, so notes written
either way sit in one folder and compare cleanly.

#### Declare the modality, and never grade evidence above it

Put one of these in the frontmatter of every note:

- `text-source` — article, post, thread, paper, caption.
- `transcript-only` — you had the words, not the picture.
- `frames+transcript` — you actually looked at the images.

Then grade every material claim as exactly one of:

| Grade | Means |
| --- | --- |
| `ASSERTED` | The source said or wrote it. |
| `SAID-TO-BE-SHOWN` | The source pointed at something — *"as you can see here"*, *"this is that dashboard"* — that you did **not** see. |
| `DEMONSTRATED` | You read the frames, or the source document, and checked it yourself. |

**On a `transcript-only` or `text-source` ingest, `DEMONSTRATED` is forbidden.**

This is not pedantry, it is a measured failure. Deixis survives into a transcript
but the evidence does not: an agent reading captions alone hits "as you can see
right here" and marks the claim proven. Tested on a single ten-minute video, that
produced **five** claims wrongly upgradeable this way, one of which narrated the
internal reasoning of a system nobody had looked inside.

Zero demonstrated claims on a transcript-only pass is the **correct** result. A
pile of them is the agent reporting its own confidence instead of the source's
content. A note that says `DEMONSTRATED` is what every future reader trusts most,
and once written, the provenance is gone forever.

#### Retain the raw material — and save it first

The summary keeps the claims and destroys the structure. The transcript is where
hook timing, open loops, and proof sequencing live. If you ever want to study
*format* rather than *content*, the summary is useless and the raw material is
everything.

For every source: save the transcript (in whatever form you fetched it) and
structured metadata to the raw folder **before** writing the note. A note whose
transcript was read and discarded is a knowledge entry that can never become a
format receipt.

Stamp every capture with provenance:

```text
source:       <URL>
method:       <how you retrieved it — by hand, which tool, which account>
retrieved_at: <date and time>
scope:        <what you got, and explicitly what you did NOT>
```

The `scope` line is the one that feels unnecessary and is not. "Transcript
retrieved; linked article not opened; replies not captured" is what stops you,
weeks later, from reading a partial capture as the whole picture. Missing
evidence is not absent evidence, and the moment of capture is the only time you
reliably know which one you have.

Where engagement numbers exist, record them **with the date you pulled them**.
Numbers move. "It did well" is worthless in a month; "196,861 views and 2,485
bookmarks as of the 29th" is a data point you can compare.

Where they do not exist, record that in their place, with the reason:

```text
numbers: not available — post read logged out, counts not shown
```

Logged-out reads, plain articles, private or unlisted posts, and fetches that
return media and captions but no counts are all normal. Partial goes per metric:
name what you got and what blocked the rest. **Never estimate a number, infer one
from comparable posts, or carry one over from another capture or another date.**
An absent numbers line reads as a skipped step, and an invented number is
indistinguishable from a real one the moment it is written down.

#### Cost discipline when running a batch

If you parallelize three or more sources across subagents, **set the model
explicitly on every subagent.** Subagents inherit the session model silently,
and a large batch can quietly cost several multiples of what you expected. This
is worth stating in the instruction every time; it is the single easiest way to
turn a routine batch into a bill you notice.

For headless CLI calls in a loop (transcript fetchers, downloaders): set a
per-call timeout and bail after three consecutive failures, so one dead link does
not hang the whole run.

### 1b. Video path — when visuals carry the meaning

For reels, shorts, TikToks, and any format analysis: a transcript-only ingest
reads the words and misses the format — and worse, it will **invent** the format
if the speaker narrates it, because "as you can see here" is indistinguishable
from evidence once it is in a transcript.

Running the prep below is what earns the right to mark anything `DEMONSTRATED`:

```bash
<skills-dir>/ingest/scripts/video-prep.sh <url-or-file> <workdir>
```

Resolve that path against the folder this file is installed in, not against
wherever your shell happens to be standing — `<skills-dir>` is your assistant's
skills directory, and the relative path alone will miss from anywhere else.

It produces `frames/` (scene-change keyframes plus a dense burst over the 0–3s
hook window, every filename carrying its own timestamp), `transcript.json`
(timestamped segments), and `metadata.json` (duration, cuts per second, average
shot length — the editing-pace fingerprint).

Then **read the frames in timestamp order alongside the transcript**, and build
the note around a **shot table** — one row per shot:

| Time | Visual | On-screen text | Spoken | Sound | Function | Editing |
| --- | --- | --- | --- | --- | --- | --- |

`Function` is one of: hook, pattern interrupt, proof, call to action.

Above the table, put two things: the **hook microscope** (what was on screen as
each word of the first ~3 seconds landed) and the pacing stats from
`metadata.json`.

**On-screen text is usually the most important element on the entire post**, and
it appears in no transcript. Read it off the frames.

Rules of this path:

- **A frame you did not read is not evidence.** Frame extraction is capped and
  the hook burst only covers the first seconds, so parts of a video have no
  frames even here. Claims resting on those stretches stay `SAID-TO-BE-SHOWN`.
  Anything genuinely illegible at source resolution is `UNVERIFIED` — not false,
  not confirmed. Say which it is instead of rounding to the tidier answer.
- `speech_segments: 0` means music-only. Analyze the visual and text layers on
  their own terms. **Never report "no content."**
- Pull post context too — caption, hashtags, engagement. A format description
  without performance numbers teaches you nothing about whether the format works.
- Frames make an agent more expensive. Keep one agent per video and let the frame
  cap do its job.

### 2. Synthesis pass — mandatory, and this is the deliverable

Read the new notes **plus** the relevant synthesis context: `_index.md` and the
current tier heads. Not the whole corpus — that is what the index is for.

**On the first run none of that exists yet.** Create it before you read it: an
`_index.md` holding the manifest table header and a "latest batch" line, empty
`Tier1-01.md`, `Tier2-01.md` and `Tier3-01.md` heads, and
`B000 standing rule and dispositions.md` carrying the standing rule from the top
of this file. Then continue as below, starting at `B001`. A missing scaffold
file is never a reason to skip the synthesis pass — it is a file you have not
made yet.

Then write the batch in:

1. **New shard** `synthesis/B<nnn> <topic-slug>.md`, with short single-line
   frontmatter (`title`, `description`, `batches`, `date-range`,
   `category: synthesis-shard`) and a body opening
   `## Batch B<nnn> — <topic> (<date>)`.
2. **One row appended to `_index.md`**: `| B<nnn> | [[B<nnn> <slug>]] | <one-line topic> |`,
   and update its "latest batch" line.
3. **Tier bullets prepended to the tier heads.** New items go at the **top** of
   `Tier1-01` / `Tier2-01` / `Tier3-01`. When a head passes ~30 KB, renumber: the
   old head becomes the next part number, a fresh `TierN-01` head is created, and
   `_index.md` gets a row. Tier files stay newest-first.
4. **A disposition paragraph** appended to `B000 …`: what was admitted, what raw
   material was retained, what the dedupe found.

Requirements that make it synthesis rather than a list:

- **Tiers, not a pile.** Tier 1 = act on these. Tier 2 = schedule these. Tier 3 =
  file for context. Rank by actionability, by leverage on **your** actual active
  projects, and by evidence quality. An insight that is fascinating and touches
  nothing you are working on is Tier 3, however good it is.
- **Mark the batch.** Tag every addition with its batch marker — **[B132]** — so
  a tier bullet is always traceable back to the shard and the source that
  produced it.
- **Convergence and contradiction calls.** When a new source independently
  corroborates or disputes an existing insight, say so on that insight's line:
  "**[B132] corroborated:** …" or "**open question to resolve empirically:** …".
  Count corroboration only when the sources are genuinely independent —
  **repetition is not corroboration**; five people repeating one original source
  is one source. This cross-source judgment is the part storage cannot do, and it
  is the reason the whole procedure exists.
- Every insight ends with a link back to its source note.
- **Frontmatter discipline.** Keep every value short and single-line. Never paste
  multi-sentence prose containing quote marks into a quoted scalar — that one
  habit can make a file's frontmatter unparseable for months without anyone
  noticing. Narrative belongs in the body.

### 3. Links both ways

New notes link out to the projects and topics they bear on. The synthesis links
back to the new notes. **A note with no links is filed, not connected** — and
filed is the state notes rot in.

### 4. Surface the top actions

End your final message with the top 2–4 actionable items from the batch, one line
each, grounded in which piece of real work it moves.

This is the part a human actually reads. Everything above earns it.

## Definition of done

- [ ] Every non-duplicate source has a note with frontmatter and a declared modality
- [ ] No claim is graded above its modality; `DEMONSTRATED` appears only where frames or the source document were actually read
- [ ] Raw material saved **before** the note was written, with provenance and a scope line
- [ ] Engagement numbers recorded with their retrieval date, or marked not available with the reason — never estimated
- [ ] Synthesis updated in the shard folder: new `B<nnn>` shard, `_index.md` row, tier heads re-ranked with batch markers, disposition appended
- [ ] Convergence and contradiction calls made against existing insights
- [ ] Links wired in both directions
- [ ] Top actions surfaced in the final message

## Boundaries

- Never invent or reconstruct a transcript. If retrieval fails, say so and give
  the steps to fetch it by hand.
- Never invent an engagement number. Record what the platform showed, or record
  that it showed nothing and why.
- Never discard raw material after writing a note.
- Never drop a required section. Write "none."
- Never post, share, upload, download, purchase, or contact anyone without
  explicit approval, each time.
