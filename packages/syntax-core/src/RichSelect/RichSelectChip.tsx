import React, { forwardRef, type ReactNode, type ReactElement } from "react";
import {
  ListBoxItem as ReactAriaListBoxItem,
  type ListBoxItemRenderProps,
} from "react-aria-components";
import Chip from "../Chip/Chip";
import styles from "./RichSelect.module.css";
import { useDisableKey, useSelectKey } from "./DisabledKeysProvider";

type RichSelectOptionProps = {
  "data-testid"?: string;
  value: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  /** The children of the component. A function may be provided to alter the children based on component state. */
  children?: ReactNode | ((values: ListBoxItemRenderProps) => ReactNode);
};

const RichSelectOption = forwardRef<
  HTMLDivElement,
  RichSelectOptionProps & {
    /** The children of the component. A function may be provided to alter the children based on component state. */
    children?: ReactNode | ((values: ListBoxItemRenderProps) => ReactNode);
  }
>(function RichSelectOption(props, ref): ReactElement {
  const {
    "data-testid": dataTestId,
    value,
    label,
    disabled = false,
    selected = false,
    children,
  } = props;
  useDisableKey(value, disabled);
  useSelectKey(value, selected);
  return (
    <ReactAriaListBoxItem
      ref={ref}
      id={value}
      textValue={label}
      className={styles.listBoxItem}
      data-testid={dataTestId}
    >
      {children}
    </ReactAriaListBoxItem>
  );
});

const RichSelectChip = forwardRef<HTMLDivElement, RichSelectOptionProps>(
  function RichSelectChip(props, ref): ReactElement {
    const { "data-testid": dataTestId, value, label, disabled = false } = props;
    useDisableKey(value, disabled);
    return (
      <RichSelectOption
        ref={ref}
        label={label}
        value={value}
        disabled={disabled}
        data-testid={dataTestId}
      >
        {({ isSelected, isFocusVisible, isDisabled }) => (
          <Chip
            text={label}
            selected={isSelected}
            disabled={isDisabled}
            dangerouslyForceFocusStyles={isFocusVisible}
            onChange={() => undefined}
          />
        )}
      </RichSelectOption>
    );
  },
);

export default RichSelectChip;
