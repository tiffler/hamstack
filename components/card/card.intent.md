# Card · Design Intent 🐹

**This file is binding.** Humans skim it; AI agents obey it. Where it conflicts
with DESIGN_SYSTEM.md, this file wins for cards.

## What it is

A **raised surface** (`--ham-surface-raised`) with a border, a per-theme radius
(`--ham-radius-lg`) and a per-theme shadow (`--ham-shadow`). Because those three
are theme tokens, the *same* card is rounded-and-warm in honey-glazed, sharp in
prosciutto, and crisp in smoked — never fork it to restyle.

Compose it from parts, in order:

```jsx
<Card>
  <CardHeader>
    <CardTitle>Publish workspace</CardTitle>
    <CardDescription>Everyone with the link can view it.</CardDescription>
  </CardHeader>
  <CardContent>…body…</CardContent>
  <CardFooter>
    <Button variant="primary">Publish</Button>
    <Button variant="ghost">Not yet</Button>
  </CardFooter>
</Card>
```

## The parts

- **`Card`** — the container. Sets surface, border, radius, shadow. Nothing else.
- **`CardHeader`** — title + description stack; owns the top padding.
- **`CardTitle`** — the display face, one line, sentence case. Renders an `<h3>`;
  override the level with `asChild` patterns only if the outline demands it.
- **`CardDescription`** — soft ink, one or two lines of supporting context.
- **`CardContent`** — the body; padding with the header's top removed so spacing
  doesn't double.
- **`CardFooter`** — actions, left-aligned, `--ham-space-2` apart. **One primary.**

## Hard rules (never break)

1. **Padding comes from the parts, not from you.** Don't add ad-hoc padding on
   `Card`; use `CardHeader` / `CardContent` / `CardFooter` so every card lines up.
2. **One primary action per card footer.** The card is a mini-view; the same
   "one hero" law applies.
3. **Don't nest a Card in a Card.** Raised-on-raised muddies the elevation story.
   Use a sunken well or a divider for inner grouping instead.
4. **Let the theme own the corners and shadow.** Never hardcode a radius or a
   `box-shadow`; read `--ham-radius-lg` / `--ham-shadow`.

## Tone

A card is a calm container, not a billboard. If every card shouts, none do —
spend emphasis on the one action in the footer.

## Forbidden

- ❌ Custom hex background or shadow via `className`. Tokens or nothing.
- ❌ Two primary buttons in one footer.
- ❌ Card nested directly inside Card.
