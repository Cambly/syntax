import React from "react";
import { screen, render } from "@testing-library/react";
import IconLinkButton from "./IconLinkButton";
import StarFilled from "../../../syntax-icons/src/icons/StarFilled";

describe("iconLinkButton", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <IconLinkButton
        accessibilityLabel="Star"
        icon={StarFilled}
        href="https://www.google.com"
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("sets an accessibility label", async () => {
    render(
      <IconLinkButton
        icon={StarFilled}
        href="https://www.google.com"
        accessibilityLabel="Continue to the next step"
      />,
    );
    const button = await screen.findAllByLabelText("Continue to the next step");
    expect(button).toHaveLength(1);
  });
});
