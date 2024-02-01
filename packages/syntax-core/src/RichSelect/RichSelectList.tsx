/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * Okay, got it.  Here's the breakdown:
 * - RichSelectBox - non-dropdown box with selectable items
 *  - (maybe RichSelectSection?)
 *  - Props:
 *   - multiple
 *   - onChange
 *   - size
 *   - title (or maybe force RichSection usage for this?)
 *   - direction?: "column" | "row"
 *   - ...
 *  - Attached Components:
 *    - RichSelectBox.Chip -> RichSelectChip
 *    - RichSelectBox.Option -> RichSelectOption
 *    - RichSelectBox.Chec../SelectList/SelectOptionlectCheckbox
 *    - RichSelectBox.Radio -> RichSelectRadio (this one might be harder, maybe only in single select mode?)
 *    - RichSelectBox.Input -> RichSelectInput (this + text area would be interesting use case: combine checkbox with input, when selected, the key is the inputted value?)
 *
 * - RichSection - matches the ReactAriaSection component
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
  useMemo,
  useContext,
  type SyntheticEvent,
  useRef,
} from "react";
import classNames from "classnames";
import {
  ColorBaseDestructive700,
  ColorBaseGray800,
} from "@cambly/syntax-design-tokens";
import Typography from "../Typography/Typography";
import useIsHydrated from "../useIsHydrated";
import Popover from "../Popover/Popover";
import { type Key } from "react-aria";
import {
  Label as ReactAriaLabel,
  Button as ReactAriaButton,
  OverlayTriggerStateContext as ReactAriaOverlayTriggerStateContext,
} from "react-aria-components";
import { useControlledState } from "@react-stately/utils";

import RichSelectChip from "./RichSelectChip";
import RichSelectSection from "./RichSelectSection";
import { dialogClassnames } from "../Dialog/Dialog";
import focusStyles from "../Focus.module.css";
import styles from "../SelectList/SelectList.module.css";
import RichSelectRadioButton from "./RichSelectRadioButton";
import RichSelectBox, {
  RichSelectBoxContext,
  type RichSelectBoxProps,
} from "./RichSelectBox";
import richSelectItems from "./richSelectItems";
import TapArea from "../TapArea/TapArea";
import { type OverlayHandlerRef } from "../react-aria-utils/Triggerable";

const NOOP = () => undefined;

const iconSize = {
  sm: 20,
  md: 24,
  lg: 24,
} as const;

export type RichSelectListProps = Omit<
  RichSelectBoxProps,
  "selectedValue" | "onChange"
> & {
  /**
   * One or more RichSelectList.<Chip|RadioButton|Section|...> components.
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
  onClick?: (event: SyntheticEvent<HTMLDivElement>) => void;
  /**
   * Text shown below select box if there is an input error.
   */
  errorText?: string;
  /**
   * Text shown below select box
   */
  helperText?: string;
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
  autosave?: boolean;
  onChange: (selectedValues: string[] | "all") => void;
  defaultSelectedValues?: string[] | "all";
  primaryButtonText?: string;
  primaryButtonAccessibilityLabel?: string;
  secondaryButtonText?: string;
  secondaryButtonAccessibilityLabel?: string;
  selectTextValue?: (selectedValues?: string[]) => string | undefined;
  form?: string;
};

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

/**
 * [RichSelectList](https://cambly-syntax.vercel.app/?path=/docs/components-selectlist--docs) is a dropdown menu that allows users to select one option from a list.
 */
function RichSelectList(props: RichSelectListProps): ReactElement {
  const {
    autosave,
    children,
    "data-testid": dataTestId,
    disabled: disabledProp = false,
    errorText,
    helperText,
    label = "myLabel",
    name,
    multiple = false,
    onChange,
    onClick = NOOP,
    // placeholderText = "Select an option",
    placeholderText,
    primaryButtonText = "Save",
    primaryButtonAccessibilityLabel = "Save",
    selectTextValue,
    secondaryButtonText = "Clear",
    secondaryButtonAccessibilityLabel = "Clear",
    selectedValues: selectedValuesProp,
    defaultSelectedValues: defaultSelectedValuesProp,
    size = "md",
  } = props;

  const isHydrated = useIsHydrated();
  const disabled = !isHydrated || disabledProp;

  // passed to popover, which attached open/close methods
  const overlayHandlerRef = useRef<OverlayHandlerRef>({});

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
    (value) => {
      const _value = value === "all" ? "all" : [...value].map(String);
      onChange(_value);
      overlayHandlerRef.current.close?.();
    },
  );

  const selectedTextValue = useMemo(() => {
    if (selectTextValue)
      return selectTextValue([...selectedKeys].map(String)) ?? placeholderText;
    if (selectedKeys === "all") return "all";
    if (selectedKeys.size) return `${selectedKeys.size} selected`;
    return placeholderText;
  }, [selectTextValue, selectedKeys, placeholderText]);

  return (
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

        <Popover
          ref={overlayHandlerRef}
          disabled={disabled}
          content={
            <RichSelectBoxContext.Provider value={{ autoFocus: true }}>
              <RichSelectBox
                selectedValues={selectedKeys}
                defaultSelectedValues={defaultSelectedKeys}
                onChange={(selected) => setSelectedKeys(new Set(selected))}
                multiple={multiple}
                autosave={autosave}
                disabled={disabled}
                errorText={errorText}
                helperText={helperText}
                size={size}
                label={label}
                primaryButtonText={primaryButtonText}
                primaryButtonAccessibilityLabel={
                  primaryButtonAccessibilityLabel
                }
                secondaryButtonText={secondaryButtonText}
                secondaryButtonAccessibilityLabel={
                  secondaryButtonAccessibilityLabel
                }
              >
                {children}
              </RichSelectBox>
            </RichSelectBoxContext.Provider>
          }
        >
          <TapArea
            data-testid={dataTestId}
            disabled={disabled}
            onClick={onClick}
            rounding={size === "lg" ? "lg" : "md"}
          >
            <div className={styles.selectWrapper}>
              <div
                className={classNames(styles.selectBox, styles[size], {
                  [styles.unselected]:
                    !errorText && selectedKeys !== "all" && !selectedKeys.size,
                  [styles.selected]:
                    !errorText && (selectedKeys === "all" || selectedKeys.size),
                  [styles.selectError]: errorText,
                })}
              >
                {selectedTextValue}
              </div>
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
          </TapArea>
        </Popover>
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
  );
}

export default Object.assign(RichSelectList, richSelectItems);
