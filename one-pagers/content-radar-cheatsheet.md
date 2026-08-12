# Content Radar — the one-page version

One paste, three legs, a ranked 7-day plan, and a JSON file that makes runs
comparable. Full instruction set: **[the playbook](../playbooks/content-radar.md)**.
Guided version: **[the starter](../tracks/content-radar-starter.md)**.

## Setup (once)

```
set up treg — https://treg.superdesign.dev/llms.txt
```

$1.00 free credit, no card. A full run is about **$0.028** — roughly 35 runs
on the free credit. Funding beyond that is your move, not your agent's.

## The three legs

| Leg | What it measures | Endpoint | Price (measured) |
|---|---|---|---|
| Trends | Your topic's last 7 days, hourly | `serpapi.x.google-trends` | $0.015/call |
| Keywords | Volume, difficulty, CPC for your list | `serpstat.google.keywords.volume` | **$0.01 flat/call** |
| Competitors | A handle's recent reels + view counts | `scrapecreators.x.v1-instagram-user-reels` | $0.00188/call |

## The one rule that pays for itself

**Print a receipt for every metered call** — balance before, balance after,
quoted price next to the actual delta. That habit is how the flat-fee keyword
billing was caught in the first place: the sticker says per-result, the ledger
says per-call.

## The five traps

1. **Batch keywords.** $0.01 per CALL up to 1,000 keywords. One list, one
   call — one keyword at a time is a 20x overpay.
2. **A timed-out call is still billed.** 5+ minute timeouts on metered calls,
   first time, every time.
3. **Exclude pinned reels** before computing the competitor median — creators
   pin what went viral, so a pinned reel inflates the baseline by construction.
4. **The last trend point is an incomplete hour.** Use the last complete point
   as "current" or you will invent a downturn.
5. **Catalog-search zero proves nothing.** Literal AND across terms — search
   in 1–2 words.

## Reading the output

- Difficulty is an SEO metric — the ranking is a starting order, not a result.
- Trend direction sets cadence and day placement; it reorders nothing.
- An outlier trait that also appears below the median is not the lever.
- Null difficulty = unmeasured, never zero. Dropped keyword = no data, not
  no demand.
- Reach, saves, shares, watch time: owner-only. Nothing public has them.
