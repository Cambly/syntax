import Box from "../Box/Box";
import Typography from "../Typography/Typography";
import React, { type ReactElement, useId, forwardRef } from "react";
import styles from "./TextArea.module.css";
import textFieldStyles from "../TextField/TextField.module.css";
import classNames from "classnames";
import useIsHydrated from "../useIsHydrated";

type TextAreaProps = {
  /**
   * A data-testid to make querying for the TextArea easier.
   */
  "data-testid"?: string;
  /**
   * If true, the TextArea will be disabled.
   */
  disabled?: boolean;
  /**
   * Text shown below TextArea if there is an input error.
   */
  errorText?: string;
  /**
   * Informative helper text shown below TextArea
   */
  helperText?: string;
  /**
   * TextField id, if not provided, a unique id will be generated
   */
  id?: string;
  /**
   * TextArea visible label
   */
  label: string;
  /**
   * Maximum number of characters allowed in the TextArea
   */
  maxLength?: number;
  /**
   * Indicate whether the component renders on a light or dark background. Changes the color of the input field and text
   *
   * @defaulValue `lightBackground`
   */
  on?: "lightBackground" | "darkBackground";
  /**
   * Callback fired when the value is changed.
   */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Placeholder text to display when TextArea is empty
   */
  placeholder?: string;
  /**
   * Sets which part resizes when the user drags the resize handle.
   * * `none`: TextArea can not be resized
   * * `horizontal`: TextArea can only be resized horizontally
   * * `vertical`: TextArea can only be resized vertically
   * * `both`: TextArea can be resized horizontally and vertically
   *
   * @defaultvalue `none`
   */
  resize?: "none" | "horizontal" | "vertical" | "both";
  /**
   * Number of rows to display
   */
  rows?: number;
  /**
   * Value of the TextArea
   */
  value: string;
};

/**
 * [TextArea](https://cambly-syntax.vercel.app/?path=/docs/components-textarea--docs) allows users to enter multiple lines of text.
 */
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      "data-testid": dataTestId,
      disabled: disabledProp = false,
      errorText = "",
      helperText = "",
      id,
      label,
      maxLength = 1024,
      placeholder = "",
      rows = 3,
      value = "",
      on,
      onChange,
      resize = "none",
    }: TextAreaProps,
    forwardedRef,
  ): ReactElement {
    const isHydrated = useIsHydrated();
    const disabled = !isHydrated || disabledProp;
    const reactId = useId();
    const inputId = id ?? reactId;
    const textColor = on === "darkBackground" ? "white" : "gray900";
    const errorTextColor =
      on !== "darkBackground"
        ? "destructive-lightBackground"
        : "destructive-darkBackground";

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
        position="relative"
      >
        {label && (
          <label className={textFieldStyles.label} htmlFor={inputId}>
            <Box paddingX={1}>
              <Typography size={100} color={textColor}>
                {label}
              </Typography>
            </Box>
          </label>
        )}
        <Typography size={100}>
          <textarea
            data-testid={dataTestId}
            ref={forwardedRef}
            className={classNames(
              textFieldStyles.textfield,
              styles.textarea,
              styles[`resize${resize}`],
              errorText &&
                (on === "darkBackground"
                  ? textFieldStyles.transparentInputError
                  : textFieldStyles.inputError),
              {
                [textFieldStyles.transparent]: on === "darkBackground",
              },
            )}
            id={inputId}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={onChange}
            rows={rows}
            value={value}
            disabled={disabled}
          />
        </Typography>
        {(helperText || errorText) && (
          <Box paddingX={1}>
            <Typography
              size={100}
              color={errorText ? errorTextColor : textColor}
            >
              {errorText || helperText}
            </Typography>
          </Box>
        )}
      </Box>
    );
  },
);

export default TextArea;
