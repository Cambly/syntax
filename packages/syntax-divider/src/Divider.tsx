import styles from "./divider.module.css";

export function Divider({}: {}) {
  return <hr className={styles.divider} />;
}

Divider.displayName = "Divider";
