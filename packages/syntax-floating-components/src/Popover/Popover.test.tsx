import { screen, render } from "@testing-library/react";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
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

describe("popover", () => {
  it("renders successfully", () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>popover trigger</button>
        </PopoverTrigger>
        <PopoverContent>My Popover</PopoverContent>
      </Popover>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("popover trigger")).toBeInTheDocument();
  });

  it("tooltip dialogue appears", async () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>popover trigger</button>
        </PopoverTrigger>
        <PopoverContent>My Popover</PopoverContent>
      </Popover>,
    );

    const button = screen.getByRole("button");
    expect(screen.queryByText("My Popover")).not.toBeInTheDocument();
    await userEvent.hover(button);
    expect(screen.getByText("My Popover")).toBeInTheDocument();
  });
});
