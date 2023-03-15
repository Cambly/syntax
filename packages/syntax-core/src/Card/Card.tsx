import styles from "./Card.module.css";

/**
 * Card is a basic container component to apply consistent styling and render child components.
 */
const Card = ({
  children,
}: {
  /**
   * The child components to render within Card.
   */
  children: JSX.Element;
}): JSX.Element => <div className={styles.card}>{children}</div>;

export default Card;
