# Nothing Design System — Tokens

> **Naming convention.** Two families of token names live in this file and they do not overlap:
> **colour tokens** are real CSS variables (`--nd-*` raw values, exposed to Tailwind as `--color-*` in `@theme`);
> **type-scale tokens** (`--display-lg`, `--body`, `--caption`, `--label`…) are *size names* used to talk about the scale — they are implemented as Tailwind `text-*` utilities, not as CSS variables.
> So `--body` as a colour is `text-body`, and `--body` as a size is `text-base`. Wiring for both is in `references/platform-mapping.md` Section 5.3.

## 1. TYPOGRAPHY

### Font Stack

| Role | Font | Astro `cssVariable` | Tailwind `@theme` key | Weight |
|------|------|---------------------|-----------------------|--------|
| **Display** | `"Doto"` | `--font-doto` | `--font-display` → `font-display` | Variable `wght 100–900` + eje `ROND 0–100`. Sin itálica. |
| **Body / UI** | `"Space Grotesk"` | `--font-space-grotesk` | `--font-sans` → `font-sans` | Variable `wght 300–700`. Sin itálica. |
| **Data / Labels** | `"Space Mono"` | `--font-space-mono` | `--font-mono` → `font-mono` | Estática: 400 y 700, con itálica real. |

**Why these fonts:** Doto = variable dot-matrix (closest to NDot 57). Space Grotesk + Space Mono by Colophon Foundry — same foundry as Nothing's actual typefaces. Shared design DNA.

**How they load:** self-hosted by the Astro Fonts API — registered in `astro.config.mjs` with `fontProviders.google()` and emitted with `<Font cssVariable="…" />` in `src/components/BaseHead.astro`. All three carry `subsets: ['latin', 'latin-ext']` (the site ships Spanish content) and `styles: ['normal']` (this system never uses italic). Full config, and the preload filtering that keeps it to two blocking requests, in `references/platform-mapping.md` Section 5.2.

### Type Scale

The **display end is fluid, the text end is fixed.** Headlines scale with the viewport via the `heading-*` utilities; everything from 24px down is a plain Tailwind size. The `--display-*` names are the vocabulary for talking about the scale — in code you write the utility.

**Display — fluid, Doto.** One implementation, two names for the same thing:

| Token | Utility | Min | Fluid | Max | Line Height | Tracking | Use |
|-------|---------|-----|-------|-----|-------------|----------|-----|
| — | `heading-64` | 48px | 11vw | 128px | 0.92 | -0.03em | Hero headings |
| — | `heading-48` | 48px | 8vw | 100px | 0.92 | -0.03em | Section heroes |
| `--display-xl` | `heading-44` | 48px | 5.5vw | 72px | 0.92 | -0.03em | Page titles, hero numbers |
| `--display-md` | `heading-36` | 28px | 2.8vw | 36px | 0.92 | -0.03em | Subsection headings |

**Text — fixed, Space Grotesk / Space Mono.** Line height is set once here and nowhere else:

| Token | Size | Tailwind | Line Height | Letter Spacing | Use |
|-------|------|----------|-------------|----------------|-----|
| `--heading` | 24px | `text-2xl` | 1.2 | -0.01em | Section headings |
| `--subheading` | 18px | `text-lg` | 1.3 | 0 | Subsections |
| `--body` | 16px | `text-base` | 1.5 | 0 | Body text (UI) |
| `--body-sm` | 14px | `text-sm` | 1.5 | 0.01em | Secondary body |
| `--caption` | 12px | `text-xs` | 1.4 | 0.04em | Timestamps, footnotes |
| `--label` | 11px | `nd-label` | 1.2 | 0.08em | ALL CAPS monospace labels |

**The one exception:** long-form prose (blog and daily posts, rendered by `@tailwindcss/typography`) runs `--body` at line height **1.7**, not 1.5. Reading a 600-word article is not reading a UI label. The plugin sets this; don't fight it.

### Utility Classes (`src/styles/global.css`)

**Heading utilities** — `heading-64/48/44/36` above. Each sets Doto, `font-weight: 700`, `letter-spacing: -0.03em`, `line-height: 0.92` and `color: var(--color-title)` in one class. Apply directly to `<h1>`–`<h3>`.

**Label utility** — `nd-label` = Space Mono, 11px, uppercase, `letter-spacing: 0.08em`. The one canonical name for the instrument-panel label. It does not set colour — always pair it with a `text-*` class (`nd-label text-caption`).

**Body text** — raw Tailwind `text-*` size + colour class. `font-sans` is already the document default, so you only add a font class to *leave* Space Grotesk (`font-mono`, `font-display`).

### Typographic Rules

- **Doto:** 36px+ only, tight tracking, never for body text
- **Labels:** Always Space Mono, ALL CAPS, 0.06–0.1em spacing, 11–12px ("instrument panel" labels)
- **Data/Numbers:** Always Space Mono. Units as `--label` size, slightly raised, adjacent
- **Hierarchy:** heading (Doto) > subheading (Space Grotesk) > label (Space Mono caps) > text (Space Grotesk). Four levels max.

---

## 2. COLOR SYSTEM

### Surface & Text Ramp

One set of roles, two sets of values. Both modes are authored together — see the Dark / Light table below for the light values and `references/platform-mapping.md` Section 5.3 for how they are wired to `:root` / `.dark`.

| Token | Tailwind | Dark | Contrast on `--surface` | Light | Contrast on `--surface` | Role |
|-------|----------|------|--------------------------|-------|--------------------------|------|
| `--surface` | `bg-surface` | `#000000` | — | `#F5F5F5` | — | Page background |
| `--card` | `bg-card` | `#111111` | 1.1:1 | `#FFFFFF` | 1.1:1 | Elevated surfaces, cards |
| `--raised` | `bg-raised` | `#1A1A1A` | 1.2:1 | `#F0F0F0` | 1.0:1 | Secondary elevation |
| `--border` | `border-border` | `#222222` | 1.3:1 | `#E8E8E8` | 1.1:1 | Subtle dividers (decorative only) |
| `--outline` | `border-outline` | `#333333` | 1.7:1 | `#CCCCCC` | 1.5:1 | Intentional borders, wireframe lines |
| `--disabled` | `text-disabled` | `#666666` | 3.7:1 | `#999999` | 2.6:1 | Disabled text, decorative elements |
| `--caption` | `text-caption` | `#999999` | 7.4:1 | `#666666` | 5.3:1 | Labels, captions, metadata |
| `--body` | `text-body` | `#E8E8E8` | 17.1:1 | `#1A1A1A` | 16.0:1 | Body text |
| `--title` | `text-title` | `#FFFFFF` | 21:1 | `#000000` | 19.3:1 | Headlines, hero numbers |

`--disabled` sits below 3:1 in light mode by design — it is for decorative and inert elements. Never put meaningful text on it in either mode; if it must be read, it is `--caption`. Note the ramp is **not** symmetric: light mode compresses (19.3:1 max vs 21:1), so a gray step that separates cleanly in dark can flatten in light. Verify contrast on the surface the element actually sits on — text inside a `--card` in light mode is on `#FFFFFF`, not `#F5F5F5`.

### Accent & Status Colors

Off-white is a much brighter backdrop than OLED black: the saturated dark-mode values wash out on it. Green, amber and orange therefore get a darkened light-mode value. Red does not — the signal must read as the same red in both modes, and it already passes.

| Token | Tailwind | Dark | on `--surface` | Light | on `--surface` | Usage |
|-------|----------|------|----------------|-------|----------------|-------|
| `--accent` | `text-accent` / `bg-accent` | `#D71921` | 4.1:1 | `#D71921` | 4.8:1 | Signal light: active states, destructive, urgent. One per screen as UI element. Never decorative. |
| `--accent-subtle` | `bg-accent-subtle` | `rgba(215,25,33,0.15)` | — | `rgba(215,25,33,0.15)` | — | Accent tint backgrounds |
| `--success` | `text-success` | `#4A9E5C` | 6.3:1 | `#2F7A41` | 4.8:1 | Confirmed, completed, connected |
| `--warning` | `text-warning` | `#D4A843` | 9.5:1 | `#8A6B14` | 4.6:1 | Caution, pending, degraded |
| `--action` | `text-action` | `#F16A0D` | 6.8:1 | `#B84E08` | 4.7:1 | Tappable text: links, picker values. Not for buttons. |
| `--error` | — | `#D71921` | — | `#D71921` | — | Shares accent red — errors ARE the accent moment |
| `--info` | — | `#999999` | — | `#666666` | — | Uses caption color |

`--accent` at 4.1:1 in dark passes AA for large text and UI components, not for body copy. That is fine — red is a signal on labels, borders, dots and numbers, never a paragraph. If red must carry small text in dark mode, use `--title` for the text and the red on a border or dot next to it.

**Data status colors:** `--success` = good/in range, `--warning` = moderate/attention, `--accent` = bad/over limit, `--body` = neutral. Apply color to **value**, not label or background. Labels stay `--caption`. Trend arrows inherit value color.

### What Stays Fixed Across Modes

Token *names* and *roles* — never their values. Also identical in both modes: ALL CAPS label treatment, fonts, type scale, spacing, component shapes, radii, motion. Only the hex values flip. If a component needs a different *shape* or *layout* per mode, the design is wrong.

**Dark feel:** Instrument panel in a dark room. OLED black, white data glowing.
**Light feel:** Printed technical manual. Off-white paper (#F5F5F5), black ink. Cards = `#FFFFFF` on off-white page = subtle elevation without shadows.

---

## 3. SPACING

### Spacing Scale (8px rhythm, 4px grid)

Steps move in multiples of 8 from `--space-sm` up; 4px and 2px exist only for tight and optical work. Tailwind's default `--spacing: 0.25rem` covers every token exactly — no custom values needed.

| Token | Value | Use | Tailwind |
|-------|-------|-----|----------|
| `--space-2xs` | 2px | Optical adjustments only | `*-0.5` |
| `--space-xs` | 4px | Icon-to-label gaps, tight padding | `*-1` |
| `--space-sm` | 8px | Component internal spacing | `*-2` |
| `--space-md` | 16px | Standard padding, element gaps | `*-4` |
| `--space-lg` | 24px | Group separation | `*-6` |
| `--space-xl` | 32px | Section margins | `*-8` |
| `--space-2xl` | 48px | Major section breaks | `*-12` |
| `--space-3xl` | 64px | Page-level vertical rhythm | `*-16` |
| `--space-4xl` | 96px | Hero breathing room | `*-24` |

---

## 4. MOTION & INTERACTION

- **Duration:** 150–250ms micro, 300–400ms transitions
- **Easing:** `cubic-bezier(0.25, 0.1, 0.25, 1)` — subtle ease-out. No spring/bounce.
- Prefer opacity over position. Elements fade, don't slide.
- Hover: border/text brightens in dark, darkens in light — in both cases it moves one step up the ramp (`--caption` → `--body` → `--title`). Never scale, never shadow.
- No parallax, scroll-jacking, gratuitous animation.
- **Theme swap** is handled globally by `document.startViewTransition` in `ThemePicker.astro`, with a `prefers-reduced-motion` fallback and `::view-transition-old/new(root)` neutralised in `global.css`. Don't add per-component colour transitions: they double up with the cross-fade.
- Every motion rule must honour `prefers-reduced-motion: reduce`.

---

## 5. ICONOGRAPHY

- Monoline, 1.5px stroke, no fill. 24x24 base, 20x20 live area. Round caps/joins.
- Color inherits text color. Max 5–6 strokes.
- Preferred: Lucide (thin), Phosphor (thin). Never filled or multi-color.

---

## 6. DOT-MATRIX MOTIF

**When to use:** Hero typography (Doto), decorative grid backgrounds, dot-grid data viz, loading indicators, empty state illustrations.

### CSS Implementation (Tailwind v4 — `src/styles/global.css`)
```css
@utility dot-grid {
  background-image: radial-gradient(circle, var(--color-outline) 1px, transparent 1px);
  background-size: 16px 16px;
}
@utility dot-grid-subtle {
  background-image: radial-gradient(circle, var(--color-border) 0.5px, transparent 0.5px);
  background-size: 12px 12px;
}
```

Usage in `.astro`: `<div class="dot-grid pointer-events-none absolute ... opacity-20" aria-hidden="true" />`

Dots 1–2px, uniform 12–16px grid. Opacity 0.1–0.2 for backgrounds, full for data. Never as container border or button style. The dots read off `--color-outline`/`--color-border`, so they follow the theme automatically — but check the light mode: `#CCCCCC` dots on `#F5F5F5` at `opacity-20` are effectively invisible. In light mode raise the opacity (0.4–0.6) or step the colour down to `--caption`. Decorative dot grids are `aria-hidden`.
