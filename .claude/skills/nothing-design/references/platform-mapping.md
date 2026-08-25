# Nothing Design System — Platform Mapping

## 1. HTML / CSS / WEB

Load fonts via Google Fonts `<link>` or `@import`. Use CSS custom properties, `rem` for type, `px` for spacing/borders. Dark/light via `prefers-color-scheme` or class toggle.

```css
:root {
  --surface: #000000;
  --card: #111111;
  --raised: #1A1A1A;
  --border: #222222;
  --outline: #333333;
  --disabled: #666666;
  --caption: #999999;
  --body: #E8E8E8;
  --title: #FFFFFF;
  --accent: #D71921;
  --accent-subtle: rgba(215,25,33,0.15);
  --success: #4A9E5C;
  --warning: #D4A843;
  --action: #F16A0D;
}
```

---

## 2. SWIFTUI / iOS

Register fonts in Info.plist, bundle `.ttf` files. Use `@Environment(\.colorScheme)` for mode switching.

```swift
extension Color {
    static let ndSurface  = Color(hex: "000000")
    static let ndCard     = Color(hex: "111111")
    static let ndRaised   = Color(hex: "1A1A1A")
    static let ndBorder   = Color(hex: "222222")
    static let ndOutline  = Color(hex: "333333")
    static let ndDisabled = Color(hex: "666666")
    static let ndCaption  = Color(hex: "999999")
    static let ndBody     = Color(hex: "E8E8E8")
    static let ndDisplay  = Color.white
    static let ndAccent   = Color(hex: "4A9E5C")
    static let ndError    = Color(hex: "D71921")
    static let ndSuccess  = Color(hex: "4A9E5C")
    static let ndWarning  = Color(hex: "D4A843")
    static let ndAction   = Color(hex: "F16A0D")
}
```

Light mode values in tokens.md Dark/Light table. Derive Font extension from font stack table (trivial: `.custom("Doto"/"SpaceGrotesk-Regular"/"SpaceMono-Regular", size:)`).

---

## 3. PAPER (DESIGN TOOL)

Use `get_font_family_info` to verify fonts before writing styles. Direct hex values (no CSS variables). Dark mode as default canvas, light mode as separate artboard.

---

## 4. REACT / TAILWIND (OTHER PROJECTS)

Token → utility reference for a React/Tailwind v4 target. **This repo ships no React** — it is here so the system can be lifted into a project that does. Tokens live in the global stylesheet under `@theme`; pure black/white use Tailwind's built-ins, everything else is a custom color token. For this repo, font loading, token definitions and file locations are in **Section 5 — Astro**; the tables below still apply verbatim (swap `className` for `class` in `.astro` files).

### Color Token → Tailwind Class

| Design Token | Tailwind Class |
|---|---|
| `--surface` (bg) | `bg-surface` |
| `--title` (#FFF) | `text-title` |
| `--card` | `bg-card` |
| `--raised` | `bg-raised` |
| `--border` | `border-border` |
| `--outline` | `border-outline` |
| `--disabled` | `text-disabled` |
| `--caption` | `text-caption` |
| `--body` | `text-body` |
| `--accent` (verde) | `text-accent` / `bg-accent` / `border-accent` |
| `--accent-subtle` | `bg-accent-subtle` |
| `--error` (rojo) | `text-error` / `border-error` |
| `--success` | `text-success` / `bg-success` |
| `--warning` | `text-warning` |
| `--action` | `text-action` |
| `--green-*` (building) | `bg-green-surface` / `border-green-border` / `text-green-muted` |
| `--indigo-*` (writing) | `bg-indigo-surface` / `border-indigo-border` / `text-indigo-muted` |

### Type Scale → Utility Classes

**Headings** — use the `@utility` classes defined in the global stylesheet. Apply directly to `<h1>`–`<h3>`:

| Utility | Size (clamp) | Use |
|---|---|---|
| `heading-64` | 48px → 128px | Hero headings |
| `heading-48` | 48px → 100px | Section heroes |
| `heading-44` | 48px → 72px | Page titles |
| `heading-36` | 28px → 36px | Subsection headings |

**Subtitle / labels** — `font-nothing-subtitle` + a `text-*` color. Apply to `<p>`, `<span>`, etc.:

| Design Token | Size | Tailwind |
|---|---|---|
| `--caption` | 12px | `text-xs` |
| `--body-sm` | 14px | `text-sm` |
| `--body` | 16px | `text-base` |
| `--subheading` | 18px | `text-lg` |
| `--heading` | 24px | `text-2xl` |
| Space Mono body | — | `font-mono` |
| Doto display | — | `font-display` |

### Spacing Token → Tailwind Scale

Uses Tailwind's default `--spacing: 0.25rem` multiplier.

| Token | Value | Tailwind |
|---|---|---|
| `--space-xs` | 4px | `*-1` |
| `--space-sm` | 8px | `*-2` |
| `--space-md` | 16px | `*-4` |
| `--space-lg` | 24px | `*-6` |
| `--space-xl` | 32px | `*-8` |
| `--space-2xl` | 48px | `*-12` |
| `--space-3xl` | 64px | `*-16` |
| `--space-4xl` | 96px | `*-24` |

### Custom Utilities (global stylesheet)

```css
@utility font-nothing-dots     { font-family: var(--font-display); }
@utility font-nothing-code     { font-family: var(--font-mono); }
@utility font-nothing-subtitle { font-family: var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; line-height: 1.2; }
@utility subtitle              { @apply font-nothing-subtitle uppercase; }
@utility dot-grid   { background-image: radial-gradient(circle, var(--color-outline) 1px, transparent 1px); background-size: 16px 16px; }
@utility dot-grid-subtle { background-image: radial-gradient(circle, var(--color-border) 0.5px, transparent 0.5px); background-size: 12px 12px; }
```

### Component Patterns

**Primary button** (inverted pill — `--title` on `--surface`, so it flips with the mode; never `bg-white text-black`):
```tsx
<button className="inline-flex items-center gap-2 py-3 px-6 bg-title text-surface rounded-full font-mono text-[13px] tracking-[0.06em] uppercase font-bold transition-opacity duration-150">
  LABEL
</button>
```

**Secondary button** (outlined pill):
```tsx
<button className="inline-flex items-center gap-2 py-3 px-6 border border-outline text-body rounded-full font-mono text-[13px] tracking-[0.06em] uppercase transition-colors duration-150">
  LABEL
</button>
```

**Tag / chip** (technical, 4px radius):
```tsx
<span className="font-nothing-subtitle text-body py-1 px-4 border border-outline rounded">
  LABEL
</span>
```

**Tag / chip** (pill):
```tsx
<span className="font-nothing-subtitle text-caption py-1 px-3 border border-outline rounded-full">
  LABEL
</span>
```

**Nav label** (active / inactive):
```tsx
<span className="font-nothing-subtitle text-title">[ ACTIVE ]</span>
<span className="font-nothing-subtitle text-disabled">INACTIVE</span>
```

**Section label** (tertiary marker):
```tsx
<p className="font-nothing-subtitle text-caption mb-8">01 — SECTION TITLE</p>
```

**Dot-grid background** (decorative):
```tsx
<div className="dot-grid absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none" />
```

**Surface card**:
```tsx
<div className="bg-card border border-border rounded-xl p-6">
  {/* content */}
</div>
```

**Data row** (list item with divider):
```tsx
<div className="grid grid-cols-[1fr_auto] items-center py-4 border-b border-border">
  <span className="font-nothing-subtitle text-caption">LABEL</span>
  <span className="font-nothing-subtitle text-title">VALUE</span>
</div>
```

---

## 5. ASTRO + TAILWIND v4 (THIS PROJECT)

The reference implementation. Astro 7, Tailwind v4 via `@tailwindcss/vite`, static output, i18n (`en` default sin prefijo, `es`). **Sin framework de UI**: no hay islas y nada hidrata; el único JS de cliente son los `<script>` de los propios `.astro`.

### 5.1 File Map

| Concern | File |
|---|---|
| Tokens, `@theme`, `@utility`, `dark` variant | `src/styles/global.css` |
| Font loading config | `astro.config.mjs` (`fonts: [...]`) |
| `<Font>` tags, `<head>` metadata | `src/components/layout/BaseHead.astro` |
| Pre-paint theme script, `<body>` base classes | `src/layouts/Layout.astro` |
| Theme switch (light/dark/system) | `src/components/layout/ThemePicker.astro` |
| Page shells | `src/layouts/Layout.astro`, `src/layouts/BlogPost.astro` |
| UI strings (both locales) | `src/i18n/ui.ts` |
| Botones (4 variantes de la Sección 2) | `src/components/shared/ButtonLink.astro` |
| Rejilla de puntos interactiva | `src/components/shared/DotGrid.astro` |

**Never** hardcode user-facing copy in a component: add the key to `src/i18n/ui.ts` for `en` **and** `es`, then `const t = useTranslations(getLangFromUrl(Astro.url))`. Labels ALL CAPS son estilo (`uppercase` en CSS), no texto — guarda la cadena en su capitalización natural.

### 5.2 Fonts — Astro Fonts API (not `next/font`, not a Google `<link>`)

Astro 7 ships a stable Fonts API that self-hosts and preloads the files. Declare each family once in `astro.config.mjs`:

```js
// astro.config.mjs
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Space Grotesk',
      cssVariable: '--font-space-grotesk',
      styles: ['normal'],
      weights: ['300 700'], // variable
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Space Mono',
      cssVariable: '--font-space-mono',
      styles: ['normal'],
      weights: [400, 700], // estática: solo existen estos dos
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
    {
      provider: fontProviders.google(),
      name: 'Doto',
      cssVariable: '--font-doto',
      styles: ['normal'],
      weights: ['100 900'], // variable: wght 100–900 + eje ROND 0–100
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
```

Emit them in `src/components/BaseHead.astro` (rendered inside `<head>` by `Layout.astro`):

```astro
---
import { Font } from 'astro:assets';
---

<Font cssVariable="--font-space-grotesk" preload={[{ subset: 'latin' }]} />
<Font cssVariable="--font-space-mono" preload={[{ subset: 'latin', weight: 400 }]} />
<Font cssVariable="--font-doto" />
```

Y el puente a Tailwind en `src/styles/global.css`:

```css
@theme {
  --font-sans: var(--font-space-grotesk);
  --font-mono: var(--font-space-mono);
  --font-display: var(--font-doto);
}
```

Pisar `--font-sans` basta para que todo el documento herede Space Grotesk: el preflight de Tailwind ata `html` a `--default-font-family`, que apunta a `--font-sans`. No hace falta ninguna clase en `<body>`.

Rules:
- `latin-ext` es obligatorio: el contenido en español usa acentos y `ñ`. El subset `vietnamese` que Google sirve para Space Grotesk y Space Mono no se usa — no lo declares.
- **Filtra el preload.** `preload` a secas emite un `<link>` por cada combinación de subset, peso y estilo — diez peticiones bloqueantes en este proyecto. Acota con `[{ subset: 'latin' }]` y deja que `latin-ext` cargue bajo demanda. Doto nunca se precarga: es decorativa y competiría con el contenido.
- **`styles: ['normal']` siempre.** Sin él Astro descarga también las itálicas, que este sistema no usa: duplica los archivos (16 `@font-face` en vez de 8).
- Space Grotesk y Doto son variables: declara el rango (`'300 700'`, `'100 900'`) y usa `font-weight`, nunca pesos sueltos. Space Mono es estática: solo 400 y 700 existen.
- **Ninguna de las tres tiene itálica real** salvo Space Mono. `<em>` en prose (Space Grotesk) sale como oblicua sintética. Prefiere marcar énfasis con peso o con `--caption`, no con itálica.
- Doto expone además el eje `ROND` (0–100, redondez del punto). Es la palanca del "one moment of surprise" de la Sección 2.8 del SKILL: `font-variation-settings: 'ROND' 0` para punto cuadrado, `100` para circular. Úsalo en un solo sitio por pantalla.
- Declara las fuentes que faltan **antes** de diseñar, como pide el paso 1 del workflow. Si `astro.config.mjs` no tiene la familia, no existe.

**Alternativa sin red en build:** `fontProviders.google()` descarga los `.woff2` en build y los sirve desde tu dominio, así que no hace falta versionar archivos. Si prefieres tener los ficheros en el repo, cambia el provider sin tocar nada más:

```js
{
  provider: fontProviders.local(),
  name: 'Space Grotesk',
  cssVariable: '--font-space-grotesk',
  variants: [
    { weight: '300 700', style: 'normal', src: ['./src/assets/fonts/SpaceGrotesk[wght].woff2'] },
  ],
}
```

Los archivos van en `src/assets/fonts/`, **nunca** en `public/`: Astro copia `public/` tal cual al build y acabarías con los ficheros duplicados.

### 5.3 Tokens in `global.css`

El proyecto ya tiene la variante `dark` atada a la clase, no al SO:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Por eso los tokens se definen **una vez por modo sobre `:root` / `.dark`** y se exponen a Tailwind con `@theme inline` (inline mantiene la referencia `var()` viva, así el override de `.dark` funciona y los modificadores de opacidad `bg-card/60` siguen resolviendo):

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@custom-variant dark (&:where(.dark, .dark *));

/* Light — printed technical manual. Warm neutral ramp; only --card is pure white. */
:root {
  --nd-surface: #f3f2f2;
  --nd-card: #ffffff;
  --nd-raised: #eceaea;
  --nd-border: #e4e2e2;
  --nd-outline: #c9c6c6;
  --nd-disabled: #969292;
  --nd-caption: #656161;
  --nd-body: #1a1818;
  --nd-title: #000000;
  /* Saturated signals wash out on off-white — darkened. Red stays. */
  --nd-accent: #2f7a41;
  --nd-accent-subtle: rgba(47, 122, 65, 0.14);
  --nd-success: #2f7a41;
  --nd-warning: #856612;
  --nd-action: #b84e08;
  /* Paletas de sección: en claro, el mismo papel empujado hacia el tono. */
  --nd-green-surface: #e9f0eb;
  --nd-green-border: #c6d8cc;
  --nd-green-muted: #4a7355;
  --nd-indigo-surface: #ebebf3;
  --nd-indigo-border: #ccccdd;
  --nd-indigo-muted: #4d4d80;
}

/* Dark — instrument panel in a dark room (OLED). */
.dark {
  --nd-surface: #000000;
  --nd-card: #111111;
  --nd-raised: #1a1a1a;
  --nd-border: #222222;
  --nd-outline: #333333;
  --nd-disabled: #666666;
  --nd-caption: #999999;
  --nd-body: #e8e8e8;
  --nd-title: #ffffff;
  --nd-accent: #4a9e5c;
  --nd-accent-subtle: rgba(74, 158, 92, 0.15);
  --nd-success: #4a9e5c;
  --nd-warning: #d4a843;
  --nd-action: #f16a0d;
  --nd-green-surface: #0a1a0d;
  --nd-green-border: #1a3d22;
  --nd-green-muted: #3d6645;
  --nd-indigo-surface: #0d0d1a;
  --nd-indigo-border: #1e1e33;
  --nd-indigo-muted: #3d3d66;
}

@theme inline {
  --color-surface: var(--nd-surface);
  --color-card: var(--nd-card);
  --color-raised: var(--nd-raised);
  --color-border: var(--nd-border);
  --color-outline: var(--nd-outline);
  --color-disabled: var(--nd-disabled);
  --color-caption: var(--nd-caption);
  --color-body: var(--nd-body);
  --color-title: var(--nd-title);
  --color-success: var(--nd-success);
  --color-warning: var(--nd-warning);
  --color-action: var(--nd-action);

  /* El acento de este sitio es verde: marca lo activo o seleccionado. */
  --color-accent: var(--nd-accent);
  --color-accent-subtle: var(--nd-accent-subtle);

  /* El rojo queda solo para fallos y acciones destructivas, igual en ambos modos. */
  --color-error: #d71921;

  /* Paletas de sección: solo superficie, borde y marcas. Nunca texto. */
  --color-green-surface: var(--nd-green-surface);
  --color-green-border: var(--nd-green-border);
  --color-green-muted: var(--nd-green-muted);
  --color-indigo-surface: var(--nd-indigo-surface);
  --color-indigo-border: var(--nd-indigo-border);
  --color-indigo-muted: var(--nd-indigo-muted);

  --font-sans: var(--font-space-grotesk);
  --font-mono: var(--font-space-mono);
  --font-display: var(--font-doto);
}
```

Los `cssVariable` de la sección 5.2 los define el `<style>` que inyecta `<Font>`, así que se resuelven en runtime — mapearlos dentro de `@theme` es correcto.

Utilidades del sistema (idénticas a la sección 4, van en el mismo archivo):

```css
@utility font-nothing-dots     { font-family: var(--font-display); }
@utility font-nothing-code     { font-family: var(--font-mono); }
@utility font-nothing-subtitle { font-family: var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; line-height: 1.2; }
@utility subtitle              { @apply font-nothing-subtitle uppercase; }

/* Layout: `container` (80rem, gutter 1.5rem → 3rem desde 768px), `project-grid`
   y `single-project-grid` — las áreas nombradas de la home y de un proyecto.
   OJO: `container` no lo aplica nadie por ti. Ver 5.4b. */

/* Headings — Doto, fluid. Ver la tabla de tokens.md Sección 1. */
@utility heading-64 { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.03em; line-height: 0.92; color: var(--color-title); font-size: clamp(48px, 11vw, 128px); }
@utility heading-48 { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.03em; line-height: 0.92; color: var(--color-title); font-size: clamp(48px, 8vw, 100px); }
@utility heading-44 { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.03em; line-height: 0.92; color: var(--color-title); font-size: clamp(48px, 5.5vw, 72px); }
@utility heading-36 { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.03em; line-height: 0.92; color: var(--color-title); font-size: clamp(28px, 2.8vw, 36px); }

@utility dot-grid { background-image: radial-gradient(circle, var(--color-outline) 1px, transparent 1px); background-size: 16px 16px; }
@utility dot-grid-subtle { background-image: radial-gradient(circle, var(--color-border) 0.5px, transparent 0.5px); background-size: 12px 12px; }
```

### 5.4 Theme — light, dark **and** system

Este proyecto tiene **tres** estados, no un dark-mode toggle. `ThemePicker.astro` escribe:

| Estado | `<html data-theme>` | `<html class="dark">` | `localStorage.theme` |
|---|---|---|---|
| Light | `light` | ausente | `"light"` |
| Dark | `dark` | presente | `"dark"` |
| System | `system` | según `prefers-color-scheme` | *sin entrada* |

Consecuencias para el diseño:

1. **Ambos modos son de primera clase.** Ningún componente se diseña "para dark y luego se aclara". Cada color va con su par `dark:`.
2. **La clase `.dark` es el único hook.** Nunca escribas `@media (prefers-color-scheme: dark)` en un componente: rompería el override manual. El SO solo se consulta en el script pre-paint de `Layout.astro` y en el listener de `ThemePicker.astro`.
3. **`data-theme` es para la UI del propio picker**, no para colorear. Se usa con `:global(html[data-theme='...'])` dentro de `<style>` scoped para marcar la opción activa antes de que corra el JS.
4. **`color-scheme` ya está sincronizado** (`html` / `html.dark` en `global.css`). No lo redefinas por componente: mantiene scrollbars y controles nativos en el modo correcto.
5. **El swap usa View Transitions** con fallback a `prefers-reduced-motion`. Los colores cruzan con fade — no añadas `transition-colors` global sobre `body`, duplicaría la animación.
6. **Nada de flash.** Cualquier color que dependa del tema debe salir de una clase Tailwind resuelta por `.dark`, nunca de JS que corra después del primer paint. La única excepción es un `<canvas>`, que no admite clase de color — ver 5.4c.

Base del documento (ya en `Layout.astro`, actualizar a tokens al aplicar el sistema):

```astro
<body class="flex min-h-screen flex-col bg-surface text-body antialiased">
```

### 5.4b El raíl no viene dado

`Layout.astro` no envuelve nada: `main` es `grow` pelado. Cada página decide su raíl horizontal, y equivocarse **falla en silencio** — el texto simplemente se va al borde de la ventana.

- Página de contenido normal: pide el raíl al layout.
  ```astro
  <Layout title={t('blog.title')} description={t('blog.description')} class="container py-12">
  ```
- Página que abre con hero: no pasa `class`. La `<section>` del hero sangra hasta el borde y mete un `container` **por dentro**, alrededor del texto, para que la copia siga alineada con el header y el footer. Todos los heroes de este sitio son a sangre.

```astro
<section class="relative overflow-hidden py-24">
	<DotGrid />
	<div class="container relative z-10 space-y-6">
		<!-- el texto vuelve al raíl -->
	</div>
</section>
```

`relative` en la sección no es opcional: es la caja contra la que se mide cualquier decoración de fondo (la rejilla de puntos, una superficie tintada).

### 5.4c Canvas y tema

Un `<canvas>` no admite clase de color de Tailwind, así que un token no puede llegarle por la vía normal. El canal fiable es `color`:

```astro
<canvas class="dot-grid-canvas pointer-events-none absolute inset-0 text-disabled dark:text-outline" aria-hidden="true"></canvas>
```

```ts
color = getComputedStyle(canvas).color; // siempre computa a rgb()

new MutationObserver(repaint).observe(document.documentElement, { attributeFilter: ['class'] });
```

Tres razones para hacerlo así y no con una custom property:

1. `getComputedStyle` sobre una custom property puede devolver un `var()` sin resolver, y `fillStyle` descarta un valor inválido **en silencio**: los puntos saldrían negros sin ningún error.
2. Los píxeles de un canvas no siguen al token como lo hace una clase, así que el cambio de tema hay que repintarlo a mano. El hook es la clase de `<html>`, nunca `prefers-color-scheme`.
3. Los tokens neutros no se corresponden uno a uno entre modos: `#c9c6c6` sobre `#f3f2f2` es casi invisible, por eso el par es `text-disabled dark:text-outline` y no el mismo token en ambos.

Escala por `devicePixelRatio` (con tope en 2) o un punto de 1px sale borroso en retina.

### 5.5 Component Patterns (.astro)

`class` en lugar de `className`; `class:list` para condicionales; `<style>` es scoped por defecto.

**Botones — usa `shared/ButtonLink.astro`.** Las cuatro variantes de la Sección 2 (`primary`, `secondary`, `ghost`, `destructive`) y los tres tamaños ya están ahí. No repitas el markup: una clase suelta se separa de la spec en cuanto alguien toca una.

```astro
<ButtonLink href={localizedPath(lang, 'work')}>{t('home.viewWork')}</ButtonLink>
<ButtonLink href={url} variant="secondary" size="sm">{t('work.visit')}</ButtonLink>
```

El `href` llega ya localizado: el componente vive en `shared/` y no sabe nada de i18n. Detecta solo si el enlace es externo, para poner `target` y `rel`.

**Nav label** (activo / inactivo) — patrón para `Header.astro`:
```astro
<a
	href={href}
	class:list={['font-nothing-subtitle transition-colors', isActive ? 'text-accent' : 'text-title hover:underline']}
>
	{isActive ? `[ ${label} ]` : label}
</a>
```

**Section label** (marcador terciario):
```astro
<p class="font-nothing-subtitle mb-8 text-caption">01 — {t('home.latest')}</p>
```

**Surface card**:
```astro
<article class="rounded-xl border border-border bg-card p-6">
	<slot />
</article>
```

**Data row** (list item con divisor) — patrón para los listados de `blog/` y `daily/`:
```astro
<a href={href} class="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-border py-4">
	<span class="text-body">{title}</span>
	<time class="font-nothing-subtitle text-caption" datetime={date.toISOString()}>{formatted}</time>
</a>
```

**Dot-grid decorativo**:
```astro
<div class="dot-grid pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20" aria-hidden="true" />
```

### 5.6 Prose (Markdown content)

Los posts se renderizan con `@tailwindcss/typography`. Ata el plugin a los tokens en vez de a los grises por defecto, y usa `dark:prose-invert`:

```astro
<div class="prose prose-neutral dark:prose-invert prose-headings:font-nothing-dots prose-headings:tracking-[-0.02em] prose-a:text-action prose-a:no-underline hover:prose-a:underline max-w-none">
	<slot />
</div>
```

### 5.7 JavaScript de cliente

No hay framework: ninguna isla, nada que hidrate. El JS de cliente son los `<script>` de los `.astro`, que Astro empaqueta y —si son pequeños— inlinea en el HTML. Lo que comparten más de un componente vive en `src/scripts/`.

Antes de alcanzar una librería, mira la plataforma. El menú móvil es un `popover`: el navegador le da top layer, Escape, cierre al hacer clic fuera, salir del orden de tabulación y devolver el foco al invocador, sin una línea de JS. La rejilla de puntos usa Pointer Events, que cubre ratón, lápiz y dedo con un solo par de listeners.

Reglas cuando sí hace falta script:

- **Nunca pintes color desde JS después del primer paint** (5.4 punto 6). La excepción es el canvas de 5.4c.
- **Si algo necesita saber el modo**, léelo de `document.documentElement.classList.contains('dark')` y solo para comportamiento.
- **Respeta `prefers-reduced-motion`** en cualquier animación, y compruébalo en tiempo de ejecución, no solo al montar.
- **Un `<script>` de `.astro` corre una vez por página, no una por instancia.** Si el componente puede aparecer dos veces, recorre `querySelectorAll` en vez de `querySelector`.

### 5.8 Checks

- `pnpm astro dev --background` para levantar el servidor; `astro dev logs` / `astro dev stop` para gestionarlo.
- Revisa cada pantalla en los **tres** estados del picker, incluyendo `system` con el SO en cada modo.
- Squint test (Sección 2.1 del SKILL) en light y en dark: la jerarquía debe aguantar en ambos.
