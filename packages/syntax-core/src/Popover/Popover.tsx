import React, {
  type ReactNode,
  forwardRef,
  type ReactElement,
  type ComponentProps,
} from "react";
import { type Placement as RAPlacement } from "react-aria";
import {
  Popover as RACPopover,
  DialogTrigger as RACDialogTrigger,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
} from "react-aria-components";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";
import IconButton from "../IconButton/IconButton";
import styles from "./Popover.module.css";
import Triggerable from "../react-aria-utils/Triggerable";
import OverlayVisibility from "../react-aria-utils/OverlayVisibility";
import Dialog from "../Dialog/Dialog";

type Placement = "top" | "end" | "bottom" | "start";

type PopoverProps = {
  /** Test id for the floating dialog */
  "data-testid"?: string;
  /** Optional aria-label for the popover (content element) */
  accessibilityLabel?: string;
  /** Optional trigger element */
  children?: ReactElement | string;
  /** Content to be shown inside the popover. */
  content: ReactNode;
  /**
   * If set to true the popover will render initially open
   * @defaultValue false
   */
  initialOpen?: boolean;
  /** Optional boolean to control whether popover content is rendered as a modal */
  modal?: boolean;
  /** Optional handler for change of visibility for popover content, for analytics and control */
  onChangeContentVisibility?: (visible: boolean) => void;
  /** Optional boolean to control open state of popover externally */
  open?: boolean;
  /**
   * Location of the popover content relative to anchor element
   * @defaultValue "top-start"
   */
  placement?: Placement;
};

const SYNTAX_PLACEMENT_TO_RAC_PLACEMENT: Record<Placement, RAPlacement> = {
  top: "top start",
  end: "top end",
  bottom: "bottom end",
  start: "bottom start",
} as const;

function syntaxToRAPlacement(placement?: Placement): RAPlacement | undefined {
  if (!placement) return undefined;
  return SYNTAX_PLACEMENT_TO_RAC_PLACEMENT[placement];
}

/**
 * [Popover](https://cambly-syntax.vercel.app/?path=/docs/components-popover--docs) displays contextual information on hover or focus.
 *
 * Popover content is hidden by default and shown on hover or focus.
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
const Popover = forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  props,
  ref,
): ReactElement {
  const {
    "data-testid": dataTestId,
    accessibilityLabel,
    children,
    content,
    initialOpen,
    modal: modalProp,
    onChangeContentVisibility,
    open,
    placement = "bottom",
  } = props;

  const anchorNode =
    typeof children === "string" ? (
      <Typography color="inherit">{children}</Typography>
    ) : (
      children
    );

  const modal = !anchorNode || modalProp;

  const modalNode = (
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    <ModalDialog
      ref={ref}
      accessibilityLabel={accessibilityLabel}
      data-testid={dataTestId}
      initialOpen={initialOpen}
      onChangeContentVisibility={onChangeContentVisibility}
      open={open}
    >
      {content}
    </ModalDialog>
  );

  const popoverNode = (
    <RACPopover
      ref={ref}
      offset={4}
      containerPadding={0} // padding against window is managed in css module file
      placement={syntaxToRAPlacement(placement)}
      className={styles.racPopover}
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
            {content}
          </Dialog>
        </>
      )}
    </RACPopover>
  );

  if (!anchorNode) return modalNode;
  return (
    <RACDialogTrigger defaultOpen={initialOpen} isOpen={open}>
      {<Triggerable>{anchorNode}</Triggerable>}
      {modal ? modalNode : popoverNode}
    </RACDialogTrigger>
  );
});

export default Popover;

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

/**
 * ModalDialog is a controlled component -- visibility is managed with the `open` prop.
 *
 * Example Usage:
 ```
  <ModalDialog
    open={open}
    initialOpen
    content={(
    )}
    onChangeContentVisibility={(visible) => ...}
  >
    <Box padding={2} maxWidth={400}>
      ... some content goes here
    </Box>
  </ModalDialog>
 ```
 */
const ModalDialog = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Dialog> & {
    /** Whether dialog can be dismissed with click outside / Escape key  */
    dismissable?: boolean;
    /** render visible initially. */
    initialOpen?: boolean;
    /** Optional handler for change of visibility for dialog content.  For analytics and control */
    onChangeContentVisibility?: (visible: boolean) => void;
    /** Optional boolean to control open state of modal dialog externally */
    open?: boolean;
  }
>(function ModalDialog(props, ref): ReactElement {
  const {
    "data-testid": dataTestId,
    accessibilityLabel,
    children,
    dismissable = true,
    initialOpen,
    onChangeContentVisibility,
    open,
  } = props;

  return (
    <RACModalOverlay
      isDismissable={dismissable}
      isKeyboardDismissDisabled={!dismissable}
      defaultOpen={initialOpen}
      isOpen={open}
      className={styles.racModalOverlay}
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
          <RACModal
            ref={ref}
            aria-label={accessibilityLabel}
            className={styles.racModal}
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
                      // TODO(remove this comment before merge):
                      //  internationalize? rac dialog already includes
                      //  hidden dismiss element, accessible to screen readers,
                      //  and that aria-label _is_ i18n'ed "dismiss"
                      accessibilityLabel="Dismiss"
                      icon={XIcon}
                    />
                  </Box>
                  {children}
                </Dialog>
              </>
            )}
          </RACModal>
        </Box>
      )}
    </RACModalOverlay>
  );
});

export { ModalDialog };