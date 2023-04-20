import { screen, render } from "@testing-library/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("tooltip", () => {
  it("renders successfully", () => {
    render(
      <Tooltip>
        <TooltipTrigger>My trigger</TooltipTrigger>
        <TooltipContent>My tooltip</TooltipContent>
      </Tooltip>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("tooltip dialogue appears", async () => {
    render(
      <Tooltip>
        <TooltipTrigger>My trigger</TooltipTrigger>
        <TooltipContent>My tooltip</TooltipContent>
      </Tooltip>,
    );

    const button = screen.getByRole("button");
    expect(screen.queryByText("My tooltip")).not.toBeInTheDocument();
    class ResizeObserver {
      observe() {
        // do nothing
      }
      unobserve() {
        // do nothing
      }
      disconnect() {
        // do nothing
      }
    }

    window.ResizeObserver = ResizeObserver;
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.click(button);
    expect(screen.getByText("My tooltip")).toBeInTheDocument();
  });
});
