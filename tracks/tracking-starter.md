---
title: "A weekly map your assistant can maintain"
track: tracking
version: 0.1.0
estimated_first_task: "10 minutes"
---

# A weekly map your assistant can maintain

Tracking is not collecting everything you have ever done. It is keeping one
small map accurate enough that you can answer:

- What is active?
- What changed?
- What is stuck?
- What happens next?

The goal is a file your assistant can update from evidence without quietly
inventing progress.

**If you are new to this:** go straight to **Your first ten-minute task**.
Start with no more than five active items. A small map that stays true is more
useful than a complete system you stop maintaining.

## The tracking loop

### 1. Choose one home

Use the simplest durable place you can edit again:

- a Markdown file in a folder or repository;
- a note in your current notes system; or
- a document you already use for the work.

Name it `weekly-map.md`. Do not make a second tracker if a current one already
answers the same questions.

### 2. Separate the inbox from the map

An inbox catches unprocessed ideas, links, and requests. The map contains only
work you have chosen to track.

Do not turn every thought into an active project. Move an item into the map
only when it has an outcome and a next action.

### 3. Give every item the same fields

Use this shape:

| Field | What belongs there |
| --- | --- |
| Project | A short, stable name |
| Outcome | What “better” or “done” looks like |
| Current state | Active, waiting, blocked, or done |
| Next action | One visible action, not a vague intention |
| Blocker or owner | What is stopping it, or who must respond |
| Last verified | The date the state was checked |
| Evidence | A file, message, result, or link that supports the state |

“Work on website” is not a next action. “Write the first draft of the pricing
section” is.

### 4. Let evidence change the state

Your assistant may summarize a file, test result, calendar entry, or message.
It may not turn a plan into “done” because the plan sounds complete.

When evidence is missing, write `unknown` or `needs verification`. Honest gaps
are useful tracking data.

### 5. Limit active work

Keep the active list small enough to scan. If everything is active, nothing is
prioritized.

When a new item enters, decide whether it:

- replaces another active item;
- waits in the inbox;
- belongs to someone else; or
- is not worth doing.

### 6. Run a short daily check

Ask your assistant:

1. What changed since the last verified date?
2. Which state is unsupported or stale?
3. What is blocked?
4. What is the single most useful next action today?

The daily check updates the map. It does not create a second daily report that
drifts away from it.

### 7. Reconcile once a week

Once a week:

- close completed items with evidence;
- move abandoned ideas out of active work;
- split outcomes that became too large;
- refresh stale dates;
- surface decisions that need you; and
- choose the next week’s small active set.

Append meaningful decisions instead of rewriting history. If a decision
changes, record what replaced it and when.

## Your first ten-minute task

Paste this into your agent:

```text
Help me make one honest weekly map of my active work.

MATERIAL TO CHECK:
[Paste or point to my current notes, task list, project files, or "nothing
yet"]

Work in this order:
1. Read the material I provided. Tell me what you could access and what you
   could not.
2. Find no more than five items that are genuinely active.
3. For each item, record: project, outcome, current state
   (active/waiting/blocked/done), next action, blocker or owner, last verified
   date, and evidence.
4. Mark unsupported states as "unknown" or "needs verification." Do not infer
   that planned work is complete.
5. Save the result as weekly-map.md in the existing home for this work. If no
   home exists, draft the file in this chat and ask me where to save it.
6. End by naming the single next action I should take today and why.

Rules:
- Do not create tasks for every idea you find.
- Do not delete or overwrite my source material.
- Do not contact anyone or change an external system.
- Do not take external action for me.
- Stop after the first map. Do not build a dashboard or automation yet.
```

The saved `weekly-map.md` is your first receipt.

## The reusable tracking prompt

Use this after the first map proves useful:

```text
Act as my tracking operator. Maintain one evidence-backed weekly map without
turning it into a second job.

CANONICAL MAP:
[Path, note, or pasted contents of weekly-map.md]

NEW MATERIAL:
[Files, notes, messages, results, or links to reconcile]

ACTIVE-WORK LIMIT:
[A number, or use five]

Work in this order:
1. Read the current map and the new material. State what was accessible.
2. Extract only changes supported by the new material.
3. Update each affected item's current state, next action, blocker or owner,
   last verified date, and evidence.
4. Preserve unsupported or conflicting information as an explicit question.
5. Do not mark an item done without a visible completion receipt.
6. Enforce the active-work limit. Recommend what should wait when the limit
   would be exceeded.
7. Append changed decisions with the date and what they replace.
8. Return:
   - what changed;
   - what is blocked;
   - what is stale or unknown;
   - the single best next action; and
   - the exact proposed map update.

Boundaries:
- Do not send, post, purchase, delete, deploy, or edit an external system.
- Do not silently rewrite old decisions.
- Do not invent dates, owners, progress, or evidence.
- Ask before replacing source material or changing the map's structure.
```

## Common failure modes

- Tracking every idea as active work.
- Writing outcomes without next actions.
- Marking plans as completed work.
- Creating a daily report that does not update the canonical map.
- Hiding stale or unknown states to make the map look clean.
- Adding automation before the manual loop proves useful.
- Letting the assistant rewrite old decisions without a dated replacement.

## Done means

- One canonical `weekly-map.md` exists.
- Every active item has an outcome and one visible next action.
- State and completion claims point to evidence.
- Unknown and stale information stays visible.
- Active work fits the chosen limit.
- The daily and weekly checks update the same map.
- External actions still require your approval.
