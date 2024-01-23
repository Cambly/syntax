import React, { type ReactNode, forwardRef, type ReactElement } from "react";
import { type Placement as RAPlacement } from "react-aria";
import {
  Popover as RACPopover,
  DialogTrigger as RACDialogTrigger,
} from "react-aria-components";
import Typography from "../Typography/Typography";
import styles from "./Popover.module.css";
import Triggerable from "../react-aria-utils/Triggerable";
import OverlayVisibility from "../react-aria-utils/OverlayVisibility";
import Dialog from "../Dialog/Dialog";
import ModalDialog from "../Dialog/ModalDialog";

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
