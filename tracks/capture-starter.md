---
title: "Capture what you already consume — YouTube, Instagram, and X"
track: capture
version: 0.1.0
estimated_first_task: "10 minutes"
---

# Capture what you already consume — YouTube, Instagram, and X

You already spend hours a week on these three. The problem is not that you
consume too much. It is that none of it is still there next week.

You watched something that changed how you think about your work, and today you
can remember that it was good and not what it said. You saved a reel because the
hook was perfect and you have never opened the folder. You read a thread that
settled an argument you are about to have again in three weeks, and you cannot
find it.

This playbook is one loop that turns all three into notes you can search, quote,
and argue with later. It is the same loop each time. What changes is how each
platform lies to you, and there is a different lie on each one.

**If you are new to this:** go straight to **Your first ten-minute task**. Do it
once, on one piece of content, before reading the rest. One honest note beats a
capture system you designed for a week and never ran.

**If you want depth on a single long video** — structure, promises made and
dropped, a full claims table — that is the video playbook, not this one. This
one is about running the same discipline across everything you consume, on three
surfaces, without it becoming a job.

## The short version, for humans

**What you get:** one note per thing you consumed, in the same shape every time,
carrying what it said, what it proved, what you could not check, and where it
came from — plus the raw material kept alongside it so you can go back.

**What it costs:** about ten minutes the first time. After that it is one
instruction and a link.

**The method, in four lines:**

1. **Check whether you already have it** before spending anything on it again.
2. **Get the raw thing and save it first** — transcript, post text, frames,
   numbers. Before any summarizing happens.
3. **Stamp where it came from and what you actually got** — including what you
   did not get.
4. **Write the note, then say what it means next to everything else you already
   captured.** That last part is the whole point.

**The one trap, in one line:** your agent will confidently tell you a claim was
proven when all it had was someone saying so. Every platform section below is
about the specific way that happens there.

## What you need before you start

One AI assistant. What matters is what it can reach.

**Any assistant, no installs.** You do the fetching — copy the transcript, the
caption, the post text — and paste it in. Every method here works. Only the
convenience is missing. Start here; do not go shopping for tools first.

**An agent that can read and write files** (the terminal or editor kind) runs
this as written, saves its own notes, and is where this stops feeling like work.

**The operator version, once the loop is proving useful:** the fetching itself
becomes automatic. `yt-dlp` pulls YouTube transcripts and metadata from the
command line and is free. [Agent Reach](https://github.com/Panniantong/Agent-Reach)
is a free, open-source router that gives an agent read-only access to YouTube,
Instagram, X, Reddit, and more, reusing the browser sessions you are already
logged into — run its doctor command once to see which platforms are live for
you. Local Whisper transcribes anything with audio.

Do not install any of that yet. It removes typing, not thinking, and if the loop
is not already earning its keep by hand, automating it just produces a folder
you ignore faster.

## Hand this file to your agent

This playbook is written to be run, not just read. Give it to your assistant and
say:

```text
Read this playbook end to end, then run "Your first ten-minute task" with me.

Ask me for one link and what I want out of it, then follow the loop exactly:
check for a duplicate first, save the raw material before you summarize
anything, stamp the provenance block including what you could NOT retrieve, and
grade every claim as ASSERTED, SAID-TO-BE-SHOWN, or DEMONSTRATED.

If you only have text or a transcript, nothing may be marked DEMONSTRATED.

Show me the note before you save anything.
```

Everything below explains why each step is there, so you can tell when your
agent has quietly dropped one.

## The capture loop

### 1. Check whether you already have it

Before fetching anything, have your agent search your existing notes for the
title, the author, and the core idea. Say plainly what it found.

This is first because it is the step everyone skips and the one that pays every
time. Re-capturing something is not just wasted effort — it actively corrupts
what comes later. Two notes on the same video look like two independent sources
agreeing with each other, and you will start believing something is
well-established when you have counted one person twice.

### 2. Get the raw material, and save it before anything summarizes it

Transcript, post text, thread, caption, frames, numbers. Save it to a file
first. Then summarize.

The order is the whole point. A summary keeps the claims and destroys the
structure — the sequence, the timing, what was set up and never paid off, the
exact words of a hook. You can go back to a transcript. You cannot go back to a
summary, and the moment the summary exists nobody ever refetches the original.

Keep the raw material next to the note, permanently. It costs almost nothing to
store and it is the difference between a note you can re-examine and a note you
have to take on faith.

**If your assistant cannot save files**, this step is not cancelled — it moves.
Have it post the raw material into the chat as its own message, labelled with the
filename it should have had, before it writes a single line of summary. Then copy
that message somewhere you keep things. The discipline is the ordering, not the
filesystem: what matters is that the raw text exists in full, separately, before
anything compresses it.

### 3. Capture the numbers at the moment you capture the content

Views, likes, comments, saves, and the date you pulled them.

Engagement numbers move. A note saying a post "did well" is worthless in a
month. A note saying it had 196,861 views and 2,485 bookmarks as of a specific
date is a data point you can compare against the next one. If you are capturing
content to learn what performs, the numbers are not decoration — they are the
only thing separating this from taste.

### 4. Stamp the provenance, including what you did not get

Every capture opens with the same block:

```text
source:       <the URL>
method:       <how you retrieved it — by hand, which tool, which account>
retrieved_at: <date and time>
scope:        <what you actually got, and explicitly what you did not>
```

The last line is the one that matters and the one that will feel unnecessary.
Write it anyway. "Transcript retrieved; the linked article behind the shortlink
was not opened; replies not captured" is the sentence that stops you, three
weeks later, from treating a partial capture as the complete picture. Missing
evidence is not the same as absent evidence, and the only moment you reliably
know the difference is the moment you captured it.

### 5. Declare your modality, then grade every claim

State what you actually had access to:

- **TEXT ONLY** — post text, thread, article, caption.
- **TRANSCRIPT ONLY** — the words, none of the picture.
- **FRAMES + TRANSCRIPT** — you actually looked at the images.

Then grade every material claim as exactly one of:

| Grade | Means |
| --- | --- |
| `ASSERTED` | The source said it. |
| `SAID-TO-BE-SHOWN` | The source pointed at something — "as you can see here" — that you did not see. |
| `DEMONSTRATED` | You saw the evidence yourself and checked it. |

**On TEXT ONLY or TRANSCRIPT ONLY, `DEMONSTRATED` is forbidden.** Not
discouraged — forbidden.

This is not pedantry, it is a measured failure. Running one ten-minute video
through a transcript-only pass produced five claims an agent would happily mark
as proven, including one where it narrated the internal reasoning of a system it
had never seen. The words "as you can see right here" survive into a transcript
perfectly. The thing you were supposed to see does not. An agent reading only
the words cannot tell those apart, and it will resolve the ambiguity in the
flattering direction every single time.

Zero demonstrated claims on a transcript-only pass is the **correct** result. A
pile of them means your agent reported its own confidence instead of the
source's content.

### 6. Write the note in a fixed shape

Same sections, same order, every time, even when a section is empty — write
"none" rather than dropping it.

The fixed shape is not tidiness. Two notes with the same structure can be
compared. Two free-form summaries cannot, and the entire value of capture
arrives later, when you put forty of them side by side and ask what they agree
on.

### 7. Say what it means next to everything else

Before the note is done, answer three questions:

- What does this **confirm** that something else already told me — and were
  those two sources actually independent?
- What does this **contradict**? Name both sides, do not smooth it over.
- What should I **do**, if anything, and to which piece of my actual work?

A note that ends without this is filed, not connected. This step is the only one
that a machine cannot do for you at zero cost, which is exactly why it is the
one worth your ten minutes.

## The three surfaces, and how each one lies

Same loop. Different failure on each.

### YouTube — long, and the transcript is nearly free

The easiest of the three. Transcripts are usually available directly, and
`yt-dlp --write-sub --skip-download` pulls them from a command line.

**Automatic captions arrive tripled.** They scroll, so every line is re-emitted
with a few more words on the end. One 22-minute video pulled raw came to 18,000
words that were really 8,000. Have your agent collapse them before reading —
drop a line when the next one starts with it, then strip the repeated opening
from what is left. Do it first, because triplicated text makes one remark look
like a point hammered three times, and you will read that as emphasis later.

**The lie here is length.** An hour of talking compresses to a paragraph that
feels complete and has silently dropped the structure — what was promised in the
intro and never delivered, the point raised once and abandoned, the order the
argument was built in. Keep timestamps on every claim so you can jump back. If
you want the deep single-video treatment, use the video playbook.

### Instagram — short, visual, and the words are the least of it

The richest surface and the one where transcript-only capture is actively
misleading.

**The lie here is that the audio is the content.** On a reel, the burned-in text
on screen is usually the most important element on the entire post, and it
appears in no transcript. The hook is not what the person says in the first
three seconds, it is what is *on the screen* while they say it. Reels with no
speech at all are not empty — they are carrying everything visually.

So for anything on this surface, you need frames, not just words. Have your
agent extract keyframes — densely across the first three seconds, then at each
scene change — and actually read them alongside the transcript. Build the note
around a shot table: time range, what is on screen, the on-screen text, the
spoken words, and what that shot is *for* (hook, pattern interrupt, proof, call
to action).

A frame your agent did not look at is not evidence. If the frames only cover
part of the post, claims about the rest stay `SAID-TO-BE-SHOWN`. And always pull
the caption, the hashtags, and the numbers — a format description without
performance data teaches you nothing about whether the format works.

### X — text-native, so the trap is the opposite

Here the text is complete and the *context* is missing.

**The lie here is that you have the whole thing.** A post is a fragment by
design. The substance is often behind a shortlink, in a linked article, in the
quoted post, or in a reply thread that reverses the original claim entirely. An
agent handed the post text alone will treat that fragment as the argument.

So capture the post, its numbers, **and** name what you did not open. If the
real content is a linked article, that article is the source — go get it and say
so. The `scope` line from step 4 is doing the heaviest lifting on this surface.
One honest note that says "article text and reply snapshot retrieved; the author
makes claims about four platforms and supplies primary data for none of them" is
worth more than ten captures of tweets that sounded authoritative.

## Your first ten-minute task

Pick one thing you consumed this week and actually cared about. Any of the three
surfaces. Paste this into your agent:

```text
Help me capture one piece of content properly, so it is still useful to me in a
month.

LINK:
[Paste one YouTube, Instagram, or X link]

WHAT I WANT OUT OF IT:
[One sentence — the question you want answered, or "I don't know yet, tell me
if it was worth my time"]

Work in this order:
1. Search my existing notes for this source or its core idea. Tell me if I
   already have it. If I do, stop and say so.
2. Retrieve the raw material — transcript, post text, thread, caption — and
   save it to a file BEFORE you summarize anything. If you cannot save files,
   post it in the chat as its own message first, labelled with the filename it
   should have. If it is auto-generated captions, de-duplicate the scrolling
   repeats before you read it. Tell me exactly what you could and could not
   access.
3. Record the engagement numbers and the date you pulled them.
4. Write a provenance block: source, method, retrieved_at, and a scope line
   saying what you got AND what you did not.
5. Declare your modality: TEXT ONLY, TRANSCRIPT ONLY, or FRAMES + TRANSCRIPT.
6. Answer my question, quoting the source with timestamps where they exist.
7. Build a claims table. Grade each claim ASSERTED, SAID-TO-BE-SHOWN, or
   DEMONSTRATED. If your modality is TEXT ONLY or TRANSCRIPT ONLY, nothing may
   be DEMONSTRATED.
8. List what you could not verify — separately from what is false.
9. End with: was this worth my time, what does it change, and one next action.

Save it as capture-notes.md, keeping the raw material alongside it.

Rules:
- Do not summarize before saving the raw material.
- Do not mark anything DEMONSTRATED that you did not see yourself.
- Do not fill an empty section with something plausible. Write "none."
- Show me the note before saving anything.
- Do not post, share, upload, download, or contact anyone without asking me
  first.
```

The saved `capture-notes.md`, with the raw material sitting next to it, is your
first receipt.

## Make it a skill, not a one-off

Pasting a prompt works once. What you want is a named thing you can point at any
link, that returns the same shape every time.

**The finished version is in this repository, free:** [`skills/ingest`](../skills/ingest/SKILL.md).
It is the whole loop above plus the synthesis pass — dedup, provenance, modality,
claim grading, the shot table, tiered insights, convergence calls — as one
installable file, with the frame-extraction script alongside it. Install
instructions per assistant are in [skills/README.md](../skills/README.md). Set
your three paths, and it runs.

Take that one. It is the same skill this method was built with, not a
demonstration version.

If your assistant uses a format that file does not fit, build your own from the
same spec — paste this:

```text
Write me a reusable skill I can invoke on any link.

Call it: ingest

WHEN IT RUNS: whenever I give you a YouTube, Instagram, or X link and ask you
to capture, ingest, or take notes on it.

WHAT IT DOES, in order:
1. Check my existing notes for a duplicate. Stop if it exists.
2. Retrieve raw material and save it before summarizing.
3. Record engagement numbers with the retrieval date.
4. Write the provenance block, including a scope line for what was NOT
   retrieved.
5. Declare modality: TEXT ONLY / TRANSCRIPT ONLY / FRAMES + TRANSCRIPT.
6. Answer my question with quotes and timestamps.
7. Build the claims table with grades.
8. Mark what is unverified.
9. State convergence with, and contradiction of, my existing notes.
10. Give a verdict and one next action.

PER-SURFACE RULES to write into the skill:
- Instagram: read keyframes, not just the transcript. Build a shot table with
  on-screen text. Never call a reel empty because it has no speech.
- X: name what was not opened — linked articles, quoted posts, reply threads.
  If the substance is in a linked article, that article is the source.
- YouTube: keep timestamps on every claim.

OUTPUT CONTRACT — always produce a file with exactly these sections, in this
order, even when a section is empty:

  # capture: <title>
  Provenance (source, method, retrieved_at, scope)
  Modality
  Numbers at retrieval
  Question
  ## The answer          (quoted, with timestamps where they exist)
  ## Claims              (table: claim, location, grade, confidence)
  ## Unverified
  ## Convergence and contradiction
  ## Verdict and next action

Claim grades are exactly: ASSERTED, SAID-TO-BE-SHOWN, DEMONSTRATED.

HARD RULES:
- Never invent or reconstruct a transcript. If retrieval fails, say so and tell
  me how to fetch it myself.
- On TEXT ONLY or TRANSCRIPT ONLY, nothing may be DEMONSTRATED.
- Never drop a section. Write "none."
- Never discard raw material after writing the note.
- Never post, share, upload, or download without asking me first.

Write the skill in the format my assistant uses for saved instructions, show it
to me before saving, then tell me how to invoke it.
```

After that, the whole loop is one word and a link.

## Going further: the roster

Once single captures are routine, stop capturing whatever floats past you.

Pick five to ten accounts or channels that genuinely matter to your work, across
all three surfaces. Capture them on a schedule instead of on impulse. Then the
question stops being "what did this one say" and becomes the one you actually
want answered:

```text
I have captures from several sources on the same topic. Help me find what is
actually there.

CAPTURES:
[Paste them, or point me at the folder]

Work in this order:
1. List claims appearing in more than one capture, and name which. Count
   corroboration only when the sources are genuinely independent.
2. List direct contradictions, with the location of both sides.
3. Separate claims resting on a demonstration from claims resting on someone
   saying so.
4. Name what everyone assumes and nobody argues for.
5. Tell me what I should believe more strongly, what to drop, and what is still
   open.

Rules:
- Repetition is not corroboration. Five people repeating one original source is
  one source.
- Do not smooth over a contradiction to make the synthesis cleaner.
- Say when the evidence genuinely does not settle it.
- Do not take external action for me.
```

That question is unanswerable from memory and trivial from forty structured
notes. It is the entire reason to capture in a fixed shape.

## What this is not

Be clear-eyed about the ceiling.

This gives you **capture**: honest, checkable, comparable notes, one per thing
you consumed. That is real and it is half.

The problem with capture is that its value grows slowly and its cost does not.
Ten notes is a folder you browse. Forty is a folder you stop opening, and you go
back to searching the web for things you already have a verified answer to
sitting on your own disk.

The second half is retrieval — something that reads your captures back to you at
the moment they are relevant, without you remembering they exist. Do not build
that yet. Build it when the folder is big enough to be annoying, because until
then you will be optimizing retrieval over an archive too small to have taught
you what you actually reach for.

Get to annoying first. That is the milestone.

## Common failure modes

- Summarizing before saving the raw material, and losing the original forever.
- Reading auto-captions raw, so one remark counted three times reads as emphasis.
- Skipping the raw-material step entirely because the assistant cannot save files.
- Capturing the same source twice and reading it as two sources agreeing.
- Grading a claim `DEMONSTRATED` from a transcript.
- Treating an Instagram reel as its audio and missing the text on screen.
- Capturing an X post whose real content was behind a link nobody opened.
- Recording that something "performed well" without the numbers or the date.
- Writing "not mentioned" as if it meant "not true."
- Free-form notes with a different shape each time, which cannot be compared.
- Capturing on impulse instead of from a roster, so the archive has no shape.
- Building automation before the manual loop has proven it earns its keep.

## Done means

- One note exists per captured source, in one fixed shape.
- The raw material is saved alongside every note and was saved first.
- Every note carries source, method, retrieval date, and an explicit scope line
  naming what was not retrieved.
- Modality is declared, and no claim is graded above it.
- Engagement numbers carry the date they were pulled.
- Unverified material is visible and separated from what is false.
- Every note says what it confirms, what it contradicts, and what to do.
- External actions still require your approval.
