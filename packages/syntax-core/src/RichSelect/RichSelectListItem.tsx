import React, { forwardRef, type ReactNode, type ReactElement } from "react";
import {
  ListBoxItem as ReactAriaListBoxItem,
  type ListBoxItemRenderProps,
} from "react-aria-components";
import styles from "./RichSelect.module.css";
import { useDisableKey, useSelectKey } from "./DisabledKeysProvider";

export type RichSelectListItemProps = {
  "data-testid"?: string;
  value: string;
  label: string;
  name?: string;
  disabled?: boolean;
  selected?: boolean;
  /** The children of the component. A function may be provided to alter the children based on component state. */
  children?: ReactNode | ((values: ListBoxItemRenderProps) => ReactNode);
};

const RichSelectListItem = forwardRef<
  HTMLDivElement,
  RichSelectListItemProps & {
    /** The children of the component. A function may be provided to alter the children based on component state. */
    children?: ReactNode | ((values: ListBoxItemRenderProps) => ReactNode);
  }
>(function RichSelectListItem(props, ref): ReactElement {
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

export default RichSelectListItem;
