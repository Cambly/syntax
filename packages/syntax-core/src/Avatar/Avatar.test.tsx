import { screen, render } from "@testing-library/react";
import Avatar from "./Avatar";
import { expect } from "vitest";

describe("avatar", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <Avatar accessibilityLabel="Joseph Liotta" src="image.png" />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders an image with the correct label", async () => {
    render(<Avatar accessibilityLabel="Joseph Liotta" src="image.png" />);
    const image = await screen.findByAltText("Joseph Liotta");
    expect(image instanceof HTMLImageElement).toEqual(true);
  });
});
