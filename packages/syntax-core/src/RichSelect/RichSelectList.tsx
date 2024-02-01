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

export type RichSelectListProps = RichSelectBoxProps & {
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
   * Text showing in select box if no option has been chosen.
   * We should always have a placeholder unless there is a default option selected
   */
  placeholderText?: string;
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
  primaryButtonText?: string;
  primaryButtonAccessibilityLabel?: string;
  secondaryButtonText?: string;
  secondaryButtonAccessibilityLabel?: string;
  selectTextValue?: (selectedValues?: string[]) => string | undefined;
  form?: string;
};

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
    multiple = false,
    onChange,
    onClick = NOOP,
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- there is a bug in the typedef for useControlledState from react-stately.  Internally they rely on value (first arg) able to be undefined
    selectedKeysProp!,
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
    <ReactAriaProvider
      values={[
        [RichSelectBoxContext, { autoFocus: true }],
        [DialogContext, { padding: 0 }],
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
              <Box
                padding={5}
                dangerouslySetInlineStyle={{ __style: { paddingBottom: 0 } }}
              >
                <RichSelectBox
                  selectedValues={selectedKeys}
                  defaultSelectedValues={defaultSelectedKeys}
                  onChange={(selected) => setSelectedKeys(new Set(selected))}
                  multiple={multiple}
                  autosave={autosave}
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
