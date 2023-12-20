import Box from "../Box/Box";
import { type ReactNode } from "react";
import FacepileAvatar from "./FacepileAvatar";

/**
 * [Facepile] is a stack of avatars to represent a group of people
 */

export default function Facepile({
  children,
  orientation = "standard",
}: {
  /**
   * One or more Facepile.Avatar components.
   */
  children: ReactNode;
  /**
   * Direction of the avatar stack
   * standard - avatars stack from right to left
   * standard - avatars stack from left to right
   */
  orientation: "standard" | "reverse";
}): React.ReactElement {
  return (
    <Box
      display="flex"
      direction={orientation === "reverse" ? "row-reverse" : "row"}
      alignItems="center"
    >
      {children}
    </Box>
  );
}

Facepile.displayName = "Facepile";
Facepile.Avatar = FacepileAvatar;
