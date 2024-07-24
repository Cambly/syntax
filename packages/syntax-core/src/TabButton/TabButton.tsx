import { type ReactElement, type ComponentProps } from "react";
import classnames from "classnames";
import TapArea from "../TapArea/TapArea";
import TabInternal from "../Tabs/TabInternal";
import styles from "../Tabs/Tabs.module.css";
import Box from "../Box/Box";

export default function TabButton({
  text,
  onClick,
  selected,
  endContent,
  itemCount,
  accessibilityLabel,
  "data-testid": dataTestId,
  on = "lightBackground",
}: ComponentProps<typeof TabInternal> & {
  /**
   * The onClick event for the button
   */
  onClick: () => void;
  /**
   * The label to be used for accessibility
   */
  accessibilityLabel?: string;
  /**
   * Test id for the button
   */
  "data-testid"?: string;
}): ReactElement {
  return (
    <div
      role="tab"
      className={classnames({
        [styles.unselectedTab]: !selected,
        [styles.selectedTabOnLightBackground]:
          selected && on === "lightBackground",
        [styles.selectedTabOnDarkBackground]:
          selected && on === "darkBackground",
      })}
      style={{
        height: "100%",
      }}
    >
      <Box display="flex" direction="row" alignItems="center" height="100%">
        <TapArea
          fullWidth={false}
          onClick={onClick}
          rounding="md"
          data-testid={dataTestId}
          accessibilityLabel={accessibilityLabel}
        >
          <TabInternal
            text={text}
            selected={selected}
            endContent={endContent}
            itemCount={itemCount}
            on={on}
          />
        </TapArea>
      </Box>
    </div>
  );
}
