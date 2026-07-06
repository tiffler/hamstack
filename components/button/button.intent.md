# Button · Design Intent 🐹

**This file is binding.** Humans skim it; AI agents obey it. Where it conflicts
with DESIGN_SYSTEM.md, this file wins for buttons.

## When to use

- `primary` — the ONE main action of a view. Save, Publish, Get started.
- `secondary` — supporting actions that deserve a visible container.
- `ghost` — tertiary/utility actions. Toolbars, cancel, "not the point" actions.
- `danger` — destructive and irreversible. Delete, Remove, Revoke.

## Hard rules (never break)

1. **One `primary` per view.** Two primaries is zero primaries. If a screen
   needs two heroes, the design is wrong, not the rule.
2. **Never place `danger` adjacent to `primary`.** Muscle memory kills.
   Separate destructive actions with space or a ghost buffer.
3. **Labels are verbs in sentence case.** "Save changes", never "Submit",
   never "SAVE CHANGES", never "OK". The label survives the flow: a button
   that says "Publish" produces a toast that says "Published".
4. **Never disable a button as error handling.** Let it be pressed; explain
   what's missing. Disabled is for genuinely unavailable, not for invalid.
5. **Icon-only buttons require `aria-label`.** No exceptions, no vibes.
6. **Min touch target 48px (`md`).** `sm` (40px) is for dense desktop UI only.

## Spacing law

- Sibling buttons: gap `--ham-space-2` (8px); `--ham-space-3` (16px) for spaced-out layouts.
- Button groups sit `--ham-space-5` (32px) below the content they act on.
- Full-width buttons only in mobile sheets and auth forms.

## Forbidden combos

- ❌ `ghost` + `size=lg` for a main CTA (a hero whispering).
- ❌ Custom hex backgrounds via className overrides. Tokens or nothing.
- ❌ Hardcoding a radius. Each theme owns its `--ham-radius`; read the token.

## Tone

The button is confident, not pushy. It never begs ("Click here!"), never
markets ("Unlock amazing features"). It states the outcome and gets pressed.
