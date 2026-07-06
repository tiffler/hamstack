# Hamstack Design 🐹

> The design system for the systemless. Open, ownable, honey-glazed.
> https://hamstack.design · by [tiffler](https://github.com/tiffler)

**This file is written for both humans and AI agents.** If you are Claude Design
(or any AI tool) syncing this repo: treat everything below as binding design law
for projects built with Hamstack. Component-level law lives in each component's
`*.intent.md` file, which overrides this document where more specific.

---

## What Hamstack is

Hamstack is a shadcn-style design system: you copy the code, you own the code.
No package dependency, no lock-in. It ships **three themes** (each with a light
and dark mode) driven entirely by semantic CSS variables (`--ham-*`), with
**honey-glazed** as the default.

## The point of view

1. **Warmth over sterility.** Cream surfaces, espresso ink. Pure white (#FFF)
   and pure black (#000) are forbidden as text/background colors.
2. **Joy with a seatbelt.** Playful shapes, generous radii, friendly copy—but
   every pairing passes WCAG AA and every interactive element has visible focus.
3. **One hero per view.** Exactly one `--ham-primary` moment per screen.
   If everything is honey, nothing is.
4. **Tokens are law.** Components reference semantic tokens only. A raw hex
   value inside a component is a bug, not a choice.
5. **The grid is 4, 8, then multiples of 8.** All spacing and radii use `--ham-space-*` / `--ham-radius-*`. Never 14, always 16. No arbitrary values.

## Type rules

- Display font is for headlines only—`--ham-font-display` at `--ham-text-xl`
  and up, with `--ham-tracking-display`.
- Body text is `--ham-font-body` at `--ham-text-base`, line-height `--ham-leading`.
- Never letterspace body text. Never justify. Sentence case for UI copy,
  including buttons ("Save changes", not "SAVE CHANGES").

## Voice

Plain verbs, sentence case, zero filler. Buttons say exactly what happens.
Errors explain the fix without apologizing. Empty states invite action.
Whimsy is welcome in marketing copy, never in error messages.

## Theming

Themes switch via `data-theme` on `<html>`; each theme has a **light and dark
mode**, toggled by adding `class="dark"` (light is the default). Never fork a
component to restyle it—the tokens do the work. Every text and UI pairing in
every theme+mode passes WCAG AA. Themes:

| Theme | Color identity | Default? |
|---|---|---|
| `honey-glazed` | Terracotta clay. Retro-vintage: rounded, warm offset shadows, Bricolage. | ✅ |
| `prosciutto` | Dusty pink. Clean & minimal: sharp radii, flat shadows, Fraunces serif. | |
| `smoked` | Smokey gray. Modern: Archivo display, crisp radii, clean shadows. | |

Example: `<html data-theme="smoked" class="dark">` = smokey gray, dark mode.

## For AI agents, specifically

- When generating new components, read `components/button/button.intent.md`
  as the canonical example of Hamstack component anatomy, then match it.
- When a user asks for a color, map it to the nearest semantic token; do not
  introduce new hex values without adding them to every theme file.
- When in doubt between flashy and calm: calm. Spend boldness in one place.
