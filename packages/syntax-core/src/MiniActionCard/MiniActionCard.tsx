import styles from "./MiniActionCard.module.css";

/**
 * Card is a basic container component to apply consistent styling and render child components.
 */
const MiniActionCard = ({
  children,
}: {
  /**
   * The child components to render within Card.
   */
  children: JSX.Element;
}): JSX.Element => <div className={styles.miniActionCard}>{children}</div>;

export default MiniActionCard;
