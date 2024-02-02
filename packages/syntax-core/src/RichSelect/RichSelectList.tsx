import React, {
  type ReactElement,
  useMemo,
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
import {
  Label as ReactAriaLabel,
  Provider as ReactAriaProvider,
} from "react-aria-components";
import { useControlledState } from "@react-stately/utils";
import { DialogContext } from "../Dialog/Dialog";
import styles from "../SelectList/SelectList.module.css";
import RichSelectBox, {
  RichSelectBoxContext,
  convertSelection,
  type RichSelectBoxProps,
} from "./RichSelectBox";
import richSelectItems from "./richSelectItems";
import TapArea from "../TapArea/TapArea";
import { type OverlayHandlerRef } from "../react-aria-utils/Triggerable";
import Box from "../Box/Box";

const NOOP = () => undefined;

const iconSize = {
  sm: 20,
  md: 24,
  lg: 24,
} as const;

export type RichSelectListProps = Omit<
  RichSelectBoxProps,
  "accessibilityLabel"
> & {
  /** Test id for the select element */
  "data-testid"?: string;
  /**
   * Disables the select dropdown entirely
   * @defaultValue false
   */
  disabled?: boolean;
  /** Callback to be called when select is clicked */
  onClick?: (event: SyntheticEvent<HTMLDivElement>) => void;
  /** Text shown below select box if there is an input error. */
  errorText?: string;
  /** Text shown below select box */
  helperText?: string;
  /** Text shown above select box */
  label: string; // also show this inside the popover?
  /**
   * Text showing in select box if no option has been chosen.
   * There should always have a placeholder unless there is a default option selected
   */
  placeholderText?: string;
  /** Use to render (override) text shown in the select box */
  selectTextValue?: (selectedValues?: string[]) => string | undefined;
  /**
   * Size of the select box
   *
   * @defaultValue "md"
   */
  size?: "sm" | "md" | "lg";
};

/**
 * [RichSelectList](https://cambly-syntax.vercel.app/?path=/docs/components-richselectlist--docs) is a dropdown menu that allows users to select one or multiple options from a list.
 *
 * Example Usage:
 ```
  <RichSelectList
    label="My Label"
    multiple
    onChange={() => { ... }}
    primaryButtonText="Save"
    primaryButtonAccessibilityLabel="Save"
    secondaryButtonText="Clear"
    secondaryButtonAccessibilityLabel="Clear"
  >
    <RichSelectList.Section label="Cities">
      <RichSelectList.Chip label="San Francisco" value="sf" />
      <RichSelectList.Chip label="New York" value="ny" disabled />
      <RichSelectList.Chip label="Tulsa" value="tulsa" />
      <RichSelectList.Chip label="Chicago" value="chicago" disabled />
    </RichSelectList.Section>
  </RichSelectList>
 ```
 */
function RichSelectList(props: RichSelectListProps): ReactElement {
  const {
    autosave,
    children,
    "data-testid": dataTestId,
    disabled: disabledProp = false,
    errorText,
    helperText,
    label,
    onChange,
    onClick = NOOP,
    placeholderText,
    selectTextValue,
    selectedValues: selectedValuesProp,
    defaultSelectedValues: defaultSelectedValuesProp,
    size = "md",
    ...richSelectBoxProps
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
    selectedKeysProp!, // eslint-disable-line @typescript-eslint/no-non-null-assertion -- there is a bug in the typedef for useControlledState from react-stately.  Internally they rely on value (first arg) able to be undefined
    defaultSelectedKeys,
    (value) => {
      const _value = value === "all" ? "all" : [...value].map(String);
      onChange(_value);
      if (!autosave) overlayHandlerRef.current.close?.();
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
    <ReactAriaProvider
      values={[
        [RichSelectBoxContext, { autoFocus: true }],
        [DialogContext, { padding: autosave ? undefined : 0 }], // this is altering Popover's internal dialog padding to show the sticky save/close buttons. Ideally this could be avoided
      ]}
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

          <Popover
            ref={overlayHandlerRef}
            disabled={disabled}
            content={
              // this Box wrapper is to reapply the padding that was stripped from popover's dialog to show the sticky save/close buttons. Ideally this could be avoided
              <Box
                padding={autosave ? undefined : 5}
                dangerouslySetInlineStyle={
                  autosave ? undefined : { __style: { paddingBottom: 0 } }
                }
              >
                <RichSelectBox
                  autosave={autosave}
                  selectedValues={selectedKeys}
                  defaultSelectedValues={defaultSelectedKeys}
                  onChange={(selected) => setSelectedKeys(new Set(selected))}
                  accessibilityLabel={label}
                  {...richSelectBoxProps}
                >
                  {children}
                </RichSelectBox>
              </Box>
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
                      !errorText &&
                      selectedKeys !== "all" &&
                      !selectedKeys.size,
                    [styles.selected]:
                      !errorText &&
                      (selectedKeys === "all" || selectedKeys.size),
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
    </ReactAriaProvider>
  );
}

export default Object.assign(RichSelectList, richSelectItems);
