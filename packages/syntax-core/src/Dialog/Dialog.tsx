import React, {
  type ReactNode,
  forwardRef,
  type ReactElement,
  useContext,
  type ComponentProps,
} from "react";
import colorStyles from "../colors/colors.module.css";
import elevationStyles from "../elevation/elevation.module.css";
import layoutStyles from "../layout.module.css";
import paddingStyles from "../Box/padding.module.css";
import roundingStyles from "../rounding.module.css";
import boxStyles from "../Box/Box.module.css";
import styles from "./Dialog.module.css";
import { Dialog as ReactAriaDialog } from "react-aria-components";
import classNames from "classnames";
import type Box from "../Box/Box";

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

type DialogContextType = {
  /** padding of dialog content. overrides \"size\" prop's padding" */
  padding?: ComponentProps<typeof Box>["padding"];
};
export const DialogContext = React.createContext<DialogContextType>({});

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

  const { padding } = useContext(DialogContext);

  return (
    <ReactAriaDialog
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
        paddingStyles[`paddingX${padding ?? sizeToPadding[size]}`],
        paddingStyles[`paddingY${padding ?? sizeToPadding[size]}`],
        roundingStyles[`rounding${sizeToRounding[size]}`],
        elevationStyles.elevation400BoxShadow,
        layoutStyles.fullMaxHeight,
        layoutStyles.visibilityVisible,
        styles.dialog,
      ])}
    >
      {children}
    </ReactAriaDialog>
  );
});

export default Dialog;
