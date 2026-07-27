---
title: "Build one verified slice"
track: building
version: 0.1.0
estimated_first_task: "10 minutes"
---

# Build one verified slice

Building with an agent works best when the job is small enough to inspect and
the finish line is written before code changes.

The goal is not “make an app.” The goal is one useful slice with:

- a clear user outcome;
- explicit boundaries;
- acceptance checks;
- a reviewed change; and
- a verification receipt.

**If you are new to this:** start with **Your first ten-minute task**. Pick a
change small enough that you can understand what the agent touched.

## The building loop

### 1. Inspect before proposing

If a project already exists, have the agent read its instructions, structure,
tests, and current git state before suggesting a solution.

Ask it to report:

- what it inspected;
- which files are relevant;
- what is already implemented;
- what assumptions remain; and
- which unrelated local changes must be preserved.

If no project exists, define the smallest usable artifact before choosing a
stack.

### 2. Write the outcome, not the implementation

Start with the person and result:

> When [person] does [action], they can [observable outcome].

Then record constraints such as device, data source, privacy, budget,
compatibility, and whether external services may be changed.

Do not lock in a technical solution before the current system has been read.

### 3. Make non-goals visible

List what this slice will not do. Non-goals prevent a useful fix from turning
into an accidental rewrite.

Examples:

- no new accounts;
- no payments;
- no new database;
- no redesign;
- no deployment; or
- no external writes.

### 4. Define acceptance checks first

Write checks a person or test can observe:

- Given a specific starting state, when an action happens, what changes?
- What must remain unchanged?
- What error must be shown when a dependency fails?
- Which command, request, or browser action proves the result?

“Works correctly” is not an acceptance check.

### 5. Cut the smallest testable slice

Choose the thinnest change that crosses the real boundary from input to useful
output.

A small vertical slice is better than several disconnected foundations. It
should be possible to verify before more scope is added.

### 6. Plan the exact change

Have the agent name:

- files to add or edit;
- behavior each change creates;
- tests or checks to write;
- risks and rollback;
- permissions or decisions it still needs.

The plan should preserve unrelated work and avoid destructive commands.

### 7. Implement and verify

Write or update the acceptance check, make the smallest implementation pass,
then run the relevant test, lint, build, and browser or API check.

Passing a test is not enough when the feature crosses a real browser, network,
identity, or data boundary. Verify that boundary directly.

### 8. Review the actual diff

Read what changed. Look for:

- scope that was not requested;
- hard-coded values or secrets;
- silent failure paths;
- missing error states;
- destructive behavior;
- unrelated files; and
- claims the verification did not prove.

### 9. Close with a receipt

Record:

- the outcome shipped locally;
- files changed;
- checks run and their results;
- what remains unverified;
- whether anything was committed, pushed, or deployed; and
- the next safe slice.

Code, review, merge, deployment, and live activation are different states.
Name the one you actually proved.

## Your first ten-minute task

Paste this into your agent:

```text
Help me turn one small build idea into a verified slice.

IDEA:
[What I want]

WHO IT IS FOR:
[The person using it]

PROJECT:
[Path, repository, files, or "nothing exists yet"]

CONSTRAINTS:
[Privacy, budget, tools, compatibility, deadline, or permissions]

Work in this order:
1. Inspect the existing project and its instructions before proposing a
   solution. If there is no project, say so.
2. Rewrite the idea as one observable user outcome.
3. List the constraints, open assumptions, and three to five non-goals.
4. Write concrete acceptance checks, including one failure case.
5. Choose the smallest testable slice that can produce the outcome.
6. Name the exact files and checks that slice would require.
7. Save this as build-brief.md.
8. If the slice is genuinely small, local, reversible, and within the
   permissions I gave you, implement only that slice and produce a
   verification receipt. Otherwise stop at the brief and tell me what approval
   or information is missing.

Rules:
- Preserve unrelated local changes.
- Do not add credentials or personal data to files.
- Do not use destructive commands.
- Do not push, merge, deploy, purchase, message, or change a live service.
- Do not expand the scope after implementation starts.
```

The `build-brief.md` and, when safe, its verification receipt are your first
receipts.

## The full build prompt

Use this when the brief is worth implementing:

```text
Act as my build operator. Take this approved brief through one bounded local
implementation and evidence-backed verification.

APPROVED BRIEF:
[Paste build-brief.md]

PROJECT:
[Path or repository]

PERMISSIONS:
[Exactly what may be edited or run]

Work in this order:
1. Read project instructions, relevant code, tests, documentation, and git
   status. Report any conflict between the brief and the live project.
2. Map the flow from user action to output and identify the first real boundary
   the slice crosses.
3. Turn each acceptance check into a test or repeatable manual check before
   changing implementation.
4. Show that the new check fails for the expected reason.
5. Implement only the smallest testable slice.
6. Run targeted tests, then the relevant broader checks.
7. Verify the real boundary directly when the slice uses a browser, API, data
   store, identity provider, or external service.
8. Review the complete diff for unrelated scope, secrets, unsafe behavior,
   missing errors, and unsupported claims.
9. Repair real findings and rerun the affected checks.
10. Return a verification receipt with:
    - outcome;
    - files changed;
    - tests and live checks with results;
    - known caveats;
    - rollback;
    - current state: local, committed, pushed, deployed, or live; and
    - recommended next slice.

Boundaries:
- Preserve files and changes outside the approved scope.
- Do not weaken a safety or permission guard to make a check pass.
- Do not push, merge, deploy, spend, send, delete, or change live data unless I
  explicitly approve that action.
- Stop at the first missing permission or material product decision.
```

## Common failure modes

- Starting implementation before reading the project.
- Describing a feature without an observable user outcome.
- Treating a broad architecture layer as a useful slice.
- Writing tests after the implementation and only testing the happy path.
- Running unit tests while skipping the browser, API, or data boundary.
- Mixing unrelated local changes into the diff.
- Calling code “live” because it built or deployed.
- Disabling a guard instead of completing the missing prerequisite.

## Done means

- `build-brief.md` names one user outcome, constraints, non-goals, and
  acceptance checks.
- The implementation is limited to the smallest testable slice.
- Relevant tests and the real boundary were checked.
- The actual diff was reviewed.
- A verification receipt distinguishes local, committed, pushed, deployed,
  and live state.
- External or irreversible actions still require your approval.
