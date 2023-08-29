import React, { forwardRef } from "react";
import classnames from "classnames";
import Typography from "../Typography/Typography";
import Box from "../Box/Box";
import styles from "./Chip.module.css";

type ChipProps = {
  /**
   * Sets the initial status of this chip component.
   * * `true` will display a grey chip.
   * * `false` will display a premium800 color chip.
   *
   * @defaultValue "false"
   */
  selected: boolean;
  /**
   * Test id for the button
   */
  "data-testid": string;
  /**
   * Size of the chip.
   *
   * * `sm`: 32px
   * * `lg`: 48px
   *
   * @defaultValue sm
   */
  size: "sm" | "lg";
  /**
   * The text to be displayed on the chip
   */
  text: string;
  /**
   * The callback to be called when the chip is clicked
   */
  onChange: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The icon to be displayed.
   */
  icon?: React.ComponentType<{ className?: string }>;
};
/**
 * [Chip](https://cambly-syntax.vercel.app/?path=/docs/components-chip--docs) is used to show status (selecte/not selected) like a toggle button.
 */
const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      selected = false,
      "data-testid": dataTestId,
      size = "sm",
      text,
      onChange,
      icon: Icon,
    }: ChipProps,
    ref,
  ) => {
    const chipStyles = classnames(styles.chip, styles[size], {
      [styles.selectedChip]: selected,
    });
    const iconStyles = classnames(styles.icon, {
      [styles.selectedIcon]: selected,
    });
    const typographySize = {
      ["sm"]: 200,
      ["lg"]: 300,
    } as const;
    return (
      <button
        className={chipStyles}
        data-testid={dataTestId}
        ref={ref}
        type="button"
        aria-pressed={selected}
        onClick={onChange}
      >
        {Icon && <Icon className={iconStyles} />}
        <Box paddingX={Icon ? 1 : 0}>
          <Typography
            size={typographySize[size]}
            color={selected ? "white" : "gray900"}
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
