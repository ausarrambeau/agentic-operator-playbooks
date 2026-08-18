# The Renaissance Build

How Shopify built the Editions Winter '26 site ("The Renaissance Edition", Awwwards Site of the Day) — and how to build one like it. Every stack claim below was verified against the live site on 2026-08-17: DOM inspection, CDN asset listing, and signature scans of the shipped JavaScript. Not guessed from screenshots.

This guide is also a build brief: copy it as markdown, hand it to the coding agent you already use, and work the phases in order. Each phase ends at a gate you verify yourself before continuing.

## i. What you're actually looking at

Strip the art away and the site is a **product changelog**: 150+ updates grouped into 12 categories. Everything else — the golden-ratio line work, the 3D paintings, the butterflies — is presentation layered over that content model. That's the first lesson: the structure is boring on purpose, so the craft budget can go entirely to the surface.

It's one page, roughly **44 screens tall** (31,776px at a 720px viewport), that behaves like a film: a hero title card, then 12 chapters, each with an intro statement and a run of feature cards. Demo videos open in a modal instead of playing inline. There's a merch store hidden in it as an easter egg. Roughly 70% of its sessions are mobile.

The chapters aren't equal — the DOM shows where the budget went:

| Section id | Height (px) | Treatment |
|---|---|---|
| `#sidekick` | 6,023 | Flagship chapter — bespoke 3D scene, deepest scroll sequence |
| `#developer` | 5,028 | Finale — flips to a light theme for the close |
| `#online` | 3,348 | Bespoke scene with its own canvas work |
| `#retail` | 2,548 | Sticky sub-scenes (3 sticky wrappers) |
| `#agentic`, `#marketing` | 1,808–2,468 | Mid-tier treatment |
| `#checkout` … `#shipping` | 1,748 each | Templated: six chapters share one identical layout |

Six chapters at exactly 1,748px = one reusable template. Even an Awwwards Site of the Day only hand-crafts a third of its chapters.

## ii. The verified stack

Every row was confirmed against the site's shipped JavaScript — chunk names on the CDN, signature strings inside the minified code, classes on the live DOM. Notably absent: **GSAP appears nowhere**. The site runs on Framer Motion for DOM and Theatre.js for the cinematic 3D sequences.

| Layer | Choice | Receipt |
|---|---|---|
| Framework | Remix (React Router), deployed on Shopify Oxygen | `window.__remixContext`; assets at `cdn.shopify.com/oxygen-v2/…` |
| Styling | Tailwind CSS | `tailwind-*.css`; utility classes throughout the DOM |
| Smooth scroll | Lenis | `<html class="lenis">` |
| DOM animation | Framer Motion | "framer" signatures in `components-*.js` and `Background-*.js` |
| 3D | Three.js via React Three Fiber + postprocessing (Bloom) | three/fiber/postprocessing/shader/uniform in `Background-*.js` (~1MB); bloom in `Effects-*.js` |
| Motion design for 3D | Theatre.js — designers keyframe camera & scene sequences | "theatre" in `HeroScene`, `SidekickScene`, `Effects`, `Butterflies` chunks |
| Vector animation | Rive | `rive-*.js` chunk |
| Quality scaling | detect-gpu — tiers the experience per device | `detect-gpu.esm-*.js` loaded before any scene |
| 3D assets | Draco-compressed GLB + KTX2 (Basis) textures + PMREM environment map | `EW26_Hero_…_compressed-optimized.glb`; `studio_small_09_1k.pmrem.ktx2` (a free Poly Haven HDRI) |
| Asset hosting | A dedicated Shopify store used as a CDN for the 3D files | `editions-winter-2026.myshopify.com/cdn/shop/3d/models/…` |
| Type | Neue Montreal (grotesk) · HW Cigars (display serif) · Imperial Script (the italic "ai") · Inter Variable (UI) | `document.fonts` enumerated at runtime |

The typography **is** the brand move: a cold grotesk for the interface, an engraved serif for the display work, and a script face used for exactly two letters — the "ai" in Ren*ai*ssance. Three voices, one of them rationed to a single word. That restraint is replicable for free.

## iii. The architecture: one canvas, many scenes

The whole site is a sandwich. There is **one** fullscreen WebGL canvas, fixed behind everything, alive for the entire session. The 12 content sections are ordinary DOM stacked above it — and they're `pointer-events-none`, so the page feels like text floating over a living painting.

```
z:top   Modals            — video demos, merch easter egg (the only click targets)
z:10    DOM sections ×12  — real text, pointer-events-none, right-aligned columns
z:0     Fixed WebGL canvas — R3F; lazy scenes mount/unmount as chapters approach
input   Scroll position   — Lenis-smoothed; the single clock every layer reads
```

Scroll position is the conductor. The DOM sections give the page its height and its semantics (real text — searchable, selectable, accessible, SEO-legible). The canvas reads the same scroll value and cross-fades between per-chapter scenes, each a **separately code-split chunk** that only downloads as its chapter approaches.

This is the pattern to steal. Not "12 impressive sections," but: *content in DOM, atmosphere in one canvas, scroll as the only clock, scenes as lazy modules.*

## iv. The build, in eight phases

Build in this order and the site works at the end of every phase. The art intensifies; the structure never changes.

### Phase I — Content model before any pixels

The site is data-driven — six chapters render from one template. Start with the data, not the hero.

```ts
// content/chapters.ts
export const chapters = [
  {
    id: "sidekick",              // becomes the section id + anchor
    title: "Sidekick",
    intro: "The AI-powered expert…",
    theme: "dark",               // last chapter flips to "light"
    tier: "flagship",            // flagship | mid | template
    features: [
      { heading: "Smart suggestions", body: "…", video: "/media/pulse.mp4" },
    ],
  },
  // … 11 more
];
```

Decide tiers now: which 2–3 chapters get bespoke scenes, which share the template. Shopify's ratio was roughly 3 bespoke, 3 mid, 6 templated.

**Gate:** all chapters render as plain sections from data.

### Phase II — Skeleton

Map over the chapters, give each section its id, add anchor nav and deep links (`/#checkout`). No animation. Ship it ugly — this skeleton is also your reduced-motion and no-WebGL fallback, so make the typography good enough to stand alone.

**Gate:** every chapter reachable by URL hash.

### Phase III — The scroll conductor

Lenis for inertia, one per-section scroll progress value (0..1). Every animation in the rest of the build reads one of these values — nothing else ever drives motion.

```ts
const lenis = new Lenis({ lerp: 0.1 });
function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// Framer Motion, per section:
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"],
});
```

**Gate:** a debug overlay shows the numbers moving correctly.

### Phase IV — One canvas, lazy scenes

A single fixed R3F canvas behind the page. Detect GPU tier first; scenes lazy-load per chapter and unmount when far away.

```tsx
const gpu = await getGPUTier();            // detect-gpu, like Shopify
const quality = gpu.tier >= 2 ? "high" : gpu.tier === 1 ? "low" : "off";
if (quality === "off") return <StaticArt />; // image fallback, always built

<Canvas
  className="fixed inset-0 -z-10"
  dpr={quality === "high" ? [1, 2] : 1}
  gl={{ antialias: false, powerPreference: "high-performance" }}>
  <Suspense fallback={null}>
    {active === "hero" && <HeroScene progress={p} />}
  </Suspense>
</Canvas>
```

**Gate:** 60fps in the DevTools performance panel on a throttled profile.

### Phase V — Cinematic sequences

Shopify's quiet weapon: designers keyframe camera moves, light shifts, and object choreography in Theatre.js Studio's timeline UI, then the timeline is scrubbed by scroll instead of played by time.

```ts
const sheet = getProject("EW26", { state }).sheet("sidekick");
useFrame(() => {
  // scroll progress drives the playhead — scroll IS the timeline
  sheet.sequence.position = progress.get() * sheet.sequence.length;
});
```

Solo builders can substitute a GSAP ScrollTrigger scrub timeline — same idea, code-defined instead of GUI-keyframed.

**Gate:** scrubbing feels directed, no jank, reversible at any scroll position.

### Phase VI — The asset pipeline

The site stays at 60fps on phones because nothing ships raw — their own filenames say it: `compressed-optimized.glb`, `.pmrem.ktx2`.

```bash
# GLB: Draco-compress geometry, KTX2-compress textures
npx @gltf-transform/cli optimize scene.glb scene-optimized.glb \
    --compress draco --texture-compress ktx2
```

Environment lighting: a free HDRI from Poly Haven, PMREM-prefiltered. Video spec, straight from their DOM:

```html
<video muted loop playsinline preload="metadata" src="…" />
<!-- full-res demos live in a modal, opened on click -->
```

**Gate:** the bundle analyzer shows each scene as its own chunk.

### Phase VII — Performance & access

- **Budget per frame, not per page.** One canvas, capped DPR, `antialias: false` with Bloom covering the aliasing. Mobile is the target, not the dev laptop.
- **Three quality tiers** from detect-gpu: full scenes → reduced scenes → static art. The Phase II skeleton is tier zero; nobody gets a blank page.
- **Text is never in the canvas.** Every word stays real DOM.
- **`prefers-reduced-motion`** collapses to the skeleton with opacity-only transitions.

**Gate:** Lighthouse mobile ≥ 90 with the canvas on.

### Phase VIII — The finish layer

What separates award sites from good sites has nothing to do with engineering:

- **A rationed accent.** The script face on two letters. One gold, never two.
- **Easter eggs.** A floating key unlocks a hidden graffiti layer; the merch beanie is priced $14.52 — da Vinci's birth year. Cheap to build, disproportionately shared.
- **A themed finale.** The last chapter inverts to light — the site *ends* instead of stopping.
- **Chapter nav + deep links** so the 44-screen page stays navigable and linkable.

**Gate:** the ship checklist below passes.

## v. Doing it in Next.js

The original is already a React app — Remix is React Router under the hood — so Next.js isn't a compromise, it's a sibling. Every load-bearing library above is a framework-agnostic React package that drops into Next unchanged.

| Renaissance Edition | Next.js equivalent |
|---|---|
| Remix route chunk per page | App Router page; `"use client"` for the interactive tree |
| Lazy scene chunks | `next/dynamic(() => import("./scenes/X"), { ssr: false })` |
| Oxygen hosting | Vercel, or `output: "export"` — the page needs no server data, so static export hosts anywhere free |
| Font CSS files | `next/font/local` — automatic preload and `font-display` handling |
| Tailwind via Vite | Tailwind via the built-in pipeline |

Two Next-specific rules:

1. **Keep the canvas out of SSR.** The R3F canvas, Lenis, and anything touching `window` load with `ssr: false`. The chapter text sections stay server-rendered — that preserves the "real DOM text" property.
2. **One client boundary, not many.** Wrap the scroll conductor and canvas in a single client provider near the root and share progress through a store (Zustand is the usual R3F pairing). Scattering `"use client"` per section causes hydration churn on a page this tall.

## vi. The 90% version for a team of one

Shopify's credits include one of the best WebGL engineers working. You are not out-rendering them solo — and you don't need to. Most of what reads as "expensive" is identity and choreography, not polygon count. Worth knowing: Shopify's own artwork started as **AI-generated foundations that human artists refined**.

**Keep — this is the feel:**

- The content-model-first structure and chapter template ratio
- Black ground + hairline line-work identity (CSS/SVG/canvas 2D — no WebGL required)
- The three-voice type system with a rationed accent
- Lenis + one scroll conductor driving everything
- **One** hero WebGL moment — or AI-generated stills with a shader crossfade
- Videos in a modal, `preload="metadata"`
- One easter egg

**Cut — this is the headcount:**

- Twelve bespoke 3D scenes → do 1, template 11
- Instanced butterfly particle systems
- Theatre.js pipeline → GSAP scrub, or Framer Motion alone
- Rive vector animations → CSS/Motion transitions
- Custom licensed fonts → the closest free pair
- Draco/KTX2 pipeline — irrelevant until you actually ship GLBs

A solo build that keeps the left list is a legitimately striking site in 2–4 focused days, and it degrades gracefully because the skeleton ships first.

## vii. Running it with your agent

The phases are deliberately agent-shaped: each is a bounded prompt with a verifiable exit. Run them as separate sessions, not one mega-prompt — and verify each gate yourself before moving on. The failure mode is letting the agent claim Phase IV works without you ever opening the page.

Hard rules to give your agent:

- Text is NEVER rendered inside the canvas.
- The Phase II skeleton must remain fully usable with animation disabled, forever.
- Nothing ships raw: GLB Draco'd, textures KTX2/WebP, videos `preload="metadata"`.
- If a phase gate fails, fix it before starting the next phase. Do not stack unverified work.

Agents are strongest at Phases I–III and VI–VII (structure, plumbing, optimization) and weakest at V (taste). Spend your human hours where Shopify spent Theatre.js: on the choreography.

## viii. The ship checklist

- [ ] Content renders from data; adding a feature is a JSON edit, not a layout edit
- [ ] Site fully usable with JS animation disabled (the skeleton stands alone)
- [ ] All copy is real DOM — selectable, findable, indexable
- [ ] GPU tier gate verified by forcing tier 0
- [ ] `prefers-reduced-motion` collapses to opacity-only
- [ ] Every GLB compressed; every texture KTX2 or sized WebP; videos `preload="metadata"`
- [ ] 60fps on a real mid-range phone, not just your laptop
- [ ] Chapter deep links work; OG image set; one easter egg planted

---

*Sources: the live site (shopify.com/editions/winter2026, verified 2026-08-17), the Awwwards SOTD entry, the RGD in-house award write-up, the webgpu.com showcase, and Shopify's own "How we built Boring Edition" post on a previous edition. Independent community teardown for educational purposes; not affiliated with or endorsed by Shopify.*
