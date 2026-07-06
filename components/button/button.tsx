import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Hamstack Button 🐹
 * Styled entirely by semantic tokens (--ham-*). Re-themes for free.
 * Design law: see button.intent.md — it is binding.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-[var(--ham-space-2)]",
    "font-[family-name:var(--ham-font-body)] font-semibold",
    "rounded-[var(--ham-radius)] select-none whitespace-nowrap",
    "transition-[background,transform,box-shadow] duration-[var(--ham-speed)] ease-[var(--ham-ease)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ham-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ham-surface)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--ham-primary)] text-[var(--ham-primary-ink)] shadow-[var(--ham-shadow-sm)]",
          "hover:bg-[var(--ham-primary-hover)] hover:shadow-[var(--ham-shadow)]",
        ].join(" "),
        secondary: [
          "bg-[var(--ham-surface-raised)] text-[var(--ham-ink)]",
          "border border-[var(--ham-border-strong)]",
          "hover:bg-[var(--ham-surface-sunken)]",
        ].join(" "),
        ghost: [
          "bg-transparent text-[var(--ham-ink-soft)]",
          "hover:bg-[var(--ham-surface-sunken)] hover:text-[var(--ham-ink)]",
        ].join(" "),
        danger: [
          "bg-[var(--ham-danger)] text-[var(--ham-danger-ink)] shadow-[var(--ham-shadow-sm)]",
          "hover:opacity-90",
        ].join(" "),
      },
      size: {
        sm: "h-10 px-[var(--ham-space-4)] text-[length:var(--ham-text-sm)]",
        md: "h-12 px-[var(--ham-space-5)] text-[length:var(--ham-text-base)]",
        lg: "h-14 px-[var(--ham-space-6)] text-[length:var(--ham-text-lg)]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child element (e.g. a link) via Radix Slot */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
