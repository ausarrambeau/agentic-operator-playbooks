#!/bin/bash
# video-prep.sh <url-or-file> [outdir] — prepare a video for multimodal agent ingestion.
#
# Produces: frames named by timestamp (scene-change + a dense 0-3s hook burst), a
# timestamped transcript (whisper), and editing metadata (cut count, pacing).
# Your agent then reads frames/ + transcript.json to build the shot-table note.
#
# Chunking is scene-detection based, NOT fixed-interval: frames land where the
# visuals actually change, so fast-cut segments get dense coverage and static
# shots don't waste frames.
#
# Requires: ffmpeg, ffprobe, python3, and whisper-cli (whisper.cpp).
# Optional: yt-dlp for URLs.
set -euo pipefail
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

INPUT="${1:?usage: video-prep.sh <url-or-file> [outdir]}"
OUTDIR="${2:-$PWD/video-prep-$$}"
MODEL="${WHISPER_MODEL:-$HOME/.cache/whisper/ggml-large-v3-turbo.bin}"
SCENE_THRESHOLD="${SCENE_THRESHOLD:-0.25}"   # lower = more sensitive to cuts
MAX_SCENE_FRAMES="${MAX_SCENE_FRAMES:-60}"
HOOK_SECONDS=3
HOOK_FPS=4

# ── 0. Preflight: fail early, with the fix ──
missing=0
for cmd in ffmpeg ffprobe python3; do
  command -v "$cmd" >/dev/null 2>&1 || { echo "MISSING: $cmd" >&2; missing=1; }
done
command -v whisper-cli >/dev/null 2>&1 || { echo "MISSING: whisper-cli" >&2; missing=1; }
if [ "$missing" -ne 0 ]; then
  cat >&2 <<'EOF'

To install:
  macOS:  brew install ffmpeg python3 whisper-cpp yt-dlp
  Linux:  apt install ffmpeg python3 && pipx install yt-dlp
          whisper.cpp: https://github.com/ggerganov/whisper.cpp

EOF
  exit 1
fi

if [ ! -f "$MODEL" ]; then
  echo "ERROR: whisper model missing at $MODEL" >&2
  echo "  mkdir -p '$(dirname "$MODEL")'" >&2
  echo "  curl -L -o '$MODEL' https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3-turbo.bin" >&2
  echo "  (or point WHISPER_MODEL at a model you already have)" >&2
  exit 1
fi

mkdir -p "$OUTDIR/frames"
cd "$OUTDIR"

# ── 1. Resolve input to a local video file ──
VIDEO=""
case "$INPUT" in
  *instagram.com*|*tiktok.com*)
    # Login-gated. yt-dlp may work with exported cookies; otherwise download by hand.
    if command -v yt-dlp >/dev/null 2>&1; then
      yt-dlp -f "mp4/bv*+ba/b" -o "source.%(ext)s" --no-playlist "$INPUT" >/dev/null 2>&1 || true
      VIDEO=$(ls -t ./source.* ./*.mp4 2>/dev/null | head -1 || true)
    fi
    if [ -z "$VIDEO" ]; then
      cat >&2 <<EOF
ERROR: could not fetch $INPUT automatically.

This platform is login-gated. Either:
  1. Save the video by hand, then re-run:  video-prep.sh /path/to/video.mp4
  2. Or give yt-dlp your browser cookies:
     yt-dlp --cookies-from-browser chrome -o source.mp4 "$INPUT"

Everything after this step works identically on a local file.
EOF
      exit 1
    fi ;;
  http*://*)
    command -v yt-dlp >/dev/null 2>&1 || { echo "ERROR: yt-dlp needed for URLs. Install it, or pass a local file." >&2; exit 1; }
    yt-dlp -f "mp4/bv*+ba/b" -o "source.%(ext)s" --no-playlist "$INPUT" >/dev/null 2>&1
    VIDEO=$(ls -t ./source.* ./*.mp4 2>/dev/null | head -1) ;;
  *)
    [ -f "$INPUT" ] || { echo "ERROR: file not found: $INPUT" >&2; exit 1; }
    VIDEO="$INPUT" ;;
esac
[ -n "$VIDEO" ] && [ -f "$VIDEO" ] || { echo "ERROR: no video obtained from $INPUT" >&2; exit 1; }

# ── 2. Probe metadata ──
DURATION=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VIDEO")
RES=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$VIDEO")

# ── 3. Audio → timestamped transcript ──
# TRANSCRIPT_STATUS distinguishes "ran, found no speech" from "failed to run".
# Collapsing those is dangerous: 0 segments is documented to mean music-only, and
# a crashed transcriber must never be read as a silent video.
ffmpeg -y -v error -i "$VIDEO" -ar 16000 -ac 1 -c:a pcm_s16le audio.wav
TRANSCRIPT_STATUS=ok
whisper-cli -m "$MODEL" -f audio.wav -oj -osrt -of transcript >whisper.log 2>&1 || TRANSCRIPT_STATUS=failed
if [ ! -f transcript.json ]; then
  TRANSCRIPT_STATUS=failed
  echo "WARNING: transcription failed — see whisper.log. Frames are still valid;" >&2
  echo "         treat the audio layer as UNVERIFIED, not as silence." >&2
fi
SPEECH_SEGMENTS=$(python3 -c "import json;print(len(json.load(open('transcript.json'))['transcription']))" 2>/dev/null || echo 0)

# ── 4. Scene-change keyframes, named by timestamp ──
ffmpeg -y -v info -i "$VIDEO" -vf "select='gt(scene,$SCENE_THRESHOLD)',showinfo" \
  -vsync vfr -q:v 2 frames/_scene_%04d.jpg 2> showinfo.log || true
# rename _scene_NNNN.jpg → tSS.S_scene.jpg using pts_time from showinfo
python3 - <<'PY'
import re, os, glob
times = re.findall(r'pts_time:([0-9.]+)', open('showinfo.log').read())
frames = sorted(glob.glob('frames/_scene_*.jpg'))
for f, t in zip(frames, times):
    os.rename(f, f'frames/t{float(t):07.2f}_scene.jpg')
PY
# thin out if over budget (keep an evenly spaced subset)
python3 - <<PY
import glob, os
fs = sorted(glob.glob('frames/t*_scene.jpg'))
cap = $MAX_SCENE_FRAMES
if len(fs) > cap:
    keep = {fs[round(i*(len(fs)-1)/(cap-1))] for i in range(cap)}
    [os.remove(f) for f in fs if f not in keep]
PY

# fallback for static/no-cut videos: 1 fps sampling
if [ "$(ls frames/t*_scene.jpg 2>/dev/null | wc -l)" -lt 4 ]; then
  ffmpeg -y -v info -i "$VIDEO" -vf "fps=1,showinfo" -q:v 2 frames/_fb_%04d.jpg 2> showinfo_fb.log || true
  python3 - <<'PY'
import re, os, glob
times = re.findall(r'pts_time:([0-9.]+)', open('showinfo_fb.log').read())
for f, t in zip(sorted(glob.glob('frames/_fb_*.jpg')), times):
    os.rename(f, f'frames/t{float(t):07.2f}_fb.jpg')
PY
fi

# ── 5. Hook microscope: dense burst over the first seconds ──
ffmpeg -y -v error -t $HOOK_SECONDS -i "$VIDEO" -vf "fps=$HOOK_FPS" -q:v 2 frames/_hook_%02d.jpg || true
python3 - <<PY
import os, glob
for f in sorted(glob.glob('frames/_hook_*.jpg')):
    n = int(f.split('_hook_')[1].split('.')[0])
    os.rename(f, f'frames/t{(n-1)/$HOOK_FPS:07.2f}_hook.jpg')
PY

# ── 6. Editing metadata ──
# `find`, not `ls`: a no-cut video makes the glob fail, and under `set -o pipefail`
# that kills the run right before metadata is written — losing the whole prep on
# exactly the static videos step 4 just handled.
CUTS=$(find frames -name 't*_scene.jpg' 2>/dev/null | wc -l | tr -d ' ')
# write the file directly — reopening /dev/stdout is not portable (it fails
# outright on macOS once stdout is redirected)
python3 - <<PY
import json
d = float("$DURATION"); cuts = int("$CUTS")
json.dump({
  "source": "$INPUT", "duration_s": round(d,2), "resolution": "$RES",
  "scene_cuts_detected": cuts,
  "cuts_per_second": round(cuts/d, 3) if d else None,
  "avg_shot_length_s": round(d/cuts, 2) if cuts else None,
  "transcript_status": "$TRANSCRIPT_STATUS",
  "speech_segments": int("$SPEECH_SEGMENTS"),
  "music_only_likely": "$TRANSCRIPT_STATUS" == "ok" and int("$SPEECH_SEGMENTS") == 0,
}, open('metadata.json','w'), indent=2)
PY

echo "PREPARED: $OUTDIR"
echo "  frames/          $(find frames -type f | wc -l | tr -d ' ') frames (tNNNN.NN_scene|hook|fb.jpg — timestamp in the name)"
if [ "$TRANSCRIPT_STATUS" = ok ]; then
  echo "  transcript.json  timestamped segments ($SPEECH_SEGMENTS; 0 = music-only, do NOT treat silence as absence)"
  echo "  transcript.srt   human-readable"
else
  echo "  transcript       FAILED (see whisper.log) — audio layer is UNVERIFIED, not silent"
fi
echo "  metadata.json    duration / cuts-per-second / pacing"
echo "NEXT: your agent reads frames (timestamp order) + transcript.json + metadata.json + post metadata → shot-table note"
