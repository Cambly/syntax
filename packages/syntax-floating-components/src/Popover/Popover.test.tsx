import { screen, render } from "@testing-library/react";
import Popover from "./Popover";
import userEvent from "@testing-library/user-event";
import { Box } from "@cambly/syntax-core";

// class ResizeObserver {
//   observe() {
//     // do nothing
//   }
//   unobserve() {
//     // do nothing
//   }
//   disconnect() {
//     // do nothing
//   }
// }

// window.ResizeObserver = ResizeObserver;

describe("popover", () => {
  it("renders successfully", () => {
    render(
      <Popover content={<div data-testid="content">My Popover</div>}>
        <button data-testid="trigger">popover trigger</button>
      </Popover>,
    );
    expect(screen.getByTestId("trigger")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByTestId("content")).not.toBeVisible();
  });

  it("renders popover dialogue on trigger click", async () => {
    render(
      <Popover content={<div data-testid="content">My Popover</div>}>
        <button data-testid="trigger">popover trigger</button>
      </Popover>,
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.queryByTestId("content")).not.toBeVisible();
    const button = screen.getByTestId("trigger");
    await userEvent.click(button);
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeVisible();
  });

  it("does not render popover dialogue on trigger focus", async () => {
    render(
      <Popover content={<div data-testid="content">My Popover</div>}>
        <button data-testid="trigger">popover trigger</button>
      </Popover>,
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.queryByTestId("content")).not.toBeVisible();
    // tab to focus on the trigger
    await userEvent.tab();
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.queryByTestId("content")).not.toBeVisible();
    // when user actions on the focused trigger, it opens
    await userEvent.keyboard("{Enter}");
    expect(screen.getByTestId("content")).toBeVisible();
  });

  it("does not render popover dialogue on trigger hover", async () => {
    render(
      <Popover content={<div data-testid="content">My Popover</div>}>
        <button data-testid="trigger">popover trigger</button>
      </Popover>,
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.queryByTestId("content")).not.toBeVisible();
    // hover the trigger
    const button = screen.getByTestId("trigger");
    await userEvent.hover(button);
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.queryByTestId("content")).not.toBeVisible();
  });

  it("renders popover width correctly", async () => {
    render(
      <Popover
        content={
          <Box maxWidth="400px" width="100%" data-testid="content">
            My Popover
          </Box>
        }
      >
        <button data-testid="trigger">popover trigger</button>
      </Popover>,
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.queryByTestId("content")).not.toBeVisible();
    const button = screen.getByTestId("trigger");
    await userEvent.hover(button);
    expect(screen.queryByTestId("content")).toHaveStyle({
      maxWidth: "400px",
      width: "100%",
    });
  });
});
