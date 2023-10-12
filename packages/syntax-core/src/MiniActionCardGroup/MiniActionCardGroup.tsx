import React, { type ReactNode } from "react";

import styles from "./MiniActionCardGroup.module.css";

export default function MiniActionCardGroup({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <div className={styles.miniActionCardGroup}>{children}</div>;
}
