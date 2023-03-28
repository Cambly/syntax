import { render } from "@testing-library/react";
import LabeledCheckbox from "./LabeledCheckbox";
import { expect } from "vitest";

describe("checkbox", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <LabeledCheckbox
        checked
        label="test"
        onChange={() => {
          /* empty */
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
