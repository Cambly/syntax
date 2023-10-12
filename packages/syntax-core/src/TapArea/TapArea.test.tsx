import { screen, render } from "@testing-library/react";
import TapArea from "./TapArea";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";

describe("tapArea", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <TapArea
        onClick={() => {
          /* empty */
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders an role=button element", async () => {
    render(
      <TapArea
        onClick={() => {
          /* empty */
        }}
      />,
    );
    const tapArea = await screen.findAllByRole("button");
    expect(tapArea).toHaveLength(1);
  });

  it("renders its children", async () => {
    render(
      <TapArea
        onClick={() => {
          /* empty */
        }}
      >
        <div data-testid="tap-area-child-testid">Continue</div>
      </TapArea>,
    );
    const child = await screen.findByTestId("tap-area-child-testid");
    expect(child).toHaveTextContent("Continue");
  });

  it("correctly applies fullWidth when set", async () => {
    render(
      <TapArea
        data-testid="tap-area-testid"
        onClick={() => {
          /* empty */
        }}
        fullWidth
      />,
    );
    const tapArea = await screen.findByTestId("tap-area-testid");
    expect(tapArea).toHaveStyle({ width: "100%" });
  });

  it("sets an accessibility label", async () => {
    render(
      <TapArea
        data-testid="tap-area-testid"
        onClick={() => {
          /* empty */
        }}
        accessibilityLabel="Continue to the next step"
        fullWidth
      />,
    );
    const tapArea = await screen.findAllByLabelText(
      "Continue to the next step",
    );
    expect(tapArea).toHaveLength(1);
  });

  it("fires onClick when clicked and the TapArea is enabled", async () => {
    const handleTap = vi.fn();
    render(
      <TapArea
        data-testid="tap-area-testid"
        onClick={handleTap}
        accessibilityLabel="Continue to the next step"
      />,
    );
    const tapArea = await screen.findAllByLabelText(
      "Continue to the next step",
    );
    await userEvent.click(tapArea[0]);
    expect(handleTap).toHaveBeenCalledTimes(1);
  });

  it("does not fire the onClick when clicked and the TapArea is disabled", async () => {
    const handleTap = vi.fn();
    render(
      <TapArea
        disabled
        data-testid="tap-area-testid"
        onClick={handleTap}
        accessibilityLabel="Continue to the next step"
      />,
    );
    const tapArea = await screen.findAllByLabelText(
      "Continue to the next step",
    );
    await userEvent.click(tapArea[0]);
    expect(handleTap).toHaveBeenCalledTimes(0);
  });

  it("allows us to focus the TapArea", async () => {
    render(
      <TapArea
        data-testid="tap-area-testid"
        onClick={() => {
          /* empty */
        }}
      />,
    );
    const tapArea = await screen.findByTestId("tap-area-testid");
    tapArea.focus();
    expect(tapArea).toHaveFocus();
  });

  it("does not allow us to focus the TapArea when it's disabled", async () => {
    render(
      <TapArea
        data-testid="tap-area-testid"
        disabled
        onClick={() => {
          /* empty */
        }}
      />,
    );
    const tapArea = await screen.findByTestId("tap-area-testid");
    tapArea.focus();
    expect(tapArea).not.toHaveFocus();
  });

  it("to focus the TapArea programatically when tabindex = -1", async () => {
    render(
      <TapArea
        data-testid="tap-area-testid"
        tabIndex={-1}
        onClick={() => {
          /* empty */
        }}
      />,
    );
    const tapArea = await screen.findByTestId("tap-area-testid");
    tapArea.focus();
    expect(tapArea).toHaveFocus();
  });

  it("forward the ref correctly", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <TapArea
        data-testid="tap-area-testid"
        ref={ref}
        onClick={() => {
          /* empty */
        }}
      />,
    );
    expect(ref.current instanceof HTMLDivElement).toBeTruthy();
    expect(ref.current?.getAttribute("data-testid")).toStrictEqual(
      "tap-area-testid",
    );
  });

  it("when focused it is keyboard interactable", async () => {
    const spy = vi.fn();
    render(<TapArea data-testid="tap-area-testid" onClick={spy} />);

    const tapArea = await screen.findByTestId("tap-area-testid");
    // tab to focus on the tapArea
    await userEvent.tab();
    expect(tapArea).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(spy).toHaveBeenCalledTimes(1);
    await userEvent.keyboard("{Space}");
    expect(spy).toHaveBeenCalledTimes(2);
    await userEvent.keyboard(" ");
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
