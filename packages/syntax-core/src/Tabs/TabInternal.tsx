import { type ComponentProps, type ReactElement, type ReactNode } from "react";
import classnames from "classnames";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";
import styles from "./TabInternal.module.css";

const ItemCountIcon = ({
  itemCount,
  on,
  selected,
}: {
  itemCount: number;
  on: ComponentProps<typeof TabInternal>["on"];
  selected: boolean;
}) => {
  const unselectedItemCountStyle =
    on === "lightBackground"
      ? styles.unselectedItemCount
      : styles.unselectedItemCountOnDarkBackground;
  const selectedItemCountStyle =
    on === "lightBackground"
      ? styles.selectedItemCount
      : styles.selectedItemCountOnDarkBackground;
  const itemCountStyles = classnames(styles.itemCount, {
    [unselectedItemCountStyle]: !selected,
    [selectedItemCountStyle]: selected,
  });
  return (
    <div className={itemCountStyles}>
      <Typography
        color={on === "lightBackground" ? "white" : "primary"}
        weight="semiBold"
        size={100}
      >
        {itemCount <= 99 ? itemCount : "99+"}
      </Typography>
    </div>
  );
};

function textColor({
  selected,
  on,
}: {
  selected: boolean;
  on: "lightBackground" | "darkBackground";
}): ComponentProps<typeof Typography>["color"] {
  if (selected) {
    return on === "lightBackground" ? "primary" : "white";
  }
  return "gray700";
}

export default function TabInternal({
  text,
  selected,
  endContent,
  itemCount,
  on = "lightBackground",
}: {
  /**
   * The text to display in the tab.
   */
  text: string;
  /**
   * Whether the tab is selected.
   */
  selected: boolean;
  /**
   * Content to display at the end of the tab.
   */
  endContent?: ReactNode;
  /**
   * Renders an item count badge at the end of the tab.
   */
  itemCount?: number;
  /**
   * Indicate whether the Tab renders on a light or dark background.
   *
   * @defaulValue `lightBackground`
   */
  on?: "lightBackground" | "darkBackground";
}): ReactElement {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="start"
      gap={2}
      paddingY={2}
    >
      <Typography
        size={0}
        transform="uppercase"
        weight={selected ? "semiBold" : "regular"}
        color={textColor({ selected, on })}
      >
        {text}
      </Typography>
      {itemCount == null && endContent}
      {itemCount != null && (
        <ItemCountIcon itemCount={itemCount} on={on} selected={selected} />
      )}
    </Box>
  );
}
