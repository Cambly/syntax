import { type ReactElement } from "react";
import Box from "../Box/Box";
import Avatar from "../Avatar/Avatar";

const sizeToMargin = {
  sm: -16,
  md: -28,
  lg: -48,
  xl: -96,
} as const;

export default function AvatarGroupAvatar({
  accessibilityLabel,
  icon,
  orientation,
  size = "md",
  src,
  zIndex,
}: {
  /**
   * Alt text to use for the image.
   * This should describe the image to people using screen readers.
   */
  accessibilityLabel: string;
  /**
   * optional icon that appears on the bottom corner of the avatar
   */
  icon?: React.ReactElement;
  /**
   * URL of the image to display as the avatar.
   */
  src: string;
  /**
   * Influences which direction we apply the negative margin between avatars
   */
  orientation: "standard" | "reverse";
  /**
   * Position of the avatar in the stack
   */
  zIndex: number;
  /**
   * Size of the avatar.
   *
   * * `sm`: 24px
   * * `md`: 40px
   * * `lg`: 72px
   * * `xl`: 128px
   *
   * @defaultValue `md`
   */
  size?: "sm" | "md" | "lg" | "xl";
}): ReactElement {
  return (
    <Box
      position="relative"
      dangerouslySetInlineStyle={{
        __style: {
          zIndex,
          marginInlineEnd: orientation === "standard" ? sizeToMargin[size] : 0,
          marginInlineStart: orientation === "reverse" ? sizeToMargin[size] : 0,
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
        rounding="full"
      >
        <Avatar
          src={src}
          accessibilityLabel={accessibilityLabel}
          size={size}
          icon={icon}
        />
      </Box>
    </Box>
  );
}
