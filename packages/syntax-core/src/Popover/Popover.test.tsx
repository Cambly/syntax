import { screen, render } from "@testing-library/react";
import Popover from "./Popover";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

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

describe("popover", () => {
  it("renders successfully", () => {
    render(
      <Popover
        data-testid="dialog"
        content={<div data-testid="content">My Popover</div>}
      >
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    expect(screen.getByTestId("trigger")).toBeInTheDocument();
    expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("is visible when `open` is true", () => {
    render(
      <Popover open content={<div data-testid="content">My Popover</div>}>
        <button>My Trigger</button>
      </Popover>,
    );
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeVisible();
  });

  it("does not render popover dialogue on trigger focus", async () => {
    render(
      <Popover content={<div data-testid="content">My Popover</div>}>
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    // tab to focus on the trigger
    await user.tab();
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("renders dialog when user actions on the focused trigger", async () => {
    render(
      <Popover content={<div data-testid="content">My Popover</div>}>
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    // tab to focus on the trigger
    await user.tab();
    // when user actions on the focused trigger, it opens
    await user.keyboard("{Enter}");
    expect(screen.getByTestId("content")).toBeVisible();
  });

  it("does not render popover dialogue on trigger hover", async () => {
    render(
      <Popover content={<div data-testid="content">My Popover</div>}>
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    // hover the trigger
    const button = screen.getByTestId("trigger");
    await user.hover(button);
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("renders popover dialogue on trigger click", async () => {
    render(
      <Popover content={<div data-testid="content">My Popover</div>}>
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );

    await user.click(screen.getByTestId("trigger"));
    expect(screen.getByTestId("content")).toBeVisible();
  });

  it("focuses on dialog when opened with click", async () => {
    render(
      <Popover data-testid="dialog" content={<div>My Popover</div>}>
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    // click trigger to focus dialog
    await user.click(screen.getByTestId("trigger"));
    expect(screen.getByTestId("dialog")).toHaveFocus();
  });

  it('focuses on dialog when opened with "Enter" key', async () => {
    render(
      <Popover data-testid="dialog" content={<div>My Popover</div>}>
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    // tab to focus on the trigger
    await user.tab();
    // when user actions on the focused trigger, it opens
    await user.keyboard("{Enter}");
    expect(screen.getByTestId("dialog")).toHaveFocus();
  });

  it("can tab focus through content in dialog when opened", async () => {
    render(
      <Popover
        content={
          <div data-testid="content">
            My Popover{" "}
            <a href="#" data-testid="target-1">
              tabbable target 1
            </a>
            <a href="#" data-testid="target-2">
              tabbable target 2
            </a>
          </div>
        }
      >
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    // tab to focus on the trigger
    await user.tab();
    // when user actions on the focused trigger, it opens
    await user.keyboard("{Enter}");
    // dialog has focus now
    // tab to focus on elements in content the content
    await user.tab();
    expect(screen.getByTestId("target-1")).toHaveFocus();
    await user.tab();
    expect(screen.getByTestId("target-2")).toHaveFocus();
  });

  it("traps focus in dialog when opened", async () => {
    render(
      <Popover
        content={
          <div data-testid="content">
            My Popover{" "}
            <a href="#" data-testid="target-1">
              tabbable target 1
            </a>
            <a href="#" data-testid="target-2">
              tabbable target 2
            </a>
          </div>
        }
      >
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    await user.tab(); // trigger has focus
    await user.keyboard("{Enter}"); // dialog has focus now
    await user.tab(); // target-1 has focus
    await user.tab(); // target-2 has focus
    // tab again, should go back to first focusable element
    await user.tab();
    expect(screen.getByTestId("target-1")).toHaveFocus();
    await user.tab();
    expect(screen.getByTestId("target-2")).toHaveFocus();
  });

  it("closes when user clicks outside of popover", async () => {
    render(
      <Popover
        content={<div data-testid="content">My Popover</div>}
        data-testid="dialog"
      >
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    // open popover
    await user.click(screen.getByTestId("trigger"));
    // click outside of popover
    await user.click(document.body);
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("closes when user clicks on trigger a second time", async () => {
    render(
      <Popover
        content={<div data-testid="content">My Popover</div>}
        data-testid="dialog"
      >
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    // open popover
    await user.click(screen.getByTestId("trigger"));
    // click on trigger again
    await user.click(screen.getByTestId("trigger"));
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it('closes when user presses "Escape" key', async () => {
    render(
      <Popover
        content={<div data-testid="content">My Popover</div>}
        data-testid="dialog"
      >
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    // open popover
    await user.click(screen.getByTestId("trigger"));
    // press escape to hide the popover
    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it('closes when user presses "Escape" key while focused on tabbable element in dialog', async () => {
    render(
      <Popover
        content={
          <div data-testid="content">
            My Popover{" "}
            <a href="#" data-testid="target-1">
              tabbable target
            </a>
          </div>
        }
      >
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    // open popover
    await user.tab(); // trigger has focus
    await user.keyboard("{Enter}"); // dialog has focus now
    // tab to focus on the first target
    await user.tab();
    expect(screen.getByTestId("target-1")).toHaveFocus();
    // press escape to hide the popover
    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("can show nested popovers", async () => {
    render(
      <Popover
        content={
          <div data-testid="content">
            My Popover{" "}
            <Popover
              content={
                <div data-testid="nested-content">My Nested Popover</div>
              }
            >
              <button data-testid="nested-trigger">My Nested Trigger</button>
            </Popover>
          </div>
        }
      >
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    await user.tab(); // trigger has focus
    await user.keyboard("{Enter}"); // dialog has focus now
    await user.tab(); // nested-trigger has focus
    expect(screen.getByTestId("nested-trigger")).toHaveFocus();
    await user.keyboard("{Enter}"); // open nested dialog
    expect(screen.getByTestId("nested-content")).toBeVisible();
  });

  it("can tab to focus through nested popover content", async () => {
    render(
      <Popover
        content={
          <div data-testid="content">
            My Popover{" "}
            <Popover
              content={
                <div data-testid="nested-content">
                  My Nested Popover{" "}
                  <a href="#" data-testid="nested-target-1">
                    tabbable target 1
                  </a>
                  <a href="#" data-testid="nested-target-2">
                    tabbable target 2
                  </a>
                </div>
              }
            >
              <button data-testid="nested-trigger">My Nested Trigger</button>
            </Popover>
          </div>
        }
      >
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    await user.tab(); // trigger has focus
    await user.keyboard("{Enter}"); // dialog has focus now
    await user.tab(); // nested-trigger has focus
    expect(screen.getByTestId("nested-trigger")).toHaveFocus();
    await user.keyboard("{Enter}"); // open nested dialog
    await user.tab(); // nested-target-1 has focus
    expect(screen.getByTestId("nested-target-1")).toHaveFocus();
    await user.tab(); // nested-target-2 has focus
    expect(screen.getByTestId("nested-target-2")).toHaveFocus();
    // focus trap should loop back to first focusable element
    await user.tab(); // nested-target-1 has focus
    expect(screen.getByTestId("nested-target-1")).toHaveFocus();
  });

  it("closes last opened popover each time a click outside happens", async () => {
    render(
      <Popover
        content={
          <div data-testid="content">
            My Popover{" "}
            <Popover
              content={
                <div data-testid="nested-content">My Nested Popover</div>
              }
            >
              <button data-testid="nested-trigger">My Nested Trigger</button>
            </Popover>
          </div>
        }
      >
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    await user.click(screen.getByTestId("trigger"));
    await user.click(screen.getByTestId("nested-trigger"));
    expect(screen.queryByTestId("nested-content")).toBeVisible();
    await user.click(document.body);
    expect(screen.queryByTestId("nested-content")).not.toBeInTheDocument();
    expect(screen.getByTestId("nested-trigger")).toBeVisible();
    await user.click(document.body);
    expect(screen.queryByTestId("nested-trigger")).not.toBeInTheDocument();
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("closes last opened nested popover each time escape key is pressed", async () => {
    render(
      <Popover
        content={
          <div data-testid="content">
            My Popover{" "}
            <Popover
              content={
                <div data-testid="nested-content">My Nested Popover</div>
              }
            >
              <button data-testid="nested-trigger">My Nested Trigger</button>
            </Popover>
          </div>
        }
      >
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    await user.tab(); // trigger has focus
    await user.keyboard("{Enter}"); // dialog has focus now
    await user.tab(); // nested-trigger has focus
    await user.keyboard("{Enter}"); // nested dialog has focus now
    expect(screen.queryByTestId("nested-content")).toBeVisible();
    await user.type(document.body, "{Escape}"); // close nested dialog, nested-trigger has focus now
    expect(screen.queryByTestId("nested-content")).not.toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
    await user.type(document.body, "{Escape}");
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("fires onOpenChange callback when tooltip open state changes (before animations finish)", async () => {
    const spy = vi.fn();
    render(
      <Popover
        onOpenChange={spy}
        content={<span data-testid="content">My tooltip</span>}
      >
        <button data-testid="trigger" tabIndex={0}>
          My trigger
        </button>
      </Popover>,
    );

    expect(spy).toHaveBeenCalledTimes(0);
    await user.click(screen.getByTestId("trigger")); // open
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);
    await user.click(document.body); // close
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(false);
  });

  // NOTE: this is basically the same as onOpenChange test right now.
  //      expect to tweak this test if we add animations to tooltip style
  //      in that case should test opOpenChange called after close delay, not immediately
  //      and onChangeContentVisibility called after animation finishes (test the specific times)
  it("fires onChangeContentVisibility callback when overlay content is opened and animation finishes", async () => {
    const spy = vi.fn();
    render(
      <Popover
        content={<div data-testid="content">My Popover</div>}
        onChangeContentVisibility={spy}
      >
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    expect(spy).toHaveBeenCalledTimes(0);
    await user.tab(); // trigger has focus
    await user.keyboard("{Enter}"); // dialog has focus now
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);
    await user.keyboard("{Escape}"); // dialog has focus now
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(false);
  });

  it("disabled prop deactivates trigger", async () => {
    render(
      <Popover disabled content={<div data-testid="content">My Popover</div>}>
        <button data-testid="trigger">My Trigger</button>
      </Popover>,
    );
    await user.click(screen.getByTestId("trigger"));
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });
});
