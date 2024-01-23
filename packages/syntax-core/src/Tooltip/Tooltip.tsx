import React, { forwardRef, type ReactNode, type ReactElement } from "react";
import { type Placement as ReactAriaPlacement } from "react-aria";
import {
  Tooltip as ReactAriaTooltip,
  TooltipTrigger as ReactAriaTooltipTrigger,
} from "react-aria-components";

import Triggerable from "../react-aria-utils/Triggerable";
import Typography from "../Typography/Typography";
import OverlayArrow from "../react-aria-utils/OverlayArrow";
import Box from "../Box/Box";
import OverlayVisibility from "../react-aria-utils/OverlayVisibility";

type Placement = "top-end" | "top-start" | "bottom-end" | "bottom-start";

const SYNTAX_TO_REACT_ARIA_PLACEMENT: Record<Placement, ReactAriaPlacement> = {
  "top-end": "top right",
  "top-start": "top left",
  "bottom-end": "bottom right",
  "bottom-start": "bottom left",
} as const;

function syntaxToReactAriaPlacement(
  placement?: Placement,
): ReactAriaPlacement | undefined {
  if (!placement) return undefined;
  return SYNTAX_TO_REACT_ARIA_PLACEMENT[placement];
}

/**
 * [Tooltip](https://cambly-syntax.vercel.app/?path=/docs/components-tooltip--docs) displays contextual information on hover or focus.
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
const Tooltip = forwardRef<
  HTMLDivElement,
  {
    /**
     * Test id for the floating tooltip
     */
    "data-testid"?: string;
    /**
     * How long a user hovers before tooltip shows (in ms)
     * @defaultValue 0
     */
    delay?: number;
    /** Optional boolean to disable tooltip trigger behavior */
    disabled?: boolean;
    /** Optional aria-label for the tooltip (content element) */
    accessibilityLabel?: string;
    /** Required trigger element */
    children: ReactElement;
    /** Content to be shown inside the tooltip. */
    content: ReactNode;
    /** If set to true the tooltip will render initially open */
    initialOpen?: boolean;
    /** Optional handler for change of visibility for popover content, for analytics timing */
    onChangeContentVisibility?: (visible: boolean) => void;
    /** Optional handler for change of visibility for popover content, for control */
    onOpenChange?: (open: boolean) => void;
    /** Optional boolean to control open state of tooltip externally */
    open?: boolean;
    /**
     * Location of the tooltip content relative to anchor element
     * @defaultValue "top-end"
     */
    placement?: Placement;
  }
>(function Tooltip(props, ref): ReactElement {
  const {
    accessibilityLabel,
    "data-testid": dataTestId,
    delay = 0,
    disabled = false,
    children,
    content,
    initialOpen,
    onChangeContentVisibility,
    onOpenChange,
    open,
    placement = "top-end",
  } = props;

  return (
    <ReactAriaTooltipTrigger
      defaultOpen={initialOpen}
      delay={delay}
      closeDelay={500}
      isDisabled={disabled}
      isOpen={open}
      onOpenChange={onOpenChange}
    >
      {/* transfer focus handlers to child element if it is focusable */}
      <Triggerable>{children}</Triggerable>
      <ReactAriaTooltip
        ref={ref}
        offset={8}
        crossOffset={0}
        placement={syntaxToReactAriaPlacement(placement)}
        aria-label={accessibilityLabel}
        data-testid={dataTestId}
        style={{
          color: "var(--color-base-gray-900)",
        }}
      >
        {({ isEntering, isExiting }) => (
          <>
            <OverlayArrow />
            <Box
              backgroundColor="gray900"
              paddingY={2}
              paddingX={3}
              rounding="sm"
              maxWidth={240}
            >
              <Typography size={100} color="white">
                {content}
              </Typography>
            </Box>
            <OverlayVisibility
              isEntering={isEntering}
              isExiting={isExiting}
              onChange={onChangeContentVisibility}
            />
          </>
        )}
      </ReactAriaTooltip>
    </ReactAriaTooltipTrigger>
  );
});

export default Tooltip;
