import React, { forwardRef, type ReactNode, type ReactElement } from "react";
import { type Placement as RAPlacement } from "react-aria";
import {
  Tooltip as RACTooltip,
  TooltipTrigger as RACTooltipTrigger,
} from "react-aria-components";

import Triggerable from "../react-aria-utils/Triggerable";
import Typography from "../Typography/Typography";
import OverlayArrow from "../react-aria-utils/OverlayArrow";
import Box from "../Box/Box";
import OverlayVisibility from "../react-aria-utils/OverlayVisibility";

type Placement = "top-end" | "top-start" | "bottom-end" | "bottom-start";

const SYNTAX_PLACEMENT_TO_RAC_PLACEMENT: Record<Placement, RAPlacement> = {
  "top-end": "top right",
  "top-start": "top left",
  "bottom-end": "bottom right",
  "bottom-start": "bottom left",
} as const;

function syntaxPlacementToRAPlacement(
  placement?: Placement,
): RAPlacement | undefined {
  if (!placement) return undefined;
  return SYNTAX_PLACEMENT_TO_RAC_PLACEMENT[placement];
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
    children: ReactElement | string;
    /** Content to be shown inside the tooltip. */
    content: ReactNode;
    /**
     * If set to true the tooltip will render initially open
     * @defaultValue false
     */
    initialOpen?: boolean;
    /** Optional handler for change of visibility for tooltip content, for analytics and control */
    onChangeContentVisibility?: (visible: boolean) => void;
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
    initialOpen = false,
    onChangeContentVisibility,
    open,
    placement = "top-end",
  } = props;

  const anchorNode =
    typeof children === "string" ? (
      <Typography color="inherit">{children}</Typography>
    ) : (
      children
    );

  return (
    <RACTooltipTrigger
      defaultOpen={initialOpen}
      delay={delay}
      closeDelay={500}
      isDisabled={disabled}
      isOpen={open}
    >
      {/* transfer focus handlers to child element if it is focusable */}
      <Triggerable>{anchorNode}</Triggerable>
      <RACTooltip
        ref={ref}
        offset={8}
        crossOffset={0}
        placement={syntaxPlacementToRAPlacement(placement)}
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
      </RACTooltip>
    </RACTooltipTrigger>
  );
});

export default Tooltip;
