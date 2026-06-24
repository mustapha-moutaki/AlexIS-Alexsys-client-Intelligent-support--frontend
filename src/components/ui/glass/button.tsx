import * as React from "react"
import { Button as BaseButton, buttonVariants } from "@/components/ui/button"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"
import type { GlassCustomization } from "@/lib/glass-utils"

type BaseVariant = VariantProps<typeof buttonVariants>["variant"]

export interface ButtonProps
  extends Omit<React.ComponentProps<typeof BaseButton>, "variant"> {
  variant?: BaseVariant
  effect?: HoverEffect
  glass?: GlassCustomization
}

/**
 * Glass UI Button - A beautifully designed button component with glassy effects
 * Built on top of the base Button component with enhanced visual effects
 *
 * @example
 * ```tsx
 * <Button
 *   glass={{
 *     color: "rgba(59, 130, 246, 0.2)",
 *     blur: 25,
 *     outline: "rgba(59, 130, 246, 0.4)"
 *   }}
 * >
 *   Click me
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, effect = "glow", variant = "default", glass, style, ...props }, ref) => {
    const glassStyle: React.CSSProperties = {
      ...(glass?.color && { "--glass-color": glass.color } as React.CSSProperties),
      ...(glass?.blur != null && { "--glass-blur": `${glass.blur}px` } as React.CSSProperties),
      ...(glass?.outline && { "--glass-outline": glass.outline } as React.CSSProperties),
      ...(glass?.shadow && { "--glass-shadow": glass.shadow } as React.CSSProperties),
      ...style,
    }

    return (
      <BaseButton
        ref={ref}
        variant={variant}
        style={glassStyle}
        className={cn(
          "relative overflow-hidden",
          hoverEffects({ hover: effect }),
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
