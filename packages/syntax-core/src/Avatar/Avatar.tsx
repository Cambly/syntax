import classNames from "classnames";
import styles from "./Avatar.module.css";

/**
 * Avatar is a circular image that represents a user.
 */
const Avatar = ({
  src,
  accessibilityLabel,
  size = "md",
}: {
  /**
   * The URL of the image to display as the avatar.
   */
  src: string;
  /**
   * The alt text to use for the image.
   * This should describe the image to people using screen readers.
   */
  accessibilityLabel: string;
  /**
   * The size of the avatar.
   * xs: 24px, sm: 32px, md: 48px, lg: 64px, xl: 120px.
   *
   * @defaultValue `md`
   */
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
}): JSX.Element => {
  return (
    <img
      alt={accessibilityLabel}
      src={src}
      className={classNames(styles.avatar, styles[size])}
    />
  );
};

export default Avatar;
