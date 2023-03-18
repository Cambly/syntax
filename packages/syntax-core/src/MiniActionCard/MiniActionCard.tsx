import styles from "./MiniActionCard.module.css";

/**
 * MiniActionCard is component that alerts users to a call to action.
 */
const MiniActionCard = ({
  children,
}: {
  /**
   * The child components to render within MiniActionCard.
   */
  children: JSX.Element;
}): JSX.Element => <div className={styles.miniActionCard}>{children}</div>;

export default MiniActionCard;
