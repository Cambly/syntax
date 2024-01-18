import { screen, render, act } from "@testing-library/react";
import Tooltip from "./Tooltip";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

// Fake timers are needed in this test in order to test past delays and nextTicks running down in library components
// The following setup is needed to use vi fake timers with userEvent library
// - https://github.com/testing-library/user-event/issues/1115#issuecomment-1565730917
vi.useFakeTimers();
globalThis.jest = {
  ...globalThis.jest,
  advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
};
const user = userEvent.setup({
  advanceTimers: vi.advanceTimersByTime.bind(vi),
});

describe("tooltip", () => {
  // click on the document body to put into pointer modality for hovering to work
  // eslint-disable-next-line vitest/no-hooks -- this is async and needs to be run before all tests
  beforeAll(async () => await user.click(document.body));

  it("renders successfully", () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger">My trigger</button>
      </Tooltip>,
    );
    expect(screen.getByTestId("trigger")).toBeVisible();
  });

  it("is not visible by default", () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger">My trigger</button>
      </Tooltip>,
    );
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("is visible when `open` is true", () => {
    render(
      <Tooltip open content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger">My trigger</button>
      </Tooltip>,
    );
    expect(screen.queryByTestId("content")).toBeVisible();
  });

  it("shows content on hover (mouseenter trigger)", async () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger" tabIndex={0}>
          My trigger
        </button>
      </Tooltip>,
    );
    // hover trigger
    await user.hover(screen.getByTestId("trigger"));
    expect(screen.queryByTestId("content")).toBeVisible();
  });

  it("hides content on unhover (mouseleave trigger)", async () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger" tabIndex={0}>
          My trigger
        </button>
      </Tooltip>,
    );
    // hover then unhover trigger
    await user.hover(screen.getByTestId("trigger"));
    await user.unhover(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers()); // wait for close delay
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("stays open when user hovers into tooltip", async () => {
    render(
      <Tooltip
        data-testid="tooltip"
        content={<span data-testid="content">My tooltip</span>}
      >
        <button data-testid="trigger" tabIndex={0}>
          My trigger
        </button>
      </Tooltip>,
    );
    // hover trigger
    await user.hover(screen.getByTestId("trigger"));
    // hovers off trigger into tooltip
    await user.hover(screen.getByTestId("content"));
    await act(() => vi.runAllTimers()); // wait for close delay
    // tooltip still visible
    expect(screen.queryByTestId("content")).toBeVisible();
  });

  it("closes when user moves mouse out of tooltip", async () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger" tabIndex={0}>
          My trigger
        </button>
      </Tooltip>,
    );
    // hover trigger
    await user.hover(screen.getByTestId("trigger"));
    // hover then leave tooltip
    await user.hover(screen.getByTestId("content"));
    await user.unhover(screen.getByTestId("content"));
    await act(() => vi.runAllTimers()); // wait for close delay
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("hides content when escape is pressed while hovering", async () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger">My trigger</button>
      </Tooltip>,
    );
    // hover trigger
    await user.hover(screen.getByTestId("trigger"));
    // press escape to hide the tooltip (instant action, no close delay applied)
    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("shows content on focus", async () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger">My trigger</button>
      </Tooltip>,
    );
    // press tab to focus on the tooltip
    await user.tab();
    expect(screen.queryByTestId("content")).toBeVisible();
  });

  it("hides content when escape is pressed while focused", async () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger">My trigger</button>
      </Tooltip>,
    );
    await user.tab();
    // press escape to hide the tooltip
    await user.type(document.body, "{Escape}");
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });
});
