import { type ReactElement } from "react";
import classNames from "classnames";
import styles from "./Avatar.module.css";
import Box from "../Box/Box";
import { useAvatarGroup } from "../AvatarGroup/AvatarGroup";
import { useTheme } from "../ThemeProvider/ThemeProvider";

const sizeToIconStyles = {
  sm: { bottom: 6, marginInlineEnd: 2, height: 4, width: 4 },
  md: { bottom: 6, marginInlineEnd: 2, height: 8, width: 8 },
  lg: { bottom: 6, marginInlineEnd: 6, height: 12, width: 12 },
  xl: { bottom: 12, marginInlineEnd: 12, height: 16, width: 16 },
} as const;

const sizeToMarginClassic = {
  sm: -16,
  md: -28,
  lg: -48,
  xl: -88,
} as const;

const sizeToMarginCambio = {
  sm: -12,
  md: -20,
  lg: -28,
  xl: -28,
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
  size?: "sm" | "md" | "lg" | "xl";
  src: string;
}): ReactElement {
  const { themeName } = useTheme();

  return (
    <div
      className={classNames(
        styles.avatar,
        themeName === "classic" ? styles[size] : styles[`${size}Cambio`],
      )}
    >
      <img
        alt={accessibilityLabel}
        src={src}
        className={classNames(
          styles.avatarImage,
          themeName === "classic" && styles.avatarImageClassic,
          themeName === "cambio" && outline && styles.avatarImageOutlineCambio,
          themeName === "classic" ? styles[size] : styles[`${size}Cambio`],
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
   * Classic:
   * * `sm`: 24px
   * * `md`: 40px
   * * `lg`: 72px
   * * `xl`: 128px
   *
   * Cambio:
   * * `sm`: 32px
   * * `md`: 48px
   * * `lg`: 64px
   * * `xl`: 64px (deprecated, maps to `lg` in Cambio)
   *
   * @defaultValue `md`
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * URL of the image to display as the avatar.
   */
  src: string;
}): JSX.Element => {
  const avatarGroupContext = useAvatarGroup();
  const { themeName } = useTheme();

  if (avatarGroupContext !== null) {
    return (
      <Box
        position="relative"
        dangerouslySetInlineStyle={{
          __style: {
            marginInlineEnd:
              themeName === "cambio"
                ? sizeToMarginCambio[avatarGroupContext.size]
                : sizeToMarginClassic[avatarGroupContext.size],
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
            outline={themeName === "cambio"}
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
