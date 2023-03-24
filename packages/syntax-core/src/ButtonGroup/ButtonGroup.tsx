import { useMemo, ReactElement, ReactNode } from "react";
import styles from "./ButtonGroup.module.css";
import { Size } from "../constants";
import ButtonGroupContext from "./ButtonGroupContext";
import classNames from "classnames";

const gap = {
  ["sm"]: styles.smallGap,
  ["md"]: styles.mediumGap,
  ["lg"]: styles.largeGap,
} as const;

/**
 * Group buttons to render them in a row or column with consistent spacing in between each button
 */
const ButtonGroup = ({
  disabled = false,
  fullWidth = false,
  orientation = "horizontal",
  size = "md",
  children,
}: {
  /**
   * If `true`, all buttons will be disabled.
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * If `true`, all buttons will be full width.
   *
   * @defaultValue false
   */
  fullWidth?: boolean;
  /**
   * The orientation of the button group
   *
   * @defaultValue "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * The size of the button group
   *
   * * `sm`: 32px
   * * `md`: 40px
   * * `lg`: 48px
   *
   * @defaultValue "md"
   */
  size?: (typeof Size)[number];
  /**
   * Buttons to be rendered inside the button group
   */
  children?: ReactNode;
}): ReactElement => {
  const context = useMemo(
    () => ({ disabled, fullWidth, size }),
    [disabled, fullWidth, size],
  );

  const classnames = classNames(styles.buttonGroup, gap[size], {
    [styles.horizontal]: orientation === "horizontal",
    [styles.vertical]: orientation === "vertical",
  });

  return (
    <ButtonGroupContext.Provider value={context}>
      <div className={classnames}>{children}</div>
    </ButtonGroupContext.Provider>
  );
};

export default ButtonGroup;
