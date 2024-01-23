import React, { type ReactNode, forwardRef, type ReactElement } from "react";
import Typography from "../Typography/Typography";
import colorStyles from "../colors/colors.module.css";
import elevationStyles from "../elevation/elevation.module.css";
import paddingStyles from "../Box/padding.module.css";
import roundingStyles from "../rounding.module.css";
import boxStyles from "../Box/Box.module.css";
import styles from "./Dialog.module.css";
import { Dialog as RACDialog } from "react-aria-components";
import classNames from "classnames";

type DialogSize = "sm" | "md" | "lg";
type DialogRounding = "lg" | "xl";
export type DialogProps = {
  /** Test id for the floating dialog */
  "data-testid"?: string;
  /** aria-label for the dialog */
  accessibilityLabel?: string;
  /** Content to be shown inside the dialog. */
  children?: ReactNode;
  /** Optional size of the dialog box */
  size?: DialogSize;
};

const sizeToRounding: Record<DialogSize, DialogRounding> = {
  sm: "lg",
  md: "lg",
  lg: "xl",
};

const sizeToPadding: Record<DialogSize, 4 | 5 | 6> = {
  sm: 4,
  md: 5,
  lg: 6,
};

/**
 * Dialog is a display component for showing content in Popovers, Modals, etc...
 *
 * Example Usage:
 ```
  <Dialog accessibilityLabel="Select some options">
    <Box padding={2} maxWidth={400}>
      ... some content goes here
    </Box>
  </Dialog>
 ```
 */
const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  props,
  ref,
): ReactElement {
  const {
    "data-testid": dataTestId,
    accessibilityLabel,
    children,
    size = "md",
  } = props;

  const content =
    typeof children === "string" ? (
      <Typography color="inherit">{children}</Typography>
    ) : (
      children
    );

  return (
    <RACDialog
      ref={ref}
      data-testid={dataTestId}
      // first thing screen reader reads
      // e.g. "<this was the label prop>, dialog, 4 items..."
      aria-label={accessibilityLabel}
      className={classNames([
        boxStyles.box,
        boxStyles.flex,
        boxStyles.column,
        boxStyles.gap4,
        boxStyles.relative,
        boxStyles.overflowauto,
        colorStyles.whiteBackgroundColor,
        paddingStyles[`paddingX${sizeToPadding[size]}`],
        paddingStyles[`paddingY${sizeToPadding[size]}`],
        roundingStyles[`rounding${sizeToRounding[size]}`],
        elevationStyles.elevation400BoxShadow,
        styles.dialog,
      ])}
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    >
      {content}
    </RACDialog>
  );
});

export default Dialog;
