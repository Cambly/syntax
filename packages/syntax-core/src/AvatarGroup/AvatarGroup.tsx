import Box from "../Box/Box";
import { type ReactNode } from "react";
import AvatarGroupAvatar from "./AvatarGroupAvatar";

/**
 * [AvatarGroup](https://cambly-syntax.vercel.app/?path=/docs/components-avatargroup--docs) is a stack of avatars to represent a group of people
 */

export default function AvatarGroup({
  children,
  orientation = "standard",
}: {
  /**
   * One or more.Avatar components.
   */
  children: ReactNode;
  /**
   * Direction of the avatar stack
   * standard - avatars stack from right to left
   * reverse - avatars stack from left to right
   */
  orientation?: "standard" | "reverse";
}): JSX.Element {
  return (
    <Box
      display="flex"
      alignItems="center"
      dangerouslySetInlineStyle={{
        __style: {
          flexDirection: orientation === "reverse" ? "row-reverse" : "row",
        },
      }}
    >
      {children}
    </Box>
  );
}

AvatarGroup.displayName = "AvatarGroup";
AvatarGroup.Avatar = AvatarGroupAvatar;
