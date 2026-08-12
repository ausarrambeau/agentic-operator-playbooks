---
title: "Run a Content Radar on your niche"
track: radar
version: 0.1.0
estimated_first_task: "15 minutes"
---

# Run a Content Radar on your niche

One run turns your coding agent into a niche content researcher. You get back:

- what your topic did on Google Trends this week, and which direction it is
  moving;
- real monthly search volume, difficulty, and CPC for 20–40 keywords you chose;
- a named competitor's recent reels with view counts, the median, and the
  outliers above it;
- a ranked 7-day content plan built from all three; and
- a JSON file of everything measured, so next week's run is comparable instead
  of a memory.

This guide is the map. The full instruction set your agent runs is the
**[Content Radar playbook](../playbooks/content-radar.md)** — every step, every
price, and the receipts from the run that verified it.

**If you are new to this:** read **Before you start**, then go straight to
**Your first fifteen-minute run**. One agent, one paste, one niche.

## This playbook spends real money — a little, and visibly

Most playbooks here are free to run. This one makes metered API calls from a
prepaid balance, so read this paragraph before pasting anything:

- A full radar run on one niche costs about **$0.028**, measured as ledger
  deltas on a real run — not quoted, measured.
- The free credit is $1.00 with no card, which is roughly 35 runs.
- The prompt makes your agent **print a receipt for every metered call**:
  quoted price next to the actual balance change. If your agent skips the
  receipts, stop it and start over — the receipts are not decoration, they are
  how you catch a provider billing differently than its price tag says.
- A failed or timed-out call is **still billed**. The playbook's rules exist
  because each one cost real money to learn.

Do not give your agent a payment method, and do not let it top up a balance on
its own. Funding the balance is your move, made by you, in your browser.

## Before you start

You need two things:

1. **A coding agent that can run shell commands** — Claude Code, Codex, Cursor,
   or whatever you already use.
2. **A treg account** — the CLI that fronts the data providers so you never
   hold a serpapi, serpstat, or scrapecreators key yourself.

Setup is one line. Paste this to your agent:

```
set up treg — https://treg.superdesign.dev/llms.txt
```

It reads the doc, installs the CLI, and asks you for a team token. That is the
whole setup.

## Your first fifteen-minute run

1. Open the **[full playbook](../playbooks/content-radar.md)** and copy the
   block under **THE PROMPT**.
2. Fill in the three values at the top: your niche, one topic keyword, and one
   or two Instagram competitor handles. Instagram only — the competitor leg
   reads reels.
3. Paste the whole thing to your agent and let it work through the three legs.

What a finished run looks like — check for all six:

- a receipt row for every metered call (quoted price AND actual delta);
- a trend read: current value, 7-day high and low, direction of the last 24h;
- a keyword table, plus a list of the keywords the source returned nothing
  for — a dropped keyword is not a keyword nobody searches;
- a competitor median with pinned reels excluded, and the outliers above 2x;
- a 7-day plan with the ranking formula stated back to you with real numbers;
- a saved JSON file named `content-radar-<date>-<topic>.json`.

Before you trust the plan, open the JSON file and confirm three things: the
total spend equals the sum of the per-call deltas, every keyword you sent
appears in either the rows or the dropped list, and the competitor median was
computed excluding pinned reels. If any of the three is off, the run is not
done — tell your agent which one and have it reconcile.

## Read it like an operator

The numbers are real; the ranking is a starting order, not a result. Keep
these in your head while you read:

- **Argue with the difficulty column.** Difficulty is an SEO *ranking* metric.
  Nothing about short-form distribution is governed by it, so volume ÷
  difficulty ranks a contest you are not entering. It is a defensible way to
  order candidates, nothing more.
- **The trend direction sets cadence, not order.** It is one scalar applied to
  every row, so it cannot reorder anything. Trending down means slower cadence
  and evergreen angles, not "do not post."
- **Check the reverse on competitor outliers.** If the winners' shared trait —
  a CTA, a length, a format — also appears on reels *below* the median, it is
  not the lever. The playbook makes your agent check this; read the answer.
- **Null is not zero.** A keyword with no difficulty value is unmeasured, not
  easy. A plan that ranks an unmeasured keyword first has laundered an absence
  into a number.

## The five traps

Each of these cost real money or produced a wrong number before it became a
rule. The playbook enforces all five; this is why.

1. **Batch your keywords.** The keyword call bills a flat $0.01 per call, up to
   1,000 keywords — not per result, whatever the price tag says. Send one
   keyword and you paid 20x the sticker. One list, one call.
2. **A timed-out call is still billed.** Give metered calls a 5+ minute
   timeout the first time. A 2-minute timeout on a paginated call paid in full
   for zero bytes.
3. **Exclude pinned reels from the median.** Creators pin what went viral. A
   pinned reel beats the median it is inflating, by construction.
4. **The final trend point is an incomplete hour.** It always reads low. Quote
   the last complete point as current, or you will report a downturn that is
   not there.
5. **A zero from catalog search proves nothing.** The search is a literal AND
   across your terms. Search in one or two words before concluding a
   capability is missing.

## What this cannot tell you

- **Why** anything performed. Outlier traits are an association across a dozen
  posts by one creator, not a cause.
- **Private metrics.** Reach, saves, shares, and watch time are owner-only. No
  scraper has them; anything claiming otherwise is inferring.
- **Other platforms.** The competitor leg is Instagram reels only. TikTok and
  YouTube competitors are out of scope until someone verifies them — and per
  the playbook's own rule, untested means unclaimed.

## Going deeper

- **[The Content Radar playbook](../playbooks/content-radar.md)** — the full
  prompt, the JSON schema your runs should produce, the measured receipts, and
  the honest list of what the tooling does not do yet.
- **[The cheatsheet](../one-pagers/content-radar-cheatsheet.md)** — the three
  legs, the prices, and the five traps on one page.
- Ran it twice? Diff the two JSON files: which keywords moved, whether the
  competitor median shifted, and whether last week's plan targeted the
  keywords that this week's data still supports.
