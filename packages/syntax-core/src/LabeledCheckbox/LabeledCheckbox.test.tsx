import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LabeledCheckbox from "./LabeledCheckbox";
import { expect, vi } from "vitest";

describe("checkbox", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <LabeledCheckbox
        checked
        label="test"
        onClick={() => {
          /* empty */
        }}
        onKeyDown={() => {
          /* empty */
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
