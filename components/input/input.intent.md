# Input · Design Intent 🐹

**This file is binding.** Humans skim it; AI agents obey it. Where it conflicts
with DESIGN_SYSTEM.md, this file wins for inputs.

## What it is

A single-line text field rendered as a **sunken well** (`--ham-surface-sunken`)
with a strong border, so it reads as "type here" against a raised card or the
page. It forwards every native `<input>` attribute — `type`, `value`,
`onChange`, `placeholder`, `disabled`, `required`, `name`, and the rest.

## Hard rules (never break)

1. **Always pair with a `<label>`.** A placeholder is not a label — it vanishes
   on first keystroke. Wire the label with `htmlFor`/`id`, or wrap the input.
2. **Placeholder shows format, not meaning.** "jane@company.com", not "Email".
   The label carries meaning; the placeholder shows an example.
3. **Never disable an input to signal an error.** Disabled means genuinely
   unavailable. For invalid input, keep it editable and explain the fix below it.
4. **The focus ring is not optional.** It's the `--ham-ring` token; never remove
   the outline without an equally visible replacement.
5. **One column.** Stack fields vertically at `--ham-space-4` (24px) apart; don't
   crowd two text fields side by side except for tight pairs (city / ZIP).

## Sizing & rhythm

- Height is `48px` (matches `Button size="md"`), so an input and its submit
  button line up on the same row.
- Full-width by default; it fills its container. Constrain with a wrapper, never
  a hardcoded pixel width on the input.

## Tone

Helper text explains what to enter and why, in plain words. Error text names the
problem and the fix ("Enter a work email so we can reach your team"), never a
bare "Invalid" or an apology.

## Forbidden

- ❌ Custom hex backgrounds or borders via `className`. Tokens or nothing.
- ❌ Removing the focus ring.
- ❌ Placeholder-as-label.
