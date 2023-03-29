import { render } from "@testing-library/react";
import SelectList from "./SelectList";
import { expect } from "vitest";

describe("select", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <SelectList
        options={[]}
        selectedValue=""
        onChange={() => {
          /* empty */
        }}
        placeholderText="placeholder"
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
