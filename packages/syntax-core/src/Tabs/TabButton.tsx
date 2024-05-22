import { type ReactElement, type ComponentProps } from "react";
import classnames from "classnames";
import TapArea from "../TapArea/TapArea";
import TabInternal from "./TabInternal";
import styles from "./TabButton.module.css";

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
  const unselectedTabStyle = styles.unselectedTab;
  const selectedTabStyle =
    on === "lightBackground"
      ? styles.selectedTabOnLightBackground
      : styles.selectedTabOnDarkBackground;
  const tabStyles = classnames(styles.tab, {
    [unselectedTabStyle]: !selected,
    [selectedTabStyle]: selected,
  });

  return (
    <div role="tab" className={tabStyles}>
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
    </div>
  );
}
