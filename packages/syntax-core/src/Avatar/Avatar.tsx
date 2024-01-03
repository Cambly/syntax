import classNames from "classnames";
import styles from "./Avatar.module.css";
import Box from "../Box/Box";

const sizeToIconStyles = {
  sm: { bottom: 8, marginInlineEnd: 0, height: 4, width: 4 },
  md: { bottom: 8, marginInlineEnd: 0, height: 8, width: 8 },
  lg: { bottom: 8, marginInlineEnd: 4, height: 12, width: 12 },
  xl: { bottom: 12, marginInlineEnd: 12, height: 16, width: 16 },
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
    <div className={styles[size]}>
      <img
        alt={accessibilityLabel}
        src={src}
        className={classNames(styles.avatar, styles[size])}
      />
      {icon && (
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
          >
            {icon}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Avatar;
