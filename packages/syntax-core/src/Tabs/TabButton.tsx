import { type ReactElement, type ComponentProps } from "react";
import TapArea from "../TapArea/TapArea";
import TabInternal from "./TabInternal";

export default function TabButton({
  text,
  onClick,
  selected,
  endContent,
  itemCount,
  "data-testid": dataTestId,
  on,
}: ComponentProps<typeof TabInternal> & {
  /**
   * The onClick event for the button
   */
  onClick: () => void;
  /**
   * Test id for the button
   */
  "data-testid"?: string;
}): ReactElement {
  return (
    <TapArea
      fullWidth={false}
      onClick={onClick}
      rounding="md"
      data-testid={dataTestId}
    >
      <TabInternal
        text={text}
        selected={selected}
        endContent={endContent}
        itemCount={itemCount}
        on={on}
      />
    </TapArea>
  );
}
