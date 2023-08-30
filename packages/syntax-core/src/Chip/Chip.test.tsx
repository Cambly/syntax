import { screen, render } from "@testing-library/react";
import Chip from "./Chip";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("chip", () => {
  it("renders successfully", () => {
    render(
      <Chip
        onChange={() => {
          /* empty */
        }}
        text="text on chip"
      />,
    );
    expect(screen).toBeTruthy();
  });
  it("renders an role=button element", async () => {
    render(
      <Chip
        onChange={() => {
          /* empty */
        }}
        text="text on chip"
      />,
    );
    const button = await screen.findAllByRole("button");
    expect(button).toHaveLength(1);
  });
  it("renders the text", async () => {
    render(
      <Chip
        onChange={() => {
          /* empty */
        }}
        text="text on chip"
      />,
    );
    const button = await screen.findAllByText("text on chip");
    expect(button).toHaveLength(1);
  });
  it("fires the onChange when clicked", async () => {
    const handleClick = vi.fn();
    render(<Chip onChange={handleClick} text="text on chip" />);
    const button = await screen.findByText("text on chip");
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it("sets the data-testid", () => {
    const handleClick = vi.fn();
    render(
      <Chip
        data-testid="button-test-id"
        onChange={handleClick}
        text="text on chip"
      />,
    );
    expect(screen.getByTestId("button-test-id")).toBeInTheDocument();
  });
  it("sets the correct pressed state", async () => {
    function ChipInteractive() {
      const [selected, setSelected] = useState(false);
      return (
        <Chip
          data-testid="button-test-id"
          onChange={() => setSelected(!selected)}
          selected={selected}
          text="text on chip"
        />
      );
    }
    render(<ChipInteractive />);
    const chip = await screen.findByTestId("button-test-id");
    expect(chip).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
  });
});
