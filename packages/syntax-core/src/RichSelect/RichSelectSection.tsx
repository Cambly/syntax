import React, { forwardRef, type ReactElement } from "react";
import {
  Section as ReactAriaSection,
  Header as ReactAriaHeader,
  Collection as ReactAriaCollection,
} from "react-aria-components";
import classNames from "classnames";
import boxStyles from "../Box/Box.module.css";
import layoutStyles from "../layout.module.css";

type RichSelectSectionProps = {
  "data-testid"?: string;
  label: string;
  children: ReactElement | ReactElement[];
  orientation?: "horizontal" | "vertical";
};

export default forwardRef<HTMLDivElement, RichSelectSectionProps>(
  function RichSelectSection(props, ref): ReactElement {
    const {
      "data-testid": dataTestId,
      label,
      children,
      orientation = "horizontal",
    } = props;

    return (
      <ReactAriaSection
        ref={ref}
        data-testid={dataTestId}
        className={classNames(
          [boxStyles.box, boxStyles.flex, boxStyles.flexWrap, boxStyles.gap3],
          {
            [boxStyles.row]: orientation === "horizontal",
            [boxStyles.column]: orientation === "vertical",
          },
        )}
      >
        <ReactAriaHeader className={classNames(layoutStyles.fullWidth)}>
          {label}
        </ReactAriaHeader>
        <ReactAriaCollection>{children}</ReactAriaCollection>
      </ReactAriaSection>
    );
  },
);
