---
title: "Turn one video into notes you can still argue with"
track: video
version: 0.1.0
estimated_first_task: "10 minutes"
---

# Turn one video into notes you can still argue with

There is a video you saved weeks ago and still have not opened. There are
probably forty of them.

Your agent can watch one for you. Not skim it, not summarize it — go through it
and hand back the part you actually needed, with the receipts attached.

The trap is asking for a summary. A summary keeps the claims and throws away the
structure: the order things were said in, what was set up and never paid off,
what was asserted versus what was actually shown on screen. A summary is a
confident paragraph you cannot check. Once you have it, the video is gone.

Keep the transcript. Claims are what a video says. Structure is how it argues.
You can go back and check a transcript; you cannot go back and check a summary.

**If you are new to this:** go straight to **Your first ten-minute task**. Do
that once before reading the full workflow. You do not need special software or
several agents; one assistant that can fetch a transcript can run the loop.

## The short version, for humans

If you read nothing else on this page, read this.

**What you get:** one honest, checkable note per video — what it actually said,
with timestamps you can jump back to, what it claimed versus what it proved, and
whether it was worth your time. Not a summary.

**What it costs:** about ten minutes the first time. After that it is one
instruction and a link.

**The method, in three lines:**

1. Get the real transcript with timestamps, before anyone summarizes anything.
2. Keep three things separate: what was *said*, what was *said to be on screen*,
   and what was actually *shown*. Most notes quietly merge these, and that is
   where false confidence comes from.
3. Save it somewhere you will search later, in the same shape every time.

**The one trap:** if your assistant only has the transcript, it did not see the
video. Speakers say "as you can see here" constantly, and an assistant reading
those words will tell you the claim was demonstrated. It was not. It was
narrated. Half of this playbook exists to stop that.

## What you need before you start

You need one AI assistant. Which one matters less than what it can reach.

**If you already have a coding-capable agent** — the kind that runs in your
terminal or editor and can read and write files — you can run everything here as
written. Best experience.

**If you have a desktop or web assistant that can browse and save files**, you
can run the whole loop. You may have to hand it the transcript yourself if it
cannot fetch one.

**If you only have a browser chatbot with no file access**, you can still do
this, with one change: you fetch the transcript and paste it in, and you save
`video-notes.md` yourself by copying the output. The method works; the
convenience does not.

**If you do not have an assistant yet**, that is the first thing to fix, and it
is a ten-minute job, not a project. Pick one that can read files and browse —
the two mainstream coding agents both qualify, and either is a fine first
choice. Do not spend a week comparing them. You are choosing a starting point,
not a spouse, and everything in this playbook is written to work with whichever
you pick.

Come back here once something can read a file and fetch a page. That is the
whole prerequisite.

## Hand this file to your agent

This playbook is written to be run, not just read. Download it, give it to your
assistant, and say:

```text
Read this playbook end to end, then run "Your first ten-minute task" with me.

Ask me for the video link and the question I want answered, then follow the loop
exactly: transcript first with timestamps, declare what you actually had access
to, keep claims separate from what was only said to be on screen, and mark
nothing DEMONSTRATED that you did not see yourself.

Produce video-notes.md and show it to me before saving anything.

Do not skip the transcript step, and do not give me a summary instead.
```

That is the whole handoff. Everything below explains why each step is there, so
you can tell when your agent has quietly dropped one.

## The watching loop

### 1. Decide what the video is for

"Watch this video" has no finish line. You will get a wall of notes and use none
of it.

Before fetching anything, write down the question you want answered and what you
will do differently depending on the answer. A video watched for a decision
produces notes shaped like the decision.

If you cannot name the question, that is useful information: you may not need
the video at all.

### 2. Get the transcript, not a summary

Ask for the transcript with timestamps, and ask for it first, before any
interpretation. Verbatim, including filler and false starts.

This feels wasteful and is the whole technique. Cleaned-up text has already had
decisions made about it by something that did not know what you were looking
for.

If your agent cannot retrieve a transcript, it must say so plainly rather than
reconstructing one from the title, description, or its own prior knowledge. An
invented transcript is worse than no transcript, because it looks identical to a
real one.

**Auto-captions arrive tripled — de-duplicate before reading.** YouTube's
automatic captions scroll, so each line is re-emitted with the next few words
appended. Pulled raw, one 22-minute video came out as 18,000 words that were
really 8,000; the same sentence appears two or three times with a growing tail.
Tell your agent to collapse those before it reads anything: drop a line when the
next line starts with it, then strip the repeated opening from what remains.

It matters beyond tidiness. Triplicated text makes a point look like it was made
three times, and repetition is the signal you will later read as emphasis.

### 3. Keep the structure

Once the transcript exists, the useful questions are structural:

- What order were things introduced in?
- What was promised early and delivered late — or never?
- Where did the speaker slow down, repeat themselves, or restate a point three
  ways? That is usually where they thought the value was.
- What was said once, in passing, and never returned to?

None of this survives a summary.

### 4. Say which senses you actually had

Before anything else in this step: make your agent state, at the top of the
notes, what it actually had access to — the transcript only, the frames only, or
both.

This sounds pedantic. It is the single easiest way for these notes to become
fiction, and we found it by testing this playbook rather than by reasoning about
it.

Speakers constantly say *"as you can see right here"* and *"this is that
spreadsheet."* An agent working from a transcript alone reads those words and
concludes something was shown — and will happily record a claim as proven when
all it ever saw was a sentence claiming proof. The deixis survives the
transcript; the evidence does not.

### 5. Separate what was claimed from what was shown

Material claims come in three kinds, not two:

- **Asserted** — the speaker says it is true.
- **Said-to-be-shown** — the speaker points at something on screen, and your
  agent could not see it.
- **Demonstrated** — something visible was actually checked, by you or by an
  agent that genuinely had the frames.

A number spoken aloud is an assertion. A number read off a dashboard by
something that truly saw the dashboard is closer to evidence, and still needs a
note about what was and was not legible.

Most notes taken from captions alone will have **zero** demonstrated claims.
That is the correct and honest result. An agent reporting a pile of demonstrated
claims from a transcript-only pass is telling you about its confidence, not
about the video.

This distinction is most of what separates notes that hold up from notes that
merely sound informed.

### 6. Mark what you could not verify

Anything unreadable, ambiguous, cut off, or inaccessible is **unverified**. It
is not false, and it is not confirmed.

Missing evidence is not counter-evidence. Keep the three states distinct and
resist collapsing them for a tidier note.

### 7. Write notes you can challenge later

Every material claim should carry the timestamp it came from, so future-you can
go straight to the moment and check it.

Notes without timestamps are a summary wearing a costume.

### 8. Land it somewhere searchable

If the notes do not go somewhere you will actually search later, you have built
an expensive way to forget the same thing twice.

One folder, one naming convention, one place. The system matters less than the
fact that there is one. More on why this step is the whole game in **This is
half a system**, below.

## Your first ten-minute task

Pick one video you have been meaning to watch and one question you want it to
answer. Keep the first pass small — one video, one decision.

Paste this into your agent:

```text
Help me turn one video into notes I can check later.

VIDEO:
[Paste the link]

QUESTION:
[What do I want this video to answer?]

DECISION:
[What will I do differently depending on the answer?]

Work in this order:
1. Retrieve the transcript with timestamps. Do this before any interpretation,
   and keep it verbatim — do not clean it up or condense it yet.
2. State plainly, at the top of the notes, what you actually had access to:
   TRANSCRIPT ONLY, FRAMES ONLY, or BOTH. Be exact. This governs everything
   below it.
3. Tell me the runtime and roughly how the video is structured: what happens
   in what order, and where the sections change.
4. Answer my question directly, quoting the transcript and citing the
   timestamp for each part of the answer.
5. List the material claims. For each one, record: the claim, its timestamp,
   how confident I should be, and which of these three it is:
     ASSERTED         — said aloud
     SAID-TO-BE-SHOWN — the speaker points at something on screen that you
                        could not actually see
     DEMONSTRATED     — you genuinely saw it and checked it
   If you only had the transcript, you may not mark anything DEMONSTRATED.
   Phrases like "as you can see here" are evidence that a claim was made, not
   evidence that it is true.
6. Tell me what was promised early and never delivered, and what was mentioned
   once in passing and never returned to.
7. Mark anything unreadable, ambiguous, or inaccessible as UNVERIFIED. Do not
   treat missing evidence as false.
8. Give me the single best next action, and say whether the video was worth
   the time.

Rules:
- Never claim you watched or read something you could not actually access.
- Do not reconstruct a transcript from the title, description, or your own
  prior knowledge. If you could not get one, say so.
- Do not upgrade a claim to DEMONSTRATED because the speaker said it was on
  screen. You either saw it or you did not.
- Label inference as inference, clearly separated from what was said. Narrating
  what a system "is reasoning" is inference about a black box, not observation.
- Keep the transcript. Do not discard it once you have written the notes.
- Do not post, share, upload, or download anything on my behalf.

If you cannot retrieve the transcript, do not invent an answer. Tell me exactly
what you tried, and give me the steps to fetch it myself so I can paste it in.
```

Save the result as `video-notes.md`, with the transcript kept alongside it. That
file is your first receipt.

One note is a file you will remember. Ten is a folder you will browse. Forty is
a folder you will stop opening, and you will go back to searching the web for
things you already had a checked answer to. Keep going anyway — the point at
which this becomes a problem is the point at which it becomes valuable, and
**This is half a system** below is about what to do when you get there.

## Make it a skill, not a one-off

Pasting a prompt works once. The point is not to have watched one video — it is
to have a thing you can point at any video, that returns the same shape every
time.

Most assistants let you save a reusable instruction: a skill, a command, a
custom instruction, a saved prompt. Whatever yours calls it, the move is the
same — turn the loop above into a named capability with a fixed output.

**The output contract matters more than the wording.** A summary is whatever the
model felt like writing that day. A contract means every video you ever run
produces the same sections in the same order, which is what makes the notes
comparable later. Two notes with the same shape can be diffed. Two summaries
cannot.

**The finished version is in this repository, free:** [`skills/ingest`](../skills/ingest/SKILL.md).
It is this loop with its output contract already written, plus the synthesis pass
that ranks and cross-links notes once you have more than a few — and a script
that pulls keyframes, a timestamped transcript, and the editing pace for you.
Install instructions per assistant are in [skills/README.md](../skills/README.md).
Set the three paths at the top of it, and it runs.

Take that one. It is the same skill this method was built with, not a
demonstration version.

If your assistant uses a format that file does not fit, build your own from the
same spec — paste this:

```text
Write me a reusable skill I can invoke on any video.

Call it: ingest

WHEN IT RUNS: whenever I give you a video link and ask you to ingest, watch,
or take notes on it.

WHAT IT DOES, in order:
1. Retrieve the transcript with timestamps, verbatim. Save it.
2. Declare the modality: TRANSCRIPT ONLY, FRAMES ONLY, or BOTH.
3. Map the structure — sections and where they change.
4. Answer the question I asked, with timestamps.
5. Build the claims table.
6. Note what was promised and not delivered, and what was raised once and
   dropped.
7. Mark unverified material.
8. Give a verdict and one next action.

OUTPUT CONTRACT — always produce a file with exactly these sections, in this
order, even when a section is empty:

  # video-notes: <title>
  Source, channel, runtime, publish date, capture date
  Modality
  Question and Decision
  ## Structure          (table: time range, section)
  ## The answer         (with quoted timestamps)
  ## Material claims    (table: claim, time, kind, confidence)
  ## Promised and not delivered
  ## Mentioned once, never revisited
  ## Unverified
  ## Verdict and next action

Claim kinds are exactly: ASSERTED, SAID-TO-BE-SHOWN, DEMONSTRATED.

HARD RULES to write into the skill:
- Never invent or reconstruct a transcript. If retrieval fails, say so and give
  me the steps to fetch it myself.
- If modality is TRANSCRIPT ONLY, nothing may be marked DEMONSTRATED.
- Never drop a section from the contract. Write "none" instead.
- Keep the transcript alongside the notes. Never discard it.
- Never post, share, upload, or download anything without asking me first.

Write the skill in the format my assistant uses for saved instructions, show it
to me before saving it, and then tell me how to invoke it.
```

Once that exists, the whole loop above collapses into one instruction and a
link.

## Going further: many videos at once

Use this only after the single-video pass works. The value stops being the notes
and starts being what shows up across them.

```text
I have notes from several videos on the same topic. Help me find what is
actually there.

NOTES:
[Paste the notes, or point me at the folder]

Work in this order:
1. List the claims that appear in more than one video, and name which ones.
   Count a claim as corroborated only when the sources are independent.
2. List the claims that directly contradict each other, with timestamps for
   both sides.
3. Tell me which claims rest on a demonstration and which rest only on someone
   saying so.
4. Name what everyone assumes and nobody argues for.
5. Tell me what I now believe more strongly, what I should drop, and what is
   still genuinely open.

Rules:
- Repetition is not corroboration. Five people repeating one original source
  is one source.
- Do not smooth over a contradiction to make the synthesis cleaner.
- Say when the honest answer is that the evidence does not settle it.
- Do not take any external action for me.
```

## This is half a system

Be clear-eyed about what you have at this point, because the gap is the whole
reason most people's notes quietly rot.

What the loop above gives you is **capture**. One video in, one honest,
checkable note out, in a fixed shape. That is genuinely useful and it is
genuinely half.

The problem with capture is that its value is linear and its cost is not. Note
forty videos and you have forty files you must remember exist, remember to
consult, and remember which one held the thing you half-remember. The failure is
not that you never wrote it down. The failure is that six weeks later you cannot
find it, so you search the web again and lose the fact that you already had an
answer — one you had already checked.

The second half is **retrieval**, and it changes what the notes are for:

- Ask a question and get the answer from what you already ingested, before
  going out to search again.
- See that four sources agree, and that three of them are quoting the same
  original — so it is one source, not four.
- Get told when a new video contradicts a note you took in March, instead of
  silently believing the most recent thing you watched.
- Notice which claims you have been carrying for months that were never better
  than SAID-TO-BE-SHOWN.

None of that is possible from a folder of files. It needs the notes to share a
shape (which is why the output contract above is not fussiness), and it needs
something that can search across all of them and reason over what it finds.

That is a real build, not a prompt — and it is the difference between an
assistant that watches videos for you and a second brain that knows what you
already learned. This playbook gets you the capture half honestly and
completely. Building the retrieval half is the next thing, and it is where the
compounding actually lives.

That build is the [recall playbook](recall-starter.md), and it picks up exactly
where this one stops: where the notes live, how they get indexed, how an agent
searches across all of them before it answers, and why two notes on one subject
are worse than none. Do this one first. A retrieval system over three notes
teaches you nothing.

The whole library, including that one, lives at
<https://whop.com/agentic-operator>.

If you only ever use the loop above, it was still worth your ten minutes. But
capture without retrieval has a ceiling, and you will hit it around the fortieth
note.

## Common failure modes

- Asking for a summary, then discovering the question you actually had.
- Letting the agent describe a video it could not access.
- **Letting "as you can see here" become proof.** The speaker's pointing
  survives into the transcript; the thing pointed at does not. This is the
  single most likely way these notes go wrong, and an agent will do it
  confidently unless told not to.
- A transcript-only pass that somehow returned demonstrated claims.
- Accepting a cleaned-up transcript and losing the false starts and repeats
  that showed where the speaker was uncertain.
- Recording a spoken number as if it were a measured one.
- Treating an unreadable screenshot as proof because it looked like a
  dashboard.
- Calling something false when it was only unverified.
- Writing notes with no timestamps, so no claim can ever be rechecked.
- Counting five videos citing one source as five confirmations.
- Keeping the notes and deleting the transcript.
- Saving everything somewhere you will never search again.

## Done means

- The question and the decision behind it were written down before fetching.
- A real transcript with timestamps was retrieved, kept, and not invented.
- The modality is stated at the top, and nothing is marked demonstrated that
  was not actually seen.
- The answer quotes the transcript and cites timestamps.
- Material claims are marked asserted, said-to-be-shown, or demonstrated.
- Confirmed, refuted, and unverified claims remain distinct.
- What was promised and never delivered is named.
- Inference is labelled and separated from what was actually said.
- The notes and the transcript are saved somewhere you can search later.
