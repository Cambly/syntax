import { type PopoverStore } from "@ariakit/react";
import { type FocusEventHandler, type FocusEvent, useCallback } from "react";


// TODO: share with the bit in syntax-core focus-trap
const INTERACTIVE_ELEMENT_SELECTORS = [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type=\"hidden\"])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "iframe",
  "object",
  "embed",
  '[tabindex="0"]',
  "[contenteditable]",
  "audio[controls]",
  "video[controls]",
  "summary",
  "[tabindex]:not([tabindex=\"-1\"])"
].join(",");


type OnFocusHandler = FocusEventHandler<HTMLElement>;

export default function useForwardFocus(
  store: PopoverStore,
  options?: { onFocus?: OnFocusHandler
}): OnFocusHandler {
  const onFocusProp = options?.onFocus;

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
    // hold reference to actual anchor element
    // anchorRef.current = evt.currentTarget;
    // try to find the first focusable child element if it exists
    const childToFocus = evt.currentTarget.querySelector<HTMLElement>(INTERACTIVE_ELEMENT_SELECTORS)
    if (!childToFocus) return;
    // ariakit Tooltip uses html data attr to determine if mouse moves closes the tooltip or not
    // adding this to forward-focused child prevents tooltip from disappearing on mousemove while child is focused
    childToFocus.setAttribute('data-focus-visible', 'true');
    // update the anchor element in the tooltip store to this interactive child element
    store.setAnchorElement(childToFocus);
    // transfer focus to the child element
    childToFocus.focus();
  }, [store]);

  return useCallback((evt: FocusEvent<HTMLElement>) => {
    onFocusProp?.(evt);
    if (evt.defaultPrevented) return;
    forwardFocusToInteractiveChild(evt);
  }, [onFocusProp, forwardFocusToInteractiveChild]);
}
