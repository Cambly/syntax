import { useEffect, useRef } from "react";

/**
 * The react-aria-components Tooltip, Popover, Modal and ModalOverlay
 * components render with `isEntering` and `isExiting` bools from
 * listening to css animations events on the element.
 *
 * These bits are only available through children-as-function render props.
 *
 * Since these bits are not available through any context,
 * this component is a helper to fire a handler when content visibility
 * has changed _after_ animations have finished.
 */
export default function OverlayVisibility({
  onChange,
  isEntering,
  isExiting,
}: {
  /** Optional handler for change of visibility for popover content */
  onChange?: (visible: boolean) => void;
  /** Whether the content is entering (animating) */
  isEntering?: boolean;
  /** Whether the content is entering (animating) */
  isExiting?: boolean;
}): null {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // fire visibility change handler when animation steps finish
  useEffect(() => {
    if (isEntering) return () => onChangeRef.current?.(true);
    if (isExiting) return () => onChangeRef.current?.(false);
  }, [isEntering, isExiting]);

  return null;
}
