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
import Badge from "../Badge/Badge";

/**
 * [TextField](https://cambly-syntax.vercel.app/?path=/docs/components-textfield--docs) is a component that allows users to enter text.
 */
export type TextFieldProps = {
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
   * Indicate whether the component renders on a light or dark background. Changes the color of the input field, text and badge
   *
   * @defaulValue `lightBackground`
   */
  on?: "lightBackground" | "darkBackground";
  /**
   * Text for endBadge shown at the end of the input field.
   */
  endBadge?: string;
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
  label: string | ReactElement;
  /**
   * Maximum length of the TextField
   */
  maxLength?: number;
  /**
   * The callback to be called the input changes
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Optional TextField placeholder text
   */
  placeholder?: string;
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
  /**
   * Specified legal number intervals for an input field. Specifically for time or number. If for time, specify in milliseconds. Must be a positive value.
   */
  step?: number;
};

export default function TextField({
  autoComplete,
  "data-testid": dataTestId,
  disabled: disabledProp = false,
  on = "lightBackground",
  endBadge,
  errorText = "",
  helperText = "",
  id,
  label,
  maxLength,
  onChange,
  placeholder = "",
  type = "text",
  value = "",
  step,
}: TextFieldProps): ReactElement {
  const isHydrated = useIsHydrated();
  const disabled = !isHydrated || disabledProp;
  const reactId = useId();
  const inputId = id ?? reactId;
  const textColor = on === "darkBackground" ? "white" : "gray900";
  const errorTextColor =
    on !== "darkBackground"
      ? "destructive-lightBackground"
      : "destructive-darkBackground";

  const labelElement =
    typeof label === "string" ? (
      <Typography size={100} color={textColor}>
        {label}
      </Typography>
    ) : (
      label
    );
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
          <Box paddingX={1}>{labelElement}</Box>
        </label>
      )}
      <Box
        display="flex"
        position="relative"
        justifyContent={endBadge ? "end" : "start"}
      >
        <input
          autoComplete={autoComplete}
          className={classNames(
            styles.textfield,
            styles.md,
            styles.height,
            errorText &&
              (on === "darkBackground"
                ? styles.transparentInputError
                : styles.inputError),
            {
              [styles.transparent]: on === "darkBackground",
            },
          )}
          data-testid={dataTestId}
          disabled={disabled}
          id={inputId}
          maxLength={maxLength}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          step={step}
        />
        {endBadge && (
          <Box
            position="absolute"
            dangerouslySetInlineStyle={{ __style: { top: "25%" } }}
            marginEnd={4}
          >
            <Badge
              text={endBadge}
              color={on === "lightBackground" ? "gray370" : "gray870"}
            />
          </Box>
        )}
      </Box>
      {(helperText || errorText) && (
        <Box paddingX={1}>
          <Typography size={100} color={errorText ? errorTextColor : textColor}>
            {errorText || helperText}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
