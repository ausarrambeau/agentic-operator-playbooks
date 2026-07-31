---
title: "Ask your own notes first — memory your assistant actually re-reads"
track: recall
version: 0.1.0
estimated_first_task: "10 minutes"
---

# Ask your own notes first — memory your assistant actually re-reads

You have already decided this. Your assistant has not read it.

That is the whole problem, and it does not feel like a problem for the first
few weeks. It feels like re-explaining yourself, which feels like the cost of
doing business. Then one day your assistant confidently tells you the opposite
of what you concluded a month ago, in the same certain voice it used the first
time, and you cannot tell which of the two was the considered one.

This playbook is one loop for giving an assistant somewhere to look before it
answers, and for making looking first the rule rather than a thing you remember
to ask for.

**If you are new to this:** go straight to **Your first ten-minute task**. Write
one real decision down and make your assistant find it. One note it actually
retrieves beats a memory system you spent an afternoon designing.

**This is not note-taking.** Notes are for you. This is a store your assistant
reads before it opens its mouth, which makes almost every design choice below
different from how you would keep notes for yourself.

## The short version, for humans

**What you get:** a small set of files your assistant checks before answering
anything about what you decided, what state something is in, or where a thing
lives — plus the habit that makes it check.

**What it costs:** about ten minutes to start. After that it is one line per
decision, written at the moment you make it.

**The method, in five lines:**

1. **One fact per file.** Not one log with everything in it.
2. **An index of pointers only.** One line each, and never a body.
3. **Look before you answer.** Every time, not when you remember to ask.
4. **Fix the file, never append a correction.** Two versions is worse than one
   wrong version.
5. **Absolute dates, always.** "Last week" read in March is a lie.

**The one trap, in one line:** an assistant that cannot find something will
invent something, and it will sound exactly as certain either way — so "I did
not find it" has to be an answer you explicitly allow.

## Why one file per fact, and not one long file

The instinct is a single running document. It is the wrong shape for this, for
three reasons that only show up later.

**A long file gets skimmed.** Every retrieval loads the whole thing, so the
assistant reads it partially and pattern-matches. One fact per file means the
thing it loads is the thing you asked about, entire.

**A long file cannot be corrected.** When a decision changes you append, because
editing the middle of a long document is unpleasant. Now the file contains both
the old decision and the new one, in that order, and the next reader has to
infer which is live from position. That is not something to leave to inference.

**A long file has no name.** A file called `pricing-decision.md` announces what
it holds before anything is read. A paragraph three-quarters of the way down a
document announces nothing.

The index is the concession to convenience: one line per file, so the assistant
can see everything it *could* know without loading all of it.

## The loop

### 1. Write the decision, not the discussion

The unit is a thing that is true, stated so it can be checked. "We decided to
price per seat rather than per workspace, on the 12th, because usage did not
correlate with workspace count" is a fact. "Had a long conversation about
pricing" is a diary entry, and a diary entry cannot be applied to anything.

Each file gets a short name, a one-line description of what it holds, and the
fact itself. If there is a reason behind the decision, the reason is the most
valuable part — a decision without its reason gets re-litigated the first time
someone finds it inconvenient.

### 2. Keep an index of pointers, and keep it thin

One line per file: the name, a link, and enough of a hook to know whether to
open it. That line is the whole entry. The moment the index starts carrying
content, it becomes the long file you were avoiding, and it will be the file
that gets skimmed.

The test is mechanical: if a line in the index could answer a question on its
own, it is too long.

### 3. Look before you answer

This is the step that makes the other four worth doing, and it is the one that
gets skipped.

The rule is not "check the notes when it seems relevant." Relevance is a
judgement your assistant makes badly — it does not know what it does not know,
so it cannot tell that a question touches a decision you already made. The rule
is positional: **any question about what was decided, what state something is
in, or where something lives goes to the store first, before any other move.**

That includes questions that feel like general knowledge. "What should we use
for X" is very often a question you have already answered.

### 4. Let "not found" be a real answer

An assistant that searches, finds nothing, and says nothing will fill the gap.
It is not lying — it genuinely does not distinguish between recalling your
decision and generating a plausible one, because both arrive the same way.

So say it explicitly: **not found is a legal answer, and inventing one is not.**
When the store has no answer, you want to hear "nothing in your notes covers
this" and then, separately, "here is what I would suggest." Two statements, in
that order, so you can tell which is yours.

This is the single highest-value sentence in the whole loop. Everything else is
organisation; this one is the difference between a memory and a hallucination
wearing a memory's clothes.

### 5. Correct the file, never append to it

When something changes, edit the file that says the old thing. Do not add a
second file, and do not append "UPDATE:" to the bottom.

Two files saying different things is the worst outcome available, and not
because it is untidy. It is worse than having no note at all, because a
retrieval that returns both looks like *corroboration* — two sources agreeing —
when it is one source counted twice. That is exactly how you end up confident
about something you decided once, badly, and then copied.

If the history matters, keep it inside the one file, dated, under the current
answer. The live decision goes at the top.

### 6. Dates are absolute, and they are not optional

"Recently", "last week", "a few months ago" are all false the moment they are
read on a different day than they were written. Write the date. If a fact has a
shelf life — a price, a headcount, a status — write the date you last confirmed
it, not just the date you wrote it. Those are different facts and the second one
is the useful one.

## What you need before you start

One AI assistant, and a folder.

**Any assistant, no installs.** Keep the files yourself and paste the index in
at the start of a session. The loop works; only the convenience is missing.

**An assistant that can read files** is where this stops feeling like work — it
opens the index itself and follows the pointers without being handed anything.

Do not build a database. Do not install a memory product yet. The failure mode
of this whole area is people acquiring a tool before they have ten notes worth
retrieving, and a retrieval system over an empty store teaches you nothing.

## Hand this file to your agent

```text
Read this playbook end to end, then run "Your first ten-minute task" with me.

Ask me for one decision I have already made, then write it as a single file
with a name, a one-line description, and the decision plus its reason. Add one
pointer line to memory-index.md. Use an absolute date.

Before writing, check whether a note already covers it. If one does, update
that file rather than creating a second one, and tell me which you did.

Then test it: ask me to pose a question the note answers, search the index,
and answer from the note alone. If nothing in the store covers a question, say
"not found in your notes" and stop before suggesting anything.

Show me every file before you save it. Do not delete or overwrite an existing
note without showing me what changes.
```

## Your first ten-minute task

Pick a decision you have actually made and would be annoyed to re-argue.

```text
Help me start a memory my assistant reads before it answers.

THE DECISION:
[One thing you have already decided — a choice, a constraint, a rule you work
by. Include why, if you know why.]

Work in this order:
1. Check whether a note already covers this. If one does, stop and tell me,
   and update that file rather than creating a second one.
2. Write it as its own file with a short kebab-case name, a one-line
   description at the top saying what it holds, then the decision and the
   reason behind it. Use an absolute date, never "recently" or "last week".
3. Add exactly one line to memory-index.md — name, link, and a short hook.
   Nothing that could answer a question on its own.
4. Show me both files before saving anything.
5. Now test it. Ask me a question the note answers. Search memory-index.md,
   open only the file it points at, and answer from that file alone. Say which
   file you used.
6. Now test the other half. Ask me a question the store does NOT cover, search
   it, and tell me "not found in your notes." Only after saying that may you
   offer a suggestion, and you must label it as your suggestion rather than my
   decision.

Rules:
- Not found is a correct answer. Inventing a plausible decision is not.
- Never write a second note on a subject that already has one. Update it.
- Never append a correction to the bottom of a note. Edit what it says.
- Do not delete or overwrite an existing note without showing me the change.
- Do not take any external action — no sending, posting, or sharing.
```

The two files you end with — one note and one index line — are the whole system.
Everything after this is more of the same, which is the point: a memory that
needs a design session before its eleventh entry is not going to reach its
eleventh entry.

## The failure that makes people distrust the whole idea

Here is the one worth knowing before it happens to you.

An assistant that writes to an indexed store by appending to the end of a file
will eventually append something that collides with what is already there — a
duplicate name, a reused identifier, a second entry for one thing. It will not
error. Nothing checks, because appending is not the operation that checks.

Left alone, that store keeps working and keeps being wrong, and the wrongness is
invisible until something counts the entries. When it is finally found, the
question "which of these two is the real one" often has no recoverable answer.

Two rules come out of that, and both are cheap:

- **Never hand-append to a store that has an index.** Use whatever adds an entry
  properly — the thing that allocates the name and updates the index in one
  move. If no such thing exists yet, the operation you are about to do by hand
  is the thing to make first.
- **Count it occasionally.** Ask your assistant how many notes exist, how many
  index lines exist, and whether any two notes share a name. Those three
  numbers should agree, and the day they disagree you want it to be a Tuesday
  you noticed rather than a quarter you cannot reconstruct.

## Make it a skill

Once the loop has earned its keep — say ten notes in, and at least one moment
where the store answered something you would have re-derived — turn it into
something you invoke by name rather than re-describe.

```text
Turn this into a saved instruction I can invoke by name. Call it "recall".

WHAT IT DOES, in order:
1. Check whether a note already covers the subject. If one does, update it and
   say so; never create a second note on one subject.
2. Write one fact per file: kebab-case name, a one-line description, the fact,
   and the reason behind it. Absolute dates only.
3. Add exactly one pointer line to the index. Never a body.
4. On retrieval, read the index first, then open only what it points at.
5. Answer from the notes alone, and name the file you used.

HARD RULES:
- "Not found in your notes" is a correct answer. Never invent a decision.
- Never append a correction to a note. Edit the note.
- Never hand-append to the index. Add the entry properly, or say you cannot.
- Suggestions must be labelled as suggestions, never as recalled decisions.

Show me the instruction before you save it, then tell me how to invoke it.
```

## What this is not

**It is not a transcript archive.** Saving conversations is not memory. A
transcript is the discussion; a note is the conclusion, and only one of those is
retrievable in a useful sense.

**It is not a second brain product.** The value is in the discipline and it
transfers to any storage. If a tool helps later, adopt it then, with a store
that already proves the habit works.

**It is not for everything.** Facts your assistant can derive correctly every
time do not belong here. What belongs here is what it would get *wrong* or
*differently* — your decisions, your constraints, your state.

## Failure modes

- One long file everything gets appended to, which is skimmed rather than read.
- An index that grew bodies and became the long file.
- Two notes on one subject, which read as agreement rather than duplication.
- A correction appended below the thing it corrects, so position decides truth.
- Relative dates, which are false on every day but the one they were written.
- "Not found" treated as a failure by the assistant, so it fills the gap.
- Notes for things the assistant already gets right, which bury the ones it does not.
- Building storage before there is anything worth retrieving.

## Done means

- Every note is one fact, in its own named file, with a one-line description.
- The index carries pointers only, one line each, and never a body.
- Every question about a decision, a state, or a location searches the store
  before anything else happens.
- "Not found in your notes" is said out loud when it is true, and a suggestion
  after it is labelled as a suggestion.
- Corrections edit the file they correct. No subject has two notes.
- Every date is absolute, and anything with a shelf life carries the date it
  was last confirmed.
- Nothing is deleted or overwritten without you seeing the change first.
