import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Hamstack `cn` — merge class lists, letting later Tailwind utilities win
 * over earlier ones. The canonical shadcn-style helper every component uses.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
