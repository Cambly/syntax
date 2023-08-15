import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";

import LinkButton from "./LinkButton";
import { createRef } from "react";

describe("linkButton", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <LinkButton text="button" href="https://www.google.com" />,
    );
    expect(baseElement).toBeTruthy();
  });
  it("renders the text", async () => {
    render(<LinkButton text="button" href="https://www.google.com" />);
    const linkButton = await screen.findAllByText("button");
    expect(linkButton).toHaveLength(1);
  });

  it("has the correct target", async () => {
    render(
      <LinkButton
        text="button"
        href="https://www.google.com"
        target="_blank"
        data-testid="linkbutton-test-id"
      />,
    );
    const linkButton = await screen.findByTestId("linkbutton-test-id");
    expect(linkButton).toHaveAttribute("target", "_blank");
  });

  it("has the correct href", async () => {
    render(
      <LinkButton
        text="button"
        href="https://www.google.com"
        data-testid="linkbutton-test-id"
      />,
    );
    const linkButton = await screen.findByTestId("linkbutton-test-id");
    expect(linkButton).toHaveAttribute("href", "https://www.google.com");
  });

  it("sets the correct data-testid", async () => {
    render(
      <LinkButton
        text="button"
        data-testid="linkButton-test-id"
        href="https://www.google.com"
      />,
    );
    const linkButton = await screen.findByTestId("linkButton-test-id");
    expect(linkButton).toBeInTheDocument();
  });

  it("fires the onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(
      <LinkButton
        text="button"
        data-testid="linkButton-test-id"
        href="https://www.google.com"
        onClick={handleClick}
      />,
    );
    const linkButton = screen.getByTestId("linkButton-test-id");
    await userEvent.click(linkButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("correctly applies fullWidth when set", async () => {
    render(
      <LinkButton
        text="button"
        data-testid="linkButton-test-id"
        href="https://www.google.com"
        fullWidth
      />,
    );
    const linkButton = await screen.findByTestId("linkButton-test-id");
    expect(linkButton).toHaveStyle({ width: "100%" });
  });

  it("allows ref to be set", () => {
    const ref = createRef<HTMLAnchorElement>();

    render(
      <LinkButton
        text="button"
        data-testid="linkButton-test-id"
        href="https://www.google.com"
        ref={ref}
      />,
    );
    expect(ref.current instanceof HTMLAnchorElement).toBeTruthy();
    expect(ref.current?.getAttribute("data-testid")).toStrictEqual(
      "linkButton-test-id",
    );
  });
});
