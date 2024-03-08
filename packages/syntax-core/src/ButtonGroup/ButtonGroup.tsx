import { type ReactElement, type ReactNode } from "react";
import styles from "./ButtonGroup.module.css";
import { type Size } from "../constants";
import classNames from "classnames";
import { useTheme } from "../ThemeProvider/ThemeProvider";

const gapClassic = {
  sm: styles.smallGap,
  md: styles.mediumGap,
  lg: styles.largeGap,
} as const;

const gapCambio = {
  sm: styles.smallGapCambio,
  md: styles.mediumGapCambio,
  lg: styles.largeGapCambio,
} as const;

/**
 * [ButtonGroup](https://cambly-syntax.vercel.app/?path=/docs/components-buttongroup--docs) groups buttons in a row or column with consistent spacing between each button.
 */
const ButtonGroup = ({
  orientation = "horizontal",
  size = "md",
  children,
}: {
  /**
   * The orientation of the button group
   *
   * @defaultValue "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * The size of the button group defines the spacing between each button
   *
   * Classic:
   * * `sm`: 8px
   * * `md`: 12px
   * * `lg`: 16px
   *
   * Cambio:
   * * `sm`: 4px
   * * `md`: 8px
   * * `lg`: 12px
   *
   * @defaultValue "md"
   */
  size?: (typeof Size)[number];
  /**
   * Buttons to be rendered inside the button group
   */
  children?: ReactNode;
}): ReactElement => {
  const { themeName } = useTheme();
  const classnames = classNames(
    styles.buttonGroup,
    themeName === "classic" ? gapClassic[size] : gapCambio[size],
    {
      [styles.horizontal]: orientation === "horizontal",
      [styles.vertical]: orientation === "vertical",
    },
  );

  return <div className={classnames}>{children}</div>;
};

export default ButtonGroup;
