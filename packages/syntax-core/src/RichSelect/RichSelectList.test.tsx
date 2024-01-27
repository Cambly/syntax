import { act, render, screen } from "@testing-library/react";
import React, { type ReactElement } from "react";
import RichSelectList, { type RichSelectListProps } from "./RichSelectList";
import { vi } from "vitest";
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

function simpleRichSelectList(
  props: Partial<RichSelectListProps> = {},
): ReactElement<RichSelectListProps> {
  const defaultRequiredProps = {
    onChange: () => undefined,
    label: "x",
  };
  return (
    <RichSelectList data-testid="trigger" {...defaultRequiredProps} {...props}>
      <RichSelectList.OptGroup data-testid="optgroup" label="Group1">
        <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
        <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
        <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
      </RichSelectList.OptGroup>
    </RichSelectList>
  );
}

describe("richSelectList", () => {
  it("should render without errors on first pass", async () => {
    render(simpleRichSelectList());
    await act(() => vi.runAllTimers());
  });

  it("opens menu when trigger is clicked", async () => {
    render(simpleRichSelectList());
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    const listBox = screen.getByTestId("optgroup");
    expect(listBox).toBeInTheDocument();
  });

  it("clicks on an option without erroring", async () => {
    render(simpleRichSelectList());
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    for (const id of ["opt1", "opt2", "opt3"]) {
      await user.click(screen.getByTestId(id));
      await act(() => vi.runAllTimers());
    }
  });

  it("does not call onChange after initial render", async () => {
    const spy = vi.fn();
    render(simpleRichSelectList({ onChange: spy }));
    await act(() => vi.runAllTimers());
    expect(spy).not.toHaveBeenCalled();
  });

  it("does not call onChange when opening the dialog", async () => {
    const spy = vi.fn();
    render(simpleRichSelectList({ onChange: spy }));
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(spy).not.toHaveBeenCalled();
  });

  it.skip.each([{}, { autoCommit: true }])(
    "does not show primary/secondary save/clear buttons %p",
    async (props) => {
      render(simpleRichSelectList(props));
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(
        screen.queryByTestId("trigger-primary-button"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("trigger-secondary-button"),
      ).not.toBeInTheDocument();
    },
  );

  describe("autoCommit=false", () => {
    it("does not call onChange when an option is clicked", async () => {
      const spy = vi.fn();
      render(simpleRichSelectList({ onChange: spy, autoCommit: false }));
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      expect(spy).not.toHaveBeenCalled();
    });

    it("does not onChange when the dialog is closed", async () => {
      const spy = vi.fn();
      render(simpleRichSelectList({ onChange: spy, autoCommit: false }));
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(document.body);
      expect(spy).not.toHaveBeenCalled();
    });

    it("calls onChange when primary button is clicked", async () => {
      const spy = vi.fn();
      render(simpleRichSelectList({ onChange: spy, autoCommit: false }));
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("trigger-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(["opt1"]);
    });

    it("user can select different options before clicking save, onChange called once at end", async () => {
      const spy = vi.fn();
      render(simpleRichSelectList({ onChange: spy, autoCommit: false }));
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt3"));
      await user.click(screen.getByTestId("trigger-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(["opt3"]);
    });

    it("user can select different options, onChange is not called when user clicks primary button if selection is same at end as beginning", async () => {
      const spy = vi.fn();
      render(simpleRichSelectList({ onChange: spy, autoCommit: false }));
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("trigger-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt3"));
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("trigger-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1); // did not call onChange again because final value did not change
    });

    it("does not call onChange if final selection is same as initial selection", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectList({
          onChange: spy,
          autoCommit: false,
          defaultSelectedValues: ["opt1"],
        }),
      );

      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("trigger-primary-button"));
      expect(spy).not.toHaveBeenCalled();
    });

    it("does not call onChange if user clicks save without changing initial selection", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectList({
          onChange: spy,
          autoCommit: false,
          defaultSelectedValues: ["opt1"],
        }),
      );

      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("trigger-primary-button"));
      expect(spy).not.toHaveBeenCalled();
    });

    it("calls onChange if user clicks save after changing initial selection", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectList({
          onChange: spy,
          autoCommit: false,
          defaultSelectedValues: ["opt1"],
        }),
      );

      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("trigger-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(["opt2"]);
    });

    it("user can clear staged selection by clicking secondary button", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectList({
          onChange: spy,
          autoCommit: false,
          defaultSelectedValues: ["opt1"],
        }),
      );

      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).toHaveBeenCalledTimes(0);
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("trigger-secondary-button"));
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it("clears the selection and calls onChange when user clicks clear then save if default selected values were provided", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectList({
          onChange: spy,
          autoCommit: false,
          defaultSelectedValues: ["opt1"],
        }),
      );

      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).toHaveBeenCalledTimes(0);
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("trigger-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      await user.click(screen.getByTestId("trigger-secondary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      await user.click(screen.getByTestId("trigger-primary-button"));
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith([]);
    });

    describe("multiple=true", () => {
      it("allows staging multiple selections", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectList({
            onChange: spy,
            autoCommit: false,
            multiple: true,
          }),
        );

        await user.click(screen.getByTestId("trigger"));
        await act(() => vi.runAllTimers());
        expect(spy).not.toHaveBeenCalled();
        await user.click(screen.getByTestId("opt1"));
        await user.click(screen.getByTestId("opt2"));
        await user.click(screen.getByTestId("opt3"));
        await user.click(screen.getByTestId("trigger-primary-button"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(["opt1", "opt2", "opt3"]);
      });

      it("clears multiple selections when user presses secondary clear button", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectList({
            onChange: spy,
            autoCommit: false,
            multiple: true,
          }),
        );

        await user.click(screen.getByTestId("trigger"));
        await act(() => vi.runAllTimers());
        expect(spy).not.toHaveBeenCalled();
        await user.click(screen.getByTestId("opt1"));
        await user.click(screen.getByTestId("opt2"));
        await user.click(screen.getByTestId("opt3"));
        await user.click(screen.getByTestId("trigger-secondary-button"));
        await user.click(screen.getByTestId("trigger-primary-button"));
        expect(spy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
