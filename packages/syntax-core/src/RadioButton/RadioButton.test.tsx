import { screen, render } from "@testing-library/react";
import RadioButton from "./RadioButton";
import { expect } from "vitest";

describe("radioButton", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <RadioButton
        checked
        label="Radio Button Label"
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
