import React, { forwardRef, useMemo, type ComponentProps } from "react";
import classnames from "classnames";
import Typography from "../Typography/Typography";
import styles from "./Chip.module.css";
import useIsHydrated from "../useIsHydrated";
import type InternalIcon from "../Icon/Icon";
import { type Size } from "../constants";
import textVariant from "../Button/constants/textVariant";
import {
  internalIconSize,
  materialIconSize,
} from "../Button/constants/iconSize";

function typographyColor({
  selected,
  on,
}: {
  selected: boolean;
  on: "lightBackground" | "darkBackground";
}): "white" | "gray900" {
  if (on === "darkBackground") {
    if (selected) {
      return "gray900";
    } else {
      return "white";
    }
  } else {
    if (selected) {
      return "white";
    } else {
      return "gray900";
    }
  }
}

type ChipProps = {
  /**
   * If true, the chip will be disabled.
   */
  disabled?: boolean;
  /**
   * Sets the initial status of this chip component.
   * * `true` will display a grey chip.
   * * `false` will display a premium800 color chip.
   *
   * @defaultValue "false"
   */
  selected?: boolean;
  /**
   * Test id for the button
   */
  "data-testid"?: string;
  /**
   * The size of the chip
   *
   * * `sm`: 32px height
   * * `md`: 48px height
   *
   * @defaultValue "sm"
   */
  size?: (typeof Size)[0 | 1];
  /**
   * The text to be displayed on the chip
   */
  text: string;
  /**
   * Indicate whether the badge renders on a light or dark background. Changes the color of the chip
   *
   * @defaulValue `lightBackground`
   */
  on?: "lightBackground" | "darkBackground";
  /**
   * The callback to be called when the chip is clicked
   */
  onChange: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The icon to be displayed at the start of the chip.
   */
  startIcon?:
    | React.ComponentType<{ className?: string }>
    | React.ComponentType<ComponentProps<typeof InternalIcon>>;
  /**
   * The icon to be displayed at the end of the chip.
   */
  endIcon?:
    | React.ComponentType<{ className?: string }>
    | React.ComponentType<ComponentProps<typeof InternalIcon>>;
  /** forces focus ring styling */
  dangerouslyForceFocusStyles?: boolean;
};
/**
 * [Chip](https://cambly-syntax.vercel.app/?path=/docs/components-chip--docs) is used to show status (selected/not selected) like a toggle button.
 */
const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      disabled: disabledProp = false,
      selected = false,
      size = "sm",
      "data-testid": dataTestId,
      text,
      on = "lightBackground",
      onChange,
      startIcon: StartIcon,
      endIcon: EndIcon,
      dangerouslyForceFocusStyles,
    }: ChipProps,
    ref,
  ) => {
    const isHydrated = useIsHydrated();
    const disabled = !isHydrated || disabledProp;

    const selectedChipStyle =
      on === "lightBackground"
        ? styles.selectedChip
        : styles.selectedChipOnDarkBackground;

    const deselectedChipStyle =
      on === "lightBackground"
        ? styles.deselectedChip
        : styles.deselectedChipOnDarkBackground;

    const chipStyles = classnames(styles.chip, styles.sm, {
      [selectedChipStyle]: selected,
      [deselectedChipStyle]: !selected,
      [styles.disabled]: disabled,
      [styles.forceFocus]: dangerouslyForceFocusStyles,
    });
    const iconStyles = classnames(styles.icon, {
      [styles.selectedIcon]: selected,
    });

    const color = useMemo(
      () => typographyColor({ selected, on }),
      [selected, on],
    );

    return (
      <button
        className={classnames(chipStyles, styles[size])}
        disabled={disabled}
        data-testid={dataTestId}
        ref={ref}
        type="button"
        aria-pressed={selected}
        onClick={onChange}
      >
        {StartIcon && (
          <StartIcon
            className={classnames(iconStyles, materialIconSize[size])}
            color={color}
            size={internalIconSize[size]}
          />
        )}
        <Typography size={textVariant[size]} color={color} weight="medium">
          {text}
        </Typography>
        {EndIcon && (
          <EndIcon
            className={classnames(iconStyles, materialIconSize[size])}
            color={color}
            size={internalIconSize[size]}
          />
        )}
      </button>
    );
  },
);

Chip.displayName = "Chip";

export default Chip;
