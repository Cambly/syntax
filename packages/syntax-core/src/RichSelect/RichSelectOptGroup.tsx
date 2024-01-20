import React, { forwardRef, type ReactElement } from "react";
import {
  Section as ReactAriaSection,
  Header as ReactAriaHeader,
} from "react-aria-components";
import styles from "./RichSelect.module.css";

const RichSelectOptGroup = forwardRef<
  HTMLDivElement,
  {
    "data-testid"?: string;
    label: string;
    children: ReactElement | ReactElement[];
  }
>(function RichSelectOptGroup(
  { "data-testid": dataTestId, label, children },
  ref,
): ReactElement {
  return (
    <ReactAriaSection
      data-testid={dataTestId}
      className={styles.section}
      ref={ref}
    >
      {label && (
        <ReactAriaHeader className={styles.label}>{label}</ReactAriaHeader>
      )}
      {children}
    </ReactAriaSection>
  );
});

export default RichSelectOptGroup;
