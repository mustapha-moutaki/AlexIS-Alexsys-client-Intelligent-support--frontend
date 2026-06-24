import { cva } from "class-variance-authority"

export type HoverEffect =
  | "glow"
  | "lift"
  | "scale"
  | "none"

/**
 * Returns Tailwind classes for the given hover effect.
 */
export const hoverEffects = cva("", {
  variants: {
    hover: {
      glow: "hover:shadow-lg hover:shadow-current/20 transition-shadow duration-200",
      lift: "hover:-translate-y-0.5 transition-transform duration-200",
      scale: "hover:scale-105 active:scale-95 transition-transform duration-150",
      none: "",
    },
  },
  defaultVariants: {
    hover: "glow",
  },
})
