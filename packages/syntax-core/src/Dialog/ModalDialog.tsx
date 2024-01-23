import React, {
  type ReactElement,
  forwardRef,
  type ComponentProps,
} from "react";
import {
  Modal as ReactAriaModal,
  ModalOverlay as ReactAriaModalOverlay,
  composeRenderProps,
  type ModalOverlayProps as ReactAriaModalOverlayProps,
} from "react-aria-components";
import classNames from "classnames";
import { mergeProps } from "react-aria";
import Dialog, { type DialogProps } from "./Dialog";
import OverlayVisibility from "../react-aria-utils/OverlayVisibility";
import paddingStyles from "../Box/padding.module.css";
import boxStyles from "../Box/Box.module.css";
import styles from "./ModalDialog.module.css";
import IconButton from "../IconButton/IconButton";
import Box from "../Box/Box";

function XIcon({ color = "#000" }: { color?: string; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill={color}>
      <path
        fill="inherit"
        d="M11.25.758a.83.83 0 0 0-1.175 0L6 4.825 1.925.75A.83.83 0 1 0 .75 1.925L4.825 6 .75 10.075a.83.83 0 1 0 1.175 1.175L6 7.175l4.075 4.075a.83.83 0 1 0 1.175-1.175L7.175 6l4.075-4.075a.835.835 0 0 0 0-1.167Z"
      />
    </svg>
  );
}

type AriaModalOverlayProps = {
  "data-testid"?: string;
} & ReactAriaModalOverlayProps;
/**
 * AriaModalOverlay: This component extends upon ModalOverlay from react-aria-components
 * It applies syntax styles and adds aadditional props:
 *  - data-testid
 */
export const AriaModalOverlay = forwardRef<
  HTMLDivElement,
  AriaModalOverlayProps
>(function AriaModalOverlay({ children, ...otherProps }, ref): ReactElement {
  const className = classNames([
    boxStyles.box,
    boxStyles.fixed,
    boxStyles.box,
    boxStyles.flex,
    boxStyles.column,
    boxStyles.alignItemscenter,
    boxStyles.justifyContentcenter,
    paddingStyles.paddingX4,
    paddingStyles.paddingY4,
    styles.modalOverlay,
  ]);
  return (
    <ReactAriaModalOverlay ref={ref} {...mergeProps({ className }, otherProps)}>
      {children}
    </ReactAriaModalOverlay>
  );
});

type AriaModalProps = {
  "data-testid"?: string;
  /** Optional handler for change of visibility for overlaid content, for analytics timing */
  onChangeContentVisibility?: (visible: boolean) => void;
} & ComponentProps<typeof ReactAriaModal>;
/**
 * AriaModal: This component extends upon Modal from react-aria-components
 * It applies syntax styles and adds aadditional props:
 *  - data-testid
 *  - onContentChangeVisibility
 */
export const AriaModal = forwardRef<HTMLDivElement, AriaModalProps>(
  function AriaModal(
    { children: childrenProp, onChangeContentVisibility, ...otherProps },
    ref,
  ): ReactElement {
    const className = classNames([boxStyles.box, styles.modal]);
    return (
      <ReactAriaModal ref={ref} {...mergeProps({ className }, otherProps)}>
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
      </ReactAriaModal>
    );
  },
);

type ModalDialogProps = DialogProps & {
  /** Whether dialog can be dismissed with click outside / Escape key  */
  dismissable?: boolean;
  /** render visible initially. */
  initialOpen?: boolean;
  /** Optional handler for change of visibility for popover content, for analytics timing */
  onChangeContentVisibility?: (visible: boolean) => void;
  /** Optional handler for change of visibility for popover content, for control */
  onOpenChange?: (open: boolean) => void;
  /** Optional boolean to control open state of modal dialog externally */
  open?: boolean;
  /** Optional override for default dismiss button accessibility label */
  accessibilityCloseLabel?: string;
};

/**
 * ModalDialog is a controlled component -- visibility is managed with the `open` prop.
 *
 * Example Usage:
 ```
  <ModalDialog
    open={open}
    initialOpen
    content={<Box>I am some content</Box>}
    onChangeContentVisibility={(visible) => ...}
  >
    <Box padding={2} maxWidth={400}>
      ... some content goes here
    </Box>
  </ModalDialog>
 ```
 */
const ModalDialog = forwardRef<HTMLDivElement, ModalDialogProps>(
  function ModalDialog(props, ref): ReactElement {
    const {
      "data-testid": dataTestId,
      accessibilityLabel,
      children,
      dismissable = true,
      accessibilityCloseLabel = "Dismiss",
      initialOpen,
      onChangeContentVisibility,
      onOpenChange,
      open,
    } = props;

    return (
      <AriaModalOverlay
        isDismissable={dismissable}
        isKeyboardDismissDisabled={!dismissable}
        defaultOpen={initialOpen}
        isOpen={open}
        onOpenChange={onOpenChange}
      >
        {({ state }) => (
          <AriaModal
            ref={ref}
            aria-label={accessibilityLabel}
            onChangeContentVisibility={onChangeContentVisibility}
          >
            <Dialog
              accessibilityLabel={accessibilityLabel}
              data-testid={dataTestId}
            >
              <Box
                position="absolute"
                padding={2}
                dangerouslySetInlineStyle={{
                  __style: {
                    top: "0",
                    right: "0",
                  },
                }}
              >
                <IconButton
                  onClick={() => state.close()}
                  color="tertiary"
                  accessibilityLabel={accessibilityCloseLabel}
                  icon={XIcon}
                />
              </Box>
              {children}
            </Dialog>
          </AriaModal>
        )}
      </AriaModalOverlay>
    );
  },
);

export default ModalDialog;
