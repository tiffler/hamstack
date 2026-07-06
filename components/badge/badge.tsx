import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Hamstack Badge 🐹
 * A compact status pill. Every variant is a SOLID fill on a token pair that
 * clears WCAG AA — no colored-text-on-tint that could fail contrast.
 * Design law: see badge.intent.md — it is binding.
 */
const badgeVariants = cva(
  [
    "inline-flex items-center gap-[var(--ham-space-1)] whitespace-nowrap",
    "rounded-[var(--ham-radius-pill)] border",
    "font-[family-name:var(--ham-font-mono)] font-medium uppercase tracking-[0.05em]",
    "text-[length:var(--ham-text-xs)] leading-none px-[var(--ham-space-2)] py-[4px]",
  ].join(" "),
  {
    variants: {
      variant: {
        neutral: "bg-[var(--ham-surface-sunken)] text-[var(--ham-ink-soft)] border-[var(--ham-border)]",
        primary: "bg-[var(--ham-primary)] text-[var(--ham-primary-ink)] border-transparent",
        accent: "bg-[var(--ham-accent)] text-[var(--ham-accent-ink)] border-transparent",
        danger: "bg-[var(--ham-danger)] text-[var(--ham-danger-ink)] border-transparent",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
