# Hamstack 🐹

**A design system you copy, not install.** Three themes, four components, and a
live playground — all styled by plain CSS variables. No package to depend on, no
lock-in: paste the files, own the code. Every theme and mode passes WCAG AA.

> Born when autocorrect turned "Jamstack" into "Hamster." We kept it.

**[▸ Live demo](https://tiffler.github.io/hamstack/)** — the full explorer, hosted.
No install: browse the components, edit themes live, play with the tokens.

## Use it in 30 seconds

Copy **three files** into any HTML page — a theme, the fonts, and the prebuilt
styles — then paste a button. No bundler, no build step:

```html
<link rel="stylesheet" href="tokens/honey-glazed.css" />
<link rel="stylesheet" href="tokens/fonts/fonts.css" />
<link rel="stylesheet" href="dist/hamstack.css" />

<button class="inline-flex items-center justify-center h-12 px-[var(--ham-space-5)]
  rounded-[var(--ham-radius)] bg-[var(--ham-primary)] text-[var(--ham-primary-ink)]
  shadow-[var(--ham-shadow-sm)] font-[family-name:var(--ham-font-body)] font-semibold
  text-[length:var(--ham-text-base)]">Save changes</button>
```

That renders a styled Hamstack button. The key thing: it takes all **three**
files — the theme gives you the colors, and `dist/hamstack.css` (prebuilt) makes
the component's classes work. Nothing to compile. You only need Tailwind or npm
if you want to author *new* components.

Prefer React? `import { Button } from "hamstack"` once the package is wired up —
see [Standalone components](#standalone-components).

## Run the explorer locally

The same site as the live demo, hot-reloading against the real components:

```bash
npm install
npm run dev          # → http://127.0.0.1:5178
```

Four views (top nav): **Overview**, **Foundations** (token swatches, type,
spacing, radius), **Components** (a browser with each component's examples, props,
usage, and design law), and **Theme editor** (edit any token live, with a
copy-paste CSS export). Add a component to `components/` and register it in
`preview/registry.tsx` to list it.

**Use it in Claude Design:** point `/design-sync` at this repo. Claude reads
`DESIGN_SYSTEM.md` and each component's `*.intent.md` as binding design law.

## Themes & modes

Set `data-theme` on `<html>` (or any ancestor); add `class="dark"` for dark mode
(light is the default).

| Theme | Color | |
|---|---|---|
| 🏺 `honey-glazed` | Terracotta clay — retro/vintage, rounded, warm offset shadows | default |
| 🌸 `prosciutto` | Dusty pink — clean/minimal, sharp radii, serif display | |
| 🌫️ `smoked` | Smokey gray — modern, Archivo display, crisp radii | |

```html
<html data-theme="smoked" class="dark">     <!-- smokey gray, dark mode -->
```

## Components

Four stable components. Each one's **binding spec** — full props, usage, and hard
rules — lives in `components/<name>/<name>.intent.md` (Claude reads it on
`/design-sync`) and renders live in the explorer's Components browser. The
one-liners:

| Component | What it is | API surface |
|---|---|---|
| **Button** | The one action per view; re-themes for free. | `variant` primary·secondary·ghost·danger · `size` sm·md·lg · `asChild` |
| **Input** | Sunken text well, 48px (lines up with Button `md`). | native `<input>` props · always pair with a `<label>` |
| **Card** | Raised surface; radius + shadow are per-theme. | `Card` + `CardHeader`·`CardTitle`·`CardDescription`·`CardContent`·`CardFooter` |
| **Badge** | Non-interactive status pill, solid AA fills. | `variant` neutral·primary·accent·danger |

```tsx
import { Button, Input, Card, CardHeader, CardTitle, CardFooter, Badge } from "hamstack";

<Card>
  <CardHeader><CardTitle>Publish workspace</CardTitle></CardHeader>
  <CardFooter><Button variant="primary">Publish</Button></CardFooter>
</Card>
```

**New component** → add `components/<name>/<name>.tsx` + `<name>.intent.md`, then
register it in `preview/registry.tsx` to show it in the explorer.

## Structure

```
tokens/            semantic CSS variables (--ham-*) — one file per theme
  fonts/           self-hosted brand fonts (Figtree, Bricolage Grotesque, Fraunces, Archivo, IBM Plex Mono) + fonts.css
  tokens.json      machine-readable token map
components/<name>/ <name>.tsx + <name>.intent.md (the binding design law)
lib/utils.ts       the `cn` class-merge helper every component uses
dist/hamstack.css  compiled Tailwind utilities (run `npm run build:css` to regenerate)
preview/           the explorer — Vite app: component browser, theme editor, playground (npm run dev)
  registry.tsx     component metadata that drives the browser (add components here)
DESIGN_SYSTEM.md   the manifesto Claude reads on sync
registry.json      shadcn-compatible registry
```

## Standalone components

Every component is meant to survive on its own. To lift `Button` into another
project, take four things:

1. `components/button/button.tsx` and `lib/utils.ts` (its `cn` helper — keep the
   `@/lib/utils` alias, or repoint the import).
2. Its dependencies: `npm i @radix-ui/react-slot class-variance-authority clsx tailwind-merge`.
3. At least one theme's tokens (`tokens/honey-glazed.css`) + `tokens/fonts/fonts.css`.
4. Tailwind. The component uses Tailwind utilities that reference the `--ham-*`
   tokens — either let your app's Tailwind compile them, or import the prebuilt
   `dist/hamstack.css`.

The component reads **only** semantic tokens, so it re-themes for free wherever
those tokens are defined.

## Scripts

| | |
|---|---|
| `npm run dev` | live preview at `http://127.0.0.1:5178` |
| `npm run build:css` | recompile `dist/hamstack.css` after editing a component |

## Philosophy

Tokens are law. One hero per view. Warmth over sterility. Joy with a seatbelt.
The grid is 8-point: 4, 8, then multiples of 8.

MIT · by [tiffler](https://github.com/tiffler) · **[live demo](https://tiffler.github.io/hamstack/)** · [hamstack.design](https://hamstack.design)
