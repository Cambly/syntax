import React, {
  type ReactElement,
  type HTMLInputTypeAttribute,
  useId,
} from "react";
import classNames from "classnames";
import styles from "./TextField.module.css";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";
import useIsHydrated from "../useIsHydrated";

/**
 * [TextField](https://cambly-syntax.vercel.app/?path=/docs/components-textfield--docs) is a component that allows users to enter text.
 */
export default function TextField({
  autoComplete,
  "data-testid": dataTestId,
  disabled: disabledProp = false,
  errorText = "",
  helperText = "",
  id,
  label,
  onChange,
  placeholder = "",
  size = "md",
  type = "text",
  value = "",
}: {
  /**
   * The autocomplete attribute specifies whether or not an input field should have autocomplete enabled.
   *
   * Feel free to add new values from the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) as needed
   */
  autoComplete?: "current-password" | "new-password" | "off" | "on" | "email";
  /**
   * A data-testid to make querying for the TextField easier.
   */
  "data-testid"?: string;
  /**
   * If true, the TextField will be disabled.
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * Text shown below TextField if there is an input error.
   */
  errorText?: string;
  /**
   * Informative helper text shown below TextField
   */
  helperText?: string;
  /**
   * TextField id, if not provided, a unique id will be generated
   */
  id?: string;
  /**
   * TextField visible label
   */
  label: string;
  /**
   * The callback to be called the input changes
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Optional TextField placeholder text
   */
  placeholder?: string;
  /**
   * Size of the TextField
   * * `sm`: 32px
   * * `md`: 40px
   * * `lg`: 48px
   *
   * @defaultValue "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Input type of the TextField
   *
   * See [full list of input types](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types)
   */
  type?: HTMLInputTypeAttribute;
  /**
   * Value of the TextField
   */
  value: string;
}): ReactElement {
  const isHydrated = useIsHydrated();
  const disabled = !isHydrated || disabledProp;
  const reactId = useId();
  const inputId = id ?? reactId;

  return (
    <Box
      display="flex"
      direction="column"
      gap={2}
      width="100%"
      dangerouslySetInlineStyle={{
        __style: {
          opacity: disabled ? 0.5 : 1,
        },
      }}
    >
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          <Box paddingX={1}>
            <Typography size={100} color="gray700">
              {label}
            </Typography>
          </Box>
        </label>
      )}
      <input
        autoComplete={autoComplete}
        className={classNames(
          styles.textfield,
          styles[size],
          styles[`${size}Height`],
          {
            [styles.inputError]: errorText,
          },
        )}
        data-testid={dataTestId}
        disabled={disabled}
        id={inputId}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      {(helperText || errorText) && (
        <Box paddingX={1}>
          <Typography
            size={100}
            color={errorText ? "destructive-primary" : "gray700"}
          >
            {errorText || helperText}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
