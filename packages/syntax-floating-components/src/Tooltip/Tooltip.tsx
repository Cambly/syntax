import React, { type ReactNode, forwardRef, type ReactElement, useEffect } from "react";
import { Typography } from "@cambly/syntax-core";
import styles from "./Tooltip.module.css";

import {
  useTooltipStore,
  Tooltip as AriakitTooltip,
  TooltipAnchor,
  TooltipArrow,
} from '@ariakit/react';
import useForwardFocus from "../ariakit-utils/useForwardFocus";
import useChangeContentVisibility from "../ariakit-utils/useChangeContentVisibility";

type TooltipProps = {
  /**
   * How long a user hovers before tooltip shows (in ms)
   * @defaultValue 0
   */
  delay?: number;
  /** Optional aria-label for the tooltip (content element) */
  accessibilityLabel?: string;
  /** Required trigger element */
  children: ReactElement | string;
  /* Content to be shown inside the tooltip. */
  content: ReactNode;
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
  placement?: "top" | "bottom" | "top-start" | "top-end" | "bottom-start" | "bottom-end";
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
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function SyntaxTooltip(props: TooltipProps, ref): ReactElement {
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
  useChangeContentVisibility(tooltip, onChangeContentVisibility);
  // transfer focus to child element if it is focusable. Wire into onFocus on Tooltip Anchor
  const forwardAnchorFocusToInteractiveChild = useForwardFocus(tooltip);
  // allow external control of open state via `open` prop
  useEffect(() => {
    if (open === undefined) return;
    tooltip.setOpen(open);
  }, [open, tooltip]);

  return (
    <>
      <TooltipAnchor store={tooltip} ref={ref}
        className={styles.trigger}
        onFocus={forwardAnchorFocusToInteractiveChild}
      >
        {typeof children === 'string' ? <Typography color="inherit">{children}</Typography> : children}
      </TooltipAnchor>
      <AriakitTooltip store={tooltip}
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
      </AriakitTooltip >
    </>
  );
})

export default Tooltip;
