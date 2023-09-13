import { Box, Typography } from "@cambly/syntax-core";
import React, { type ReactElement, useId } from "react";
import styles from "components/SchedulingRep/form/TextArea.module.css";

/**
 * A quick textarea component that applies base styles of @cambly/syntax-core/TextFiels
 * replace usage with @cambly/syntax/TextArea when it exists
 */
const TextArea = ({
  disabled = false,
  label,
  placeholder = "",
  rows = 3,
  value = "",
  onChange,
}: {
  disabled?: boolean;
  label: string;
  placeholder: string;
  rows?: number;
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
}): ReactElement => {
  const id = useId();
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
      <label className={styles.label} htmlFor={id}>
        <Box paddingX={1}>
          <Typography size={100} color="gray700">
            {label}
          </Typography>
        </Box>
      </label>
      <Typography size={200}>
        <textarea
          className={styles.textfield}
          id={id}
          placeholder={placeholder}
          maxLength={1024}
          onChange={onChange}
          rows={rows}
          value={value}
        />
      </Typography>
    </Box>
  );
};

export default TextArea;
