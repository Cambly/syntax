import { screen, render } from "@testing-library/react";
import IconButton from "./IconButton";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Star from "@mui/icons-material/Star";

describe("iconButton", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <IconButton
        onClick={() => {
          /* empty */
        }}
        icon={Star}
        accessibilityLabel="accessibility label is required"
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders an role=IconButton element", async () => {
    render(
      <IconButton
        onClick={() => {
          /* empty */
        }}
        icon={Star}
        accessibilityLabel="accessibility label is required"
      />,
    );
    const button = await screen.findAllByRole("button");
    expect(button).toHaveLength(1);
  });

  it("sets an accessibility label", async () => {
    render(
      <IconButton
        onClick={() => {
          /* empty */
        }}
        icon={Star}
        accessibilityLabel="Continue to the next step"
      />,
    );
    const button = await screen.findAllByLabelText("Continue to the next step");
    expect(button).toHaveLength(1);
  });

  it("fires the onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        onClick={handleClick}
        icon={Star}
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
      <IconButton
        data-testid="iconbutton-test-id"
        onClick={handleClick}
        icon={Star}
        accessibilityLabel="Continue to the next step"
      />,
    );
    expect(screen.getByTestId("iconbutton-test-id")).toBeInTheDocument();
  });
});
