import React, {
  type ForwardedRef,
  forwardRef,
  type ReactElement,
  useRef,
  useContext,
  useId,
  useState,
  type ReactNode,
  useCallback,
  createContext,
  useEffect,
  useMemo,
} from "react";

import {
  ListBox as ReactAriaListBox,
  MenuTrigger as ReactAriaMenuTrigger,
  Label as ReactAriaLabel,
  Button as ReactAriaButton,
  useContextProps,
  ListBoxContext,
  ListStateContext,
  Provider,
  Collection,
  type SectionProps,
  Section,
  Header,
} from "react-aria-components";
import RichSelectChip from "./RichSelectChip";
import RichSelectOptGroup from "./RichSelectOptGroup";
import DisabledKeysProvider, {
  useDisabledKeys,
  useSelectedKeys,
} from "./DisabledKeysProvider";
import {
  type AriaListBoxSectionProps,
  type AriaListBoxProps,
  useHover,
  type Key,
  FocusScope,
  ListKeyboardDelegate,
  useLocale,
  useCollator,
} from "react-aria";
import { type forwardRefType } from "../react-aria-utils/ForwardRefType";
import {
  Item,
  type ListState,
  type Node,
  useListState,
  type Selection,
} from "react-stately";
// import { Selection } from "@react-stately/selection";
import { useControlledState } from "@react-stately/utils";
import { mergeProps, useFocusRing, useListBox, useOption } from "react-aria";
import { filterDOMProps, useObjectRef } from "@react-aria/utils";
import { RichSelectItemContext } from "./RichSelectListItem";
import { useListBoxSection } from "react-aria";

import classNames from "classnames";
import {
  ColorBaseDestructive700,
  ColorBaseGray800,
} from "@cambly/syntax-design-tokens";
import Typography from "../Typography/Typography";
import useIsHydrated from "../useIsHydrated";
import { AriaPopover } from "../Popover/Popover";

import { dialogClassnames } from "../Dialog/Dialog";
import focusStyles from "../Focus.module.css";
import styles from "../SelectList/SelectList.module.css";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Button from "../Button/Button";
import RichSelectRadioButton from "./RichSelectRadioButton";

type AriaListBoxContextType = {
  // state: ListState<object>;
  onChangeCollection?: (collection: typeof Collection<Node<object>>) => void;
  // TODO: pass thes on to items through separate context?
  disableKey?: (key: Key) => void;
  selectKey?: (key: Key) => void;
};
export const AriaListBoxContext = createContext<AriaListBoxContextType | null>(
  null,
);

function AriaOption<T extends object>({
  item,
  state,
}: {
  item: Node<T>;
  state: ListState<T>;
}) {
  // Get props for the option element
  const ref = React.useRef(null);
  const { optionProps, labelProps, descriptionProps, ...states } = useOption(
    { key: item.key },
    state,
    ref,
  );

  const { disableKey, selectKey } = useContext(AriaListBoxContext) ?? {};

  // Determine whether we should show a keyboard
  // focus ring for accessibility
  const { isFocusVisible, focusProps } = useFocusRing();

  const { collection } = state;
  const items = state.collection.getChildren?.(item.key);
  // console.log("AriaOption item", { item, items: [...items], state, states });
  // console.log("AriaOption item", { item, state, states });

  // return (
  //   <Provider values={[[RichSelectItemContext, item.props]]}>
  //     {item.rendered}
  //   </Provider>
  // );

  const { hoverProps, isHovered } = useHover({
    isDisabled: !states.allowsSelection && !states.hasAction,
  });

  const { disabled, selected, checked } = item.props;

  useEffect(() => {
    // if (!disabled) return;
    disableKey?.(item.key, disabled);
  }, [disableKey, disabled, item.key]);

  useEffect(() => {
    // if (!selected && !checked) return;
    selectKey?.(item.key, selected || checked);
  }, [selectKey, selected, checked, item.key]);

  useEffect(() => {
    if (!item.textValue) {
      // TODO: PATCH UP WARNING MESSAGE
      // eslint-disable-next-line no-console -- DX helper warning
      console.warn(
        "A `textValue` prop is required for <ListBoxItem> elements with non-plain text children in order to support accessibility features such as type to select.",
      );
    }
  }, [item.textValue]);

  return (
    <div
      {...mergeProps(optionProps, hoverProps, focusProps)}
      ref={ref}
      data-focus-visible={isFocusVisible}
    >
      {/* <span>{item.textValue}</span> */}
      <Provider
        values={[
          [
            RichSelectItemContext,
            {
              ...item.props,
              ...states,
            },
          ],
        ]}
      >
        {item.rendered}
      </Provider>
      {/* {item.rendered} */}
      {/* {item.renderer && item.renderer(item.props)} */}
      {/* {collection} */}
    </div>
  );
}

// function Option({ item, state }) {
//   let ref = React.useRef(null);
//   let { optionProps, labelProps, descriptionProps } = useOption(
//     { key: item.key },
//     state,
//     ref
//   );
//   let { isFocusVisible, focusProps } = useFocusRing();

//   // Pull out the two expected children. We will clone them
//   // and add the necessary props for accessibility.
//   let [title, description] = item.rendered;

//   return (
//     <li
//       {...mergeProps(optionProps, focusProps)}
//       ref={ref}
//       data-focus-visible={isFocusVisible}
//     >
//       {React.cloneElement(title, labelProps)}
//       {React.cloneElement(description, descriptionProps)}
//     </li>
//   );
// }

// <ListBox label="Alignment" selectionMode="single">
//   <Item>Left</Item>
//   <Item>Middle</Item>
//   <Item>Right</Item>
// </ListBox>

type _AriaListBoxSectionProps<T> = AriaListBoxSectionProps & {
  section: Node<T>;
  state: ListState<T>;
};

function AriaListBoxSection<T extends object>(
  props: _AriaListBoxSectionProps<T>,
) {
  // const state = useContext(ListStateContext);
  const { section, state } = props;
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  // const children = useCachedChildren({
  //   items: state.collection.getChildren!(section.key),
  //   children: (item) => {
  //     switch (item.type) {
  //       case "header": {
  //         return (
  //           <SectionHeader
  //             item={item}
  //             headingProps={headingProps}
  //             headingRef={headingRef}
  //           />
  //         );
  //       }
  //       case "item":
  //         return <Option item={item} />;
  //       default:
  //         throw new Error("Unsupported element type in Section: " + item.type);
  //     }
  //   },
  // });
  const { collection } = state;
  const items = state.collection.getChildren?.(section.key);
  // console.log("items", [...items]);

  // If the section is not the first, add a separator element to provide visual separation.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      <section
        {...filterDOMProps(section.props)}
        {...groupProps}
        className={
          // className || section.props?.className || "react-aria-Section"
          section.props?.className || "react-aria-Section"
        }
        style={section.props?.style}
        ref={section.props.ref}
      >
        {section.key !== state.collection.getFirstKey() && (
          <li
            role="presentation"
            style={{
              borderTop: "1px solid gray",
              margin: "2px 5px",
            }}
          />
        )}
        <li {...itemProps}>
          {section.rendered && (
            <span
              {...headingProps}
              style={{
                fontWeight: "bold",
                fontSize: "1.1em",
                padding: "2px 5px",
              }}
            >
              {section.rendered}
            </span>
          )}
          <ul
            {...groupProps}
            style={{
              padding: 0,
              listStyle: "none",
            }}
          >
            {items &&
              [...items].map((node) => (
                <AriaOption key={node.key} item={node} state={state} />
              ))}
          </ul>
        </li>
      </section>
    </>
  );
}

export type __ListBoxSectionProps<T> = {
  title?: string;
} & SectionProps<T>;

export function __AriaListBoxSection<T extends object>(
  props: __ListBoxSectionProps<T>,
): ReactElement {
  return (
    <Section className="first:-mt-[5px] after:content-[''] after:block after:h-[5px]">
      <Header className="text-sm font-semibold text-gray-500 dark:text-zinc-300 px-4 py-1 truncate sticky -top-[5px] -mt-px -mx-1 z-10 bg-gray-100/60 dark:bg-zinc-700/60 backdrop-blur-md supports-[-moz-appearance:none]:bg-gray-100 border-y dark:border-y-zinc-700 [&+*]:mt-1">
        {props.title}
      </Header>
      <Collection items={props.items}>{props.children}</Collection>
    </Section>
  );
}

// function AriaListBoxSection<T>({section, className, style}: ListBoxSectionProps<T>) {
//   let state = useContext(ListStateContext);
//   let [headingRef, heading] = useSlot();
//   let {headingProps, groupProps} = useListBoxSection({
//     heading,
//     'aria-label': section.props['aria-label'] ?? undefined
//   });

//   let children = useCachedChildren({
//     items: state.collection.getChildren!(section.key),
//     children: item => {
//       switch (item.type) {
//         case 'header': {
//           return (
//             <SectionHeader
//               item={item}
//               headingProps={headingProps}
//               headingRef={headingRef} />
//           );
//         }
//         case 'item':
//           return <Option item={item} />;
//         default:
//           throw new Error('Unsupported element type in Section: ' + item.type);
//       }
//     }
//   });

//   return (
//     <section
//       {...filterDOMProps(section.props)}
//       {...groupProps}
//       className={className || section.props?.className || 'react-aria-Section'}
//       style={style || section.props?.style}
//       ref={section.props.ref}>
//       {children}
//     </section>
//   );
// }

function AriaListBox<T extends object>(
  props: AriaListBoxProps<T>,
  // ref: ForwardedRef<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>,
  // forwardedRef: ForwardedRef<HTMLElement>,
): ReactElement {
  // Merge the local props and ref with the ones provided via context.
  [props, ref] = useContextProps(props, ref, ListBoxContext);

  const listBoxRef = useObjectRef(ref);

  const {
    children,
    disabledKeys: disabledKeysProp,
    selectedKeys: selectedKeysProp,
    onSelectionChange,
  } = props;

  const [disabledKeysState, setDisabledKeysState] = React.useState<Set<Key>>(
    new Set(disabledKeysProp),
  );
  useEffect(
    () => setDisabledKeysState(new Set(disabledKeysProp)),
    [disabledKeysProp],
  );
  const [selectedKeysState, setSelectedKeysState] = React.useState<
    "all" | Set<Key>
  >(new Set(selectedKeysProp));
  useEffect(
    () => setSelectedKeysState(new Set(selectedKeysProp)),
    [selectedKeysProp],
  );

  // Create state based on the incoming props
  // const localRef = useRef(null);
  // const ref = mergeRefs(forwardedRef, localRef);

  const state = useListState({
    ...props,
    disabledKeys: disabledKeysState,
    selectedKeys: selectedKeysState,
    onSelectionChange(keys) {
      setSelectedKeysState(keys);
      onSelectionChange?.(keys);
    },
  });

  // console.log("AriaListBox state", state);

  const { layout = "stack", orientation = "vertical" } = props;
  const { collection, selectionManager } = state;
  const { direction } = useLocale();
  const { disabledBehavior, disabledKeys } = selectionManager;
  const collator = useCollator({ usage: "search", sensitivity: "base" });
  const keyboardDelegate = useMemo(
    () =>
      // props.keyboardDelegate ||
      new ListKeyboardDelegate({
        collection,
        collator,
        ref: listBoxRef,
        disabledKeys:
          disabledBehavior === "selection" ? new Set<Key>() : disabledKeys,
        layout,
        orientation,
        direction,
      }),
    [
      collection,
      collator,
      listBoxRef,
      disabledBehavior,
      disabledKeys,
      orientation,
      direction,
      // props.keyboardDelegate,
      layout,
    ],
  );

  const { onChangeCollection } = useContext(AriaListBoxContext) ?? {};
  useEffect(
    () => onChangeCollection?.(state.collection),
    [onChangeCollection, state.collection],
  );

  // Get props for the listbox element
  // const ref = React.useRef(null);
  // const ref = useObjectRef(forwardedRef);
  const { listBoxProps, labelProps } = useListBox(
    { ...props, keyboardDelegate },
    state,
    ref,
  );

  const { focusProps, isFocused, isFocusVisible } = useFocusRing();

  return (
    <Provider
      values={[
        [ListStateContext, state],
        [
          AriaListBoxContext,
          {
            disableKey: useCallback((key: Key) => {
              setDisabledKeysState((keys) => new Set(keys.add(key)));
            }, []),
            selectKey: useCallback((key: Key) => {
              setSelectedKeysState((keys) => {
                if (keys === "all") return keys;
                // if (!keys) return new Set([key]);
                return new Set(keys.add(key));
              });
            }, []),
          },
        ],
      ]}
    >
      <FocusScope>
        <div
          ref={listBoxRef}
          {...filterDOMProps(props)}
          {...mergeProps(listBoxProps, focusProps)}
        >
          <div {...labelProps}>{props.label}</div>
          <ul>
            {/* <Collection>{children}</Collection> */}
            {/* {children} */}
            {[...state.collection].map((item) =>
              item.type === "section" ? (
                <AriaListBoxSection
                  key={item.key}
                  section={item}
                  state={state}
                />
              ) : (
                <AriaOption key={item.key} item={item} state={state} />
              ),
            )}
          </ul>
        </div>
      </FocusScope>
    </Provider>
  );

  return (
    <ReactAriaListBox ref={ref} {...props}>
      {children}
    </ReactAriaListBox>
  );
}
const _AriaListBox = (forwardRef as forwardRefType)(AriaListBox);
export { _AriaListBox as AriaListBox };

type RichSelectChild =
  | ReactElement<typeof RichSelectChip>
  | ReactElement<typeof RichSelectRadioButton>
  | ReactElement<typeof RichSelectOptGroup>;

// type RichSelectBoxProps = {
//   "data-testid"?: string;
//   /** Whether the list box should autofocus on render */
//   autoFocus?: boolean;
//   /** Text used as label for list box */
//   label?: string;
//   // children: ReactElement | ReactElement[];
//   children: RichSelectChild | RichSelectChild[];
//   /** Whether multipleSelection is enabled */
//   multiple?: boolean;
//   /** The values of the selected options */
//   selectedValues?: string[];
//   /** Whether the select is disabled */
//   disabled?: boolean;
//   /** Direction of elements in container */
//   orientation?: "horizontal" | "vertical";
// };

export type RichSelectBoxProps = {
  /** Test id for the list box element */
  "data-testid"?: string;
  /** Whether the list box should autofocus + focusWrap and apply gialog styles */
  dialog?: boolean;
  /** One or more RichSelectList.<Chip|RadioButton|OptGroup|...> components. */
  // children: ReactElement | ReactElement[];
  children: RichSelectChild | RichSelectChild[];
  /** Disables the element entirely */
  disabled?: boolean;
  /** Text shown above the box */
  label?: string;
  /** Direction of elements in container */
  orientation?: "horizontal" | "vertical";
  /** Text shown below the box with error styles applied */
  errorText?: string;
  /** Text shown below the box */
  helperText?: string;
  /** Id of the element */
  id?: string;
  /** Html name attribute for the element */
  name?: string;
  /** Enables multiple selection (multiselect) */
  multiple?: boolean;
  /** The callback to be called when options are selected / committed */
  onChange: (selectedValues: string[] | "all") => void;
  /** Value of the currently selected options */
  selectedValues?: string[] | "all";
  // selectedValues?: string[] | "all" | Set<string>;
  /**
   * Size for the options and sections in the list box
   *
   * @defaultValue "md"
   */
  size?: "sm" | "md" | "lg";

  // DIFF THAN SELECTLIST
  autoCommit?: boolean;
  defaultSelectedValues?: string[] | "all";
  primaryButtonText?: string;
  primaryButtonAccessibilityLabel?: string;
  secondaryButtonText?: string;
  secondaryButtonAccessibilityLabel?: string;
  // selectedValues?: string[] | Set<string>;
  // might be necesasry for HiddenSelect
  form?: string;

  // nopeed
  /**
   * Callback to be called when select is clicked
   */
  onClick?: React.MouseEventHandler<HTMLSelectElement>;
};

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

function convertSelection(
  selection: "all" | Iterable<Key> | undefined,
  defaultValue: "all" | Set<Key>,
): "all" | Set<Key> {
  if (!selection) {
    return defaultValue;
  }
  if (selection === "all") return "all";
  return new Set(selection);
}

const RichSelectBoxInner = forwardRef<HTMLDivElement, RichSelectBoxProps>(
  function RichSelectBoxInner(props, ref): ReactElement {
    const {
      autoCommit,
      children,
      "data-testid": dataTestId,
      dialog,
      disabled: disabledProp = false,
      errorText,
      helperText,
      id,
      label = "myLabel",
      name,
      multiple = false,
      onChange,
      orientation = "vertical",
      primaryButtonText = "Save",
      primaryButtonAccessibilityLabel = "Save",
      secondaryButtonText = "Clear",
      secondaryButtonAccessibilityLabel = "Clear",
      selectedValues: selectedValuesProp,
      defaultSelectedValues: defaultSelectedValuesProp,
      size = "md",
    } = props;
    const reactId = useId();
    const isHydrated = useIsHydrated();
    const disabled = !isHydrated || disabledProp;

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

    const disabledKeys = useDisabledKeys();

    /**
     * selectedValues, defaultValues
     * stagedValues
     * committedValues
     */
    // begin rac
    const selectedKeysProp = useMemo(
      () => convertSelection(selectedValuesProp),
      [selectedValuesProp],
    );
    const defaultSelectedKeys = useMemo(
      () => convertSelection(defaultSelectedValuesProp, new Set()),
      [defaultSelectedValuesProp],
    );
    const [selectedKeys, setSelectedKeys] = useControlledState(
      selectedKeysProp,
      defaultSelectedKeys,
      // props.onSelectionChange,
      (value) => {
        // console.log("RichSelectBoxInner change selectedKeys", value);
        if (isEqualSelection(value, selectedKeys)) return;
        if (value === "all") return onChange("all");
        onChange([...value].map(String)); // Notify parent about the changes
      },
    );
    const [stagedKeys, setStagedKeys] = useState<Set<Key> | "all">(
      selectedKeys,
    );

    // TODO: ok, time for the disabled/selected/checked composition contexts next
    const [internalKeys, setInternalKeys] = useState<Set<Key> | undefined>(
      undefined,
    );

    // Merge internalValues with initialSelectedValues
    useEffect(() => {
      if (selectedKeys === "all") return;
      if (internalKeys) {
        setSelectedKeys(
          new Set([...selectedKeys, ...internalKeys].filter(Boolean)),
        ); // filter out duplicates
      }
    }, [internalKeys, selectedKeys, setSelectedKeys]);

    // const stageChanges = (newValues) => {
    //   console.log("_stage changes", newValues);
    //   setStagedKeys(newValues);
    // };

    const saveChanges = () => setSelectedKeys(stagedKeys);
    const clearChanges = () => setStagedKeys(new Set());

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

    return (
      <RichSelectItemContext.Provider
      // value={{
      //   disableKey: useCallback((key: Key) => {
      //     setDisabledKeysState((keys) => new Set(keys.add(key)));
      //   }, []),
      //   selectKey: useCallback((key: Key) => {
      //     setSelectedKeysState((keys) => {
      //       if (keys === "all") return keys;
      //       // if (!keys) return new Set([key]);
      //       return new Set(keys.add(key));
      //     });
      //   }, []),
      // }}
      >
        <ReactAriaListBox
          ref={ref}
          aria-label="TODO HOOK UP REAL ONE THIS IS TO SUPPRESS WARNING WHILE DEV"
          autoFocus={dialog}
          // items={props.items} // TODO: implement Ken's proposal
          selectionMode={multiple ? "multiple" : "single"} // TODO: !multiple -> "single"?
          selectionBehavior={multiple ? "toggle" : "replace"}
          shouldFocusWrap={dialog}
          // orientation="horizontal"
          orientation={orientation}
          selectedKeys={stagedKeys}
          onSelectionChange={setStagedKeys}
          disabledKeys={disabledKeys}
          className={
            // props.className
            dialog ? classNames(dialogClassnames({ size: "md" })) : undefined
          }
        >
          {children}
        </ReactAriaListBox>
        {!autoCommit && (
          <ButtonGroup orientation="horizontal">
            <Button
              onClick={clearChanges}
              color={"secondary"}
              text={secondaryButtonText}
              accessibilityLabel={secondaryButtonAccessibilityLabel}
              data-testid={[dataTestId, "secondary-button"]
                .filter(Boolean)
                .join("-")}
            />
            <Button
              onClick={saveChanges}
              text={primaryButtonText}
              accessibilityLabel={primaryButtonAccessibilityLabel}
              color="primary"
              data-testid={[dataTestId, "primary-button"]
                .filter(Boolean)
                .join("-")}
            />
          </ButtonGroup>
        )}
      </RichSelectItemContext.Provider>
    );
  },
);

const RichSelectBox = forwardRef<HTMLDivElement, RichSelectBoxProps>(
  function RichSelectBox(props, ref): ReactElement {
    return (
      <DisabledKeysProvider>
        <RichSelectBoxInner {...props} ref={ref} />
      </DisabledKeysProvider>
    );
  },
);

export default Object.assign(RichSelectBox, {
  OptGroup: RichSelectOptGroup,
  Chip: RichSelectChip,
  RadioButton: RichSelectRadioButton,
});
