import { type ReactElement } from "react";
import classNames from "classnames";
import styles from "./Avatar.module.css";
import Box from "../Box/Box";
import { useAvatarGroup } from "../AvatarGroup/AvatarGroup";

const sizeToIconStyles = {
  xs: { bottom: 6, marginInlineEnd: 2, height: 4, width: 4 },
  sm: { bottom: 6, marginInlineEnd: 2, height: 4, width: 4 },
  md: { bottom: 6, marginInlineEnd: 2, height: 8, width: 8 },
  lg: { bottom: 6, marginInlineEnd: 6, height: 12, width: 12 },
  xl: { bottom: 8, marginInlineEnd: 6, height: 12, width: 12 },
} as const;

const sizeToMargin = {
  xs: -10,
  sm: -14,
  md: -22,
  lg: -28,
  xl: -34,
} as const;

function AvatarInternal({
  accessibilityLabel,
  icon,
  outline,
  size = "md",
  src,
}: {
  accessibilityLabel: string;
  icon?: React.ReactElement;
  outline?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  src: string;
}): ReactElement {
  return (
    <div className={classNames(styles.avatar, styles[size])}>
      <img
        alt={accessibilityLabel}
        src={src}
        className={classNames(
          styles.avatarImage,
          outline && styles.avatarImageOutline,
          styles[size],
        )}
      />
      {icon && (
        <Box display="flex" position="relative" justifyContent="end">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            backgroundColor="white"
            dangerouslySetInlineStyle={{
              __style: {
                border: "1px solid white",
                ...sizeToIconStyles[size],
              },
            }}
            rounding="full"
          >
            {icon}
          </Box>
        </Box>
      )}
    </div>
  );
}

/**
 * [Avatar](https://cambly-syntax.vercel.app/?path=/docs/components-avatar--docs) is a circular image that represents a user.
 */
const Avatar = ({
  accessibilityLabel,
  icon,
  size = "md",
  src,
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
   * Size of the avatar.
   *
   * * `xs`: 24px
   * * `sm`: 32px
   * * `md`: 48px
   * * `lg`: 64px
   * * `xl`: 80px
   *
   * @defaultValue `md`
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * URL of the image to display as the avatar.
   */
  src: string;
}): JSX.Element => {
  const avatarGroupContext = useAvatarGroup();

  if (avatarGroupContext !== null) {
    return (
      <Box
        position="relative"
        dangerouslySetInlineStyle={{
          __style: {
            marginInlineEnd: sizeToMargin[avatarGroupContext.size],
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
          <AvatarInternal
            accessibilityLabel={accessibilityLabel}
            icon={icon}
            outline
            size={avatarGroupContext.size}
            src={src}
          />
        </Box>
      </Box>
    );
  }

  return (
    <AvatarInternal
      accessibilityLabel={accessibilityLabel}
      icon={icon}
      size={size}
      src={src}
    />
  );
};

export default Avatar;
