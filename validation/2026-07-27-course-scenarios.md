# Complete course — learner-path validation

Validated: 2026-07-27

This is an acceptance simulation of the public playbook contract. It is not a
human usability study. Its purpose is to catch a route that lacks a useful
first receipt, assumes advanced tools, exposes private infrastructure, or
crosses an external-action boundary.

## Universal one-pager

**Route:** A member says they build with APIs, MCP, or their own agents.

**Observed path:**

1. The one-pager gives the eight operating rules without requiring the guided
   course.
2. Each move includes exact text the member can paste into their assistant.
3. The permission rule keeps sending, posting, deleting, and spending behind
   an explicit yes.

**Verdict:** PASS. The advanced escape hatch is useful on its own and does not
depend on private infrastructure.

## Tracking

**Route:** A beginner has active work spread between a notes app and memory.

**Observed path:**

1. The first task accepts pasted notes and does not require a repository.
2. It limits the first map to five active items.
3. Unsupported progress becomes `unknown` or `needs verification`.
4. The member leaves with one named artifact: `weekly-map.md`.

**Verdict:** PASS. The first receipt is small, evidence-backed, and maintainable
without automation.

## Research

**Route:** A member needs one current decision but their assistant may not be
able to browse.

**Observed path:**

1. Existing material is checked before new retrieval.
2. The first pass is bounded to three to five sources and one refutation.
3. A non-browsing agent must provide exact searches and wait for pasted
   results.
4. The member leaves with `research-brief.md`.

**Verdict:** PASS. The route degrades into a human-assisted evidence handoff
instead of invented research.

## Building

**Route:** A member wants a small change in an existing project whose working
tree may contain unrelated edits.

**Observed path:**

1. Project instructions, relevant files, tests, and git state are inspected
   before implementation.
2. The brief defines one outcome, non-goals, acceptance checks, and a smallest
   testable slice.
3. Unrelated work must be preserved and destructive commands are forbidden.
4. The member gets `build-brief.md` plus a verification receipt when the slice
   is safe to implement locally.

**Verdict:** PASS. The route distinguishes local implementation, commit, push,
deployment, and live proof.

## Content

**Route:** A member has one real build receipt but no finished content asset or
delivery automation.

**Observed path:**

1. Observed facts, inference, and unknowns are separated before a hook is
   written.
2. Three original hooks are paired with the proof beat that resolves each one.
3. A missing destination produces a simpler CTA instead of a false promise.
4. The member receives `content-brief.md`; publishing remains outside the
   agent's permission.

**Verdict:** PASS. Owned proof carries the draft and the external-action gate
stays intact.

## Explore

**Route:** A member does not know what to automate and supplies one
non-sensitive sample.

**Observed path:**

1. The route starts from recurring friction rather than a tool.
2. Three ways of helping are compared.
3. One smallest reversible test runs only on the safe sample.
4. The member records correct, missed, invented, and uncertain output in
   `experiment-card.md`.

**Verdict:** PASS. The route generates evidence before recommending a larger
system.

## Publication boundary

The automated validator checks all six public files for:

- their required learner contract;
- private local paths and internal tool markers;
- credential, company, app, and experience identifiers; and
- balanced Markdown fences.

Run:

```sh
node validation/check-course.mjs
```
