import { screen, render } from "@testing-library/react";
import Button from "./Button";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("button", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <Button
        onClick={() => {
          /* empty */
        }}
        text="Continue"
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders an role=button element", async () => {
    render(
      <Button
        onClick={() => {
          /* empty */
        }}
        text="Continue"
      />,
    );
    const button = await screen.findAllByRole("button");
    expect(button).toHaveLength(1);
  });

  it("renders the text", async () => {
    render(
      <Button
        onClick={() => {
          /* empty */
        }}
        text="Continue"
      />,
    );
    const button = await screen.findAllByText("Continue");
    expect(button).toHaveLength(1);
  });

  it("sets an accessibility label", async () => {
    render(
      <Button
        onClick={() => {
          /* empty */
        }}
        text="Continue"
        accessibilityLabel="Continue to the next step"
      />,
    );
    const button = await screen.findAllByLabelText("Continue to the next step");
    expect(button).toHaveLength(1);
  });

  it("fires the onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(
      <Button
        onClick={handleClick}
        text="Continue"
        accessibilityLabel="Continue to the next step"
      />,
    );
    const button = await screen.findAllByLabelText("Continue to the next step");
    await userEvent.click(button[0]);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("sets the data-testid", () => {
    const handleClick = vi.fn();
    render(
      <Button
        data-testid="button-test-id"
        onClick={handleClick}
        text="Continue"
        accessibilityLabel="Continue to the next step"
      />,
    );
    expect(screen.getByTestId("button-test-id")).toBeInTheDocument();
  });
});
