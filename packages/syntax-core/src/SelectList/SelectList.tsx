import React, { ReactElement } from "react";
import styles from "./SelectList.module.css";
import classNames from "classnames";
import Typography from "../Typography/Typography";

interface OptionData {
  label: string;
  value: string;
}

const selectBoxSize = {
  sm: styles.smBox,
  md: styles.mdBox,
  lg: styles.lgBox,
} as const;

const fontSize = {
  sm: styles.smFont,
  md: styles.mdFont,
  lg: styles.lgFont,
} as const;

const SelectList = ({
  placeholderText,
  options,
  size = "md",
  unselected = true,
  label,
  helperText,
}: {
  placeholderText: string;
  options: OptionData[];
  size?: "sm" | "md" | "lg";
  unselected?: boolean;
  label?: string;
  helperText?: string;
}): ReactElement => {
  const selectBox = classNames(
    styles.selectBox,
    selectBoxSize[size],
    fontSize[size],
    {
      [styles.placeholderSelection]: unselected,
    },
  );
  return (
    <div className={styles.selectContainer}>
      <Typography size={100} color="gray700">
        {label}
      </Typography>
      <select required className={selectBox}>
        <option disabled selected value="">
          {placeholderText}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Typography size={100} color="gray700">
        {helperText}
      </Typography>
    </div>
  );
};

export default SelectList;
