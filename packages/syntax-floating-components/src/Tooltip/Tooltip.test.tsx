import { screen, render } from "@testing-library/react";
import Tooltip from "./Tooltip";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("tooltip", () => {
  it("renders successfully", () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger">My trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole("button")).toBeVisible();
    expect(screen.getByTestId("trigger")).toBeVisible();
  });

  it("shows content on hover", async () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger">My trigger</button>
      </Tooltip>,
    );

    const button = screen.getByRole("button");
    expect(screen.queryByTestId("content")).not.toBeVisible();
    await userEvent.hover(button);
    expect(screen.getByTestId("content")).toBeVisible();
  });

  it("shows content on focus", async () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger">My trigger</button>
      </Tooltip>,
    );

    expect(screen.queryByTestId("content")).not.toBeVisible();
    // press tab to focus on the tooltip
    await userEvent.tab();
    expect(screen.getByTestId("content")).toBeVisible();
  });

  it("hides content when escape is pressed while hovering", async () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger">My trigger</button>
      </Tooltip>,
    );

    const button = screen.getByRole("button");
    await userEvent.hover(button);
    expect(screen.getByTestId("content")).toBeVisible();
    // press escape to hide the tooltip
    await userEvent.type(document.body, "{Escape}");
    expect(screen.queryByTestId("content")).not.toBeVisible();
  });

  it("hides content when escape is pressed while focused", async () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger">My trigger</button>
      </Tooltip>,
    );

    await userEvent.tab();
    expect(screen.getByTestId("content")).toBeVisible();
    // press escape to hide the tooltip
    await userEvent.type(document.body, "{Escape}");
    expect(screen.queryByTestId("content")).not.toBeVisible();
  });

  it("forwards focus to the first focusable element it finds in children", async () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <button data-testid="trigger">My trigger</button>
      </Tooltip>,
    );
    // press tab to focus on the trigger
    await userEvent.tab();
    // focus is forwarded to the trigger because buttons are interactive
    expect(screen.getByTestId("trigger")).toHaveFocus();
    expect(screen.getByTestId("content")).toBeVisible();
  });

  it("does not forward focus when there are no focusable elements in children", async () => {
    render(
      <Tooltip content={<span data-testid="content">My tooltip</span>}>
        <span data-testid="trigger">My trigger</span>
      </Tooltip>,
    );
    // press tab to focus on the trigger
    await userEvent.tab();
    // focus is not forwarded to the trigger because span is not interactive by default
    expect(screen.getByTestId("trigger")).not.toHaveFocus();
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId("trigger").parentNode).toHaveFocus();
    expect(screen.getByTestId("content")).toBeVisible();
  });

  it("allows tab focus on content inside the tooltip when content is visible from tab-focus", async () => {
    render(
      <Tooltip content={<>I am some content and <button data-testid="content-button">I am a button</button></>}>
        <button data-testid="trigger">My trigger</button>
      </Tooltip>,
    );
    // press tab to focus on the trigger
    await userEvent.tab();
    // focus is forwarded to the trigger when it is focusable
    expect(screen.getByTestId("trigger")).toHaveFocus();
    // tooltip shows
    expect(screen.getByTestId("content-button")).toBeVisible();
    // press tab to focus on the tooltip content (necessary in tests to focus on the focus trap from preserveTabOrder)
    await userEvent.tab();
    // press tab again to tab to button in the content
    await userEvent.tab();
    expect(screen.getByTestId("content-button")).toBeVisible();
    expect(screen.getByTestId("content-button")).toHaveFocus();
  });
});
