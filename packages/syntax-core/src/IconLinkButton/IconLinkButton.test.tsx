import React from "react";
import { screen, render } from "@testing-library/react";
import IconLinkButton from "./IconLinkButton";
import StarFilled from "../../../syntax-icons/src/icons/StarFilled";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

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

  it("fires the onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(
      <IconLinkButton
        onClick={handleClick}
        icon={StarFilled}
        href="https://www.google.com"
        accessibilityLabel="Continue to the next step"
      />,
    );
    const button = await screen.findAllByLabelText("Continue to the next step");
    await userEvent.click(button[0]);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("sets the data-testid", () => {
    render(
      <IconLinkButton
        icon={StarFilled}
        href="https://www.google.com"
        accessibilityLabel="Continue to the next step"
        data-testid="test-id"
      />,
    );
    expect(screen.getByTestId("test-id")).toBeInTheDocument();
  });
  it("has the correct target", async () => {
    render(
      <IconLinkButton
        href="https://www.google.com"
        target="_blank"
        data-testid="iconlinkbutton-test-id"
        accessibilityLabel="Continue to the next step"
        icon={StarFilled}
      />,
    );
    const iconLinkButton = await screen.findByTestId("iconlinkbutton-test-id");
    expect(iconLinkButton).toHaveAttribute("target", "_blank");
  });

  it("has the correct href", async () => {
    render(
      <IconLinkButton
        href="https://www.google.com"
        data-testid="iconlinkbutton-test-id"
        accessibilityLabel="Continue to the next step"
        icon={StarFilled}
      />,
    );
    const iconLinkButton = await screen.findByTestId("iconlinkbutton-test-id");
    expect(iconLinkButton).toHaveAttribute("href", "https://www.google.com");
  });

  it("allows ref to be set", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <IconLinkButton
        href="https://www.google.com"
        ref={ref}
        accessibilityLabel="Continue to the next step"
        icon={StarFilled}
        data-testid="iconlinkbutton-test-id"
      />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toBeTruthy();
    expect(ref.current?.getAttribute("data-testid")).toStrictEqual(
      "iconlinkbutton-test-id",
    );
  });
});
