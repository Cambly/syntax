import React, { useEffect, useRef, type ReactElement } from "react";
import useIsHydrated from "../useIsHydrated";

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

const focusElement = (el?: HTMLElement) => {
  if (el && typeof el.focus === "function") {
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
  const isHydrated = useIsHydrated();

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

      // Allow focus to land in:
      // 1. Other Syntax FocusTraps — prevents stack overflow when two FocusTraps
      //    are rendered (nested Modals).
      // 2. react-aria overlays that portal out of the Modal subtree:
      //    - Popover / DateRangePicker / Select / ComboBox — react-aria marks
      //      the portal root with `data-trigger`.
      //    - Dialog / AlertDialog / Menu / Tooltip / ListBox — these carry the
      //      corresponding ARIA role on their root element.
      //    These overlays manage their own focus via react-aria's FocusScope.
      //    Without this escape hatch, every focus event inside the overlay
      //    would be bounced back into the Modal. The canonical symptom is a
      //    DateRangePicker inside a Modal where picking one date collapses the
      //    range to a single day, because the bounce triggers RangeCalendar's
      //    onBlur-while-anchored path (selectFocusedDate).
      if (
        event.target instanceof Element &&
        event.target.closest(
          '[data-testid="syntax-focus-trap"], [data-trigger], [role="dialog"], [role="alertdialog"], [role="menu"], [role="tooltip"], [role="listbox"]',
        ) !== null
      ) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();
      isHydrated && focusFirstChild();
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
  }, [isHydrated, elRef, previouslyFocusedElRef]);

  return (
    <div data-testid="syntax-focus-trap" ref={elRef}>
      {children}
    </div>
  );
}
