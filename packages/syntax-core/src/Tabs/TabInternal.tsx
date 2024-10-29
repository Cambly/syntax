import { type ComponentProps, type ReactElement, type ReactNode } from "react";
import classnames from "classnames";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";
import colorStyles from "../colors/colors.module.css";

const ItemCountIcon = ({
  itemCount,
  on,
  selected,
}: {
  itemCount: number;
  on: ComponentProps<typeof TabInternal>["on"];
  selected: boolean;
}) => {
  return (
    <div
      className={classnames({
        [colorStyles.cambioWhiteBackgroundColor]:
          on === "darkBackground" && selected,
        [colorStyles.white70BackgroundColor]:
          on === "darkBackground" && !selected,
        [colorStyles.cambioBlackBackgroundColor]:
          on === "lightBackground" && selected,
        [colorStyles.cambioGray700BackgroundColor]:
          on === "lightBackground" && !selected,
      })}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 999,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        rounding="full"
        padding={1}
      >
        <Typography
          color={on === "lightBackground" ? "white" : "primary"}
          weight="semiBold"
          size={100}
        >
          {itemCount <= 99 ? itemCount : "99+"}
        </Typography>
      </Box>
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
  return on === "lightBackground" ? "gray700" : "white-secondary";
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
      padding={2}
    >
      <Typography
        size={0}
        transform="uppercase"
        weight="semiBold"
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
