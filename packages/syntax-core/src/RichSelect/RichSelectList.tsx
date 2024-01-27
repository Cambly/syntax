/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * Okay, got it.  Here's the breakdown:
 * - RichSelectBox - non-dropdown box with selectable items
 *  - (maybe RichSelectOptGroup?)
 *  - Props:
 *   - multiple
 *   - onChange
 *   - size
 *   - title (or maybe force RichOptGroup usage for this?)
 *   - direction?: "column" | "row"
 *   - ...
 *  - Attached Components:
 *    - RichSelectBox.Chip -> RichSelectChip
 *    - RichSelectBox.Option -> RichSelectOption
 *    - RichSelectBox.Chec../SelectList/SelectOptionlectCheckbox
 *    - RichSelectBox.Radio -> RichSelectRadio (this one might be harder, maybe only in single select mode?)
 *    - RichSelectBox.Input -> RichSelectInput (this + text area would be interesting use case: combine checkbox with input, when selected, the key is the inputted value?)
 *
 * - RichOptGroup - matches the ReactAriaSection component
 *  - This would be to get the title displayed in there, compatible with RichSelect ...
 *  - Props:
 *
 *  From there can build up and reuse them to make:
 *  - RichSelectList - dropdown box with selectable items
 *   - Attached Components:
 *    - RichSelectList.Chip -> RichSelectChip
 *    - ...
 *
 */
import React, {
  type ReactElement,
  useId,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";
import classNames from "classnames";
import {
  ColorBaseDestructive700,
  ColorBaseGray800,
} from "@cambly/syntax-design-tokens";
import Typography from "../Typography/Typography";
import useIsHydrated from "../useIsHydrated";
import Popover, { AriaPopover } from "../Popover/Popover";
import { type Node, type Collection } from "@react-types/shared";

import {
  CheckboxGroup as ReactAriaCheckboxGroup,
  RadioGroup as ReactAriaRadioGroup,
  Group as ReactAriaGroup,
  ListBox as ReactAriaListBox,
  Select as ReactAriaSelect,
  SelectValue as ReactAriaSelectValue,
  ListBoxItem as ReactAriaListBoxItem,
  Menu as ReactAriaMenu,
  MenuItem as ReactAriaMenuItem,
  MenuTrigger as ReactAriaMenuTrigger,
  Section as ReactAriaSection,
  TagGroup as ReactAriaTagGroup,
  TagList as ReactAriaTagList,
  Dialog as ReactAriaDialog,
  Tag as ReactAriaTag,
  Label as ReactAriaLabel,
  GridList as ReactAriaGridList,
  GridListItem as ReactAriaGridListItem,
  ComboBox as ReactAriaComboBox,
  Input as ReactAriaInput,
  Button as ReactAriaButton,
  Popover as ReactAriaPopover,
  Tab as ReactAriaTab,
  Text as ReactAriaText,
  Header as ReactAriaHeader,
  Provider as ReactAriaProvider,
  ListStateContext,
  ListBoxContext as ReactAriaListBoxContext,
  useContextProps,
  type Selection,
  SelectContext,
  SelectStateContext,
  type MenuTriggerProps as ReactAriaMenuTriggerProps,
  MenuContext,
  MenuStateContext,
  type ListBoxProps as ReactAriaListBoxProps,
  composeRenderProps,
  ListBoxItemRenderProps,
  ListBoxContext,
} from "react-aria-components";
import { useListState } from "react-stately";
import { type PartialNode } from "@react-stately/collections";
import { useCollection } from "@react-stately/collections";
import { ListCollection } from "@react-stately/list";
import {
  HiddenSelect as ReactAriaHiddenSelect,
  useComboBox,
  useListBox,
  useSelect,
} from "react-aria";

import { mergeProps } from "react-aria";

import RichSelectChip from "./RichSelectChip";
import RichSelectOptGroup from "./RichSelectOptGroup";
import RichSelectBox, {
  AriaListBox,
  AriaListBoxContext,
} from "./RichSelectBox";
import { dialogClassnames } from "../Dialog/Dialog";
import focusStyles from "../Focus.module.css";
import styles from "../SelectList/SelectList.module.css";
import DisabledKeysProvider, {
  useDisabledKeys,
  useSelectedKeys,
} from "./DisabledKeysProvider";
import RichSelectRadioButton from "./RichSelectRadioButton";
import { type forwardRefType } from "../react-aria-utils/ForwardRefType";
import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";

const iconSize = {
  sm: 20,
  md: 24,
  lg: 24,
} as const;

// TODO: make this RichSelectTrigger, and have it get access to the collection
// that this RichSelect is using (through custom RichSelectContext)
// can then use that to render a <RichSelectValue /> component

const RichSelectTrigger = React.forwardRef<
  HTMLButtonElement,
  ReactAriaMenuTriggerProps & {
    size: "sm" | "md" | "lg";
  }
>(function RichSelectTrigger({ children, size, ...rest }, ref) {
  const menuCtx = useContext(MenuContext);
  const menuStateCtx = useContext(MenuStateContext);
  const listBoxCtx = useContext(ListBoxContext);
  const listStateCtx = useContext(ListStateContext);
  // console.log("RichSelectTrigger ctxs", {
  //   menuCtx,
  //   menuStateCtx,
  //   listBoxCtx,
  //   listStateCtx,
  // });
  return (
    <ReactAriaButton
      {...rest}
      ref={ref}
      className={({ isFocused, isFocusVisible }) =>
        classNames(styles.selectBox, styles[size], {
          // [styles.unselected]: !selectedValue && !errorText,
          // [styles.selected]: selectedValue && !errorText,
          // [styles.selectError]: errorText,
          [focusStyles.accessibilityOutlineFocus]: isFocused && isFocusVisible, // for focus keyboard
          [styles.selectMouseFocusStyling]: isFocused && !isFocusVisible, // for focus mouse
        })
      }
    >
      {children}
    </ReactAriaButton>
  );
});

// TODO: use ReactAriaHiddenSelect + need to get list state context to access collection

export type RichSelectListProps = {
  /** One or more RichSelectList.<Chip|RadioButton|OptGroup|...> components. */
  // children: ReactNode;
  children: ReactElement | ReactElement[];
  /** Test id for the select element */
  "data-testid"?: string;
  /**
   * Disables the select dropdown entirely
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * Description text shown below select box
   */
  description?: string;
  /**
   * Callback to be called when select is clicked
   */
  onClick?: React.MouseEventHandler<HTMLSelectElement>;
  /**
   * Text shown below select box if there is an input error.
   */
  errorText?: string;
  /**
   * Text shown below select box
   */
  helperText?: string;
  /**
   * Id of the select element
   */
  id?: string;
  /**
   * Text shown above select box
   */
  label: string; // also show this inside the popover?
  /**
   * Html name attribute for the select element
   */
  name?: string;
  /**
   * Enables multiple selection (multiselect)
   */
  multiple?: boolean;
  /**
   * The callback to be called when an option is selected
   */
  // onChange: React.ChangeEventHandler<HTMLSelectElement>;
  /**
   * Text showing in select box if no option has been chosen.
   * We should always have a placeholder unless there is a default option selected
   */
  placeholderText?: string;
  /**
   * Value of the currently selected option
   */
  selectedValue?: string;
  /**
   * (Multiselect only) Value of the currently selected options
   */
  selectedValues?: string[] | Set<string>;
  /**
   * Size of the select box
   * * `sm`: 32px
   * * `md`: 40px
   * * `lg`: 48px
   *
   * @defaultValue "md"
   */
  size?: "sm" | "md" | "lg";

  // DIFF THAN SELECTLIST
  autoCommit?: boolean;
  // onChange: React.ChangeEventHandler<HTMLSelectElement>;
  onChange: (selectedValues: string[] | "all") => void;
  // onChange: (selectedValues?: Set<string> | "all") => void;
  defaultSelectedValues?: string[] | "all";
  primaryButtonText?: string;
  primaryButtonAccessibilityLabel?: string;
  secondaryButtonText?: string;
  secondaryButtonAccessibilityLabel?: string;
  // selectedValues?: string[] | Set<string>;
  // might be necesasry for HiddenSelect
  form?: string;
};

function hasTypeItem<T extends object>(item: Node<T>): boolean {
  return item.type === "item";
}

type KeysWithCollection<T extends object> = {
  keys?: "all" | string[];
  collection?: Collection<Node<T>>;
};
function getSelectedItems<T extends object>(opts: KeysWithCollection<T>) {
  const { keys, collection } = opts;
  if (!collection) return [];
  if (!keys) return [];
  if (keys === "all")
    return [...collection].filter((item) => hasTypeItem(item));
  return [...keys].map((key) => collection.getItem(key));
}

function getSelectedTextValue<T extends object>(
  opts: KeysWithCollection<T> & { placeholderText?: string },
): string {
  const { keys, collection } = opts;
  if (!collection) return opts.placeholderText ?? "";
  if (keys === "all") return "all";
  const items = getSelectedItems({ keys, collection });
  if (!items.length) return opts.placeholderText ?? "";
  return items.map((n) => n?.textValue).join(", ");
}

// reconstructs the plain object tree view from the recursive collection map
function useCollectionItems<T extends object>(collection: Collection<Node<T>>) {
  return useMemo(() => {
    return collection;
  }, [collection]);
}

function isString(val: unknown): val is string {
  return typeof val === "string";
}

function isEqualSelection(set1?: Selection, set2?: Selection): boolean {
  if (set1 === set2) return true;
  if (!set1 && !set2) return true;
  if (!set1 || !set2) return false;
  if (isString(set1)) return set1 === set2;
  if (isString(set2)) return false;
  if (set1.size !== set2.size) return false;
  for (const item of set1) {
    if (!set2.has(item)) return false;
  }
  return true;
}

/**
 * [RichSelectList](https://cambly-syntax.vercel.app/?path=/docs/components-selectlist--docs) is a dropdown menu that allows users to select one option from a list.
 */
function RichSelectListInner(props: RichSelectListProps): ReactElement {
  const {
    autoCommit,
    children,
    "data-testid": dataTestId,
    description,
    disabled: disabledProp = false,
    errorText,
    helperText,
    id,
    label = "myLabel",
    name,
    multiple = false,
    onChange,
    onClick,
    placeholderText,
    primaryButtonText = "Save",
    primaryButtonAccessibilityLabel = "Save",
    secondaryButtonText = "Clear",
    secondaryButtonAccessibilityLabel = "Clear",
    selectedValue = "",
    selectedValues: selectedValuesProp,
    defaultSelectedValues: defaultSelectedKeys,
    size = "md",
  } = props;
  const reactId = useId();
  const isHydrated = useIsHydrated();
  const disabled = !isHydrated || disabledProp;
  const selectId = id ?? reactId;

  {
    /* Okay, the idea here is that we wrap popover around the trigger
          Trigger gets the focus styles, and the popover gets the focus styles.
          when triggered dialog will open and elements are tabbable.
          onChange handler is called when selected value is changed.
          Any Interactible Syntax components are/should be selectable.
            (wire in react-aria hooks)
          After rendering wrapper, this component renders:
          Context provider to wire in onChange in children to localstate in this component.
          LocalState is made external when state is saved.
          autosave option updates external state on child change.
          autosave="false" displays button group to save / cancel
          popover content needs to render it's own title?  .... or not?

          (idea: useImperativeRef on Popover/ModalDialog/etc to expose open/close methods on popover)

          *NOTE*: need to wire in aria-labels correctly
          https://react-spectrum.adobe.com/react-aria/useLabel.html

          also: CheckboxGroup vs. RadioGroup for `multiple?: boolean` prop


          20240118:
          - `multiple` prop: most(all we support?) browsers make it a static box
            instead of a dropdown.  autoscrolling (ithink)
        */
  }

  const disabledKeys = useDisabledKeys();

  const [selectedKeys, setSelectedKeys] = useState<Selection | undefined>(
    new Set(defaultSelectedKeys),
  );
  // const [selected, setSelected] = useState<Selection>();
  // const [changed, setChanged] = useState<"all" | string[]>();
  // const [committed, setCommitted] = useState<"all" | string[]>();

  const [changed, setChanged] = useState<Selection | undefined>(selectedKeys);
  const [committed, setCommitted] = useState<Selection | undefined>(
    selectedKeys,
  );

  const changedRef = React.useRef<Selection | undefined>(selectedKeys);
  const committedRef = React.useRef<Selection | undefined>(selectedKeys);

  const commit = useCallback(() => {
    const _changed = changedRef.current;
    if (isEqualSelection(changedRef.current, committedRef.current)) return;
    changedRef.current = undefined;
    setCommitted(_changed);
  }, []);
  const clear = useCallback(() => {
    setSelectedKeys(new Set());
    setChanged(undefined);
  }, []);

  useEffect(() => {
    if (isEqualSelection(changedRef.current, selectedKeys)) return;
    changedRef.current = selectedKeys;
    if (autoCommit) return commit();
    setChanged((curr) => {
      if (selectedKeys === curr) return curr;
      return selectedKeys;
    });
  }, [autoCommit, commit, selectedKeys]);
  useEffect(() => {
    if (!autoCommit) return;
    commit();
  }, [autoCommit, commit, changed]);
  useEffect(() => {
    if (committed === changedRef.current) return;
    // check if new value to commit is shallow equal to the current committed value
    if (isEqualSelection(committed, committedRef.current)) return;
    committedRef.current = committed;
    if (!committed || isString(committed)) return onChange(committed);
    onChange([...committed].map(String));
  }, [committed, onChange]);

  // construct collection from composed children tree
  // TODO: okay at first thought it was necessary to avoid useListState + useListStateContext
  //   but now think i understand the ComboBox/Select trick of rendering
  //   two list boxes (I think one is in a portal?), and putting list state in context
  //   that would allow ListBox to build the collection in that portal,
  //   leave open the "items" prop route for this component if we need a.la. Ken's
  //   rational proposal, and _should_ allow to drop the getCollectionNode hackey method
  //   Huge benefits all around, might need to figure out the portal first, unsure
  //   if the portal acces is unified and/or even exposed from library

  // construct collection from composed children tree
  // const collection = useCollection(
  //   props,
  //   useCallback((nodes) => new ListCollection(nodes), []),
  //   useMemo(() => ({ suppressTextValueWarning: false }), []),
  // );

  const [collection, setCollection] = useState<Collection<Node<object>>>();

  // const selectedItems = getSelectedItems({ keys: committed, collection });
  const selectedTextValue = getSelectedTextValue({
    keys: committed,
    collection,
    placeholderText,
  });

  // const items = useCollectionItems(collection);

  // for (const item of collection) {
  //   console.log("item", item);
  // }

  // console.log("chidlren", {
  //   collection,
  //   selectedItems,
  //   selectedKeys,
  //   selected,
  //   changed,
  //   items,
  //   first: collection.getItem(collection.getFirstKey()),
  // });

  // const listState = useListState({
  //   children: children,
  //   // "aria-label": "TODO HOOK UP REAL ONE THIS IS TO SUPPRESS WARNING WHILE DEV",
  //   // autoFocus,
  //   // items={collection}
  //   selectionMode: multiple ? "multiple" : "single", // TODO: !multiple -> "single"?
  //   selectionBehavior: multiple ? "toggle" : "replace",
  //   // shouldFocusWrap,
  //   // orientation="horizontal"
  //   selectedKeys: selectedValuesProp ?? selectedKeys,
  //   // onSelectionChange={setSelected}
  //   onSelectionChange: (curr) => {
  //     console.log("onSelectionChange", curr);
  //     setSelectedKeys(curr);
  //   },
  //   disabledKeys: disabledKeys,
  // });

  return (
    <>
      <ReactAriaProvider
        values={[[AriaListBoxContext, { onChangeCollection: setCollection }]]}
      >
        <div
          className={classNames(styles.selectContainer, {
            [styles.opacityOverlay]: disabled,
          })}
        >
          <ReactAriaLabel
            className={classNames(
              styles.selectContainer,
              styles.outerTextContainer,
            )}
          >
            {label && (
              <Typography size={100} color="gray700">
                {label}
              </Typography>
            )}
            <ReactAriaMenuTrigger>
              {/* <RichSelectTrigger size="sm">Click me</RichSelectTrigger> */}
              {/* <ReactAriaInput placeholder="Select one placeholder prop" readOnly /> */}
              <div className={styles.selectWrapper}>
                <ReactAriaButton
                  data-testid={dataTestId}
                  // tabIndex={0} // TODO: use react-aria hooks for this?
                  className={({ isFocused, isFocusVisible }) =>
                    classNames(styles.selectBox, styles[size], {
                      [styles.unselected]: !selectedValue && !errorText,
                      [styles.selected]: selectedValue && !errorText,
                      [styles.selectError]: errorText,
                      [focusStyles.accessibilityOutlineFocus]:
                        isFocused && isFocusVisible, // for focus keyboard
                      [styles.selectMouseFocusStyling]:
                        isFocused && !isFocusVisible, // for focus mouse
                    })
                  }
                >
                  {/* TODO: abstract this */}
                  {selectedTextValue}
                  {/* {TODO revire selectedTextValue} */}
                </ReactAriaButton>
                <div className={styles.arrowIcon}>
                  <svg
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width={iconSize[size]}
                  >
                    <path
                      fill={
                        errorText ? ColorBaseDestructive700 : ColorBaseGray800
                      }
                      d="M15.88 9.29 12 13.17 8.12 9.29a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"
                    />
                  </svg>
                </div>
              </div>
              <AriaPopover
                className={classNames(dialogClassnames({ size: "md" }))}
              >
                <AriaListBox
                  // id={selectId}
                  aria-label="TODO HOOK UP REAL ONE THIS IS TO SUPPRESS WARNING WHILE DEV"
                  autoFocus
                  // items={collection}
                  selectionMode={multiple ? "multiple" : "single"} // TODO: !multiple -> "single"?
                  selectionBehavior={multiple ? "toggle" : "replace"}
                  shouldFocusWrap
                  // orientation="horizontal"
                  selectedKeys={selectedValuesProp || selectedKeys}
                  // onSelectionChange={setSelected}
                  onSelectionChange={(curr) => {
                    console.log("onSelectionChange", curr);
                    setSelectedKeys(curr);
                  }}
                  disabledKeys={disabledKeys}
                  // className={classNames(dialogClassnames({ size: "md" }))}
                >
                  {children}
                </AriaListBox>
                {/* TODO: ACCESSIBILITY LABELS + PROPS FOR EACH BUTTON */}
                <ButtonGroup orientation="horizontal">
                  <Button
                    onClick={clear}
                    color={"secondary"}
                    text={secondaryButtonText}
                    accessibilityLabel={secondaryButtonAccessibilityLabel}
                    data-testid={
                      dataTestId ? `${dataTestId}-secondary-button` : undefined
                    }
                  />
                  <Button
                    onClick={commit}
                    text={primaryButtonText}
                    accessibilityLabel={primaryButtonAccessibilityLabel}
                    color="primary"
                    data-testid={
                      dataTestId ? `${dataTestId}-primary-button` : undefined
                    }
                  />
                </ButtonGroup>
              </AriaPopover>
            </ReactAriaMenuTrigger>
          </ReactAriaLabel>
          {(helperText || errorText) && (
            <div className={styles.outerTextContainer}>
              <Typography
                size={100}
                color={errorText ? "destructive-primary" : "gray700"}
              >
                {errorText ? errorText : helperText}
              </Typography>
            </div>
          )}
        </div>
      </ReactAriaProvider>
    </>
  );
}

function RichSelectList(props: RichSelectListProps): ReactElement {
  return (
    <DisabledKeysProvider isolate>
      <RichSelectListInner {...props} />
    </DisabledKeysProvider>
  );
}

/**
 * *NOTE*:
 *
 * In order to support the react-aria CollectionBuilder API, we need to
 * add a getCollectionNode method to each component that RichSelect* supports.
 * These are how React-Spectrum integrates itself with the colleections API.
 *
 * Doing this allows the components that define Component.getCollectionNode to
 * be used as children of a component that implements CollectionBuilder.
 *
 * react-aria-components ListBox is the main one that allows for multiple selection.
 * in order to build MultiSelect / RichSelectLists that render syntax components,
 * we have to attach these methods.
 *
 * We need to do this in order to match selected keys to prettier text/label values
 * in order to render text of the labels for the selected values in the list.
 */
export default Object.assign(RichSelectList, {
  OptGroup: RichSelectOptGroup,
  Chip: RichSelectChip,
  RadioButton: RichSelectRadioButton,
});
