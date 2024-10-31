import React, { type ReactNode, forwardRef, type ReactElement } from "react";
import classNames from "classnames";
import { mergeProps } from "react-aria";
import {
  Popover as ReactAriaPopover,
  type PopoverProps as ReactAriaPopoverProps,
  MenuTrigger as ReactAriaMenuTrigger,
  composeRenderProps,
} from "react-aria-components";
import Triggerable, {
  type OverlayHandlerRef,
} from "../react-aria-utils/Triggerable";
import OverlayVisibility from "../react-aria-utils/OverlayVisibility";
import Dialog from "../Dialog/Dialog";
import ModalDialog from "../Dialog/ModalDialog";
import boxStyles from "../Box/Box.module.css";
import layoutStyles from "../layout.module.css";
import marginStyles from "../Box/margin.module.css";
import {
  type Placement,
  syntaxToReactAriaPlacement,
} from "../react-aria-utils/placement";

type PopoverProps = {
  /** Test id for the floating dialog */
  "data-testid"?: string;
  /** Optional aria-label for the popover (content element) */
  accessibilityLabel?: string;
  /** Optional aria-label for the close button (trigger element) when displayed as ModalDialog */
  accessibilityCloseLabel?: string;
  /** Optional trigger element */
  children?: ReactElement;
  /** Content to be shown inside the popover. */
  content: ReactNode;
  /** If set to true the popover trigger will be disabled */
  disabled?: boolean;
  /** If set to true the popover be open after mount / the first time it renders */
  initialOpen?: boolean;
  /** Optional boolean to control whether popover content is rendered as a modal */
  modal?: boolean;
  /** Optional handler for change of visibility for popover content, for control */
  onOpenChange?: (open: boolean) => void;
  /** Optional handler for change of visibility for popover content, for analytics timing */
  onChangeContentVisibility?: (visible: boolean) => void;
  /** Optional boolean to control open state of popover externally */
  open?: boolean;
  /**
   * Location of the popover content relative to anchor element
   * @defaultValue "bottom"
   */
  placement?: Placement;
  /** Optional z-index of the popover */
  zIndex?: number;
};

type AriaPopoverProps = {
  "data-testid"?: string;
  /** Optional handler for change of visibility for overlaid content, for analytics timing */
  onChangeContentVisibility?: (visible: boolean) => void;
  /** Optional z-index of the popover */
  zIndex?: number;
} & ReactAriaPopoverProps;
/**
 * AriaPopover: This component extends Popover from react-aria-components
 * It applies syntax styles and adds aadditional props:
 *  - data-testid
 *  - onContentChangeVisibility
 */
export const AriaPopover = forwardRef<HTMLElement, AriaPopoverProps>(
  function AriaPopover(
    {
      children: childrenProp,
      zIndex,
      onChangeContentVisibility,
      ...otherProps
    },
    ref,
  ): ReactElement {
    return (
      <ReactAriaPopover
        ref={ref}
        style={{
          zIndex,
        }}
        {...mergeProps(
          {
            offset: 8,
            containerPadding: 16,
            className: classNames([
              boxStyles.box,
              boxStyles.flex,
              boxStyles.column,
              layoutStyles.fullMaxWidth,
              layoutStyles.fullMaxHeight,
              layoutStyles.visibilityVisible,
              // workaround react-aria layout bug: containerPadding on right side of window not being applied
              marginStyles.marginEnd4,
            ]),
          },
          otherProps,
        )}
      >
        {composeRenderProps(
          childrenProp,
          (children, { isEntering, isExiting }) => (
            <>
              <OverlayVisibility
                isEntering={isEntering}
                isExiting={isExiting}
                onChange={onChangeContentVisibility}
              />
              {children}
            </>
          ),
        )}
      </ReactAriaPopover>
    );
  },
);

/**
 * [Popover](https://cambly-syntax.vercel.app/?path=/docs/components-popover--docs) displays contextual information on hover or focus.
 *
 * Popover content is hidden by default and shown on click or focus.
 * The content is hidden again when the user mouses out of the trigger element or blurs the trigger element or presses Escape
 *
 * Example Usage:
 ```
  <Popover
    placement="bottom-start"
    initialOpen
    content={(
      <Box padding={2} maxWidth={400}>
        ... some content goes here
      </Box>
    )}
  >
      <Button text="Trigger me" />
  </Popover>
 ```
 */
const Popover = forwardRef<OverlayHandlerRef, PopoverProps>(function Popover(
  props,
  ref,
): ReactElement {
  const {
    "data-testid": dataTestId,
    accessibilityLabel,
    accessibilityCloseLabel,
    children,
    content,
    disabled,
    initialOpen,
    modal: modalProp,
    onOpenChange,
    onChangeContentVisibility,
    open,
    placement = "bottom",
    zIndex,
  } = props;

  const modal = !children || modalProp;

  const modalNode = (
    <ModalDialog
      accessibilityLabel={accessibilityLabel}
      accessibilityCloseLabel={accessibilityCloseLabel}
      data-testid={dataTestId}
      initialOpen={initialOpen}
      onChangeContentVisibility={onChangeContentVisibility}
      onOpenChange={onOpenChange}
      open={open}
    >
      {content}
    </ModalDialog>
  );

  const popoverNode = (
    <AriaPopover
      placement={syntaxToReactAriaPlacement(placement)}
      onChangeContentVisibility={onChangeContentVisibility}
      zIndex={zIndex}
    >
      <Dialog accessibilityLabel={accessibilityLabel} data-testid={dataTestId}>
        {content}
      </Dialog>
    </AriaPopover>
  );

  if (!children) return modalNode;
  return (
    <ReactAriaMenuTrigger
      defaultOpen={initialOpen}
      isOpen={open}
      onOpenChange={onOpenChange}
    >
      {
        <Triggerable disabled={disabled} ref={ref}>
          {children}
        </Triggerable>
      }
      {modal ? modalNode : popoverNode}
    </ReactAriaMenuTrigger>
  );
});

export default Popover;
