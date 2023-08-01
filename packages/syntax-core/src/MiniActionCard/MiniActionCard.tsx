import styles from "./MiniActionCard.module.css";

/**
 * [MiniActionCard](https://cambly-syntax.vercel.app/?path=/docs/components-miniactioncard--docs) is component that alerts users to a call to action.
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
