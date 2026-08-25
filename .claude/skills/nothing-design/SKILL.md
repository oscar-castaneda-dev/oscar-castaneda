---
name: nothing-design
description: The design system for this site — read it before ANY visual work here: writing or editing markup, classes, styles or tokens; adding a page, layout or component; choosing a colour, font, size or spacing. Also when the user says "Nothing style", "Nothing design", or "/nothing-design".
---

# Nothing-Inspired UI/UX Design System

A senior product designer's toolkit trained in Swiss typography, industrial design (Braun, Teenage Engineering), and modern interface craft. Monochromatic, typographically driven, information-dense without clutter. Dark and light mode with equal rigor.

**Before starting any design work, declare which fonts are required and how to load them** (see `references/tokens.md` Section 1). In this project fonts are self-hosted through the Astro Fonts API — declared in `astro.config.mjs` and emitted with `<Font>` in `BaseHead.astro` (see `references/platform-mapping.md` Section 5.2). Never assume a font is already available: if it is not in `astro.config.mjs`, it does not exist.

---

## 1. DESIGN PHILOSOPHY

- **Subtract, don't add.** Every element must earn its pixel. Default to removal.
- **Structure is ornament.** Expose the grid, the data, the hierarchy itself.
- **Monochrome is the canvas.** Color is an event, not a default — except when encoding data status (see Section 3).
- **Type does the heavy lifting.** Scale, weight, and spacing create hierarchy — not color, not icons, not borders.
- **Both modes ship together.** Dark mode: OLED black. Light mode: warm off-white. Neither is "derived" — both get full design attention, in the same pass. This project exposes three states (light / dark / system), so there is no "default mode" to ask about: every colour decision is written as a token pair from the start.
- **Industrial warmth.** Technical and precise, but never cold. A human hand should be felt.

---

## 2. CRAFT RULES — HOW TO COMPOSE

### 2.1 Visual Hierarchy: The Three-Layer Rule

Every screen has exactly **three layers of importance.** Not two, not five. Three.

| Layer         | What                                                              | How                                                                                                     |
| ------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Primary**   | The ONE thing the user sees first. A number, a headline, a state. | Doto or Space Grotesk at display size. `--title` / `text-title`. 48–96px breathing room.                 |
| **Secondary** | Supporting context. Labels, descriptions, related data.           | Space Grotesk at body/subheading. `--body` / `text-body`. Grouped tight (8–16px) to the primary.         |
| **Tertiary**  | Metadata, navigation, system info. Visible but never competing.   | Space Mono at caption/label. `--caption` or `--disabled`. ALL CAPS. Pushed to edges or bottom.           |

**The test:** Squint at the screen. Can you still tell what's most important? If two things compete, one needs to shrink, fade, or move.

**Common mistake:** Making everything "secondary." Evenly-sized elements with even spacing = visual flatness. Be brave — make the primary absurdly large and the tertiary absurdly small. The contrast IS the hierarchy.

### 2.2 Font Discipline

Per screen, use maximum:

- **2 font families** (Space Grotesk + Space Mono. Doto only for hero moments.)
- **3 font sizes** (one large, one medium, one small)
- **2 font weights** (Regular + one other — usually Light or Medium, rarely Bold)

Think of it as a budget. Every additional size/weight costs visual coherence. Before adding a new size, ask: can I create this distinction with spacing or color instead?

| Decision                  | Size |  Weight  | Color |
| ------------------------- | :--: | :------: | :---: |
| Heading vs. body          | Yes  |    No    |  No   |
| Label vs. value           |  No  |    No    |  Yes  |
| Active vs. inactive nav   |  No  |    No    |  Yes  |
| Hero number vs. unit      | Yes  |    No    |  No   |
| Section title vs. content | Yes  | Optional |  No   |

**Rule of thumb:** If reaching for a new font-size, it's probably a spacing problem. Add distance instead.

### 2.3 Spacing as Meaning

Spacing is the primary tool for communicating relationships.

```
Tight (4–8px)   = "These belong together" (icon + label, number + unit)
Medium (16px)    = "Same group, different items" (list items, form fields)
Wide (32–48px)   = "New group starts here" (section breaks)
Vast (64–96px)   = "This is a new context" (hero to content, major divisions)
```

**If a divider line is needed, the spacing is probably wrong.** Dividers are a symptom of insufficient spacing contrast. Use them only in data-dense lists where items are structurally identical.

### 2.4 Container Strategy (prefer top)

1. **Spacing alone** (proximity groups items)
2. A single divider line
3. A subtle border outline
4. A surface card with background change

Each step down adds visual weight. Use the lightest tool that works. Never box the most important element — let it float on the background.

### 2.5 Color as Hierarchy

In a monochrome system, the gray scale IS the hierarchy. Max 4 levels per screen — the token names are the same in both modes, only the values flip:

| Token | Tailwind | Dark | Light | Use |
| --- | --- | --- | --- | --- |
| `--title` | `text-title` | `#FFFFFF` | `#000000` | Hero numbers, headlines. One per screen. |
| `--body` | `text-body` | `#E8E8E8` | `#1A1818` | Body text, primary content. |
| `--caption` | `text-caption` | `#999999` | `#656161` | Labels, captions, metadata. |
| `--disabled` | `text-disabled` | `#666666` | `#969292` | Disabled, timestamps, hints. |

Reach for the token, never a raw gray or a Tailwind default (`text-gray-500`). Contrast between levels must survive **both** modes: a step that reads in dark can collapse in light, so check the pair, not one value.

**`--accent` is not part of the hierarchy.** On this site it is green (`#4A9E5C` dark / `#2F7A41` light) and it means exactly one thing: *this is the active one*. One element per screen, never decorative.

**Red is `--error` only** (`#D71921`, both modes) — a failure or a destructive action. It is not the accent here, so a screen showing red is a screen where something is wrong. If nothing is broken, no red.

**Section palettes** are the other exemption: green for building, indigo for writing, one per page, and only as surface, border and marks — never as text. They encode *where you are*, not *what is urgent*. See `references/tokens.md`.

**Data status colors** (success green, warning amber, error red) are exempt from the "one accent" rule when encoding data values. Apply color to the **value itself**, not labels or row backgrounds. See `references/tokens.md` for the full color system.

### 2.6 Consistency vs. Variance

**Be consistent in:** Font families, label treatment (always Space Mono ALL CAPS), spacing rhythm, color roles, component shapes, alignment.

**Break the pattern in exactly ONE place per screen:** An oversized number, a circular widget among rectangles, the green accent among grays, a Doto headline, a vast gap where everything else is tight.

This single break IS the design. Without it: sterile grid. With more than one: visual chaos.

### 2.7 Compositional Balance

**Asymmetry > symmetry.** Centered layouts feel generic. Favor deliberately unbalanced composition:

- **Large left, small right:** Hero metric + metadata stack.
- **Top-heavy:** Big headline near top, sparse content below.
- **Edge-anchored:** Important elements pinned to screen edges, negative space in center.

Balance heavy elements with more empty space, not with more heavy elements.

### 2.8 The Nothing Vibe

1. **Confidence through emptiness.** Large uninterrupted background areas. Resist filling space.
2. **Precision in the small things.** Letter-spacing, exact gray values, 4px gaps. Micro-decisions compound into craft.
3. **Data as beauty.** `36GB/s` in Space Mono at 48px IS the visual. No illustrations needed.
4. **Mechanical honesty.** Controls look like controls. A toggle = physical switch. A gauge = instrument.
5. **One moment of surprise.** A dot-matrix headline. A circular widget. A green dot. Restraint makes the one expressive moment powerful.
6. **Percussive, not fluid.** Imagine UI sounds: click not swoosh, tick not chime. Design transitions that feel mechanical and precise.

### 2.9 Visual Variety in Data-Dense Screens

When 3+ data sections appear on one screen, vary the visual form:

| Form                                | Best for                     | Weight           |
| ----------------------------------- | ---------------------------- | ---------------- |
| Hero number (large Doto/Space Mono) | Single key metric            | Heavy — use once |
| Segmented progress bar              | Progress toward goal         | Medium           |
| Concentric rings / arcs             | Multiple related percentages | Medium           |
| Inline compact bar                  | Secondary metrics in rows    | Light            |
| Number-only with status color       | Values without proportion    | Lightest         |
| Sparkline                           | Trends over time             | Medium           |
| Stat row (label + value)            | Simple data points           | Light            |

Lead section → heaviest treatment. Secondary → different form. Tertiary → lightest. The FORM varies, the VOICE stays the same.

---

## 3. ANTI-PATTERNS — WHAT TO NEVER DO

- No gradients in UI chrome
- No shadows. No blur. Flat surfaces, border separation.
- No skeleton loading screens. Use `[LOADING...]` text or segmented spinner.
- No toast popups. Use inline status text: `[SAVED]`, `[ERROR: ...]`
- No sad-face illustrations, cute mascots, or multi-paragraph empty states
- No zebra striping in tables
- No filled icons, multi-color icons, or emoji as UI
- No parallax, scroll-jacking, or gratuitous animation
- No spring/bounce easing. Use subtle ease-out only.
- No border-radius > 16px on cards. Buttons are pill (999px) or technical (4–8px).
- Data visualization: differentiate with **opacity** (100%/60%/30%) or **pattern** (solid/striped/dotted) before introducing color.
- No `@media (prefers-color-scheme: dark)` inside a component. The theme is class-driven (`.dark` on `<html>`); a media query ignores the user's manual choice. The OS preference is read in exactly two places: the pre-paint script in `Layout.astro` and the listener in `ThemePicker.astro`.
- No raw grays (`text-gray-500`, `#333`) where a token exists. A hardcoded gray only works in one mode.
- No colour applied after first paint by JavaScript — it flashes. Theme-dependent colour comes from a Tailwind class the `.dark` variant resolves. The one exception is a `<canvas>`, which takes no class: it reads its colour back off the element and repaints on the theme swap. See `platform-mapping.md` Section 5.7.

---

## 4. WORKFLOW

1. **Declare fonts** — name the families needed and check they are registered in `astro.config.mjs` (see `references/tokens.md` Section 1 and `references/platform-mapping.md` Section 5.2)
2. **Sketch hierarchy** — identify the 3 layers before writing any code
3. **Compose** — apply craft rules (Sections 2.1–2.9)
4. **Check tokens** — consult `references/tokens.md` for exact values, both modes at once
5. **Build components** — consult `references/components.md` for patterns
6. **Adapt to platform** — consult `references/platform-mapping.md`; Section 5 is this project
7. **Verify both modes** — review the result in light and in dark, and squint-test each (Section 2.1). Never ship a screen checked in one mode only.

---

## 5. REFERENCE FILES

For detailed token values, component specs, and platform-specific guidance:

- **`references/tokens.md`** — Fonts, type scale, color system (dark + light), spacing scale, grid, motion, iconography, dot-matrix motif
- **`references/components.md`** — Cards, buttons, inputs, lists, tables, nav, tags, segmented controls, progress bars, charts, widgets, overlays, state patterns
- **`references/platform-mapping.md`** — HTML/CSS, SwiftUI, Paper, React/Tailwind, and **Section 5: Astro + Tailwind v4 — this project** (file map, Astro Fonts API, `@theme` tokens, the light/dark/system switch, `.astro` component patterns)
