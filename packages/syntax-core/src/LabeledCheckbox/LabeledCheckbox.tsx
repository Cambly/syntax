import React, { ReactElement, useRef } from "react";
import classNames from "classnames";
import styles from "./LabeledCheckbox.module.css";

const iconSize = {
  sm: styles.smallIconContainer,
  md: styles.mediumIconContainer,
};

const textVariant = {
  // Replace with `Typography` once it lands in `syntax-core`
  ["sm"]: styles.labelTextSmall,
  ["md"]: styles.labelTextMedium,
} as const;

/**
 * Checkbox is a clickable element that will show if an option has been selected or not
 */
const Checkbox = ({
  checked = false,
  disabled = false,
  onClick,
  onKeyDown,
  size = "md",
  label,
  error = false,
}: {
  /**
   * @defaultValue false
   * Whether or not the box has been clicked
   */
  checked: boolean;
  /**
   * The callback to be called when the button is clicked
   */
  onClick: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  /**
   * @defaultValue false
   * Whether or not the box is disabled
   */
  disabled?: boolean;
  /**
   * @defaultValue "md"
   * The size of the checkbox and icon
   */
  size?: "md" | "sm";
  /**
   * The text accompanying the checkbox
   */
  label: string;
  /**
   * @defaultValue false
   * Whether or not there is an error with the input
   */
  error?: boolean;
}): ReactElement => {
  // const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // const focusedCheckbox = classNames({ [styles.focusedCheckbox]: isFocused });
  const checkboxStyling = classNames(styles.checkbox, styles[size], {
    [styles.uncheckedBox]: !checked,
    [styles.checkedBox]: checked,
    [styles.uncheckedError]: !checked && error,
    [styles.checkedError]: checked && error,
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.checkboxContainer}>
        <input
          name="checkbox1"
          type="checkbox"
          className={classNames(styles.inputOverlay, styles[size])}
          checked={checked}
          aria-checked={checked}
          tabIndex={0}
          ref={inputRef}
          onChange={onClick}
          onKeyDown={(e) => {
            if (e.key === "Space") {
              onKeyDown(e);
            }
          }}
          disabled={disabled}
          // onFocus={() => {
          // onBlur={() => setIsFocused(false)}
          //   setIsFocused(true);
          // }}
        />
        {checked ? (
          <div className={checkboxStyling}>
            <div className={classNames(styles.iconContainer, iconSize[size])}>
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  fill="#fff"
                  d="M5.313 10c-.14 0-.278-.028-.417-.083a1.187 1.187 0 0 1-.396-.271L.854 6a1.083 1.083 0 0 1-.323-.823c.007-.326.122-.6.344-.823.222-.222.493-.333.813-.333.319 0 .59.11.812.333l2.854 2.854L12.208.354c.223-.222.49-.333.802-.333.313 0 .58.11.803.333.222.222.333.49.333.802 0 .313-.111.58-.334.802L6.125 9.646a1.187 1.187 0 0 1-.396.27 1.115 1.115 0 0 1-.416.084Z"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div className={classNames(checkboxStyling)} />
        )}
      </div>
      <div
        className={classNames(
          styles.label,
          styles.labelText,
          textVariant[size],
          { [styles.errorText]: error },
        )}
      >
        {label}
      </div>
    </div>
  );
};

export default Checkbox;
