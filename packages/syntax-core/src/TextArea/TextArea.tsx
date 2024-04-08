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
   * Callback fired when the value is changed.
   */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Placeholder text to display when TextArea is empty
   */
  placeholder?: string;
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
      onChange,
    }: TextAreaProps,
    forwardedRef,
  ): ReactElement {
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
        position="relative"
      >
        <label className={textFieldStyles.label} htmlFor={inputId}>
          <Box paddingX={1}>
            <Typography size={100} color="gray700">
              {label}
            </Typography>
          </Box>
        </label>
        <Typography size={100}>
          <textarea
            data-testid={dataTestId}
            ref={forwardedRef}
            className={classNames(textFieldStyles.textfield, styles.textarea, {
              [textFieldStyles.inputError]: errorText,
            })}
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
