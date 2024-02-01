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
  type ReactNode,
  useId,
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import classNames from "classnames";
import {
  ColorBaseDestructive700,
  ColorBaseGray800,
} from "@cambly/syntax-design-tokens";
import Typography from "../Typography/Typography";
import SelectOption from "../SelectList/SelectOption";
import useFocusVisible from "../useFocusVisible";
import useIsHydrated from "../useIsHydrated";
import Popover, { AriaPopover } from "../Popover/Popover";
import Chip from "../Chip/Chip";
import {
  CheckboxGroup as ReactAriaCheckboxGroup,
  RadioGroup as ReactAriaRadioGroup,
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
} from "react-aria-components";

import { Item, useSelectState, useListState } from "react-stately";
import { HiddenSelect, useListBox, useSelect } from "react-aria";

import type { AriaListBoxProps } from "react-aria";
import { mergeProps, useFocusRing, useOption } from "react-aria";

import RichSelectChip from "./RichSelectChip";
import RichSelectOptGroup from "./RichSelectOptGroup";
import RichSelectBox from "./RichSelectBox";
import Dialog, { dialogClassnames } from "../Dialog/Dialog";
import colorStyles from "../colors/colors.module.css";
import elevationStyles from "../elevation/elevation.module.css";
import focusStyles from "../Focus.module.css";
import paddingStyles from "../Box/padding.module.css";
import roundingStyles from "../rounding.module.css";
import boxStyles from "../Box/Box.module.css";
import styles from "../SelectList/SelectList.module.css";
import DisabledKeysProvider, {
  useDisabledKeys,
  useSelectedKeys,
} from "./DisabledKeysProvider";
import { useResizeObserver } from "@react-aria/utils";

import { type LabelProps } from "react-aria-components";

const iconSize = {
  sm: 20,
  md: 24,
  lg: 24,
} as const;

type RichSelectListProps = {
  /**
   * One or more RichSelectList.Option components.
   */
  children: ReactNode;
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
   * Enables multiple selection (multiselect)
   */
  multiple?: boolean;
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
};

/**
 * [RichSelectList](https://cambly-syntax.vercel.app/?path=/docs/components-selectlist--docs) is a dropdown menu that allows users to select one option from a list.
 */
function RichSelectListInner({
  children,
  "data-testid": dataTestId,
  description,
  disabled: disabledProp = false,
  errorText,
  helperText,
  id,
  label = "myLabel",
  multiple = true,
  onChange,
  onClick,
  placeholderText,
  selectedValue = "",
  size = "md",
}: RichSelectListProps): ReactElement {
  const reactId = useId();
  const isHydrated = useIsHydrated();
  const disabled = !isHydrated || disabledProp;
  const selectId = id ?? reactId;
  // const { isFocusVisible } = useFocusVisible();
  // const [isFocused, setIsFocused] = useState(false);

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

  const handleCheckboxGroupChange = (value: string[]) => {
    console.log("handleCheckboxGroupChange value", value);
    // onChange(value);
  };

  const disabledKeys = useDisabledKeys();

  const selectedKeys = useSelectedKeys();
  const [selected, setSelected] = React.useState<Selection>(new Set());
  useEffect(
    () =>
      setSelected((curr) => {
        return new Set([...curr, ...selectedKeys]);
      }),
    [],
  );

  return (
    <>
      {/* <p>
        Current selection (controlled):{" "}
        {selected === "all" ? "all" : [...selected].join(", ")}
      </p> */}
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
                {selected === "all"
                  ? "all"
                  : selected.size
                  ? [...selected].join(", ")
                  : placeholderText}
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
                selectionMode="multiple"
                // selectionMode="single"
                selectionBehavior="toggle" // or "replace"
                shouldFocusWrap
                orientation="horizontal"
                selectedKeys={selected}
                onSelectionChange={(keys) => {
                  console.log(
                    "RichSelectBoxInner onSelectionChange keys",
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

  // return (
  //   <ReactAriaComboBox
  //     aria-label="Select favorite animal"
  //     // onSelectionChange={(value, ...rest) => {
  //     //   console.log("select onSelectionChange value", value, rest);
  //     //   // onChange(value);
  //     // }}
  //     menuTrigger="manual"
  //     // onSelectionChange={(keys) =>
  //     //   console.log("ReactAriaComboBox onSelectionChange keys", keys)
  //     // }
  //     disabledKeys={disabledKeys}
  //     // style={{ display: "flex", flexDirection: "column" }}
  //   >
  //     {label && <ReactAriaLabel style={{ display: "block" }}>{label}</ReactAriaLabel>}
  //     {/* <Popover
  //       placement="bottom"
  //       content={
  //         <RichSelectBox multiple={multiple}>
  //           <RichSelectChip label="Cat" value="cat" disabled />
  //           <RichSelectChip label="Dog" value="dog" />
  //           <RichSelectChip label="Captain" value="cappy" />
  //         </RichSelectBox>
  //       }
  //     >
  //       <ReactAriaInput placeholder="Select one placeholder prop" readOnly />
  //     </Popover> */}
  //     <ReactAriaInput placeholder="Select one placeholder prop" readOnly />
  //     <ReactAriaButton>▼</ReactAriaButton>

  //     {/* {description && <ReactAriaText slot="description">{description}</ReactAriaText>} */}

  //     <ReactAriaPopover
  //       placement="bottom"
  //       // className={classNames([
  //       //   boxStyles.box,
  //       //   boxStyles.flex,
  //       //   boxStyles.column,
  //       //   boxStyles.relative,
  //       //   boxStyles.overflowauto,
  //       //   colorStyles.whiteBackgroundColor,
  //       //   paddingStyles.paddingX6,
  //       //   paddingStyles.paddingY6,
  //       //   roundingStyles.roundinglg,
  //       //   elevationStyles.elevation400BoxShadow,
  //       // ])}
  //     >
  //       <Dialog>
  //         <RichSelectBox multiple={multiple}>
  //           <RichSelectChip label="Cat" value="cat" disabled />
  //           <RichSelectChip label="Dog" value="dog" />
  //           <RichSelectChip label="Captain" value="cappy" />
  //         </RichSelectBox>
  //       </Dialog>
  //     </ReactAriaPopover>
  //     {/* <ReactAriaListBox
  //       aria-label="Favorite animal"
  //       selectionMode="multiple"
  //       // onSelectionChange={(keys) =>
  //       //   console.log("listbox onSelectionChange", keys)
  //       // }
  //     >
  //       <ReactAriaListBoxItem value={{ selectedValue: "foobar" }}>
  //         Aardvark
  //       </ReactAriaListBoxItem>
  //       <ReactAriaListBoxItem>Cat</ReactAriaListBoxItem>
  //       <ReactAriaListBoxItem>Dog</ReactAriaListBoxItem>
  //       <ReactAriaListBoxItem>Kangaroo</ReactAriaListBoxItem>
  //       <ReactAriaListBoxItem>Panda</ReactAriaListBoxItem>
  //       <ReactAriaListBoxItem>Snake</ReactAriaListBoxItem>
  //     </ReactAriaListBox> */}
  //   </ReactAriaComboBox>
  // );

  // return (
  //   <div
  //     className={classNames(styles.selectContainer, {
  //       [styles.opacityOverlay]: disabled,
  //     })}
  //   >
  //     {label && (
  //       <label htmlFor={selectId} className={styles.outerTextContainer}>
  //         <Typography size={100} color="gray700">
  //           {label}
  //         </Typography>
  //       </label>
  //     )}
  //     <Popover
  //       content={
  //         <div>
  //           {/* {children} */}
  //           {/* <ReactAriaGridList
  //             defaultSelectedKeys={
  //               Array.isArray(selectedValue) ? selectedValue : [selectedValue]
  //             }
  //             onSelectionChange={(_value) => {
  //               console.log("onSelectionChange _value", _value);
  //               // onChange(_value);
  //             }}
  //             // onChange={handleCheckboxGroupChange}
  //             // defaultValue={selectedValue}
  //             // onChange={handleCheckboxGroupChange}
  //           > */}
  //           {/* {React.Children.map(children, (child) => (
  //               <ReactAriaListBoxItem>{child}</ReactAriaListBoxItem>
  //             ))} */}
  //           {/* {children} */}
  //           {/* <ReactAriaLabel>Categories</ReactAriaLabel> */}
  //           {/* <ReactAriaGridListItem textValue="News">
  //               <Chip text="News" />
  //               News
  //             </ReactAriaGridListItem>
  //             <ReactAriaGridListItem textValue="Travel">
  //               <Chip text="News" />
  //               Travel
  //             </ReactAriaGridListItem>
  //             <ReactAriaGridListItem textValue="Gaming">
  //               <Chip text="News" />
  //               Gaming
  //             </ReactAriaGridListItem>
  //             <ReactAriaGridListItem textValue="Shopping">
  //               <Chip text="News" />
  //               Shopping
  //             </ReactAriaGridListItem>
  //           </ReactAriaGridList> */}
  //           <ReactAriaSelect>
  //             <ReactAriaListBox aria-label="Favorite animal" selectionMode="single">
  //               <ReactAriaListBoxItem>Aardvark</ReactAriaListBoxItem>
  //               <ReactAriaListBoxItem>Cat</ReactAriaListBoxItem>
  //               <ReactAriaListBoxItem>Dog</ReactAriaListBoxItem>
  //               <ReactAriaListBoxItem>Kangaroo</ReactAriaListBoxItem>
  //               <ReactAriaListBoxItem>Panda</ReactAriaListBoxItem>
  //               <ReactAriaListBoxItem>Snake</ReactAriaListBoxItem>
  //             </ReactAriaListBox>
  //           </ReactAriaSelect>
  //           {/* <ReactAriaTagGroup
  //             selectedKeys={["News", "Travel"]}
  //             defaultSelectedKeys={["Gaming", "Shopping"]}
  //             selectionMode="multiple"
  //             onSelectionChange={(_value) => {
  //               console.log("onSelectionChange _value", _value);
  //               // onChange(_value);
  //             }}
  //           >
  //             <ReactAriaLabel>Categories</ReactAriaLabel>
  //             <ReactAriaTagList>
  //               <ReactAriaTag>News</ReactAriaTag>
  //               <ReactAriaTag>Travel</ReactAriaTag>
  //               <ReactAriaTag>Gaming</ReactAriaTag>
  //               <ReactAriaTag>Shopping</ReactAriaTag>
  //             </ReactAriaTagList>
  //           </ReactAriaTagGroup> */}
  //         </div>
  //       }
  //     >
  //       <div className={styles.selectWrapper}>
  //         <div
  //           tabIndex={0} // TODO: use react-aria hooks for this?
  //           className={classNames(styles.selectBox, styles[size], {
  //             [styles.unselected]: !selectedValue && !errorText,
  //             [styles.selected]: selectedValue && !errorText,
  //             [styles.selectError]: errorText,
  //             [focusStyles.accessibilityOutlineFocus]:
  //               isFocused && isFocusVisible, // for focus keyboard
  //             [styles.selectMouseFocusStyling]: isFocused && !isFocusVisible, // for focus mouse
  //           })}
  //         >
  //           I am a select container
  //         </div>
  //         {/* <select
  //           id={selectId}
  //           data-testid={dataTestId}
  //           disabled={disabled}
  //           className={classNames(styles.selectBox, styles[size], {
  //             [styles.unselected]: !selectedValue && !errorText,
  //             [styles.selected]: selectedValue && !errorText,
  //             [styles.selectError]: errorText,
  //             [focusStyles.accessibilityOutlineFocus]:
  //               isFocused && isFocusVisible, // for focus keyboard
  //             [styles.selectMouseFocusStyling]: isFocused && !isFocusVisible, // for focus mouse
  //           })}
  //           onChange={onChange}
  //           onClick={onClick}
  //           value={
  //             placeholderText && !selectedValue
  //               ? placeholderText
  //               : selectedValue
  //           }
  //           onFocus={() => setIsFocused(true)}
  //           onBlur={() => setIsFocused(false)}
  //         >
  //           {placeholderText && (
  //             <option disabled value={placeholderText}>
  //               {placeholderText}
  //             </option>
  //           )}
  //           {children}
  //         </select> */}
  //         <div className={styles.arrowIcon}>
  //           <svg
  //             focusable="false"
  //             aria-hidden="true"
  //             viewBox="0 0 24 24"
  //             width={iconSize[size]}
  //           >
  //             <path
  //               fill={errorText ? ColorBaseDestructive700 : ColorBaseGray800}
  //               d="M15.88 9.29 12 13.17 8.12 9.29a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z"
  //             />
  //           </svg>
  //         </div>
  //       </div>
  //     </Popover>
  //     {(helperText || errorText) && (
  //       <div className={styles.outerTextContainer}>
  //         <Typography
  //           size={100}
  //           color={errorText ? "destructive-primary" : "gray700"}
  //         >
  //           {errorText ? errorText : helperText}
  //         </Typography>
  //       </div>
  //     )}
  //   </div>
  // );
}

function RichSelectList(props: RichSelectListProps): ReactElement {
  return (
    <DisabledKeysProvider isolate>
      <RichSelectListInner {...props} />
    </DisabledKeysProvider>
  );
}

export default Object.assign(RichSelectList, {
  OptGroup: RichSelectOptGroup,
  Chip: RichSelectChip,
});

// function MyListBoxItem({ children, ...rest }) {
//   return (
//     <ReactAriaListBoxItem {...rest}>
//       {({ isSelected, isFocused, isDisabled }) => {
//         console.log("MyListBoxItem render props", {
//           isSelected,
//           isFocused,
//           isDisabled,
//         });
//         return (
//           <>
//             {children}
//             <Chip text="News" selected={isSelected} disabled={isDisabled} />
//           </>
//         );
//       }}
//     </ReactAriaListBoxItem>
//   );
// }
