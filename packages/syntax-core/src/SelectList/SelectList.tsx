import React, { ReactElement, ReactNode, useId, useState } from "react";
import classNames from "classnames";
import {
  ColorBaseDestructive700,
  ColorBaseGray800,
} from "@cambly/syntax-design-tokens";
import Typography from "../Typography/Typography";
import styles from "./SelectList.module.css";
import focusStyles from "../Focus.module.css";
import SelectOption from "./SelectOption";
import useFocusVisible from "../useFocusVisible";

const iconSize = {
  sm: 20,
  md: 24,
  lg: 24,
} as const;

const SelectList = ({
  children,
  disabled = false,
  errorText,
  helperText,
  label,
  onChange,
  placeholderText,
  selectedValue = "",
  size = "md",
}: {
  /**
   * One or more SelectList.Option components.
   */
  children: ReactNode;
  /**
   * true if the select dropdown is disabled
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * Text shown below select box if there is an input error.
   * Should only have a value if error = true
   */
  errorText?: string;
  /**
   * Text shown below select box
   */
  helperText?: string;
  /**
   * Text shown above select box
   */
  label: string;
  /**
   * The callback to be called when an option is selected
   */
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  /**
   * Text showing in select box if no option has been chosen.
   * We should always have a placeholder unless there is a default option selected
   */
  placeholderText?: string;
  /**
   * Value of the currently selected option
   */
  selectedValue?: string;
  /**
   * Size of the select box
   * * `sm`: 32px
   * * `md`: 40px
   * * `lg`: 48px
   *
   * @defaultValue "md"
   */
  size?: "sm" | "md" | "lg";
}): ReactElement => {
  const id = useId();
  const { isFocusVisible } = useFocusVisible();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={classNames(styles.selectContainer, {
        [styles.opacityOverlay]: disabled,
      })}
    >
      <label
        htmlFor={id}
        className={styles.outerTextContainer}
        onClick={(e) => e.preventDefault()}
      >
        <Typography size={100} color="gray700">
          {label}
        </Typography>
      </label>
      <div className={styles.selectWrapper}>
        <select
          id={id}
          data-testid="syntax-select"
          disabled={disabled}
          className={classNames(styles.selectBox, styles[size], {
            [styles.unselected]: !selectedValue && !errorText,
            [styles.selected]: selectedValue && !errorText,
            [styles.selectError]: errorText,
            [focusStyles.accessibilityOutlineFocus]:
              isFocused && isFocusVisible, // for focus keyboard
            [styles.seletBoxMouseFocusStyling]: isFocused && !isFocusVisible, // for focus mouse
          })}
          onChange={onChange}
          value={
            placeholderText && !selectedValue ? placeholderText : selectedValue
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          {placeholderText && (
            <option disabled value={placeholderText}>
              {placeholderText}
            </option>
          )}
          {children}
        </select>
        <div className={styles.arrowIcon}>
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width={iconSize[size]}
          >
            <path
              fill={errorText ? ColorBaseDestructive700 : ColorBaseGray800}
              d="M15.88 9.29 12 13.17 8.12 9.29a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"
            />
          </svg>
        </div>
      </div>
      <div className={styles.outerTextContainer}>
        <Typography
          size={100}
          color={errorText ? "destructive-primary" : "gray700"}
        >
          {errorText ?? helperText}
        </Typography>
      </div>
    </div>
  );
};

export default SelectList;

SelectList.Option = SelectOption;
