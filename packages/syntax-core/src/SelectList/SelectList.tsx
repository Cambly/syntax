import React, {
  type ReactElement,
  type ReactNode,
  useId,
  useState,
} from "react";
import Box from "../Box/Box";
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
import useIsHydrated from "../useIsHydrated";

/**
 * [SelectList](https://cambly-syntax.vercel.app/?path=/docs/components-selectlist--docs) is a dropdown menu that allows users to select one option from a list.
 */
export default function SelectList({
  children,
  "data-testid": dataTestId,
  disabled: disabledProp = false,
  errorText,
  helperText,
  id,
  label,
  onChange,
  onClick,
  placeholderText,
  selectedValue = "",
}: {
  /**
   * One or more SelectList.Option components.
   */
  children: ReactNode;
  /**
   * Test id for the select element
   */
  "data-testid"?: string;
  /**
   * true if the select dropdown is disabled
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * Callback to be called when select is clicked
   */
  onClick?: (event: React.SyntheticEvent<HTMLSelectElement>) => void;
  /**
   * Text shown below select box if there is an input error.
   */
  errorText?: string;
  /**
   * Text shown below select box
   */
  helperText?: string;
  /**
   * Id of the select element
   */
  id?: string;
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
}): ReactElement {
  const reactId = useId();
  const isHydrated = useIsHydrated();
  const disabled = !isHydrated || disabledProp;
  const selectId = id ?? reactId;
  const { isFocusVisible } = useFocusVisible();
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown: React.KeyboardEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    if (disabled || onClick == null) return;
    if (event.key === "Enter" || event.key === " " || event.key === "Space") {
      onClick(event);
    }
  };

  return (
    <div
      className={classNames(styles.selectContainer, {
        [styles.opacityOverlay]: disabled,
      })}
    >
      {label && (
        <label htmlFor={selectId}>
          <Box paddingX={1}>
            <Typography size={100} color="gray700">
              {label}
            </Typography>
          </Box>
        </label>
      )}
      <div className={styles.selectWrapper}>
        <select
          id={selectId}
          data-testid={dataTestId}
          disabled={disabled}
          className={classNames(styles.selectBox, styles.selectBoxCambio, {
            [styles.unselected]: !selectedValue && !errorText,
            [styles.selected]: selectedValue && !errorText,
            [styles.selectErrorCambio]: errorText,
            [focusStyles.accessibilityOutlineFocus]:
              isFocused && isFocusVisible, // for focus keyboard
            [styles.selectMouseFocusStyling]: isFocused && !isFocusVisible, // for focus mouse
          })}
          onChange={onChange}
          onClick={onClick}
          onKeyDown={handleKeyDown}
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
            width={24}
          >
            <path
              fill={errorText ? ColorBaseDestructive700 : ColorBaseGray800}
              d="M15.88 9.29 12 13.17 8.12 9.29a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"
            />
          </svg>
        </div>
      </div>
      {(helperText || errorText) && (
        <Box paddingX={1}>
          <Typography
            size={100}
            color={errorText ? "destructive-primary" : "gray700"}
          >
            {errorText ? errorText : helperText}
          </Typography>
        </Box>
      )}
    </div>
  );
}

SelectList.Option = SelectOption;
