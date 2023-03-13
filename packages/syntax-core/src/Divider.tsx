import styles from "./divider.module.css";

export function Divider({}: Record<string, never>) {
  return <hr className={styles.divider} />;
}

Divider.displayName = "Divider";
