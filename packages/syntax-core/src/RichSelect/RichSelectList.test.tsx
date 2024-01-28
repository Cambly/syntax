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

const defaultRequiredProps = {
  onChange: () => undefined,
  label: "x",
};

function simpleRichSelectList(
  props: Partial<RichSelectListProps> = {},
): ReactElement<RichSelectListProps> {
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

  it.skip("handles onClick on the select trigger", async () => {
    const spy = vi.fn();
    render(simpleRichSelectList({ onClick: spy }));
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(spy).toHaveBeenCalledTimes(1);
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

  it("does not call onChange when priary button clicked when defaultSelectedValues provided", async () => {
    const spy = vi.fn();
    render(
      simpleRichSelectList({ onChange: spy, defaultSelectedValues: ["opt1"] }),
    );
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    await user.click(screen.getByTestId("trigger-primary-button"));
    expect(spy).not.toHaveBeenCalled();
  });

  describe("dropdown=false", () => {
    it("renders", async () => {
      render(simpleRichSelectList({ dropdown: false }));
      await act(() => vi.runAllTimers());
      expect(screen.getByTestId("opt1")).toBeInTheDocument();
    });

    it("can render chips", async () => {
      render(
        <RichSelectList
          data-testid="trigger"
          dropdown={false}
          {...defaultRequiredProps}
        >
          <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
          <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
          <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
        </RichSelectList>,
      );
      await act(() => vi.runAllTimers());
      expect(screen.getByTestId("opt1")).toBeVisible();
      expect(screen.getByTestId("opt2")).toBeVisible();
      expect(screen.getByTestId("opt3")).toBeVisible();
    });

    it("can render sections", async () => {
      render(
        <RichSelectList
          data-testid="trigger"
          dropdown={false}
          {...defaultRequiredProps}
        >
          <RichSelectList.OptGroup data-testid="section1" label="section1">
            <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
          </RichSelectList.OptGroup>
          <RichSelectList.OptGroup data-testid="section2" label="section2">
            <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
          </RichSelectList.OptGroup>
          <RichSelectList.OptGroup data-testid="section3" label="section3">
            <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
          </RichSelectList.OptGroup>
        </RichSelectList>,
      );
      await act(() => vi.runAllTimers());
      expect(screen.getByTestId("section1")).toBeVisible();
      expect(screen.getByTestId("section2")).toBeVisible();
      expect(screen.getByTestId("section3")).toBeVisible();
      expect(screen.getByTestId("opt1")).toBeVisible();
      expect(screen.getByTestId("opt2")).toBeVisible();
      expect(screen.getByTestId("opt3")).toBeVisible();
    });

    describe("autoCommit=false", () => {
      it("can stage a selection", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectList({
            autoCommit: false,
            dropdown: false,
            onChange: spy,
          }),
        );
        await act(() => vi.runAllTimers());
        const opt1 = screen.getByTestId("opt1");
        await user.click(opt1);
        expect(opt1).toHaveAttribute("aria-selected", "true");
        expect(spy).not.toHaveBeenCalled();
      });

      it("can stage a selection and clear it", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectList({
            autoCommit: false,
            dropdown: false,
            onChange: spy,
          }),
        );
        await act(() => vi.runAllTimers());
        const opt1 = screen.getByTestId("opt1");
        const clear = screen.getByTestId("trigger-secondary-button");
        await user.click(opt1);
        await user.click(clear);
        expect(spy).not.toHaveBeenCalled();
        expect(opt1).toHaveAttribute("aria-selected", "false");
      });

      it("can commit a staged selection", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectList({
            autoCommit: false,
            dropdown: false,
            onChange: spy,
          }),
        );
        await act(() => vi.runAllTimers());
        const opt1 = screen.getByTestId("opt1");
        await user.click(opt1);
        await user.click(screen.getByTestId("trigger-primary-button"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith(["opt1"]);
        expect(opt1).toHaveAttribute("aria-selected", "true");
      });

      it("can clear a saved selection", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectList({
            autoCommit: false,
            dropdown: false,
            onChange: spy,
          }),
        );
        await act(() => vi.runAllTimers());
        const opt1 = screen.getByTestId("opt1");
        await user.click(opt1);
        await user.click(screen.getByTestId("trigger-primary-button"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith(["opt1"]);
        expect(opt1).toHaveAttribute("aria-selected", "true");
        await user.click(screen.getByTestId("trigger-secondary-button"));
        expect(spy).toHaveBeenCalledTimes(1); // clearing only stages, does not commit yet
        expect(opt1).toHaveAttribute("aria-selected", "false");
      });

      it("can stage multiple selections", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectList({
            autoCommit: false,
            dropdown: false,
            onChange: spy,
            multiple: true,
          }),
        );
        await act(() => vi.runAllTimers());
        const opt1 = screen.getByTestId("opt1");
        const opt2 = screen.getByTestId("opt2");
        await user.click(opt1);
        await user.click(opt2);
        expect(opt1).toHaveAttribute("aria-selected", "true");
        expect(opt2).toHaveAttribute("aria-selected", "true");
        expect(spy).not.toHaveBeenCalled();
      });

      it("can commit a staged multiple selection", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectList({
            autoCommit: false,
            dropdown: false,
            onChange: spy,
            multiple: true,
          }),
        );
        await act(() => vi.runAllTimers());
        const opt1 = screen.getByTestId("opt1");
        const opt2 = screen.getByTestId("opt2");
        await user.click(opt1);
        await user.click(opt2);
        await user.click(screen.getByTestId("trigger-primary-button"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith(["opt1", "opt2"]);
        expect(opt1).toHaveAttribute("aria-selected", "true");
        expect(opt2).toHaveAttribute("aria-selected", "true");
      });
    });
  });

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
      expect(spy).toHaveBeenLastCalledWith(["opt1"]);
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
      expect(spy).toHaveBeenLastCalledWith(["opt3"]);
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
      expect(spy).toHaveBeenLastCalledWith(["opt2"]);
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
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("trigger-secondary-button"));
      expect(spy).not.toHaveBeenCalled();
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
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("trigger-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      await user.click(screen.getByTestId("trigger-secondary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      await user.click(screen.getByTestId("trigger-primary-button"));
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenLastCalledWith([]);
    });

    it("is single selection mode by default", async () => {
      const spy = vi.fn();
      render(simpleRichSelectList({ onChange: spy, autoCommit: false }));

      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt3"));
      await user.click(screen.getByTestId("trigger-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt3"]);
    });

    it("pressing escape clears staged changes", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectList({
          onChange: spy,
          autoCommit: false,
        }),
      );

      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt2"));
      await user.keyboard("{Escape}");
      expect(
        screen.queryByTestId("trigger-primary-button"),
      ).not.toBeInTheDocument();
      await user.click(screen.getByTestId("trigger")); // reopen
      await user.click(screen.getByTestId("trigger-primary-button"));
      expect(spy).toHaveBeenCalledTimes(0);
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
        expect(spy).toHaveBeenLastCalledWith(["opt1", "opt2", "opt3"]);
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
        expect(spy).not.toHaveBeenCalled();
      });

      it("user can clear a default selection by clicking the clear button", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectList({
            onChange: spy,
            autoCommit: false,
            multiple: true,
            defaultSelectedValues: ["opt1"],
          }),
        );

        await user.click(screen.getByTestId("trigger"));
        await act(() => vi.runAllTimers());
        expect(spy).not.toHaveBeenCalled();
        await user.click(screen.getByTestId("trigger-secondary-button"));
        await user.click(screen.getByTestId("trigger-primary-button"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith([]);
      });

      it("user can clear a committed selection by clicking the clear button", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectList({
            onChange: spy,
            autoCommit: false,
            multiple: true,
            defaultSelectedValues: ["opt1", "opt2"],
          }),
        );

        await user.click(screen.getByTestId("trigger"));
        await act(() => vi.runAllTimers());
        expect(spy).not.toHaveBeenCalled();
        await user.click(screen.getByTestId("opt3"));
        await user.click(screen.getByTestId("trigger-primary-button"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith(["opt1", "opt2", "opt3"]);
        await user.click(screen.getByTestId("trigger-secondary-button"));
        await user.click(screen.getByTestId("trigger-primary-button"));
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenLastCalledWith([]);
      });

      it("can toggle off a default selection", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectList({
            onChange: spy,
            autoCommit: false,
            multiple: true,
            defaultSelectedValues: ["opt1"],
          }),
        );

        await user.click(screen.getByTestId("trigger"));
        await act(() => vi.runAllTimers());
        expect(spy).not.toHaveBeenCalled();
        await user.click(screen.getByTestId("opt1"));
        await user.click(screen.getByTestId("trigger-primary-button"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith([]);
      });

      it("pressing escape clears staged changes", async () => {
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
        await user.keyboard("{Escape}");
        expect(
          screen.queryByTestId("trigger-primary-button"),
        ).not.toBeInTheDocument();
        await user.click(screen.getByTestId("trigger")); // reopen
        await user.click(screen.getByTestId("trigger-primary-button"));
        expect(spy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
