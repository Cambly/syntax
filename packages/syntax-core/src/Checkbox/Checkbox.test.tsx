import { screen, render } from "@testing-library/react";
import Checkbox from "./Checkbox";
import { expect } from "vitest";

describe("checkbox", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <Checkbox
        checked
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
