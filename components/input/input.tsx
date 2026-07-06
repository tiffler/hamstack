import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Hamstack Input 🐹
 * A sunken text well styled entirely by semantic tokens (--ham-*).
 * Re-themes for free. Design law: see input.intent.md — it is binding.
 */
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-12 w-full rounded-[var(--ham-radius)] px-[var(--ham-space-3)]",
        "bg-[var(--ham-surface-sunken)] text-[var(--ham-ink)]",
        "font-[family-name:var(--ham-font-body)] text-[length:var(--ham-text-base)]",
        "border border-[var(--ham-border-strong)]",
        "placeholder:text-[var(--ham-ink-faint)]",
        "transition-[border-color,box-shadow] duration-[var(--ham-speed)] ease-[var(--ham-ease)]",
        "focus-visible:outline-none focus-visible:border-[var(--ham-primary)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--ham-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ham-surface)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // File inputs shouldn't inherit the text-field chrome.
        "file:border-0 file:bg-transparent file:font-medium file:text-[var(--ham-ink)]",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
