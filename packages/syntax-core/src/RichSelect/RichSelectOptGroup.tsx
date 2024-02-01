import React, { forwardRef, type ReactElement } from "react";
import {
  Section as ReactAriaSection,
  Header as ReactAriaHeader,
} from "react-aria-components";
import classNames from "classnames";
import boxStyles from "../Box/Box.module.css";
import layoutStyles from "../layout.module.css";

const RichSelectOptGroup = forwardRef<
  HTMLDivElement,
  {
    "data-testid"?: string;
    label: string;
    children: ReactElement | ReactElement[];
    orientation?: "horizontal" | "vertical";
  }
>(function RichSelectOptGroup(
  { "data-testid": dataTestId, label, children, orientation = "horizontal" },
  ref,
): ReactElement {
  return (
    <ReactAriaSection
      data-testid={dataTestId}
      className={classNames(
        [boxStyles.box, boxStyles.flex, boxStyles.flexWrap, boxStyles.gap3],
        {
          [boxStyles.row]: orientation === "horizontal",
          [boxStyles.column]: orientation === "vertical",
        },
      )}
      ref={ref}
    >
      {label && (
        <ReactAriaHeader className={classNames(layoutStyles.fullWidth)}>
          {label}
        </ReactAriaHeader>
      )}
      {children}
    </ReactAriaSection>
  );
});

export default RichSelectOptGroup;
