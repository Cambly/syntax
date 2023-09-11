import { type PopoverStore } from "@ariakit/react";
import { getFirstTabbableIn } from "@ariakit/core/utils/focus";
import { type FocusEventHandler, type FocusEvent, useCallback, useRef, useEffect } from "react";

type OnFocusHandler = FocusEventHandler<HTMLElement>;

export default function useForwardFocus(
  store: PopoverStore,
  options?: { onFocus?: OnFocusHandler
}): OnFocusHandler {
  const onFocusProp = options?.onFocus;
  const anchorRef = useRef<HTMLElement | null>(null);
  const anchorElement = store.useState("anchorElement");
  // transfer focus to child element if it is focusable
  //
  // if there is a focusable child in the trigger children,
  // focus is immediately transferred to that child element
  // (e.g. when the user tabs to the trigger)
  // prevents a double-focus situation where user tabs/steps to the trigger,
  // then has to step again to focus the child element
  const forwardFocusToInteractiveChild = useCallback((evt: FocusEvent<HTMLElement>) => {
    // only operate on focus events for the tooltip anchor directly, not focus events bubbling up from children
    if (evt.currentTarget !== evt.target) return;
    // try to find the first focusable child element if it exists
    const focusableChild = getFirstTabbableIn(evt.currentTarget, false, true);
    if (!focusableChild) return;
    anchorRef.current = evt.currentTarget;
    store.setAnchorElement(focusableChild);
    // transfer focus to the child element
    focusableChild.focus();
  }, [store]);

  useEffect(() => {
    if (!anchorRef.current || !anchorElement || anchorElement === anchorRef.current) return;
    // ariakit Tooltip uses html data attr to determine if mouse moves closes the tooltip or not
    // adding this to forward-focused child prevents tooltip from disappearing on mousemove while child is focused
    anchorElement.setAttribute('data-focus-visible', 'true');
    // cleanup data attr when focus leaves the anchor element
    const onBlur = () => {
      anchorElement.removeEventListener('blur', onBlur);
      anchorElement.removeAttribute('data-focus-visible');
    };
    anchorElement.addEventListener('blur', onBlur);
    return () => onBlur();
  }, [anchorElement]);

  return useCallback((evt: FocusEvent<HTMLElement>) => {
    onFocusProp?.(evt);
    if (evt.defaultPrevented) return;
    forwardFocusToInteractiveChild(evt);
  }, [onFocusProp, forwardFocusToInteractiveChild]);
}
