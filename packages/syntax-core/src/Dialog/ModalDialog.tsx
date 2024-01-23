import React, { type ReactElement, forwardRef, useEffect } from "react";
import {
  Modal as ReactAriaModal,
  ModalOverlay as ReactAriaModalOverlay,
} from "react-aria-components";
import Dialog, { type DialogProps } from "./Dialog";
import OverlayVisibility from "../react-aria-utils/OverlayVisibility";
import styles from "./ModalDialog.module.css";
import Box from "../Box/Box";
import IconButton from "../IconButton/IconButton";

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

type ModalDialogProps = DialogProps & {
  /** Whether dialog can be dismissed with click outside / Escape key  */
  dismissable?: boolean;
  /** render visible initially. */
  initialOpen?: boolean;
  /** Optional handler for change of visibility for dialog content.  For analytics and control */
  onChangeContentVisibility?: (visible: boolean) => void;
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
      open,
    } = props;

    // ensure overlay remains dismissible when open state is controlled externally
    // (listen to onChangeContentVisibility to update external open state)
    const [isOpen, setIsOpen] = React.useState(open);
    useEffect(() => setIsOpen(open), [open]);

    return (
      <ReactAriaModalOverlay
        isDismissable={dismissable}
        isKeyboardDismissDisabled={!dismissable}
        defaultOpen={initialOpen}
        isOpen={isOpen}
        className={styles.modalOverlay}
        onOpenChange={setIsOpen}
      >
        {({ state }) => (
          <Box
            padding={4} // padding/gutter from window edges
            height="100%"
            width="100%"
            display="flex"
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <ReactAriaModal
              ref={ref}
              aria-label={accessibilityLabel}
              className={styles.modal}
            >
              {({ isEntering, isExiting }) => (
                <>
                  <OverlayVisibility
                    isEntering={isEntering}
                    isExiting={isExiting}
                    onChange={onChangeContentVisibility}
                  />
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
                </>
              )}
            </ReactAriaModal>
          </Box>
        )}
      </ReactAriaModalOverlay>
    );
  },
);

export default ModalDialog;
