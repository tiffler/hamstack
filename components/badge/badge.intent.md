# Badge · Design Intent 🐹

**This file is binding.** Humans skim it; AI agents obey it. Where it conflicts
with DESIGN_SYSTEM.md, this file wins for badges.

## What it is

A small, non-interactive **status pill** — a mono, uppercase label in a solid
token color. It labels state ("BETA", "DRAFT", "3 NEW"); it is **not** a button
and never carries an `onClick`. If it does something when clicked, it's a Button.

Every variant is a **solid fill** on a pairing that clears WCAG AA, so a badge is
legible on any surface it lands on.

## Variants

- **`neutral`** (default) — sunken fill, soft ink. The everyday tag: "DRAFT", "V2".
- **`primary`** — brand fill. The one badge that should catch the eye: "NEW", "PRO".
- **`accent`** — secondary emphasis that doesn't compete with `primary`.
- **`danger`** — a hard-stop status: "ERROR", "REVOKED", "OVERDUE".

> Semantic **success / warning** badges are intentionally not shipped yet: they
> need dedicated `--ham-*-ink` tokens to stay AA as solid fills. Until then, use
> `neutral` with a leading dot, or `danger` for hard failures.

## Hard rules (never break)

1. **Badges are labels, not controls.** No `onClick`, no `href`, no focus ring.
   Reach for `Button` the moment it needs to be pressed.
2. **One or two words, uppercase.** "PAYMENT FAILED", not a sentence. The mono
   uppercase treatment is the badge; don't override the casing.
3. **At most one `primary` or `danger` badge in a cluster.** A row of loud
   badges reads as noise — lead with one, keep the rest `neutral`.
4. **Never restyle with hex.** Variants are the whole palette. Tokens or nothing.

## Placement

- Sits inline with a title (`--ham-space-2` after it) or in the top-right of a
  card. Vertically center it against the text it annotates.

## Tone

A badge states a fact in the fewest words: what state this thing is in. No
punctuation, no emoji in error/status badges, no cleverness.

## Forbidden

- ❌ Interactive badges. If it clicks, it's a Button.
- ❌ Sentence-length or mixed-case labels.
- ❌ Custom hex fills via `className`.
