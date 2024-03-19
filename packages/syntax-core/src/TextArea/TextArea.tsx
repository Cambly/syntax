import Box from "../Box/Box";
import Typography from "../Typography/Typography";
import React, { type ReactElement, useId, forwardRef } from "react";
import styles from "./TextArea.module.css";
import textFieldStyles from "../TextField/TextField.module.css";
import classNames from "classnames";
import useIsHydrated from "../useIsHydrated";
import { useTheme } from "../ThemeProvider/ThemeProvider";

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
   * Callback fired when the value is changed.
   */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Placeholder text to display when TextArea is empty
   */
  placeholder?: string;
  /**
   * Size of the TextArea. Defines the font size and padding.
   *
   * Cambio only supports `md`
   *
   * @defaultValue "md"
   */
  size?: "sm" | "md" | "lg";
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
      size = "md",
      value = "",
      onChange,
    }: TextAreaProps,
    forwardedRef,
  ): ReactElement {
    const isHydrated = useIsHydrated();
    const disabled = !isHydrated || disabledProp;
    const reactId = useId();
    const { themeName } = useTheme();
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
        position={themeName === "cambio" ? "relative" : undefined}
      >
        <label className={textFieldStyles.label} htmlFor={inputId}>
          <Box paddingX={1}>
            <Typography size={100} color="gray700">
              {label}
            </Typography>
          </Box>
        </label>
        <Typography size={themeName === "cambio" ? 100 : 200}>
          <textarea
            data-testid={dataTestId}
            ref={forwardedRef}
            className={classNames(
              textFieldStyles.textfield,
              themeName === "classic"
                ? textFieldStyles.textfieldClassic
                : textFieldStyles.textfieldCambio,
              themeName === "classic" && textFieldStyles[size],
              themeName === "classic" && styles[size],
              themeName === "classic" ? styles.textarea : styles.textareaCambio,
              {
                [themeName === "classic"
                  ? textFieldStyles.inputError
                  : textFieldStyles.inputErrorCambio]: errorText,
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
              color={errorText ? "destructive-primary" : "gray700"}
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
