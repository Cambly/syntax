import React, { useEffect, useRef, type ReactElement } from "react";

function queryFocusableAll(el: HTMLDivElement): NodeListOf<HTMLElement> {
  // Focusable, interactive elements that could possibly be in children
  const selector = [
    "a[href]",
    "area[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "iframe",
    "object",
    "embed",
    '[tabindex="-1"]',
    '[tabindex="0"]',
    "[contenteditable]",
    "audio[controls]",
    "video[controls]",
    "summary",
  ].join(",");
  return el.querySelectorAll(selector);
}

const focusElement = (el: HTMLElement) => {
  if (typeof el.focus === "function") {
    el.focus();
  }
};

/**
 * FocusTrap is used by components like Modal to ensure that only elements within children components can be focused.
 */
export default function FocusTrap({
  children,
}: {
  children?: ReactElement | null;
}): ReactElement {
  const elRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const { current: element } = elRef;

    // Focus the first child element among all the focusable, interactive elements within `children`
    const focusFirstChild = () => {
      const withinIframe = window !== window.parent;
      if (element && !withinIframe) {
        focusElement(queryFocusableAll(element)[0]);
      }
    };

    const handleFocus: (event: FocusEvent) => void = (event: FocusEvent) => {
      if (
        !element ||
        (event.target instanceof Node && element.contains(event.target))
      ) {
        return;
      }

      // This prevents stack overflow when multiple FocusTraps are rendered
      if (
        event.target instanceof Element &&
        event.target.closest('[data-testid="syntax-focus-trap"]') !== null
      ) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();
      focusFirstChild();
    };

    // If an element has focus currently, keep a reference to that element
    previouslyFocusedElRef.current = document.activeElement as HTMLElement;
    focusFirstChild();
    document.addEventListener("focus", handleFocus, true);

    return function cleanup() {
      const { current: previouslyFocusedEl } = previouslyFocusedElRef;
      document.removeEventListener("focus", handleFocus, true);
      // If we previously stored a reference to a focused element, return focus to that element
      if (previouslyFocusedEl) {
        focusElement(previouslyFocusedEl);
      }
    };
  }, [elRef, previouslyFocusedElRef]);

  return (
    <div data-testid="syntax-focus-trap" ref={elRef}>
      {children}
    </div>
  );
}
