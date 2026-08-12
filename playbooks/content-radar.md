# Content Radar

**A paste-able prompt that turns your coding agent into a niche content researcher.**

One run gives you: what your topic is doing on Google Trends this week, real search volume and CPC
for up to 1,000 keywords, and a named competitor's recent posts with view counts — synthesized into
a ranked 7-day content plan, with the price of every call printed as it runs. It also drops a JSON
file of everything it measured, so runs are comparable instead of scrolling back through a chat.

**What it cost me to build and verify this, end to end: $0.0369.** Not a quote — the ledger delta,
measured before and after every call. A full radar run on one niche is about **$0.028**.

---

## Requirements

- Any coding agent that can run shell commands (Claude Code, Codex, Cursor, whatever you use).
- A treg account. **$1.00 free credit, no card.** That is ~35 radar runs before you pay anything.

Setup is one line — paste this to your agent:

```
set up treg — https://treg.superdesign.dev/llms.txt
```

It reads the doc, installs the CLI, and asks you for a team token. Nothing else to configure — API
keys are injected server-side, so you never hold a serpapi, serpstat or scrapecreators key.

---

## THE PROMPT

Replace the three values on the first lines. Everything below them is the instruction set.

```
niche       = {niche}                 e.g. "AI automation for small agencies"
topic       = {topic}                 e.g. "ai agent"
competitors = {competitors[]}         Instagram handles ONLY — leg 3 is Instagram.
                                      e.g. ["minolee.mp4", "alexhormozi"]

You are running a Content Radar for the niche above using the `treg` CLI
(~/.local/bin/treg). Work through the legs in order. Do not skip the receipts.

Notation: the three values above are yours to set. Anywhere below that you see
<topic>, <handle> or <cursor>, substitute the corresponding value. Anywhere you
see <something described in words>, that is an instruction to you, not a literal
string to send.

## Rules

1. PRINT A RECEIPT FOR EVERY METERED CALL. Before each call run
   `treg balance`, after it run `treg balance` again, and print a row:
       endpoint | params | quoted price | balance before | balance after | ACTUAL delta
   The quoted price and the actual delta are different numbers and the whole
   point of this exercise is that you show me both. Wait ~7 seconds after a
   call before reading the balance — charges post as a `reserve` then a
   `settle`, and reading between them misreads the delta.

2. If you need to discover an endpoint, use `treg catalog search "<1-2 words>"`.
   The search is a literal AND across your terms, so a long query returns zero
   and that zero PROVES NOTHING. "hot search" works; "tiktok trending hooks
   for creators" returns nothing and means nothing.

3. Never inline a multi-line JSON body into a shell argument. Write it to a
   file and pass `--file`. Pick a path you have CONFIRMED you can write to —
   some agent sandboxes allow `/tmp/<something>/` but not bare `/tmp`. Verify
   with a throwaway write before you build the real body.

4. If a call fails, print the error with any credential redacted, and continue
   to the next leg. Do not retry a metered call more than once.

5. ⛔ A TIMED-OUT CALL IS STILL BILLED. treg reserves and settles the charge on
   the upstream round trip but only writes output at the end, so if your shell
   kills the command you pay in full and receive zero bytes. Give every
   metered call a generous timeout (5+ minutes) the FIRST time rather than
   discovering this with a retry — a 2-minute timeout on a paginated call cost
   the test run $0.0038 for nothing.

6. Sleeping: some agent harnesses block a foreground `sleep`. If it fails, use
   `python3 -c "import time; time.sleep(9)"`. Do not skip the wait — reading
   the balance between a `reserve` and its `settle` misreports every delta.

## Leg 1 — Trends (serpapi, $0.015/call)

    treg call serpapi.x.google-trends \
      --query engine=google_trends \
      --query q="<topic>" \
      --query data_type=TIMESERIES \
      --query geo=US \
      --query date="now 7-d"

Returns `interest_over_time.timeline_data` — 169 hourly points over 7 days.
Report: the current value, the 7-day high and low, and whether the last 24h is
above or below the week's median. That direction is the input to the plan; a
topic trending DOWN wants a different posting cadence than one trending up.

⛔ The FINAL point usually carries `partial_data: true` — it is an incomplete
hour. Use the last COMPLETE point as "current", and if you quote the partial
one, label it. Also do not read the hour-of-day breakdown as audience
behaviour: with n=7 per hour, one overnight news spike will make 1–2am look
like your best posting slot.

`data_type` also accepts RELATED_QUERIES and GEO_MAP if you want a second cut,
but each is another $0.015 — only spend it if leg 1 shows movement worth chasing.

## Leg 2 — Keyword volume (serpstat, $0.01/call FLAT)

⛔ BATCH THIS. It is $0.01 per CALL regardless of how many keywords you send,
up to 1,000. One keyword costs $0.01. Twenty keywords cost $0.01. Sending them
one at a time is a 20x overpay for identical data. Build the full keyword list
FIRST, then make exactly one call.

Write the body to a file (Serpstat is JSON-RPC 2.0 and treg relays it
untouched, so the envelope must be exact — a missing `id` is rejected by the
provider AND still billed):

    cat > /tmp/radar-keywords.json <<'EOF'
    {
      "id": "1",
      "method": "SerpstatKeywordProcedure.getKeywordsInfo",
      "params": {
        "keywords": ["<20-40 keywords for the niche>"],
        "se": "g_us"
      }
    }
    EOF

    treg call serpstat.google.keywords.volume --method POST --file /tmp/radar-keywords.json

Read `result.data[]`: `keyword`, `region_queries_count` (monthly US volume),
`difficulty` (0-100), `cost` (CPC in USD). Note that Serpstat silently DROPS
keywords it has no data for — measured twice: 20 sent → 16 back, 30 sent → 21
back — so reconcile the returned list against what you sent and tell me which
ones came back empty.

⛔ Two fields will break naive arithmetic, both seen in real responses:
`difficulty` can be **null** (or 0), so any `volume / difficulty` divide must
guard for it; and `cost` is sometimes garbage — $229.00 for "agentic ai" and
$829.59 for "business automation software" are not real CPCs. Flag any CPC
over ~$50 as suspect rather than feeding it into a spend model.

`result.summary_info.left_lines` is Serpstat's own row allowance. It is
observational; it is not your treg balance and it does not predict your bill.

## Leg 3 — Competitors (scrapecreators, $0.00188/call)

For each handle in `competitors`:

    treg call scrapecreators.x.v1-instagram-user-reels --query handle=<handle>

Returns `items[]`, ~10 per page, each field nested under `items[].media`.
Per reel read: `code`, `play_count`, `like_count`, `comment_count`,
`taken_at`, `caption.text`, `video_duration`, `clips_tab_pinned_user_ids`.

Then, for each competitor:
  a. Compute the MEDIAN of `play_count`, EXCLUDING any reel whose
     `clips_tab_pinned_user_ids` is non-empty. Those are pinned, and creators
     pin what went viral — a pinned reel beats the median it is inflating by
     construction, and it is usually years older than the rest of the pull.
  b. Flag every reel at or above 2x that median. Those are the outliers.
  c. For the outliers, report the first line of `caption.text` and the
     `video_duration`.
  d. Say explicitly what the outliers share that the non-outliers do NOT.
     Then check the reverse: does that same trait also appear BELOW the
     median? If it does, say so — it is not the lever.

**Pagination — read this before spending a second call.** Page 1 returns ~10
reels, which is already enough for a median. A second page costs another
$0.00188, can only take you to ~20, and in the test run **failed twice while
billing in full** (`httpx.ReadTimeout`, zero bytes, $0.0038 for nothing).

So: **run page 1. Stop.** Only paginate if page 1 returned fewer than 8
unpinned reels, and if you do, use `paging_info.max_id` as
`--query max_id=<cursor>` with a 5+ minute timeout. If a page fails, DO NOT
retry — compute the median from what you have and state the reel count you
actually used. A median over 9 reels labelled "9 reels" is honest; one over 9
reels labelled "12" is not.

## Output — the 7-day plan

Produce a table of 7 post ideas, one per day, each with:
  - the hook line to open on
  - which keyword it targets (with its volume and difficulty from leg 2)
  - which competitor outlier it is modelled on, if any
  - why it is placed on that day given the trend direction from leg 1

Rank by `Score = T × (volume ÷ max(difficulty, 1))`, where
`T = (median of the last 24h) ÷ (median of the week)`. Skip any keyword whose
`difficulty` is null. State the formula back to me with the numbers you used.

⛔ AND THEN ARGUE WITH IT, because it has two flaws you should name rather
than launder. (1) `T` is a single scalar applied to every row, so it cannot
reorder anything — it informs cadence and day placement only; the ranking is
purely volume/difficulty. (2) `difficulty` is an SEO **ranking** metric, and
nothing about short-form distribution is governed by it, so this ranks the
wrong contest. If you think a different formula fits the goal better — e.g.
CPC × volume as a commercial-intent proxy, difficulty only as a tiebreak —
say so and show both rankings.

Finish with a TOTAL SPEND line: the sum of your measured deltas, next to the
sum of the quoted prices, and flag any leg where they disagreed.

## Also write the run to a file

After the report, save everything you gathered as JSON to
`./content-radar-<YYYY-MM-DD>-<topic-slug>.json`. This is what makes a run
re-readable later and comparable against the next one; a report in a chat
window is gone the moment the window is.

⛔ Write what you MEASURED, not what you reported. If you rounded a number for
the prose, the file gets the raw one. And do not fill a field you did not
observe — every one below has an "unknown" representation, and using it is
always correct where inventing a plausible value is not.

    {
      "schema": "content-radar/1",
      "slug": "<YYYY-MM-DD>-<topic-slug>",
      "asOf": "<YYYY-MM-DD>",
      "niche": "<the niche>",
      "topic": "<the topic>",
      "trend": {
        "source": "serpapi.x.google-trends",
        "geo": "US",
        "window": "now 7-d",
        "points": [
          { "t": 1754352000, "label": "Aug 4, 2026 at 5:00 PM",
            "value": 33, "partial": false }
        ]
      },
      "keywords": {
        "source": "serpstat.google.keywords.volume",
        "sent": 30, "returned": 21,
        "dropped": ["<every keyword you sent that came back empty>"],
        "suspectCpcAbove": 50,
        "rows": [
          { "keyword": "n8n", "volume": 201000, "difficulty": 16, "cpc": 1.76 }
        ]
      },
      "competitor": {
        "source": "scrapecreators.x.v1-instagram-user-reels",
        "handle": "<handle>",
        "reelsUsed": 9, "pinnedExcluded": 1,
        "medianPlays": 67617, "outlierMultiple": 2,
        "reels": [
          { "code": "<shortcode>", "plays": 220193, "takenAt": "2026-08-03",
            "durationSec": 101.2, "pinned": false,
            "hook": "<first line of the caption>",
            "cta": "STORY", "likeRatePct": 3.34 }
        ]
      },
      "spend": {
        "totalUsd": 0.04564,
        "calls": [
          { "endpoint": "serpapi.x.google-trends", "note": "TIMESERIES",
            "quotedUsd": 0.015, "actualUsd": 0.015, "returnedData": true }
        ]
      }
    }

Rules the file must satisfy, because they are the ones that go wrong:

- `difficulty` is a number OR **null** — null when the source returned none.
  Never omit the key, and never write 0: 0 means "easiest possible keyword"
  and would rank an unmeasured term first.
- `cta` is the keyword string OR **null**. Null means no CTA; "" does not.
- `partial` is true on the FINAL trend point only, and only if the response
  said so. Every other point is `false`.
- `returnedData` is `false` for a call that was billed and gave you nothing.
  That case is a finding — omitting it erases the most useful thing you learned.
- `medianPlays` must be the median of the UNPINNED reels you list, and
  `reelsUsed` their count. `pinnedExcluded` counts the pinned ones.
- `sent` must equal `rows.length + dropped.length`. Every keyword you sent is
  in exactly one of the two.
- `spend.totalUsd` must equal the sum of `calls[].actualUsd`.

Then verify the file before you trust it. If you have this repo:

    node bin/radar-validate.mjs ./content-radar-<date>-<slug>.json

Otherwise re-read your own file against the seven rules above and say in your
report that you checked it by hand. A file nobody validated is a file that
looks like data and might not be.
```

**If you run the harness console:** drop the file in `data/radar/` and it
appears at `/radar` as a new tab — the polar keyword chart, the trend, the
competitor read and the receipts, all rendered from that one file. The slug
becomes the tab label, so keep it dated and sortable.

---

## Receipts

Every number below is a measured ledger delta from a real call on 2026-08-11, bracketed by
`treg balance` before and after. Nothing here is a catalog quote unless it says so.

| Leg | Endpoint | Quoted | **Actual ledger delta** | Match? |
|---|---|---|---|---|
| Trends | `serpapi.x.google-trends` | $0.015 | **$0.015000** | ✅ exact |
| Competitors | `scrapecreators.x.v1-instagram-user-reels` | $0.00188 | **$0.001880** | ✅ exact |
| Keywords | `serpstat.google.keywords.volume` | $0.0005/result | **$0.010000 flat** | ❌ see below |

**Total for one full radar run: ~$0.028.** Free credit is $1.00, so ~35 runs before you pay.

### The one that doesn't match, measured properly

Serpstat is quoted at **$0.0005 per result**. It does not bill that way through treg:

| Keywords sent | Rows returned | Ledger delta | What per-result would predict |
|---|---|---|---|
| 1 | 1 | **$0.010000** | $0.0005 |
| 20 | 16 | **$0.010000** | $0.0080 |
| 30 | 21 | **$0.010000** | $0.0105 |

Identical across all three. It is a **flat $0.01 per call** — arithmetically a 20-result minimum,
since 20 × $0.0005 = exactly $0.01. So the quote is only truthful if you send at least 20 keywords
in one call. Send one, and you paid 20× the sticker.

The third row is the strongest evidence: it was produced by a **separate agent** running this
playbook with no knowledge of the first two measurements, and it lands on $0.010000 from the other
side — 21 rows *should* have cost $0.0105 if the quote were real, and did not.

**That is the single most useful thing in this document, and it is the opposite of what the price
tag tells you to do.** Batch your keywords.

Meanwhile Serpstat's own meter (`summary_info.left_lines`) went **712 → 696** on the 20-keyword
call — exactly 16, one per row returned. So the provider meters per row while treg bills per call.
Both are internally consistent; they are just different units, and only one of them is on your bill.

### Real output, so you can see what you're buying

From the $0.01 keyword call (US volumes, 16 of 20 keywords returned):

| Keyword | Volume/mo | Difficulty | CPC |
|---|---|---|---|
| claude code | 550,000 | 24 | $3.85 |
| vibe coding | 110,000 | 5 | $3.50 |
| ai agent | 49,500 | 39 | $8.13 |
| ai agency | 49,500 | 20 | $8.13 |
| prompt engineering | 27,100 | 22 | $89.44 |
| ai content creation | 18,100 | 12 | $3.82 |

`vibe coding` at 110k volume and difficulty **5** is the kind of thing this is for. That one row is
worth more than the call cost.

### A failed call is still billed

From the first session's run: the same serpstat endpoint called **without** the `id` param was
rejected by the provider — `"JSON RPC 2.0 Request need id param"` — and still carried
`cost_usd: 0.01`. That is why the envelope in THE PROMPT above is written out in full. Get it wrong
and you pay the same as getting it right.

---

## What treg does not do yet

Short and factual, because you will hit these.

1. **The measured-telemetry columns are empty.** The site markets picking on "success rate & speed
   we measured." Every endpoint checked on launch day returned
   `"observed": {"samples": 0, "ok_rate": null, "p50_ms": null, "p95_ms": null}`, and the
   `WORKS`/`SPEED` columns still printed `—` for both serpstat and scrapecreators when I re-checked
   on 2026-08-11. The field is wired and it is empty. Plausibly it fills as volume accrues. Today,
   the routing you get is **priced** routing, not measured routing — which is still genuinely
   useful, just not what the front page says.

2. **"Price shown before the call" is true for some providers and not others.** Two of the three
   endpoints here billed to the micro-dollar. The third does not bill in the unit it advertises.
   Print your own deltas; that is why THE PROMPT insists on it.

3. **`catalog_get` crashes through the MCP server on some endpoints** — a Pydantic validation error
   when the stored `example_response` is a list or `None` (`apify.meta-ads.library.search`,
   `meta-ad-library.meta-ads.library.search`). **Workaround: use the CLI.** Checked directly on
   2026-08-11: `treg catalog get` returned both of those endpoints cleanly, exit 0, full params and
   example payload. So it is the MCP response model that is strict, not the catalog data that is
   missing. Worth reporting upstream at `github.com/superdesigndev/treg`.

4. **There is no Western short-form trends endpoint.** Every "hot search" result in the catalog is a
   Chinese platform — Douyin, Weibo, Kuaishou, Xiaohongshu, Pipixia. There is no TikTok or Reels
   trending-topics sibling, which is why leg 1 uses Google Trends. If your radar needs "what is
   trending on TikTok in the US," treg cannot answer that today.

5. **A zero from `catalog_search` proves nothing.** It is a literal AND across your terms. Search in
   one or two words or you will conclude a capability is missing when it is one synonym away.

---

## Honest scope

Three legs, all three called successfully with receipts. This does not:

- explain **why** anything performed — it surfaces what the outliers share, which is an association
  across a dozen posts by one creator, not a cause;
- see private metrics. Reach, saves, shares and watch time are owner-only; no scraper has them, and
  anything claiming otherwise is inferring;
- work for TikTok or YouTube competitors. Leg 3 is Instagram only. Other platforms exist in the
  catalog and are untested here, and per this document's own rule, untested means unclaimed.

*Built and verified 2026-08-11 · every price a measured ledger delta · total verification spend
$0.0369*
