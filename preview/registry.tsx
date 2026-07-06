import * as React from "react";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/card/card";
import { Badge } from "@/components/badge/badge";
// Each component's own binding design law, imported as raw markdown.
import buttonIntent from "@/components/button/button.intent.md?raw";
import inputIntent from "@/components/input/input.intent.md?raw";
import cardIntent from "@/components/card/card.intent.md?raw";
import badgeIntent from "@/components/badge/badge.intent.md?raw";

export type Example = { title: string; desc?: string; node: React.ReactNode };
export type PropRow = { name: string; type: string; def?: string; desc: string };
export type ComponentDoc = {
  key: string;
  name: string;
  tagline: string;
  status: "stable" | "beta" | "planned";
  examples: Example[];
  props: PropRow[];
  code: string;
  intent?: string;
};

// The registry drives the whole component browser. Add a component here and it
// shows up in the sidebar with its own detail page — no other wiring needed.
export const COMPONENTS: ComponentDoc[] = [
  {
    key: "button",
    name: "Button",
    tagline: "Four variants, three sizes, one primary per view.",
    status: "stable",
    examples: [
      {
        title: "Variants",
        desc: "The primary appearance axis — one primary per view; danger never sits beside it.",
        node: (
          <>
            <Button variant="primary">Publish</Button>
            <Button variant="secondary">Save draft</Button>
            <Button variant="ghost">Cancel</Button>
            <Button variant="danger">Delete</Button>
          </>
        ),
      },
      {
        title: "Sizes",
        desc: "md (48px) is the default and the minimum touch target; sm is for dense desktop UI.",
        node: (
          <>
            <Button size="sm">Continue</Button>
            <Button size="md">Continue</Button>
            <Button size="lg">Continue</Button>
          </>
        ),
      },
      {
        title: "States",
        desc: "Disabled means genuinely unavailable — never used as error handling.",
        node: (
          <>
            <Button disabled>Save changes</Button>
            <Button variant="secondary" disabled>Save draft</Button>
          </>
        ),
      },
      {
        title: "As a link (asChild)",
        desc: "Button styling applied to another element (here an anchor) via Radix Slot.",
        node: (
          <Button asChild variant="secondary">
            <a href="https://hamstack.design" target="_blank" rel="noreferrer">View documentation</a>
          </Button>
        ),
      },
    ],
    props: [
      { name: "variant", type: '"primary" | "secondary" | "ghost" | "danger"', def: '"primary"', desc: "Visual style. Exactly ONE primary per view." },
      { name: "size", type: '"sm" | "md" | "lg"', def: '"md"', desc: "Height & padding. md is the min touch target; sm dense-desktop only." },
      { name: "asChild", type: "boolean", def: "false", desc: "Render as the child element (e.g. an <a>) via Radix Slot, keeping button styling." },
      { name: "disabled", type: "boolean", def: "false", desc: "Genuinely unavailable — not error handling." },
      { name: "children", type: "ReactNode", desc: "Label — a verb in sentence case (“Save changes”)." },
      { name: "…props", type: "ButtonHTMLAttributes", desc: "All standard <button> attributes are forwarded (onClick, type, className…)." },
    ],
    code: `import { Button } from "hamstack";

// One primary. A verb in sentence case. Tokens do the styling.
<Button variant="primary">Save changes</Button>
<Button variant="ghost">Cancel</Button>`,
    intent: buttonIntent,
  },
  {
    key: "input",
    name: "Input",
    tagline: "A sunken text well in the same token language.",
    status: "stable",
    examples: [
      {
        title: "With label",
        desc: "Always paired with a real label — a placeholder is not a label.",
        node: (
          <label style={{ display: "flex", flexDirection: "column", gap: "var(--ham-space-1)", width: "min(320px, 100%)", fontSize: "var(--ham-text-sm)", color: "var(--ham-ink-soft)" }}>
            Work email
            <Input type="email" placeholder="jane@company.com" />
          </label>
        ),
      },
      {
        title: "On a row with a button",
        desc: "48px tall, so it lines up with Button size=md on the same row.",
        node: (
          <div style={{ display: "flex", gap: "var(--ham-space-2)", width: "min(420px, 100%)" }}>
            <Input placeholder="Search components" />
            <Button variant="primary">Search</Button>
          </div>
        ),
      },
      {
        title: "Disabled",
        desc: "Genuinely unavailable — never used to signal a validation error.",
        node: <Input disabled defaultValue="acme-workspace" style={{ width: "min(320px, 100%)" }} />,
      },
    ],
    props: [
      { name: "type", type: '"text" | "email" | "password" | …', def: '"text"', desc: "Any native input type. File inputs get de-chromed automatically." },
      { name: "placeholder", type: "string", desc: "Shows FORMAT, not meaning — “jane@company.com”, not “Email”." },
      { name: "disabled", type: "boolean", def: "false", desc: "Genuinely unavailable — not error handling." },
      { name: "value / defaultValue", type: "string", desc: "Controlled or uncontrolled value, forwarded to the native input." },
      { name: "…props", type: "InputHTMLAttributes", desc: "All standard <input> attributes are forwarded (onChange, name, required…)." },
    ],
    code: `import { Input } from "hamstack";

<label>
  Work email
  <Input type="email" placeholder="jane@company.com" />
</label>`,
    intent: inputIntent,
  },
  {
    key: "card",
    name: "Card",
    tagline: "A raised surface that wears each theme's radius and shadow.",
    status: "stable",
    examples: [
      {
        title: "Anatomy",
        desc: "Header (title + description), content, footer — padding comes from the parts.",
        node: (
          <Card style={{ width: "min(360px, 100%)" }}>
            <CardHeader>
              <CardTitle>Publish workspace</CardTitle>
              <CardDescription>Everyone with the link can view it.</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ margin: 0, color: "var(--ham-ink-soft)", fontSize: "var(--ham-text-sm)" }}>
                You can change visibility any time from settings.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="primary">Publish</Button>
              <Button variant="ghost">Not yet</Button>
            </CardFooter>
          </Card>
        ),
      },
      {
        title: "Header only",
        desc: "The parts are optional — a title + description is a valid card.",
        node: (
          <Card style={{ width: "min(360px, 100%)" }}>
            <CardHeader>
              <CardTitle>Storage</CardTitle>
              <CardDescription>8.2 GB of 10 GB used.</CardDescription>
            </CardHeader>
          </Card>
        ),
      },
    ],
    props: [
      { name: "Card", type: "div", desc: "Container — sets surface-raised, border, --ham-radius-lg, --ham-shadow." },
      { name: "CardHeader", type: "div", desc: "Title + description stack; owns the top padding." },
      { name: "CardTitle", type: "h3", desc: "Display face, one line, sentence case." },
      { name: "CardDescription", type: "p", desc: "Soft-ink supporting context." },
      { name: "CardContent", type: "div", desc: "Body; top padding removed so spacing doesn't double." },
      { name: "CardFooter", type: "div", desc: "Actions row, left-aligned. One primary." },
    ],
    code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "hamstack";

<Card>
  <CardHeader>
    <CardTitle>Publish workspace</CardTitle>
    <CardDescription>Everyone with the link can view it.</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter><Button variant="primary">Publish</Button></CardFooter>
</Card>`,
    intent: cardIntent,
  },
  {
    key: "badge",
    name: "Badge",
    tagline: "A compact status pill — solid, AA, non-interactive.",
    status: "stable",
    examples: [
      {
        title: "Variants",
        desc: "Every variant is a solid fill on a WCAG-AA token pair.",
        node: (
          <>
            <Badge>Draft</Badge>
            <Badge variant="primary">New</Badge>
            <Badge variant="accent">Pro</Badge>
            <Badge variant="danger">Overdue</Badge>
          </>
        ),
      },
      {
        title: "Annotating a title",
        desc: "Sits inline with a heading, vertically centered, one space after it.",
        node: (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--ham-space-2)" }}>
            <span style={{ fontFamily: "var(--ham-font-display)", fontSize: "var(--ham-text-lg)" }}>Billing</span>
            <Badge variant="danger">Payment failed</Badge>
          </div>
        ),
      },
    ],
    props: [
      { name: "variant", type: '"neutral" | "primary" | "accent" | "danger"', def: '"neutral"', desc: "Solid fill color. At most one loud (primary/danger) badge per cluster." },
      { name: "children", type: "ReactNode", desc: "One or two words, rendered uppercase mono. Not a sentence." },
      { name: "…props", type: "HTMLAttributes<span>", desc: "Standard span attributes. No onClick — a badge is a label, not a control." },
    ],
    code: `import { Badge } from "hamstack";

<Badge variant="primary">New</Badge>
<Badge variant="danger">Payment failed</Badge>`,
    intent: badgeIntent,
  },
];
