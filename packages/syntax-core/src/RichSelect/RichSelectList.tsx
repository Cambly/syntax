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
} from "react-aria-components";

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
import RichSelectBox from "./RichSelectBox";
import { dialogClassnames } from "../Dialog/Dialog";
import focusStyles from "../Focus.module.css";
import styles from "../SelectList/SelectList.module.css";
import DisabledKeysProvider, {
  useDisabledKeys,
  useSelectedKeys,
} from "./DisabledKeysProvider";
import RichSelectRadioButton from "./RichSelectRadioButton";
import { type forwardRefType } from "../react-aria-utils/ForwardRefType";

const iconSize = {
  sm: 20,
  md: 24,
  lg: 24,
} as const;

// TODO: make this RichSelectTrigger, and have it get access to the collection
// that this RichSelect is using (through custom RichSelectContext)
// can then use that to render a <RichSelectValue /> component

// const MultipleSelectTrigger = React.forwardRef<
//   HTMLButtonElement,
//   ReactAriaMenuTriggerProps & {
//     size: "sm" | "md" | "lg";
//   }
// >(function MultipleSelectTrigger({ children, size, ...rest }, ref) {
//   const menuCtx = useContext(MenuContext);
//   const menuStateCtx = useContext(MenuStateContext);
//   const listBoxCtx = useContext(ListBoxContext);
//   const listBoxStateCtx = useContext(ListBoxContext);
//   const listStateCtx = useContext(ListStateContext);
//   console.log("MultipleSelectTrigger ctxs", {
//     menuCtx,
//     menuStateCtx,
//     listBoxCtx,
//     listBoxStateCtx,
//     listStateCtx,
//   });
//   return (
//     <ReactAriaButton
//       {...rest}
//       ref={ref}
//       className={({ isFocused, isFocusVisible }) =>
//         classNames(styles.selectBox, styles[size], {
//           // [styles.unselected]: !selectedValue && !errorText,
//           // [styles.selected]: selectedValue && !errorText,
//           // [styles.selectError]: errorText,
//           [focusStyles.accessibilityOutlineFocus]: isFocused && isFocusVisible, // for focus keyboard
//           [styles.selectMouseFocusStyling]: isFocused && !isFocusVisible, // for focus mouse
//         })
//       }
//     >
//       {children}
//     </ReactAriaButton>
//   );
// });

// TODO: use ReactAriaHiddenSelect + need to get list state context to access collection

type RichSelectListProps<IsMultiselect extends boolean> = {
  /**
   * One or more RichSelectList.Option components.
   */
  // children: ReactNode;
  children: ReactElement | ReactElement[];
  /**
   * Test id for the select element
   */
  "data-testid"?: string;
  /**
   * true if the select dropdown is disabled
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
  multiple?: IsMultiselect;
  /**
   * The callback to be called when an option is selected
   */
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
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
  selectValues?: string[];
  // might be necesasry for HiddenSelect
  form?: string;
};

function hasTypeItem<T extends object>(item: Node<T>): boolean {
  return item.type === "item";
}

type KeysWithCollection<T extends object> = {
  keys?: Selection;
  collection: Collection<Node<T>>;
};
function getSelectedItems<T extends object>(opts: KeysWithCollection<T>) {
  const { keys, collection } = opts;
  if (!keys) return [];
  if (keys === "all")
    return [...collection].filter((item) => hasTypeItem(item));
  return [...keys].map((key) => collection.getItem(key));
}

function getSelectedTextValue<T extends object>(
  opts: KeysWithCollection<T> & { placeholderText?: string },
): string {
  const { keys, collection } = opts;
  if (keys === "all") return "all";
  const items = getSelectedItems({ keys, collection });
  if (!items.length) return opts.placeholderText ?? "";
  return items.join(", ");
}

function walkCollection<T>(node: Node<T>): PartialNode<T> {
  if (node.type === "section") {
    return {
      ...node,
      items: [...node.childNodes].map(walkCollection),
    };
  }
  return node;
}
// reconstructs the plain object tree view from the recursive collection map
function useCollectionItems<T extends object>(collection: Collection<Node<T>>) {
  return useMemo(() => {
    return collection;
  }, [collection]);
}

/**
 * [RichSelectList](https://cambly-syntax.vercel.app/?path=/docs/components-selectlist--docs) is a dropdown menu that allows users to select one option from a list.
 */
function RichSelectListInner<IsMultiple extends boolean>(
  props: RichSelectListProps<IsMultiple>,
): ReactElement {
  const {
    children,
    "data-testid": dataTestId,
    description,
    disabled: disabledProp = false,
    errorText,
    helperText,
    id,
    label = "myLabel",
    name,
    multiple = true,
    onChange,
    onClick,
    placeholderText,
    selectedValue = "",
    selectedValues: selectedKeys,
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
  // const [selectedKeys, setSelectedKeys] = useState<Selection>();
  // useEffect(
  //   () => selectedValues && setSelectedKeys(selectedValues),
  //   [selectedValues],
  // );
  // const selectedKeys = useSelectedKeys(); // unsure if the selected keys make it down to the listbox item (for rendering color as selected properly)
  // const [selected, setSelected] = React.useState<Selection>(new Set());
  // // this likely needs to update?
  // useEffect(
  //   () =>
  //     setSelected((curr) => {
  //       return new Set([...curr, ...selectedKeys]);
  //     }),
  //   [],
  // );

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
  const collection = useCollection(
    props,
    useCallback((nodes) => new ListCollection(nodes), []),
    useMemo(() => ({ suppressTextValueWarning: false }), []),
  );

  const selectedItems = getSelectedItems({ keys: selectedKeys, collection });
  const selectedTextValue = getSelectedTextValue({
    keys: selectedKeys,
    collection,
    placeholderText,
  });

  const items = useCollectionItems(collection);

  for (const item of collection) {
    console.log("item", item);
  }

  console.log("chidlren", {
    collection,
    selectedItems,
    selectedKeys,
    items,
    first: collection.getItem(collection.getFirstKey()),
  });
  return (
    <>
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
            {/* <ReactAriaInput placeholder="Select one placeholder prop" readOnly /> */}
            <div className={styles.selectWrapper}>
              <ReactAriaButton
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
            <AriaPopover>
              <ReactAriaListBox
                id={selectId}
                autoFocus
                // items={collection}
                selectionMode="multiple" // TODO: !multiple -> "single"?
                selectionBehavior={multiple ? "toggle" : "replace"}
                shouldFocusWrap
                orientation="horizontal"
                selectedKeys={selectedKeys}
                onSelectionChange={(keys, ...args) => {
                  console.log(
                    "RichSelectBoxInner ReactAriaListBox onSelectionChange keys",
                    keys,
                  );
                  setSelected(keys);
                }}
                disabledKeys={disabledKeys}
                className={classNames(dialogClassnames({ size: "md" }))}
              >
                {children}
              </ReactAriaListBox>
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
    </>
  );
}

function RichSelectList<IsMultiple extends boolean>(
  props: RichSelectListProps<IsMultiple>,
): ReactElement {
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
