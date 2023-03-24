import React, { ReactElement, useRef } from "react";
import styles from "./Checkbox.module.css";

const CheckedBox = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
    <rect width="24" height="24" fill="#236482" rx="8" />
    <rect
      width="2.5"
      height="7"
      x="5"
      y="13"
      fill="#fff"
      rx="1.25"
      transform="rotate(-45 5 13)"
    />
    <rect
      width="2.5"
      height="13"
      x="9.95"
      y="17.95"
      fill="#fff"
      rx="1.25"
      transform="rotate(-135 9.95 17.95)"
    />
  </svg>
);

/**
 * Checkbox is a clickable element that will show if an option has been selected or not
 */
const Checkbox = ({
  checked = false,
  disabled = false,
  onClick,
  onKeyDown,
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
}): ReactElement => {
  // const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // const focusedCheckbox = classNames({ [styles.focusedCheckbox]: isFocused });
  return (
    <div className={styles.checkboxContainer}>
      <input
        name="checkbox1"
        type="checkbox"
        className={styles.realCheckbox}
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
      {checked ? <CheckedBox /> : <div className={styles.emptyCheckbox} />}
    </div>
  );
};

export default Checkbox;
