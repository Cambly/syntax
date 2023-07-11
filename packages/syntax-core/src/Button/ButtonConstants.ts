import styles from "./Button.module.css";

export const textVariant = {
  // Replace with `Typography` once it lands in `syntax-core`
  ["sm"]: 100,
  ["md"]: 200,
  ["lg"]: 300,
} as const;

export const loadingIconSize = {
  ["sm"]: 16,
  ["md"]: 20,
  ["lg"]: 24,
};

export const iconSize = {
  ["sm"]: styles.smIcon,
  ["md"]: styles.mdIcon,
  ["lg"]: styles.lgIcon,
};
