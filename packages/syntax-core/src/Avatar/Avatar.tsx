import classNames from "classnames";
import styles from "./Avatar.module.css";
import Box from "../Box/Box";

const sizeToIconStyles = {
  sm: { top: 4, marginInlineEnd: 0 },
  md: { top: 8, marginInlineEnd: 0 },
  lg: { top: 20, marginInlineEnd: 4 },
  xl: { top: 32, marginInlineEnd: 8 },
} as const;

const sizeToIconSize = {
  sm: 8,
  md: 8,
  lg: 12,
  xl: 16,
} as const;

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
   * * `sm`: 24px
   * * `md`: 40px
   * * `lg`: 72px
   * * `xl`: 128px
   *
   * @defaultValue `md`
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * URL of the image to display as the avatar.
   */
  src: string;
}): JSX.Element => {
  return (
    <>
      <img
        alt={accessibilityLabel}
        src={src}
        className={classNames(styles.avatar, styles[size])}
      />
      {!!icon && (
        <Box display="flex" position="relative" justifyContent="end">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            dangerouslySetInlineStyle={{
              __style: { border: "1px solid white", ...sizeToIconStyles[size] },
            }}
            rounding="full"
            height={sizeToIconSize[size]}
            width={sizeToIconSize[size]}
          >
            {icon}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Avatar;
