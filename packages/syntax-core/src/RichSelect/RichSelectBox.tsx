import React, {
  forwardRef,
  type ReactElement,
  useContext,
  useState,
  useCallback,
  createContext,
  useMemo,
} from "react";
import { ListBox as ReactAriaListBox } from "react-aria-components";
import type RichSelectChip from "./RichSelectChip";
import type RichSelectSection from "./RichSelectSection";
import { type Key } from "react-aria";
import { type Selection } from "react-stately";
import { useControlledState } from "@react-stately/utils";
import { RichSelectItemContext } from "./RichSelectItem";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Button from "../Button/Button";
import type RichSelectRadioButton from "./RichSelectRadioButton";
import richSelectItems from "./richSelectItems";
import styles from "./RichSelect.module.css";
import Box from "../Box/Box";
import Divider from "../Divider/Divider";

type RichSelectChild =
  | ReactElement<typeof RichSelectChip>
  | ReactElement<typeof RichSelectRadioButton>
  | ReactElement<typeof RichSelectSection>;

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

export function convertSelection(
  selection: "all" | Iterable<Key> | undefined,
  defaultValue?: "all" | Set<Key>,
): "all" | Set<Key> | undefined {
  if (!selection) return defaultValue;
  if (selection === "all") return "all";
  return new Set(selection);
}

export type RichSelectBoxProps = {
  /** aria-label for the list box */
  accessibilityLabel: string;
  /** Automatically saves changes when true, shows save/clear buttons when not true */
  autosave?: boolean;
  /** Test id for the list box element */
  "data-testid"?: string;
  /** One or more RichSelectList.<Chip|RadioButton|Section|...> components. */
  children: RichSelectChild | RichSelectChild[];
  /** Default selected values */
  defaultSelectedValues?: Set<Key> | string[] | "all";
  /** Enables multiple selection (multiselect) */
  multiple?: boolean;
  /** The callback to be called when options are selected / committed */
  onChange: (selectedValues: string[] | "all") => void;
  /** Text for primary button (Save) */
  primaryButtonText?: string;
  /** accessibilityLabel for primary Button component (Save) */
  primaryButtonAccessibilityLabel?: string;
  /** Text for primary button (Clear) */
  secondaryButtonText?: string;
  /** accessibilityLabel for secondary Button component (Clear) */
  secondaryButtonAccessibilityLabel?: string;
  /** Value of the currently selected options */
  selectedValues?: Set<Key> | string[] | "all";
};

type RichSelectBoxContextType = {
  /** Automatically focuses RichSelectBox on mount when enabled */
  autoFocus?: boolean;
};
export const RichSelectBoxContext = createContext<RichSelectBoxContextType>({});

const RichSelectBox = forwardRef<HTMLDivElement, RichSelectBoxProps>(
  function RichSelectBox(props, ref): ReactElement {
    const {
      accessibilityLabel,
      autosave,
      children,
      "data-testid": dataTestId,
      multiple = false,
      onChange,
      primaryButtonText = "Save",
      primaryButtonAccessibilityLabel = "Save",
      secondaryButtonText = "Clear",
      secondaryButtonAccessibilityLabel = "Clear",
      selectedValues: selectedValuesProp,
      defaultSelectedValues: defaultSelectedValuesProp,
    } = props;

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
        if (isEqualSelection(value, selectedKeys)) return;
        // Notify parent about the changes
        if (value === "all") return onChange("all");
        onChange([...value].map(String));
      },
    );
    const [stagedKeys, setStagedKeys] = useState<Set<Key> | "all">(
      selectedKeys,
    );

    const saveChanges = () => setSelectedKeys(stagedKeys);
    const clearChanges = () => setStagedKeys(new Set());
    const stageChanges = (selectedValues: Selection) => {
      setStagedKeys(selectedValues);
      if (autosave) setSelectedKeys(selectedValues);
    };

    // inject method into context so children can disable themselves
    // by adding `disabled` attribute (through RichSelectItem)
    const [disabledKeysComposed, setDisabledKeysComposed] = useState<Set<Key>>(
      new Set(),
    );
    const disableKey = useCallback((key: Key, _disabled: boolean) => {
      setDisabledKeysComposed((keys) => {
        if (keys.has(key) === _disabled) return keys;
        _disabled ? keys.add(key) : keys.delete(key);
        return new Set(keys);
      });
    }, []);

    // higher level context for autoFocus behavior (parent sets when rendering RichSelectBox in overlay)
    const { autoFocus } = useContext(RichSelectBoxContext);

    return (
      <RichSelectItemContext.Provider value={{ disableKey }}>
        <Box>
          <ReactAriaListBox
            ref={ref}
            aria-label={accessibilityLabel}
            autoFocus={autoFocus}
            selectionMode={multiple ? "multiple" : "single"}
            selectionBehavior={multiple ? "toggle" : "replace"}
            shouldFocusWrap={true}
            orientation="horizontal"
            selectedKeys={stagedKeys}
            onSelectionChange={stageChanges}
            disabledKeys={disabledKeysComposed}
            className={styles.richSelectBox}
          >
            {children}
          </ReactAriaListBox>
          {!autosave && (
            <Box
              backgroundColor="white"
              display="flex"
              direction="column"
              gap={5}
              marginTop={5}
              justifyContent="end"
              position="sticky"
              dangerouslySetInlineStyle={{
                __style: {
                  bottom: 0,
                },
              }}
            >
              <Box flex="grow">
                <Divider />
              </Box>
              <Box
                paddingY={5}
                marginTop={-5}
                display="flex"
                justifyContent="end"
              >
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
              </Box>
            </Box>
          )}
        </Box>
      </RichSelectItemContext.Provider>
    );
  },
);

export default Object.assign(RichSelectBox, richSelectItems);
