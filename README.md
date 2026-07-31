# Digital Twin Playbooks

Practical, agent-readable playbooks for turning an AI assistant into a working
system.

Each playbook is designed to be:

- usable with the assistant you already have;
- explicit about what to read and what to produce;
- grounded in visible evidence rather than confident guesses;
- safe to run without giving an agent permission to post, purchase, message,
  delete, or change external systems; and
- useful in one small first session before expanding into a larger workflow.

## Start here

- [The eight moves](one-pagers/eight-moves.md) — the one-page version for
  experienced builders who want the operating rules without a guided track.
- [A weekly map your assistant can maintain](tracks/tracking-starter.md) — keep
  active work, blockers, next actions, and evidence in one honest map.
- [Research that survives being challenged](tracks/research-starter.md) — turn
  one live question into a decision-ready research brief, then scale the same
  loop into deeper research.
- [Turn one video into notes you can still argue with](tracks/video-starter.md)
  — have your assistant watch a video you never got to, and keep the transcript
  and timestamps that let you recheck every claim.
- [Capture what you already consume](tracks/capture-starter.md) — turn the
  YouTube, Instagram, and X you watch anyway into notes carrying graded claims,
  stated provenance, and the raw material behind them.
- [Build one verified slice](tracks/building-starter.md) — turn one idea into a
  bounded brief, a smallest testable implementation, and a verification
  receipt.
- [Turn one real receipt into one honest post](tracks/content-starter.md) —
  create an original draft whose claims stay inside proof you own.
- [Find one useful job for your assistant](tracks/explore-starter.md) — run one
  small, reversible experiment before committing to a larger system.

## How to use a playbook

1. Open the playbook for the outcome you want.
2. Paste its first-task prompt into your own agent.
3. Replace the bracketed fields with your situation.
4. Keep the file the agent produces.
5. Expand only after the small task works.

These files are public so agents can read them directly. If your agent cannot
open a link, paste the playbook into the conversation instead.

## Validate the course

Run:

```sh
node validation/check-course.mjs
```

This checks the learner contracts, private-data boundary, and Markdown fences
for the one-pager and every track.
