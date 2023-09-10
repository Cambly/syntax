import React, {
  type ReactNode,
  forwardRef,
  type ReactElement,
  useCallback,
  type FocusEvent,
  useState,
  useEffect,
} from "react";
import { Typography } from "@cambly/syntax-core";
import styles from "./Tooltip.module.css";

import {
  useTooltipStore,
  Tooltip as AriakitTooltip,
  TooltipAnchor,
  TooltipArrow,
  type DisclosureStore,
  type PopoverStore,
} from "@ariakit/react";

type TooltipProps = {
  /** Optional aria-label for the tooltip (content element) */
  accessibilityLabel?: string;
  /** Required trigger element */
  children: ReactElement | string;
  /* Content to be shown inside the tooltip. */
  content: ReactNode;
  /**
   * How long a user hovers before tooltip shows (in ms)
   * @defaultValue 0
   */
  delay?: number;
  /**
   * If set to true the tooltip will render initially open
   * @defaultValue false
   */
  initialOpen?: boolean;
  /** Optional handler for change of visibility for tooltip content.  called with (visible: boolean) */
  onChangeContentVisibility?: (visible: boolean) => void;
  /** Optional boolean to control open state of tooltip externally */
  open?: boolean;
  /**
   * Location of the tooltip content relative to anchor element
   * @defaultValue "top-start"
   */
  placement?:
    | "top"
    | "bottom"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";
};

// TODO: share with the bit in syntax-core focus-trap
const INTERACTIVE_ELEMENT_SELECTORS = [
  "a[href]",
  "area[href]",
  'input:not([disabled]):not([type="hidden"])',
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
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Hook AriaKit - based floating components
 * Wires a handler to fire when visibility changes to an ariakit DisclosureStore store (tooltip, hovercard, popover, etc...)
 * Use for analytics and controlling open state externally
 */
function useOnChangeContentVisibility(
  store: DisclosureStore,
  onChangeContentVisibility?: (visible: boolean) => void,
): void {
  // when visibility changes, fire `onChangeContentVisibility`
  const { animating, open } = store.getState();
  const contentVisible = open ? !animating : animating;
  const [prevContentVisible, setPrevContentVisible] = useState(false);
  useEffect(() => setPrevContentVisible(contentVisible), [contentVisible]);
  useEffect(() => {
    if (contentVisible === prevContentVisible) return undefined;
    onChangeContentVisibility?.(contentVisible);
  }, [contentVisible, prevContentVisible, onChangeContentVisibility]);
  // prevent over-firing of `onChangeContentVisibility` handler
  // when `animated`, `open` turns true a tick before `animating` turns true
  const animated = store.useState("animated");
  // so use that to determine which bit gets subscribe to
  store.useState(animated ? "animating" : "open");
}

function useOnFocusForwardAnchorFocusToInteractiveChild(
  store: PopoverStore,
  options?: { onFocus?: (evt: FocusEvent<HTMLElement>) => void },
): (evt: FocusEvent<HTMLElement>) => void {
  const onFocusProp = options?.onFocus;

  // transfer focus to child element if it is focusable
  //
  // if there is a focusable child in the trigger children,
  // focus is immediately transferred to that child element
  // (e.g. when the user tabs to the trigger)
  // prevents a double-focus situation where user tabs/steps to the trigger,
  // then has to step again to focus the child element
  const forwardFocusToInteractiveChild = useCallback(
    (evt: FocusEvent<HTMLElement>) => {
      // only operate on focus events for the tooltip anchor directly, not focus events bubbling up from children
      if (evt.currentTarget !== evt.target) return;
      // hold reference to actual anchor element
      // anchorRef.current = evt.currentTarget;
      // try to find the first focusable child element if it exists
      const childToFocus = evt.currentTarget.querySelector<HTMLElement>(
        INTERACTIVE_ELEMENT_SELECTORS,
      );
      if (!childToFocus) return;
      // ariakit Tooltip uses html data attr to determine if mouse moves closes the tooltip or not
      // adding this to forward-focused child prevents tooltip from disappearing on mousemove while child is focused
      childToFocus.setAttribute("data-focus-visible", "true");
      // update the anchor element in the tooltip store to this interactive child element
      store.setAnchorElement(childToFocus);
      // transfer focus to the child element
      childToFocus.focus();
    },
    [store],
  );

  return useCallback(
    (evt: FocusEvent<HTMLElement>) => {
      onFocusProp?.(evt);
      if (evt.defaultPrevented) return;
      forwardFocusToInteractiveChild(evt);
    },
    [onFocusProp, forwardFocusToInteractiveChild],
  );
}

/**
 * [Tooltip](https://cambly-syntax.vercel.app/?path=/docs/floating-components-tooltip--docs) displays contextual information on hover or focus.
 *
 * Tooltip content is hidden by default and shown on hover or focus.
 * The content is hidden again when the user mouses out of the trigger element or blurs the trigger element or presses Escape
 *
 * Example Usage:
 ```
  <Tooltip
    delay={200}
    placement="bottom-start"
    initialOpen
    content={(
      <Box padding={2}>
        ... some content goes here
      </Box>
    )}
  >
      <Button text="Trigger me" />
  </Tooltip>
 ```
 */
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function SyntaxTooltip(
  props: TooltipProps,
  ref,
): ReactElement {
  const {
    accessibilityLabel,
    delay = 0,
    children,
    content,
    initialOpen = false,
    onChangeContentVisibility,
    open,
    placement = "top-start",
  } = props;

  const tooltip = useTooltipStore({
    defaultOpen: initialOpen,
    placement,
    showTimeout: delay,
  });

  // For Analytics and Control:
  useOnChangeContentVisibility(tooltip, onChangeContentVisibility);
  // transfer focus to child element if it is focusable. Wire into onFocus on Tooltip Anchor
  const forwardAnchorFocusToInteractiveChild =
    useOnFocusForwardAnchorFocusToInteractiveChild(tooltip);
  // allow external control of open state via `open` prop
  useEffect(() => {
    if (open === undefined) return;
    tooltip.setOpen(open);
  }, [open, tooltip]);

  return (
    <>
      <TooltipAnchor
        store={tooltip}
        ref={ref}
        className={styles.trigger}
        onFocus={forwardAnchorFocusToInteractiveChild}
      >
        {typeof children === "string" ? (
          <Typography color="inherit">{children}</Typography>
        ) : (
          children
        )}
      </TooltipAnchor>
      <AriakitTooltip
        store={tooltip}
        gutter={4}
        overflowPadding={4}
        fitViewport
        className={styles.tooltipContent}
        // ensures focusable items in tooltip are tab-able
        preserveTabOrder
        // first thing screen reader reads
        // e.g. "<this was the label prop>, dialog, 4 items..."
        aria-label={accessibilityLabel}
        // ariakit sets role
      >
        <TooltipArrow className="" />
        <Typography inline size={100} color="inherit">
          {content}
        </Typography>
      </AriakitTooltip>
    </>
  );
});

export default Tooltip;
