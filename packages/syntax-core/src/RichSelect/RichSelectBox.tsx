import React, { forwardRef, type ReactElement } from "react";

import { ListBox as ReactAriaListBox } from "react-aria-components";
import RichSelectChip from "./RichSelectChip";
import RichSelectOptGroup from "./RichSelectOptGroup";
import DisabledKeysProvider, {
  useDisabledKeys,
  useSelectedKeys,
} from "./DisabledKeysProvider";

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
