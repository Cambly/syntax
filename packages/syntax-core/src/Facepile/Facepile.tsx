import Avatar from "../Avatar/Avatar";
import Box from "../Box/Box";
import defaultAvatar from "../../../../apps/storybook/assets/images/defaultAvatar.svg";

/**
 * [Facepile] is a stack of avatars to represent a group of people
 */

type AvatarProps = { key: string; src: string; accessibilityLabel: string };

const sizeToMargin = {
  sm: -16,
  md: -28,
  lg: -48,
  xl: -96,
} as const;

export default function Facepile({
  avatarPropsList,
  size = "md",
  defaultAccessibilityLabel,
  reverseOrientation = false,
  limit,
}: {
  avatarPropsList: AvatarProps[];
  size: "sm" | "md" | "lg" | "xl";
  defaultAccessibilityLabel: string;
  limit: number;
  reverseOrientation: boolean;
}): React.ReactElement {
  const defaultAvatarsProps = new Array(limit - avatarPropsList.length).fill({
    src: defaultAvatar,
    accessibilityLabel: defaultAccessibilityLabel,
    key: "defaultAvatar",
  });
  const avatars = avatarPropsList.concat(defaultAvatarsProps);
  return (
    <Box
      display="flex"
      direction={reverseOrientation ? "row-reverse" : "row"}
      alignItems="center"
    >
      {avatars.map(({ key, src, accessibilityLabel }, index) => (
        <Box
          key={key}
          position="relative"
          dangerouslySetInlineStyle={{
            __style: {
              zIndex: avatars.length - index,
              marginInlineEnd: !reverseOrientation ? sizeToMargin[size] : 0,
              marginInlineStart: reverseOrientation ? sizeToMargin[size] : 0,
            },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="white"
            rounding="full"
            dangerouslySetInlineStyle={
              // This will be true for non empty avatars
              key === src
                ? {
                    __style: {
                      border: `solid ${
                        ["lg", "xl"].includes(size) ? 2 : 1
                      }px white`,
                    },
                  }
                : undefined
            }
          >
            <Avatar
              src={src}
              accessibilityLabel={accessibilityLabel}
              size={size}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

Facepile.displayName = "Facepile";
