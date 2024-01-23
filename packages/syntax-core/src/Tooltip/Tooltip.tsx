import React, { forwardRef, type ReactNode, type ReactElement } from "react";
import { mergeProps, type Placement as ReactAriaPlacement } from "react-aria";
import {
  composeRenderProps,
  OverlayArrow as ReactAriaOverlayArrow,
  type OverlayArrowProps as ReactAriaOverlayArrowProps,
  Tooltip as ReactAriaTooltip,
  TooltipTrigger as ReactAriaTooltipTrigger,
  type TooltipProps as ReactAriaTooltipProps,
} from "react-aria-components";

import Triggerable from "../react-aria-utils/Triggerable";
import Typography from "../Typography/Typography";
import OverlayVisibility from "../react-aria-utils/OverlayVisibility";
import classNames from "classnames";
import boxStyles from "../Box/Box.module.css";
import paddingStyles from "../Box/padding.module.css";
import roundingStyles from "../rounding.module.css";
import colorStyles from "../colors/colors.module.css";
import styles from "./Tooltip.module.css";

// type Placement = "top-end" | "top-start" | "bottom-end" | "bottom-start";
type Placement = "top" | "bottom";

const SYNTAX_TO_REACT_ARIA_PLACEMENT: Record<Placement, ReactAriaPlacement> = {
  top: "top start",
  bottom: "bottom start",
} as const;

function syntaxToReactAriaPlacement(
  placement?: Placement,
): ReactAriaPlacement | undefined {
  if (!placement) return undefined;
  return SYNTAX_TO_REACT_ARIA_PLACEMENT[placement];
}

function TooltipArrow(props: ReactAriaOverlayArrowProps): ReactElement {
  return (
    <ReactAriaOverlayArrow {...props}>
      {({ placement }) => {
        if (placement === "center") return null;
        if (placement === "left") return null;
        if (placement === "right") return null;
        return (
          <div
            className={classNames([
              boxStyles.block,
              styles[`arrowPlacement${placement}`],
            ])}
          >
            <svg
              className={classNames([boxStyles.block])}
              width={40}
              height={5}
              viewBox="0 0 40 5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17 0L22 5H12L17 0Z" fill="currentColor" />
            </svg>
          </div>
        );
      }}
    </ReactAriaOverlayArrow>
  );
}

/**
 * AriaTooltip: This component extends Tooltip from react-aria-components
 * It applies syntax styles and adds aadditional props:
 *  - onContentChangeVisibility
 */
export const AriaTooltip = forwardRef<
  HTMLDivElement,
  ReactAriaTooltipProps & {
    /** Optional handler for change of visibility for overlaid content, for analytics timing */
    onChangeContentVisibility?: (visible: boolean) => void;
  }
>(function AriaTooltip(
  { children: childrenProp, onChangeContentVisibility, ...otherProps },
  ref,
): ReactElement {
  const className = classNames([
    boxStyles.box,
    colorStyles.gray900Color,
    colorStyles.gray900BackgroundColor,
    paddingStyles.paddingY2,
    paddingStyles.paddingX3,
    roundingStyles.roundingsm,
    styles.tooltip,
  ]);
  return (
    <ReactAriaTooltip
      ref={ref}
      {...mergeProps(
        {
          className,
          offset: 8,
          crossOffset: 0,
        },
        otherProps,
      )}
    >
      {composeRenderProps(
        childrenProp,
        (children, { isEntering, isExiting }) => (
          <>
            <TooltipArrow />
            <Typography size={100} color="white">
              {children}
            </Typography>
            <OverlayVisibility
              isEntering={isEntering}
              isExiting={isExiting}
              onChange={onChangeContentVisibility}
            />
          </>
        ),
      )}
    </ReactAriaTooltip>
  );
});

type TooltipProps = {
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
};
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
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  props,
  ref,
): ReactElement {
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
    placement = "top",
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
      <AriaTooltip
        ref={ref}
        placement={syntaxToReactAriaPlacement(placement)}
        aria-label={accessibilityLabel}
        data-testid={dataTestId}
        onChangeContentVisibility={onChangeContentVisibility}
      >
        {content}
      </AriaTooltip>
    </ReactAriaTooltipTrigger>
  );
});

export default Tooltip;
