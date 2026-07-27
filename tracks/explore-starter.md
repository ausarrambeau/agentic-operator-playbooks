---
title: "Find one useful job for your assistant"
track: explore
version: 0.1.0
estimated_first_task: "10 minutes"
---

# Find one useful job for your assistant

You do not need to know which system to build. Start with one recurring
friction, try a small safe experiment, and let evidence tell you whether it is
worth keeping.

The goal is an `experiment-card.md` that records:

- the friction;
- three ways an assistant might help;
- one smallest reversible test;
- the boundary around that test;
- what actually happened; and
- whether to keep, change, or drop the idea.

**If you mostly want to see what is possible:** this is the right starting
track. Go straight to **Your first ten-minute task**.

## The exploration loop

### 1. Start from friction, not tools

Look for a task that is:

- repeated;
- easy to forget;
- slow to summarize;
- full of copy-paste;
- difficult to keep consistent; or
- annoying enough that you avoid it.

“Use more AI” is not a testable problem. “Every Friday I spend twenty minutes
reconstructing what changed” is.

### 2. Give the agent a safe sample

Use a small, non-sensitive example:

- one note;
- one anonymized document;
- five rows of data;
- one draft;
- one local folder listing; or
- a description of the current steps.

Remove credentials, private conversations, payment details, health data, and
anything you are not allowed to share.

### 3. Generate three ways it could help

Ask for three different assistance modes:

1. **Explain or summarize** — turn material into a clearer view.
2. **Draft or transform** — produce a reversible artifact for review.
3. **Check or compare** — find gaps, inconsistencies, or changes.

Do not start with autonomous action. Reading, drafting, and checking reveal
value without giving the assistant authority over other people or systems.

### 4. Choose the smallest reversible test

Score each option on:

- usefulness if it works;
- time to try;
- quality of the available sample;
- ease of checking the answer; and
- downside if it fails.

Choose the test with useful information and low downside, not the most
impressive demo.

### 5. Write the expected result first

Before running the test, record:

- what the assistant will receive;
- what it should produce;
- what a good result must contain;
- what it must not do;
- how long the test may take; and
- what would make you stop.

This turns “try AI” into an experiment.

### 6. Run it on the sample

Keep the first run local or read-only. The assistant may inspect the supplied
sample and produce a draft.

It may not send, post, purchase, delete, install, deploy, contact anyone, or
change a live system.

### 7. Compare the output with reality

Check:

- What was correct?
- What was missed?
- What was invented?
- How much cleanup was needed?
- Was it faster or clearer than the old way?
- Would the same prompt work again?

Save the output. Your memory of a good demo is not a reusable result.

### 8. Decide: keep, modify, or drop

- **Keep** when the result is useful, repeatable, and easy to verify.
- **Modify** when the job is useful but the input, instructions, or checks need
  work.
- **Drop** when verification costs more than the help or the downside is too
  high.

A dropped experiment is a result, not a failure.

### 9. Expand one boundary at a time

After a safe sample works, increase only one thing:

- more examples;
- a recurring schedule;
- a better source file;
- a second output format; or
- a proposed external action that still waits for approval.

When several variables change at once, you cannot tell why the next run
improved or broke.

## Your first ten-minute task

Paste this into your agent:

```text
Help me find one useful, safe job for my assistant.

RECURRING FRICTION:
[A task I repeat, avoid, forget, or spend time reconstructing]

SAFE SAMPLE:
[Paste one small, non-sensitive example or describe what I can provide]

CURRENT METHOD:
[How I do it now]

Work in this order:
1. Rewrite the friction as one observable job.
2. Propose three ways you could help:
   - explain or summarize;
   - draft or transform; and
   - check or compare.
3. For each, estimate usefulness, effort, how I would verify it, and downside
   if it fails.
4. Choose the smallest reversible test with the best information-to-risk
   tradeoff.
5. Write the input, expected output, success check, safety boundary, time box,
   and stop rule.
6. Run the test only on the safe sample I supplied.
7. Record what worked, what failed, what was uncertain, and whether to keep,
   modify, or drop the idea.
8. Save everything as experiment-card.md.

Rules:
- Do not request or expose credentials or sensitive personal data.
- Do not invent missing source material.
- Do not purchase, install, send, post, delete, deploy, or change an external
  system.
- Do not expand beyond the sample.
- Stop after one experiment.
```

The saved `experiment-card.md` is your first receipt.

## The reusable experiment prompt

Use this when you want to test a second job or expand a successful one:

```text
Act as my experiment operator. Help me evaluate one assistant job without
mistaking a polished demo for a reliable workflow.

FRICTION:
[The repeated job or problem]

CURRENT METHOD AND BASELINE:
[Current steps, time, quality, or failure pattern]

SAFE INPUT:
[The exact sample or files allowed]

PERMISSIONS:
[Read, summarize, draft, compare, or other explicit limits]

Work in this order:
1. Inspect only the allowed material and state what was accessible.
2. Define the job, user benefit, and measurable success check.
3. Generate three materially different ways an assistant could help.
4. Compare them by usefulness, effort, verifiability, reversibility, and
   downside.
5. Select the smallest reversible test and record its expected result, time
   box, and stop rule before running it.
6. Run the test on the safe input.
7. Compare the output with the source and baseline. List correct, missed,
   invented, and uncertain parts.
8. Decide keep, modify, or drop, with the evidence behind the decision.
9. If it is worth another test, change one variable only and propose—not
   execute—the next experiment.

Boundaries:
- Stay inside the supplied sample and permissions.
- Do not request secrets or unnecessary personal data.
- Do not purchase, install, send, post, delete, deploy, or change live data.
- Treat an inability to verify the result as a reason to stop.
- Keep external actions as drafts until I explicitly approve them.
```

## Common failure modes

- Choosing a tool before naming the friction.
- Testing on sensitive or irreplaceable data.
- Jumping directly from a demo to automation.
- Letting the assistant grade its own output without source comparison.
- Changing the input, prompt, model, and scope at the same time.
- Keeping an experiment because it looked impressive.
- Hiding invented or uncertain details.
- Treating permission to read and draft as permission to act.

## Done means

- `experiment-card.md` names one observable job.
- Three ways of helping were compared.
- The selected test is small, reversible, time-boxed, and easy to verify.
- It ran only on a safe sample.
- Correct, missed, invented, and uncertain output is visible.
- The decision is keep, modify, or drop with evidence.
- No external or irreversible action occurred without approval.
