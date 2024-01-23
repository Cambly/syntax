import { type Placement as ReactAriaPlacement } from "@react-aria/overlays";

export type Placement = "top" | "end" | "bottom" | "start";

const SYNTAX_TO_REACT_ARIA_PLACEMENT: Record<Placement, ReactAriaPlacement> = {
  top: "top start",
  end: "top end",
  bottom: "bottom end",
  start: "bottom start",
} as const;

export function syntaxToReactAriaPlacement(
  placement?: Placement,
): ReactAriaPlacement | undefined {
  if (!placement) return undefined;
  return SYNTAX_TO_REACT_ARIA_PLACEMENT[placement];
}
