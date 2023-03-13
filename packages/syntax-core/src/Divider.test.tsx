import { screen, render } from "@testing-library/react";
import { Divider } from "./Divider";
import { expect } from "vitest";

describe("divider", () => {
  it("renders successfully", () => {
    const { baseElement } = render(<Divider />);
    expect(baseElement).toBeTruthy();
  });

  it("renders an role=separator element", async () => {
    render(<Divider />);
    const separator = await screen.findAllByRole("separator");
    expect(separator).toHaveLength(1);
  });
});
