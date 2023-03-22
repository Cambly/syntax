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
   * URL of the image to display as the avatar.
   */
  src: string;
  /**
   * Alt text to use for the image.
   * This should describe the image to people using screen readers.
   */
  accessibilityLabel: string;
  /**
   * Size of the avatar.
   *
   * `sm`: 24px, `md`: 40px, `lg`: 72px, `xl`: 128px
   *
   * @defaultValue `md`
   */
  size?: "sm" | "md" | "lg" | "xl";
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
