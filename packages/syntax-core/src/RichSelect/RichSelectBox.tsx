import React, {
  type ForwardedRef,
  forwardRef,
  type ReactElement,
  useRef,
  useContext,
  type ReactNode,
  useCallback,
  createContext,
  useEffect,
  useMemo,
} from "react";

import {
  ListBoxContext,
  type ListBoxProps,
  ListBox as ReactAriaListBox,
  useContextProps,
  ListStateContext,
  Provider,
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
  type Collection,
} from "react-stately";
import { type ListCollection } from "@react-stately/list";
import { mergeProps, useFocusRing, useListBox, useOption } from "react-aria";
import { filterDOMProps, mergeRefs, useObjectRef } from "@react-aria/utils";
import { RichSelectItemContext } from "./RichSelectListItem";
import { useListBoxSection } from "react-aria";

type RichSelectChild =
  | ReactElement<typeof RichSelectChip>
  | ReactElement<typeof RichSelectOptGroup>;

type RichSelectBoxProps = {
  "data-testid"?: string;
  label?: string;
  // children: ReactElement | ReactElement[];
  children: RichSelectChild | RichSelectChild[];
  /** Whether multipleSelection is enabled */
  multiple?: boolean;
  /** The values of the selected options */
  selectedValues?: string[];
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select should autofocus on render */
  autoFocus?: boolean;
  /** Direction of elements in container */
  orientation?: "horizontal" | "vertical";
};

type AriaListBoxContextType = {
  // state: ListState<object>;
  onChangeCollection?: (collection: Collection<Node<object>>) => void;
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
    if (!disabled) return;
    disableKey?.(item.key);
  }, [disableKey, disabled, item.key]);

  useEffect(() => {
    if (!selected && !checked) return;
    selectKey?.(item.key);
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

  console.log("AriaListBox", {
    disabledKeysProp,
    disabledKeysState,
    selectedKeysProp,
    selectedKeysState,
  });

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

function Example() {
  const options = [
    { id: 1, name: "Aardvark" },
    { id: 2, name: "Cat" },
    { id: 3, name: "Dog" },
    { id: 4, name: "Kangaroo" },
    { id: 5, name: "Koala" },
    { id: 6, name: "Penguin" },
    { id: 7, name: "Snake" },
    { id: 8, name: "Turtle" },
    { id: 9, name: "Wombat" },
  ];

  return (
    <AriaListBox label="Animals" items={options} selectionMode="single">
      {(item) => <Item>{item.name}</Item>}
    </AriaListBox>
  );
}

const RichSelectBoxInner = forwardRef<HTMLDivElement, RichSelectBoxProps>(
  function RichSelectBoxInner(props, ref): ReactElement {
    const {
      "data-testid": dataTestId,
      label,
      children,
      multiple = true,
      autoFocus = false,
      orientation = "horizontal",
    } = props;
    const disabledKeys = useDisabledKeys();
    const selectedKeys = useSelectedKeys();
    return (
      <ReactAriaListBox
        ref={ref}
        data-testid={dataTestId}
        aria-label="Favorite animal"
        selectionMode={multiple ? "multiple" : "single"}
        // selectionMode={"multiple"}
        selectionBehavior="toggle" // or "replace"
        // onAction={(key) => console.log("onAction key", key)}
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) =>
          console.log("RichSelectBoxInner onSelectionChange keys", keys)
        }
        orientation={orientation}
        disabledKeys={disabledKeys}
        // shouldFocusWrap
        autoFocus={autoFocus}
      >
        {children}
      </ReactAriaListBox>
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
});
