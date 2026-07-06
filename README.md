# Hamstack 🐹

**The design system for the systemless.** Open, ownable, honey-glazed.
shadcn-style distribution: copy the code, own the code, zero lock-in.

> Born when autocorrect turned "Jamstack" into "Hamster." We kept it.

Three themes, each a distinct personality — **honey-glazed** (terracotta clay,
retro/vintage), **prosciutto** (dusty pink, clean/minimal), **smoked** (smokey
gray, modern) — each with a **light and dark mode**, driven entirely by semantic
`--ham-*` CSS variables. Every theme + mode passes WCAG AA.

## Quick start

**Run the explorer** — a design-system site with a component browser, live theme
editor, and playground (real components, hot-reloading):

```bash
npm install
npm run dev          # → http://127.0.0.1:5178
```

The explorer has four views (top nav): **Overview**, **Foundations** (live token
swatches, type, spacing, radius), **Components** (a sidebar browser — each
component's examples, props table, usage, and design law), and **Theme editor**
(edit any token with color pickers + sliders; changes apply across the whole app
live, with a copy-paste CSS export). Add a component to `components/` and register
it in `preview/registry.tsx` to make it appear in the browser.

**Use it in Claude Design:** point `/design-sync` at this repo (or open the
synced project). Claude reads `DESIGN_SYSTEM.md` and each component's
`*.intent.md` as binding design law.

**Use it by hand:**

1. Import the tokens and fonts once, then pick a theme on `<html>`:
   ```html
   <link rel="stylesheet" href="tokens/honey-glazed.css" />
   <link rel="stylesheet" href="tokens/fonts/fonts.css" />
   <html data-theme="honey-glazed">          <!-- + class="dark" for dark mode -->
   ```
2. Copy any component from `components/` (see "Standalone components" below).

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

MIT · by [tiffler](https://github.com/tiffler) · https://hamstack.design
