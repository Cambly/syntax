import React, { type ReactNode } from "react";
import styles from "./MiniActionCard.module.css";

/**
 * [MiniActionCard](https://cambly-syntax.vercel.app/?path=/docs/components-miniactioncard--docs) is component that alerts users to a call to action.
 *
 * @deprecated - TODO: remove in version 2.0.0
 */
const MiniActionCard = ({
  children,
}: {
  /**
   * The child components to render within MiniActionCard.
   */
  children: ReactNode;
}): JSX.Element => <div className={styles.miniActionCard}>{children}</div>;

export default MiniActionCard;
