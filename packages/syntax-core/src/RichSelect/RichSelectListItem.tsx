import React, {
  forwardRef,
  type ReactElement,
  type ForwardedRef,
  createContext,
} from "react";
import {
  ListBoxItem as ReactAriaListBoxItem,
  type ListBoxItemRenderProps,
} from "react-aria-components";
import styles from "./RichSelect.module.css";
import { useDisableKey, useSelectKey } from "./DisabledKeysProvider";
import { type OptionAria } from "react-aria";

export type RichSelectListItemProps = {
  "data-testid"?: string;
  value: string;
  label: string;
  name?: string;
  disabled?: boolean;
  selected?: boolean;
  /** The children of the component. A function may be provided to alter the children based on component state. */
  children?:
    | string
    | ReactElement
    | ((values: ListBoxItemRenderProps) => ReactElement);
};

// TODO: rename to RichSelectItem (whole file)
export const RichSelectItemContext = createContext<OptionAria | null>(null);

export default forwardRef<HTMLDivElement, RichSelectListItemProps>(
  function RichSelectListItem(
    props: RichSelectListItemProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): ReactElement {
    const {
      "data-testid": dataTestId,
      value,
      label,
      disabled = false,
      selected = false,
      children,
    } = props;
    useDisableKey(value, disabled);
    useSelectKey(value, selected); // wait, does/did this work?
    return (
      <ReactAriaListBoxItem
        id={value}
        textValue={label}
        className={styles.listBoxItem}
        data-testid={dataTestId}
        ref={ref}
      >
        {children}
      </ReactAriaListBoxItem>
    );
  },
);
