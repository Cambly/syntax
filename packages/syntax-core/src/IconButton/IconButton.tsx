import classNames from "classnames";
import backgroundColor from "../colors//backgroundColor";
import foregroundColor from "../colors/foregroundColor";
import React, { ReactElement, useContext } from "react";
import { Color, Size } from "../constants";
import styles from "./IconButton.module.css";
import ButtonGroupContext from "../ButtonGroup/ButtonGroupContext";

const iconSize = {
  ["sm"]: styles.smIcon,
  ["md"]: styles.mdIcon,
  ["lg"]: styles.lgIcon,
};

/**
 * IconButton is a clickable element that is used to perform an action.
 */
const IconButton = ({
  accessibilityLabel,
  color = "primary",
  disabled: disabledProp = false,
  icon: Icon,
  size: sizeProp = "md",
  tooltip,
  onClick,
}: {
  /**
   * The color of the button
   *
   * @defaultValue "primary"
   */
  color?: (typeof Color)[number];
  /**
   * The size of the button
   *
   * `sm`: 32px, `md`: 40px, `lg`: 48px
   *
   * @defaultValue "md"
   */
  size?: (typeof Size)[number];
  /**
   * The label to be used for accessibility
   */
  accessibilityLabel?: string;
  /**
   * The icon to be displayed. Please use a [Rounded Material Icon](https://material.io/resources/icons/?style=round)
   */
  icon: React.ComponentType<{ className: string }>;
  /**
   * If `true`, the button will be disabled
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * The callback to be called when the button is clicked
   */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The tooltip to be displayed when the user hovers over the button
   */
  tooltip?: string;
}): ReactElement => {
  const contextProps = useContext(ButtonGroupContext);

  const size = contextProps?.size || sizeProp;
  const disabled = contextProps?.disabled || disabledProp;

  return (
    <button
      aria-label={accessibilityLabel}
      type="button"
      title={tooltip}
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        styles.iconButton,
        foregroundColor(color),
        backgroundColor(color),
        styles[size],
      )}
    >
      <Icon className={iconSize[size]} />
    </button>
  );
};

export default IconButton;
