export interface GlassCustomization {
  /** Background color with optional opacity, e.g. "rgba(59, 130, 246, 0.2)" */
  color?: string;
  /** Backdrop blur amount in pixels */
  blur?: number;
  /** Border/outline color, e.g. "rgba(59, 130, 246, 0.4)" */
  outline?: string;
  /** Shadow color */
  shadow?: string;
}

/**
 * Converts a GlassCustomization object into inline CSS variables
 * consumed by the glass variant classes.
 */
export function buildGlassStyle(
  glass?: GlassCustomization
): React.CSSProperties {
  if (!glass) return {};
  const style: Record<string, string> = {};
  if (glass.color) style["--glass-color"] = glass.color;
  if (glass.blur != null) style["--glass-blur"] = `${glass.blur}px`;
  if (glass.outline) style["--glass-outline"] = glass.outline;
  if (glass.shadow) style["--glass-shadow"] = glass.shadow;
  return style as React.CSSProperties;
}
