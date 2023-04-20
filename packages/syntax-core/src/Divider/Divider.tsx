import styles from "./Divider.module.css";

/**
 * Divider is a thin horizontal line to group content in lists and layouts.
 */
export default function Divider(): React.ReactElement {
  return <hr className={styles.divider} />;
}

Divider.displayName = "Divider";
