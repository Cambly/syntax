import styles from "./divider.module.css";
import classnames from "classnames";

export interface DividerProps {
  size: 100 | 200;
}

export function Divider({ size }: DividerProps) {
  return (
    <hr
      className={classnames(styles.divider, {
        [styles.dividerSize100]: size === 100,
        [styles.dividerSize200]: size === 200,
      })}
    />
  );
}

Divider.displayName = "Divider";
