import React, {
  type ReactNode,
  forwardRef,
  type ReactElement,
  useEffect,
} from "react";
import { Box, Typography } from "@cambly/syntax-core";
import styles from "./Popover.module.css";
import {
  usePopoverStore,
  Popover as AriakitPopover,
  PopoverDisclosure,
  PopoverArrow,
  type PopoverStoreProps,
} from "@ariakit/react";
import useForwardFocus from "../ariakit-utils/useForwardFocus";
import useChangeContentVisibility from "../ariakit-utils/useChangeContentVisibility";

type PopoverProps = {
  /** Optional aria-label for the popover (content element) */
  accessibilityLabel?: string;
  /** Required trigger element */
  children?: ReactElement | string;
  /* Content to be shown inside the popover. */
  content: ReactNode;
  /**
   * If set to true the popover will render initially open
   * @defaultValue false
   */
  initialOpen?: boolean;
  /** Optional boolean to control whether popover content is rendered as a modal */
  modal?: boolean;
  /** Optional handler for change of visibility for popover content.  called with (visible: boolean) */
  onChangeContentVisibility?: (visible: boolean) => void;
  /** Optional boolean to control open state of popover externally */
  open?: boolean;
  /**
   * Location of the popover content relative to anchor element
   * @defaultValue "top-start"
   */
  placement?: PopoverStoreProps["placement"];
};

/**
 * [Tooltip](https://cambly-syntax.vercel.app/?path=/docs/floating-components-popover--docs) displays contextual information on hover or focus.
 *
 * Tooltip content is hidden by default and shown on hover or focus.
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
export default forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  props: PopoverProps,
  ref,
): ReactElement {
  const {
    accessibilityLabel,
    children,
    content,
    initialOpen = false,
    modal: modalProp,
    onChangeContentVisibility,
    open,
    placement = "top-start",
  } = props;

  const store = usePopoverStore({
    defaultOpen: initialOpen,
    placement,
  });

  // For Analytics and Control:
  useChangeContentVisibility(store, onChangeContentVisibility);
  // transfer focus to child element if it is focusable. Wire into onFocus on Tooltip Anchor
  const forwardAnchorFocusToInteractiveChild = useForwardFocus(store);
  // allow external control of open state via `open` prop
  useEffect(() => {
    if (open === undefined) return;
    store.setOpen(open);
  }, [open, store]);

  const anchorNode =
    typeof children === "string" ? (
      <Typography color="inherit">{children}</Typography>
    ) : (
      children
    );
  const modal = !anchorNode || modalProp;

  return (
    <>
      {anchorNode && (
        <PopoverDisclosure
          store={store}
          ref={ref}
          as="span"
          className={styles.trigger}
          onFocus={forwardAnchorFocusToInteractiveChild}
        >
          {anchorNode}
        </PopoverDisclosure>
      )}
      <AriakitPopover
        store={store}
        // first thing screen reader reads
        // e.g. "<this was the label prop>, dialog, 4 items..."
        aria-label={accessibilityLabel}
        className={styles.content}
        fitViewport
        gutter={0}
        modal={modal}
        overflowPadding={8}
        overlap={modal}
        // ensures focusable items in popover are tab-able
        preserveTabOrder
        tabIndex={0}

        // ariakit sets role
      >
        <>
          <Box
            position="relative"
            width="100%"
            maxHeight="var(--popover-available-height, 100%)"
            rounding="sm"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {!modal && <PopoverArrow />}
            <Box
              padding={7}
              maxHeight="var(--popover-available-height, 100%)"
              dangerouslySetInlineStyle={{
                __style: {
                  // TODO: (syntax-core/Box): Box should take elevation prop and so should popover
                  boxShadow: "var(--elevation-400)",
                  overflowY: "auto",
                },
              }}
            >
              <Typography inline size={100} color="inherit">
                {content}
              </Typography>
            </Box>
          </Box>
        </>
      </AriakitPopover>
    </>
  );
});
