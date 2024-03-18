import React, { forwardRef, useMemo } from "react";
import classnames from "classnames";
import Typography from "../Typography/Typography";
import Box from "../Box/Box";
import styles from "./Chip.module.css";
import useIsHydrated from "../useIsHydrated";
import { useTheme } from "../ThemeProvider/ThemeProvider";

function typographyColor({
  themeName,
  selected,
  on,
}: {
  themeName: "cambio" | "classic";
  selected: boolean;
  on: "lightBackground" | "darkBackground";
}): "white" | "gray900" {
  if (themeName === "cambio" && on === "darkBackground") {
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
   * Size of the chip.
   *
   * Classic:
   * * `sm`: 32px
   * * `lg`: 48px
   *
   * Cambio:
   * * `sm`: 32px
   *
   * @defaultValue sm
   */
  size?: "sm" | "lg";
  /**
   * The text to be displayed on the chip
   */
  text: string;
  /**
   * Indicate whether the badge renders on a light or dark background. Changes the color of the chip (Cambio only)
   *
   * @defaulValue `lightBackground`
   */
  on?: "lightBackground" | "darkBackground";
  /**
   * The callback to be called when the chip is clicked
   */
  onChange: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The icon to be displayed.
   */
  icon?: React.ComponentType<{ className?: string }>;
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
      "data-testid": dataTestId,
      size = "sm",
      text,
      on = "lightBackground",
      onChange,
      icon: Icon,
      dangerouslyForceFocusStyles,
    }: ChipProps,
    ref,
  ) => {
    const { themeName } = useTheme();
    const transformedSize = themeName === "cambio" ? "sm" : size;
    const isHydrated = useIsHydrated();
    const disabled = !isHydrated || disabledProp;

    const selectedChipCambioStyle =
      on === "lightBackground"
        ? styles.selectedChipCambio
        : styles.selectedChipCambioOnDarkBackground;

    const deselectedChipCambioStyle =
      on === "lightBackground"
        ? styles.deselectedChipCambio
        : styles.deselectedChipCambioOnDarkBackground;

    const chipStyles = classnames(
      styles.chip,
      themeName === "classic" ? styles.chipClassic : styles.chipCambio,
      styles[transformedSize],
      {
        [themeName === "classic"
          ? styles.selectedChip
          : selectedChipCambioStyle]: selected,
        [themeName === "classic"
          ? styles.deselectedChip
          : deselectedChipCambioStyle]: !selected,
        [styles.disabled]: disabled,
        [styles.forceFocus]: dangerouslyForceFocusStyles,
      },
    );
    const iconStyles = classnames(styles.icon, {
      [styles.selectedIcon]: selected,
    });
    const typographySize = {
      ["sm"]: 200,
      ["lg"]: 300,
    } as const;

    const color = useMemo(
      () => typographyColor({ themeName, selected, on }),
      [themeName, selected, on],
    );

    return (
      <button
        className={chipStyles}
        disabled={disabled}
        data-testid={dataTestId}
        ref={ref}
        type="button"
        aria-pressed={selected}
        onClick={onChange}
      >
        {Icon && <Icon className={iconStyles} />}
        <Box paddingX={Icon ? 1 : 0}>
          <Typography
            size={
              themeName === "classic" ? typographySize[transformedSize] : 100
            }
            color={color}
          >
            {text}
          </Typography>
        </Box>
      </button>
    );
  },
);

Chip.displayName = "Chip";

export default Chip;
