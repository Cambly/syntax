import { screen, render } from "@testing-library/react";
import { Tooltip } from "./Tooltip";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";
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

describe("tooltip", () => {
  it("renders successfully", () => {
    render(
      <Tooltip content="My tooltip">
        <button>My trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("My trigger")).toBeInTheDocument();
  });

  it("tooltip dialogue appears", async () => {
    render(
      <Tooltip content="My tooltip">
        <button>My trigger</button>
      </Tooltip>,
    );

    const button = screen.getByRole("button");
    expect(screen.queryByText("My tooltip")).not.toBeInTheDocument();
    await userEvent.hover(button);
    expect(screen.getByText("My tooltip")).toBeInTheDocument();
  });
});
