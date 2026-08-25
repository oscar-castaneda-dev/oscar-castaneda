# oscarcastaneda.dev

Oscar Castaneda's personal site and blog: a static Astro 7 build (Tailwind v4, React only as
islands) published at https://oscarcastaneda.dev. Bilingual — `en` is the default locale and
carries no URL prefix, `es` lives under `/es/`. The content is a blog plus short daily notes,
each collection split by locale.

This is a personal site, not a product: it is one person writing in public. Prefer restraint
over features, and copy that sounds like a person over marketing voice.

## Structure

```
src/
├── components/
│   ├── shared/      design-system primitives, unaware of this site: FormattedDate, Counter.tsx
│   ├── layout/      the site shell: BaseHead, Header, Footer, LanguagePicker, ThemePicker
│   ├── home/        landing sections: Hero, Intro, LatestPosts, LatestDaily
│   ├── blog/        PostCard, PostMeta
│   └── daily/       DailyNote
│
├── pages/
│   └── [...lang]/   every route lives here — the param generates both locales
│       ├── index.astro
│       ├── about.astro
│       ├── blog/{index,[slug]}.astro
│       ├── daily/{index,[slug]}.astro
│       └── rss.xml.js
│
├── layouts/         Layout.astro (shell), BlogPost.astro (entry detail)
├── content/         blog/{en,es}, daily/{en,es}
├── content.config.ts
├── i18n/            ui.ts, utils.ts
├── lib/             content.ts
├── styles/          global.css
└── assets/
```

Which folder a component goes in: `shared/` knows nothing about the site and could be lifted
into another project as is; `layout/` is used only by `Layout.astro`; everything else is named
after its URL segment. `home/` is the one exception with no URL of its own — it is the landing.
A component that fits nowhere is usually doing two things.

Adding a section means touching four places and nothing else: a folder under `pages/[...lang]/`,
a folder under `content/`, a `components/<section>/`, and a key prefix in `src/i18n/ui.ts`. Keep
those four names identical.

Components never live under `pages/`: every `.astro` there becomes a route. Pages compose,
they don't implement — `index.astro` should read as a list of `<Hero />`, `<Intro />`, `<LatestPosts />`.
Import with the `@/` alias, not relative paths, so a move only touches the file that moved.
Feature folders that are still empty carry no `.gitkeep`; they show up with their first component.

## Design system

**Everything visual is built on the Nothing design system in `.claude/skills/nothing-design/`.**
Read `SKILL.md` before writing any markup, class, or style — small tweaks included. It is the
authority on hierarchy, typography, spacing and colour; this file only routes to it.

- `SKILL.md` — philosophy, craft rules, anti-patterns
- `references/tokens.md` — fonts, type scale, both colour ramps, spacing, motion
- `references/components.md` — component specs
- `references/platform-mapping.md` **Section 5** — this repo: file map, font config, token wiring

The rules that get broken most often, so they are worth repeating here:

- **Tokens only.** `text-caption`, `bg-surface`, `border-outline`. Never a raw hex or a Tailwind
  default like `text-gray-500` — those only work in one mode.
- **Both modes in the same pass.** The theme has three states (light / dark / system), so there
  is no default mode to design for. Never write `@media (prefers-color-scheme: dark)` in a
  component: the `.dark` class on `<html>` is the only hook, and a media query would ignore the
  user's manual choice.
- **Section palettes mark territory, not text.** Green is building, indigo is writing, one
  palette per page, used only as `bg-*-surface`, `border-*-border` and `text-*-muted`. Text on a
  tinted surface still comes from the neutral ramp.
- **The accent is green, red is only for errors.** `--accent` (green) marks the one active or
  selected element on a screen; `--error` (red) marks a failure or a destructive action and
  nothing else. Red on a screen should mean something is wrong.
- **Three fonts, three jobs.** Space Grotesk is the document default (body, UI), Space Mono is
  labels and data (`nd-label`, ALL CAPS), Doto is display only, via `heading-64/48/44/36`.
- **Fonts are self-hosted** through the Astro Fonts API — declared in `astro.config.mjs`,
  emitted with `<Font>` in `BaseHead.astro`. If a family is not in `astro.config.mjs` it does
  not exist; add it there before designing with it.

Tokens, utilities and the `dark` variant all live in `src/styles/global.css`. Change a colour
there and nowhere else.

## Copy and i18n

Never hardcode user-facing text in a component. Add the key to `src/i18n/ui.ts` for **both**
`en` and `es`, then `const t = useTranslations(getLangFromUrl(Astro.url))`. ALL CAPS labels are
styling (`uppercase` in CSS), not text — store the string in its natural capitalisation.

## Development

The package manager is pnpm. When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Before calling a UI change done, check it in **all three** theme states — `system` included,
with the OS in each mode — and squint-test it in light and dark (SKILL.md Section 2.1).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
