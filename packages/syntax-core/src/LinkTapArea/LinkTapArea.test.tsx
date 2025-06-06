import React, { createRef } from "react";
import { screen, render } from "@testing-library/react";
import LinkTapArea from "./LinkTapArea";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("linkTapArea", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <LinkTapArea
        onClick={() => {
          /* empty */
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders its children", async () => {
    render(
      <LinkTapArea
        onClick={() => {
          /* empty */
        }}
      >
        <div data-testid="link-tap-area-child-testid">Continue</div>
      </LinkTapArea>,
    );
    const child = await screen.findByTestId("link-tap-area-child-testid");
    expect(child).toHaveTextContent("Continue");
  });

  it("has the correct target", async () => {
    render(
      <LinkTapArea
        href="https://www.google.com"
        target="_blank"
        data-testid="link-tap-area-testid"
        onClick={() => {
          /* empty */
        }}
      />,
    );
    const linkTapArea = await screen.findByTestId("link-tap-area-testid");
    expect(linkTapArea).toHaveAttribute("target", "_blank");
  });

  it("has the correct href", async () => {
    render(
      <LinkTapArea
        href="https://www.google.com"
        target="_blank"
        data-testid="link-tap-area-testid"
        onClick={() => {
          /* empty */
        }}
      />,
    );
    const linkTapArea = await screen.findByTestId("link-tap-area-testid");
    expect(linkTapArea).toHaveAttribute("href", "https://www.google.com");
  });

  it("allows ref to be set", () => {
    const ref = createRef<HTMLAnchorElement>();

    render(
      <LinkTapArea
        href="https://www.google.com"
        target="_blank"
        data-testid="link-tap-area-testid"
        onClick={() => {
          /* empty */
        }}
        ref={ref}
      />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toBeTruthy();
    expect(ref.current?.getAttribute("data-testid")).toStrictEqual(
      "link-tap-area-testid",
    );
  });

  it("fires onClick when clicked and the LinkTapArea is enabled", async () => {
    const handleTap = vi.fn();
    render(
      <LinkTapArea data-testid="link-tap-area-testid" onClick={handleTap} />,
    );
    const linkTapArea = await screen.findByTestId("link-tap-area-testid");
    await userEvent.click(linkTapArea);
    expect(handleTap).toHaveBeenCalledTimes(1);
  });

  it("sets an accessibility label", async () => {
    render(
      <LinkTapArea
        data-testid="link-tap-area-testid"
        onClick={() => {
          /* empty */
        }}
        accessibilityLabel="Continue to the next step"
      />,
    );
    const linkTapArea = await screen.findByLabelText(
      "Continue to the next step",
    );
    expect(linkTapArea).toBeInTheDocument();
  });
});
