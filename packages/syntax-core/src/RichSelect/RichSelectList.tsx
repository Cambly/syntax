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
import { AriaPopover } from "../Popover/Popover";

import {
  ListBox as ReactAriaListBox,
  MenuTrigger as ReactAriaMenuTrigger,
  Label as ReactAriaLabel,
  Button as ReactAriaButton,
  type Selection,
} from "react-aria-components";
import RichSelectChip from "./RichSelectChip";
import RichSelectOptGroup from "./RichSelectOptGroup";
import { dialogClassnames } from "../Dialog/Dialog";
import focusStyles from "../Focus.module.css";
import styles from "../SelectList/SelectList.module.css";
import DisabledKeysProvider, { useDisabledKeys } from "./DisabledKeysProvider";
import RichSelectRadioButton from "./RichSelectRadioButton";
import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import RichSelectBox, { type RichSelectBoxProps } from "./RichSelectBox";

const iconSize = {
  sm: 20,
  md: 24,
  lg: 24,
} as const;

export type RichSelectListProps = RichSelectBoxProps & {
  /**
   * One or more RichSelectList.<Chip|RadioButton|OptGroup|...> components.
   */
  children: ReactElement | ReactElement[];
  /** Test id for the select element */
  "data-testid"?: string;
  /**
   * Disables the select dropdown entirely
   * @defaultValue false
   */
  disabled?: boolean;
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
  // selectedValue?: string;
  /**
   * (Multiselect only) Value of the currently selected options
   */
  // selectedValues?: string[] | Set<string>;
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
  dropdown?: boolean;
  // onChange: React.ChangeEventHandler<HTMLSelectElement>;
  onChange: (selectedValues: string[] | "all") => void;
  // onChange: (selectedValues?: Set<string> | "all") => void;
  defaultSelectedValues?: string[] | "all";
  primaryButtonText?: string;
  primaryButtonAccessibilityLabel?: string;
  secondaryButtonText?: string;
  secondaryButtonAccessibilityLabel?: string;
  selectTextValue?: ({
    selectedValues,
    placeholderText,
  }: {
    selectedValues?: string[];
    placeholderText: string;
  }) => string;
  // selectedValues?: string[] | Set<string>;
  // might be necesasry for HiddenSelect
  form?: string;
};

/**
 * [RichSelectList](https://cambly-syntax.vercel.app/?path=/docs/components-selectlist--docs) is a dropdown menu that allows users to select one option from a list.
 */
function RichSelectListInner(props: RichSelectListProps): ReactElement {
  const {
    autoCommit,
    children,
    "data-testid": dataTestId,
    disabled: disabledProp = false,
    dropdown = true,
    errorText,
    helperText,
    id,
    label = "myLabel",
    name,
    multiple = false,
    onChange,
    onClick,
    placeholderText = "Select an option",
    primaryButtonText = "Save",
    primaryButtonAccessibilityLabel = "Save",
    selectTextValue,
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

  const [selectedValuesState, setSelectedValuesState] = useState(
    selectedValuesProp ?? defaultSelectedKeys,
  );

  const selectedTextValue = useMemo(() => {
    if (selectTextValue) {
      return selectTextValue({
        selectedValues: selectedValuesState
          ? [...selectedValuesState].map(String)
          : [],
        placeholderText,
      });
    }
    if (selectedValuesState === "all") return "all";
    if (!selectedValuesState?.length) return placeholderText;
    return `${selectedValuesState.length} selected`;
  }, [selectedValuesState, placeholderText, selectTextValue]);

  const listBoxNode = (
    <RichSelectBox
      dialog // TODO: better prop name?
      autoCommit={autoCommit}
      multiple={multiple}
      orientation="horizontal"
      onChange={(selected) => {
        setSelectedValuesState(selected);
        onChange(selected);
      }}
      size={size}
      label={label}
      errorText={errorText}
      helperText={helperText}
      disabled={disabled}
      selectedValues={selectedValuesProp}
      defaultSelectedValues={defaultSelectedKeys}
      primaryButtonText={primaryButtonText}
      primaryButtonAccessibilityLabel={primaryButtonAccessibilityLabel}
      secondaryButtonText={secondaryButtonText}
      secondaryButtonAccessibilityLabel={secondaryButtonAccessibilityLabel}
    >
      {children}
    </RichSelectBox>
  );

  if (!dropdown) return listBoxNode;

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
            <div className={styles.selectWrapper}>
              <ReactAriaButton
                // id={selectId}
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
            <AriaPopover>{listBoxNode}</AriaPopover>
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
  RadioButton: RichSelectRadioButton,
});
