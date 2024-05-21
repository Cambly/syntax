import { type ReactElement, type ReactNode } from "react";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";

const ItemCountIcon = ({ itemCount }: { itemCount: number }) => {
  return (
    <Box
      rounding="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="black"
      padding={2}
    >
      <Typography color="white" weight="semiBold" size={100}>
        {itemCount < 99 ? itemCount : "99+"}
      </Typography>
    </Box>
  );
};

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
  function getTextColor() {
    if (selected) {
      return on === "lightBackground" ? "primary" : "white";
    }
    return "gray700";
  }

  return (
    <Box paddingX={2} display="flex" alignItems="center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="start"
        gap={2}
        height={56}
        dangerouslySetInlineStyle={{
          __style: {
            borderBottom: selected ? "3px solid black" : "none",
          },
        }}
      >
        <Typography
          size={200}
          weight={selected ? "semiBold" : "regular"}
          color={getTextColor()}
        >
          {text}
        </Typography>
        {itemCount == null && endContent}
        {itemCount != null && <ItemCountIcon itemCount={itemCount} />}
      </Box>
    </Box>
  );
}
