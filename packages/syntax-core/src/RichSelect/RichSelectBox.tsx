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

export type RichSelectBoxProps = {
  /** Test id for the list box element */
  "data-testid"?: string;
  /** One or more RichSelectList.<Chip|RadioButton|Section|...> components. */
  // children: ReactElement | ReactElement[];
  children: RichSelectChild | RichSelectChild[];
  /** Text shown above the box */
  label?: string;
  /** Text shown below the box with error styles applied */
  errorText?: string;
  /** Text shown below the box */
  helperText?: string;
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
  autosave?: boolean;
  defaultSelectedValues?: string[] | "all";
  primaryButtonText?: string;
  primaryButtonAccessibilityLabel?: string;
  secondaryButtonText?: string;
  secondaryButtonAccessibilityLabel?: string;
  // selectedValues?: string[] | Set<string>;
  // might be necesasry for HiddenSelect
  form?: string;
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

type RichSelectBoxContextType = {
  /** Automatically focuses RichSelectBox on mount when enabled */
  autoFocus?: boolean;
};
export const RichSelectBoxContext = createContext<RichSelectBoxContextType>({});

const RichSelectBox = forwardRef<HTMLDivElement, RichSelectBoxProps>(
  function RichSelectBox(props, ref): ReactElement {
    const {
      autosave,
      children,
      "data-testid": dataTestId,
      errorText,
      helperText,
      label = "myLabel",
      multiple = false,
      onChange,
      primaryButtonText = "Save",
      primaryButtonAccessibilityLabel = "Save",
      secondaryButtonText = "Clear",
      secondaryButtonAccessibilityLabel = "Clear",
      selectedValues: selectedValuesProp,
      defaultSelectedValues: defaultSelectedValuesProp,
      size = "md",
    } = props;

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
      autosave={false} displays button group to save / cancel
      popover content needs to render it's own title?  .... or not?

      (idea: useImperativeRef on Popover/ModalDialog/etc to expose open/close methods on popover)

      *NOTE*: need to wire in aria-labels correctly
      https://react-spectrum.adobe.com/react-aria/useLabel.html

      also: CheckboxGroup vs. RadioGroup for `multiple?: boolean` prop


      20240118:
      - `multiple` prop: most(all we support?) browsers make it a static box
        instead of a dropdown.  autoscrolling (ithink)
    */
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
            aria-label="TODO HOOK UP REAL ONE THIS IS TO SUPPRESS WARNING WHILE DEV"
            autoFocus={autoFocus}
            // items={props.items} // TODO: implement Ken's proposal
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
