# Skills

Ready-to-install capabilities. A playbook teaches you a method; a skill is that
method turned into something your assistant can run on command.

| Skill | What it does | Playbook |
| --- | --- | --- |
| [`ingest`](ingest/SKILL.md) | Turn videos, reels, posts, and articles into checkable notes, then force the synthesis pass that ranks and cross-links them | [capture-starter](../tracks/capture-starter.md) |

## Installing

All three harnesses use the same layout — `skills/<name>/SKILL.md` with `name`
and `description` at the top — so one folder installs into any of them. Pick your
line:

| Harness | Skills directory |
| --- | --- |
| Claude Code | `~/.claude/skills/` |
| Codex | `~/.codex/skills/` |
| Hermes | `~/.hermes/skills/` |

**With git** — clone once, copy into whichever you use:

```bash
git clone --depth 1 https://github.com/ausarrambeau/digital-twin-playbooks.git
cd digital-twin-playbooks
cp -r skills/ingest ~/.claude/skills/ingest      # Claude Code
cp -r skills/ingest ~/.codex/skills/ingest       # Codex
cp -r skills/ingest ~/.hermes/skills/ingest      # Hermes
```

**Without git** — two files, straight from the raw URLs. Change the first line to
point at whichever harness you use:

```bash
DEST=~/.claude/skills/ingest
SRC=https://raw.githubusercontent.com/ausarrambeau/digital-twin-playbooks/main/skills/ingest
mkdir -p "$DEST/scripts"
curl -fsSL -o "$DEST/SKILL.md" "$SRC/SKILL.md"
curl -fsSL -o "$DEST/scripts/video-prep.sh" "$SRC/scripts/video-prep.sh"
chmod +x "$DEST/scripts/video-prep.sh"
```

Both routes produce byte-identical files.

Then invoke it by name: *"use the ingest skill on this link"*, or `/ingest` if
your assistant exposes skills as slash commands.

**If you already have a skill named `ingest`, these commands overwrite it.** Look
before you run one:

```bash
ls -d ~/.claude/skills/ingest ~/.codex/skills/ingest ~/.hermes/skills/ingest 2>/dev/null
```

Anything that prints already exists. Back it up first, or install this under a
different folder name and invoke it by that name instead.

**Any other assistant** — Cursor, Windsurf, a web chatbot — paste the contents of
`SKILL.md` into a saved instruction, rule, or custom command. The frontmatter is
for harnesses that read it; everything below is the skill and is portable as-is.

**To adapt it rather than copy it,** Claude Code ships a `skill-creator` skill —
say *"use skill-creator to adapt this for my setup."* It handles the packaging,
and more usefully it can tune the `description` line. That line is what decides
whether the skill ever fires: if it does not match how you actually phrase a
request, you will have a perfectly good skill that never triggers, and you will
assume it does not work. Worth ten minutes even if you change nothing else.
Codex and Hermes ship no equivalent — there, adapt the file by hand.

**Cursor, Windsurf, or any assistant with custom instructions** — paste the
contents of `SKILL.md` into a saved instruction, rule, or custom command. The
frontmatter at the top is Claude/Codex-specific; everything below it is the
skill and is portable as-is.

**A web chatbot with no saved instructions** — paste `SKILL.md` at the top of a
conversation and work in that thread. You lose persistence, not method.

**Anything else** — hand `SKILL.md` to your assistant and say: *"turn this into
a saved instruction in whatever format you use, show it to me before saving,
then tell me how to invoke it."*

## Set your three paths first

`ingest` is storage-agnostic and needs to know where your notes, raw material,
and synthesis live. Open `SKILL.md`, find the **Where things go** table, and
replace the suggestions with your actual locations before first use. That is the
only edit required.

## The video path is optional

`scripts/video-prep.sh` extracts keyframes, a timestamped transcript, and pacing
metadata. You only need it for visual content — reels, shorts, anything where
on-screen text and editing carry meaning. Text and long-form audio need none of
it.

```bash
brew install ffmpeg python3 whisper-cpp yt-dlp        # macOS
```

On Linux: `apt install ffmpeg python3`, `pipx install yt-dlp`, and build
[whisper.cpp](https://github.com/ggerganov/whisper.cpp). Then fetch a model —
the script prints the exact `curl` command if it cannot find one, and accepts
any model you already have via `WHISPER_MODEL`.

Run it once to check your setup:

```bash
./skills/ingest/scripts/video-prep.sh <a-local-video.mp4> ./prep-test
```

It fails loudly with install instructions when something is missing, and it will
tell you plainly when transcription failed rather than reporting a crashed
transcriber as a silent video. Those are different things, and only one of them
means the video has no speech.

Login-gated platforms (Instagram, TikTok) cannot always be fetched by URL. The
script says so and tells you how to pass cookies or a local file instead —
everything downstream works identically either way.
