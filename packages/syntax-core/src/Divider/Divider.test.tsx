import { screen, render } from "@testing-library/react";
import Divider from "./Divider";
import { expect } from "vitest";

describe("divider", () => {
  it("renders successfully", () => {
    const { baseElement } = render(<Divider />);
    expect(baseElement).toBeTruthy();
  });

  it("allow key to be set on Divider", () => {
    const { baseElement } = render(<Divider key="divider-key" />);
    expect(baseElement).toBeTruthy();
  });

  it("renders an role=separator element", async () => {
    render(<Divider />);
    const separator = await screen.findAllByRole("separator");
    expect(separator).toHaveLength(1);
  });

  it("renders with default color gray370", () => {
    render(<Divider />);
    const separator = screen.getByRole("separator");
    expect(separator.className).toContain("gray370BackgroundColor");
  });

  it.each([
    "white40",
    "white70",
    "gray270",
    "gray370",
    "gray870",
    "cream",
    "lilac",
    "navy",
    "orange",
    "pink",
    "purple",
    "red",
    "sky",
    "slate",
    "tan",
    "teal",
    "thistle",
  ] as const)("renders with color %s", (color) => {
    render(<Divider color={color} />);
    const separator = screen.getByRole("separator");
    expect(separator.className).toContain(`${color}BackgroundColor`);
  });
});
