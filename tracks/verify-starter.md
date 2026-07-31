---
title: "Evidence before you say it works — receipts instead of reassurance"
track: verify
version: 0.1.0
estimated_first_task: "10 minutes"
---

# Evidence before you say it works — receipts instead of reassurance

Your assistant told you it works. Your assistant is also the thing that built
it.

Those two sentences are the whole subject. An agent reporting on its own work is
not reporting the state of the world, it is reporting how confident it is, and
from where you sit those feel identical. It is not lying. It has nothing to
check with that is made of different material than the thing that did the work,
so "done" and "I believe done" come out in the same tone, at the same speed.

This playbook is one loop for making the evidence the thing you receive, so that
"it works" stops being something you are told and becomes something you can see.

**If you are new to this:** go straight to **Your first ten-minute task**. Take
one thing you were recently told was finished and ask for the output instead of
the summary. One real receipt will teach you more than the rest of this page.

**This is not testing.** Testing is a craft. This is about what you accept as an
answer, and you can practise it on a spreadsheet total, a page that should load,
a file that should exist. The failure it prevents is not a technical one.

## The short version, for humans

**What you get:** a small file per claim carrying the real output of the real
check, so a week later you can tell what was proven from what was asserted —
plus the habit of asking for it before you believe anything.

**What it costs:** about ten minutes to start. After that it is one line added
to every request you make.

**The method, in five lines:**

1. **Name the check before the work starts.** A check picked afterwards is
   picked to pass.
2. **Run it and paste the output.** Not a description of the output.
3. **Break it once on purpose.** A check that has never failed is not attached
   to anything.
4. **Say what you did not check.** Out loud, as a list, every time.
5. **Name the state in plain words.** Built, committed, deployed and visible to
   you are four different things and only one of them is done.

**The one trap, in one line:** a confident summary of a result arrives in
exactly the same voice as the result, so the only defence is refusing to accept
the summary in the first place.

## Why the output is the deliverable, and not the summary of it

The instinct is to accept "I ran the tests and they pass." It reads like a
report. It is not one, for three reasons.

**It was generated, not measured.** That sentence came from the same place the
work came from. Asking your assistant to grade itself and then believing the
grade is asking one witness for two testimonies.

**Output carries the parts nobody thought to mention.** A run that prints
`0 tests ran` has not failed. It is green. A run that prints `12 passed, 3
skipped` gets reported as passing, and the three skipped are very often the
three you cared about. None of that survives compression into "it passes",
because whatever did the compressing did not consider it important — and did not
consider it important for the same reason it wrote the bug.

**You do not have to understand it.** This is what makes the discipline
available to you. You are not being asked to read output like an engineer, only
to see that it exists, notice whether the numbers in it are zero, and be able to
paste it to somebody else. A receipt you cannot fully interpret is still a
receipt. A sentence you fully understand, saying it worked, is nothing at all.

## The loop

### 1. Name the check before the work starts

Before anything is built, ask one question: what will we run, and what will it
print, if this is done?

Ask it first because a check chosen afterwards is chosen to pass. Given finished
work and a free hand, your assistant will find something true about it and hold
that up. That is not deceit, it is the path of least resistance, and it is open
only because you did not close it.

The answer has to be specific enough for someone who was not in the conversation
to run. "We will check it works" is not a check. "We will open the page and see
the total say 4,200" is.

### 2. Run the check, and paste the output

**Paste the output. Do not describe it.**

That is the rule, and it is the whole loop in one line. What goes in the receipt
is what the check printed, verbatim, noise included. Not "the tests pass." Not
"all green." Not a tidy table assembled from the run. The raw thing, copied.

If the check is not a command the rule takes a different shape. For a page, the
evidence is a screenshot. For a number, the number on screen next to what
produced it. For a file, the listing showing its size and date. The test is
always the same: hand it to a stranger, and would they reach the same conclusion
with nobody narrating it? If not, it is not evidence yet.

### 3. Break it on purpose, once

Change something so the thing should fail. Run the check. Watch it go red. Put
it back. Ten seconds, and everyone skips it. Without it you cannot know the
check is attached to what it claims to check, and a check that cannot fail will
pass forever, including on the day everything is broken.

Here is the failure that makes it concrete. A suite of tests once passed
completely — every check green, nothing skipped — while not one of the files it
was checking would compile. The tests were verifying the *shape* of those files:
the right things named, in the right places, in the right order. All of that was
true. None of it was code that ran.

So carry this one and do not put it down: **passing tests and working software
are two different claims.** A green suite says the checks somebody wrote did not
object. It does not say the thing runs, and it never says the thing does what
you wanted. That is proven separately, by running it and looking — which is why
"show me it failing" is one of the highest-value sentences you have.

### 4. Say what you did not check

Every receipt ends with a list of what the run did not touch. Make it a standing
rule in the words you use: **your assistant must name what it did not check.**
Not what failed — what was never looked at. Only one of those is visible by
default.

This feels like paperwork and is not. The dangerous gap is never the part that
failed loudly. It is the part nobody ran, which looks exactly like the part that
passed, because both are absent from a report that only lists successes. "I
checked that it loads on my machine. I did not check it logged out, on a phone,
or with an empty account" is a complete answer. "It works" is a smaller answer
that sounds larger.

Expect your assistant to be bad at this and to need asking twice. Ask twice.

### 5. Name the state in plain words, and say the unfinished part first

Built, committed, deployed, and visible to you are four different states.

Only the last counts. A thing that sits in a repository or was pushed somewhere
an hour ago is not delivered if the person who asked cannot see it yet. Treat
**shipped as meaning visible to you** and nothing else, because every other
definition is one your assistant can satisfy while you still have nothing.

So the order of the sentence matters. If it is not live, that goes first, in
plain words, before any description of what was accomplished, and it comes with
the exact remaining step named — the specific command, the specific button — not
"it just needs deploying." A step nobody names is a step nobody takes.

### 6. Check the surface a person actually stands on

The last thing to verify is where you verified.

A staging address responding is not the product working. A preview link is not
the site. Something running on the machine it was built on has proven almost
nothing about the machine everybody else uses, and those gaps are exactly where
things break: a setting that exists in one place and not the other, a cache, a
domain, a login.

So check the real one. The address people actually type. The app on the phone,
not the simulation of it. The account with no data in it. When the real surface
cannot be checked yet, that is a sentence rather than a problem: name what you
checked, name what you did not, and put the second on the list from step 4.

## What you need before you start

One AI assistant and somewhere to keep a file.

**Any assistant, no installs.** You run the command or open the page yourself and
paste what you see back into the chat. That is the whole method at full strength.
The only thing missing is convenience.

**An assistant that can run commands** is where it stops feeling like work. Watch
it slightly harder rather than slightly less: something that can run a check can
also report a run it did not do, and the receipt is what makes that visible.

Do not install a test framework, a monitoring service, or anything with a
dashboard yet. Ten receipts written by hand teach you which checks you actually
reach for. A dashboard bought first teaches you which checks its vendor thought
you should want.

## Hand this file to your agent

```text
Read this playbook end to end, then run "Your first ten-minute task" with me.

Ask me for one thing you or I recently claimed was working. Before checking
anything, tell me the exact check and what it should print if the claim is true.

Then run it and paste the output verbatim, not a summary of it. If you cannot
run commands, give me the exact thing to run and wait for me to paste back what
it printed. Then break it on purpose so the check fails, show me that output
too, and put it back.

Then list every part of the claim you did NOT check, and tell me the state in
plain words: on my machine, committed, deployed, or visible to me. If it is not
visible to me, say that first and name the exact remaining step.

Never claim a check passed without showing me what it printed.
```

## Your first ten-minute task

Pick one claim you are taking on faith. Something you were told was done, or
something you believe works because it worked last month.

```text
Help me build one receipt for something I have been told is working.

THE CLAIM:
[One sentence. "The contact form sends me an email." "The report totals
correctly." "The site is live."]

WHERE IT LIVES:
[A folder, a file, a web address, an app — or "I will run things and paste
results back to you"]

Work in this order:
1. Before checking anything, write down the exact check and what it should
   print or show if the claim is true. Show me that first and let me object.
2. Run the check and paste the output exactly as it came out, noise included.
   Do not summarize, tidy, or reformat it. If you cannot run it, give me the
   exact command or steps and wait for me to paste back what I got.
3. Now break it on purpose so the check should fail. Run it again, paste that
   output too, then restore it and confirm the original output returns. If
   breaking it is not safe, say so instead of doing it.
4. List every part of my claim this check did NOT touch. Not what failed —
   what was never looked at.
5. Tell me the state in plain words: on my machine, committed, deployed, or
   visible to me. If it is not visible to me, say that first, then name the
   exact remaining command or step.
6. Name the surface you checked. If it was a preview, a local copy, or a
   staging address rather than the real one, say so plainly.

Save it as verify-receipt.md, with exactly these sections in this order, even
when one is empty:

  # verify-receipt: <the claim>
  Claim   (one line, as I stated it)
  Check   (the exact command, steps, or address)
  Ran at  (absolute date and time)
  Surface (my machine, staging, or the real thing)
  ## Output        (pasted verbatim)
  ## Failure case  (what was broken, what it printed, that it was restored)
  ## Not checked
  ## State         (and the exact remaining step, if any)

If you cannot save files, post the finished receipt in the chat as its own
message, headed with the filename it should have had, and say plainly that
keeping it is my job.

Rules:
- Never say a check passed without showing me what it printed.
- Never write output you did not see. If a run failed to happen, say it did not
  happen.
- Passing tests are not working software. Do not report one as the other.
- "I did not check that" is a correct and expected answer. Guessing is not.
- Do not weaken, skip, or rewrite a check so that it passes.
- Do not take any external action — no sending, posting, deploying, or spending.
```

The saved `verify-receipt.md` is the first thing you own that does not depend on
anyone's word, including your own.

## Make it a skill

Once five or six receipts exist — and at least one has caught something that was
confidently reported as finished — turn it into something you invoke by name.

```text
Turn this into a saved instruction I can invoke by name. Call it "verify".

WHEN IT RUNS: whenever I ask you to verify something, or whenever you are about
to tell me something is done, fixed, passing, or working.

WHAT IT DOES, in order:
1. State the exact check and its expected output BEFORE running it.
2. Run it and paste the output verbatim. Never a summary, never a rewrite.
3. Show the check failing once, then restore and re-run.
4. List what was not checked — the untouched parts, not the failures.
5. Name the state: on my machine, committed, deployed, or visible to me. If it
   is not visible to me, lead with that and name the exact remaining step.
6. Name the surface checked, and say when it was not the real one.
7. Write a receipt file with the sections: Claim, Check, Ran at, Surface,
   Output, Failure case, Not checked, State.

HARD RULES:
- Evidence before assertions. No success claim precedes its output.
- Passing tests and working software are different claims. Never substitute one.
- Never fabricate output. A run that did not happen is reported as not happened.
- Never weaken or skip a check to make it pass.
- "Not checked" is a required section and may never be empty by default.
- No external action without my approval.

Show me the instruction before you save it, then tell me how to invoke it.
```

## What this is not

**It is not a test suite.** Tests are one kind of evidence, and a narrow one —
they answer whether the code did what its author expected, which is a smaller
question than whether the thing works. This loop is the acceptance rule sitting
above them, and it applies to anything anyone tells you is true: a build, a
spreadsheet total, a page that is supposed to load, a claim in a report.

**It is not code review.** Judging a change is a different job. Verification
asks a narrower question: did the thing do what was claimed, and how do you know.

**It is not distrust.** You are not catching your assistant out. You are taking
away a task it is structurally incapable of — grading its own output — and
replacing it with one it is very good at, which is producing the output and
handing it over. You stop having to guess which confident sentence to believe.

## Failure modes

- Accepting "it works" and moving on, which is the default and costs the most.
- A check invented after the work, chosen because it would pass.
- A tidy summary of output presented instead of the output.
- A test suite that is green while the thing it tests does not run at all.
- A check that has never been seen to fail, so nobody knows it is connected.
- A report that lists what passed and is silent about what was never run.
- "Deployed" reported as done while you still cannot see it anywhere, with the
  remaining step described as "it just needs deploying" and never named.
- Verification on a preview or a local copy, presented as the real thing.
- A guard, a check, or an assertion weakened so the run comes back clean.
- Output quoted from a run that did not happen, because it was expected to.
- Buying monitoring before there is a single hand-written receipt.

## Done means

- Every claim you rely on has a receipt, and the receipt holds real output.
- The check was named before the work, not after it, and has been seen to fail
  at least once on purpose.
- What was not checked is written down, as a list, separate from what failed.
- No success claim was made before the evidence for it was on screen.
- Passing tests are never reported as working software.
- The state is named in plain words, and anything short of visible-to-you leads
  with the shortfall and the exact remaining step.
- The surface checked is named, and a preview is never called the real thing.
- Nothing external is sent, deployed, or spent without your approval.
