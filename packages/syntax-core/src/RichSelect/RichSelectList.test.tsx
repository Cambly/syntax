import { act, render, screen } from "@testing-library/react";
import React, { useState, type ReactElement } from "react";
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

const ControlledRichSelectList = ({
  selectedValues,
  onChange,
  ...props
}: RichSelectListProps): ReactElement => {
  const [value, setValue] = useState(selectedValues);
  return (
    <RichSelectList
      {...defaultRequiredProps}
      {...props}
      selectedValues={value}
      onChange={(v) => {
        setValue(v);
        onChange(v);
      }}
    />
  );
};

function controlledRichSelectList(props: Partial<RichSelectListProps> = {}) {
  return (
    <ControlledRichSelectList
      data-testid="trigger"
      {...defaultRequiredProps}
      {...props}
    >
      <RichSelectList.OptGroup data-testid="optgroup" label="Group1">
        <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
        <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
        <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
      </RichSelectList.OptGroup>
    </ControlledRichSelectList>
  );
}

describe("richSelectList", () => {
  it("renders", async () => {
    render(simpleRichSelectList());
    await act(() => vi.runAllTimers());
    expect(screen.getByTestId("trigger")).toBeInTheDocument();
  });

  it("renders in a closed state by default", async () => {
    render(simpleRichSelectList());
    await act(() => vi.runAllTimers());
    expect(screen.queryByTestId("optgroup")).not.toBeInTheDocument();
    expect(screen.queryByTestId("opt1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("opt2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("opt3")).not.toBeInTheDocument();
  });

  it("opens menu when trigger is clicked", async () => {
    render(simpleRichSelectList());
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(screen.getByTestId("optgroup")).toBeInTheDocument();
    expect(screen.getByTestId("opt1")).toBeInTheDocument();
    expect(screen.getByTestId("opt2")).toBeInTheDocument();
    expect(screen.getByTestId("opt3")).toBeInTheDocument();
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

  it("can render chips", async () => {
    render(
      <RichSelectList data-testid="trigger" {...defaultRequiredProps}>
        <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
        <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
        <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
      </RichSelectList>,
    );
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(screen.getByTestId("opt1")).toBeVisible();
    expect(screen.getByTestId("opt2")).toBeVisible();
    expect(screen.getByTestId("opt3")).toBeVisible();
  });

  it("can render sections", async () => {
    render(
      <RichSelectList data-testid="trigger" {...defaultRequiredProps}>
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
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(screen.getByTestId("section1")).toBeVisible();
    expect(screen.getByTestId("section2")).toBeVisible();
    expect(screen.getByTestId("section3")).toBeVisible();
    expect(screen.getByTestId("opt1")).toBeVisible();
    expect(screen.getByTestId("opt2")).toBeVisible();
    expect(screen.getByTestId("opt3")).toBeVisible();
  });

  // autoCommit inactive by default
  it("can stage a selection", async () => {
    const spy = vi.fn();
    render(
      simpleRichSelectList({
        autoCommit: false,
        onChange: spy,
      }),
    );
    await user.click(screen.getByTestId("trigger"));
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
        onChange: spy,
      }),
    );
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    const opt1 = screen.getByTestId("opt1");
    const clear = screen.getByTestId("secondary-button");
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
        onChange: spy,
      }),
    );
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    const opt1 = screen.getByTestId("opt1");
    await user.click(opt1);
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(["opt1"]);
    expect(opt1).toHaveAttribute("aria-selected", "true");
  });

  it("can clear a saved selection", async () => {
    const spy = vi.fn();
    render(
      simpleRichSelectList({
        autoCommit: false,
        onChange: spy,
      }),
    );
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    let opt1 = screen.getByTestId("opt1");
    await user.click(opt1);
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(["opt1"]);
    await user.click(screen.getByTestId("trigger")); // re-open overlay
    await act(() => vi.runAllTimers());
    opt1 = screen.getByTestId("opt1"); // opt1 was re-created when overlay re-opened. must get new reference
    expect(opt1).toHaveAttribute("aria-selected", "true");
    await user.click(screen.getByTestId("secondary-button"));
    expect(spy).toHaveBeenCalledTimes(1); // clearing only stages, does not commit yet
    expect(opt1).toHaveAttribute("aria-selected", "false");
  });

  it("can stage multiple selections", async () => {
    const spy = vi.fn();
    render(
      simpleRichSelectList({
        autoCommit: false,
        onChange: spy,
        multiple: true,
      }),
    );
    await user.click(screen.getByTestId("trigger"));
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
        onChange: spy,
        multiple: true,
      }),
    );
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    const opt1 = screen.getByTestId("opt1");
    const opt2 = screen.getByTestId("opt2");
    await user.click(opt1);
    await user.click(opt2);
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(["opt1", "opt2"]);
    expect(opt1).toHaveAttribute("aria-selected", "true");
    expect(opt2).toHaveAttribute("aria-selected", "true");
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
      expect(screen.queryByTestId("primary-button")).not.toBeInTheDocument();
      expect(screen.queryByTestId("secondary-button")).not.toBeInTheDocument();
    },
  );

  it("does not call onChange when priary button clicked when defaultSelectedValues provided", async () => {
    const spy = vi.fn();
    render(
      simpleRichSelectList({ onChange: spy, defaultSelectedValues: ["opt1"] }),
    );
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).not.toHaveBeenCalled();
  });

  it("does not call onChange when an option is clicked", async () => {
    const spy = vi.fn();
    render(simpleRichSelectList({ onChange: spy }));
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    await user.click(screen.getByTestId("opt1"));
    expect(spy).not.toHaveBeenCalled();
  });

  it("does not onChange when the dialog is closed", async () => {
    const spy = vi.fn();
    render(simpleRichSelectList({ onChange: spy }));
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    await user.click(document.body);
    expect(spy).not.toHaveBeenCalled();
  });

  it("calls onChange when primary button is clicked", async () => {
    const spy = vi.fn();
    render(simpleRichSelectList({ onChange: spy }));
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    await user.click(screen.getByTestId("opt1"));
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(["opt1"]);
  });

  it("user can select different options before clicking save, onChange called once at end", async () => {
    const spy = vi.fn();
    render(simpleRichSelectList({ onChange: spy }));
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    await user.click(screen.getByTestId("opt1"));
    await user.click(screen.getByTestId("opt2"));
    await user.click(screen.getByTestId("opt3"));
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(["opt3"]);
  });

  it("user can select different options, onChange is not called when user clicks primary button if selection is same at end as beginning", async () => {
    const spy = vi.fn();
    render(simpleRichSelectList({ onChange: spy }));
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(spy).not.toHaveBeenCalled();
    await user.click(screen.getByTestId("opt1"));
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).toHaveBeenCalledTimes(1);
    await user.click(screen.getByTestId("trigger")); // re-open overlay
    await act(() => vi.runAllTimers());
    await user.click(screen.getByTestId("opt2"));
    await user.click(screen.getByTestId("opt3"));
    await user.click(screen.getByTestId("opt1"));
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).toHaveBeenCalledTimes(1); // did not call onChange again because final value did not change
  });

  it("does not call onChange if final selection is same as initial selection", async () => {
    const spy = vi.fn();
    render(
      simpleRichSelectList({
        onChange: spy,
        defaultSelectedValues: ["opt1"],
      }),
    );

    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(spy).not.toHaveBeenCalled();
    await user.click(screen.getByTestId("opt2"));
    await user.click(screen.getByTestId("opt1"));
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).not.toHaveBeenCalled();
  });

  it("does not call onChange if user clicks save without changing initial selection", async () => {
    const spy = vi.fn();
    render(
      simpleRichSelectList({
        onChange: spy,
        defaultSelectedValues: ["opt1"],
      }),
    );

    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(spy).not.toHaveBeenCalled();
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).not.toHaveBeenCalled();
  });

  it("calls onChange if user clicks save after changing initial selection", async () => {
    const spy = vi.fn();
    render(
      simpleRichSelectList({
        onChange: spy,
        defaultSelectedValues: ["opt1"],
      }),
    );

    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(spy).not.toHaveBeenCalled();
    await user.click(screen.getByTestId("opt2"));
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(["opt2"]);
  });

  it("user can clear staged selection by clicking secondary button", async () => {
    const spy = vi.fn();
    render(
      simpleRichSelectList({
        onChange: spy,
        defaultSelectedValues: ["opt1"],
      }),
    );

    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(spy).not.toHaveBeenCalled();
    await user.click(screen.getByTestId("opt2"));
    await user.click(screen.getByTestId("secondary-button"));
    expect(spy).not.toHaveBeenCalled();
  });

  it("clears the selection and calls onChange when user clicks clear then save if default selected values were provided", async () => {
    const spy = vi.fn();
    render(
      simpleRichSelectList({
        onChange: spy,
        defaultSelectedValues: ["opt1"],
      }),
    );

    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(spy).not.toHaveBeenCalled();
    await user.click(screen.getByTestId("opt2"));
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).toHaveBeenCalledTimes(1);
    await user.click(screen.getByTestId("trigger")); // re-open overlay
    await act(() => vi.runAllTimers());
    await user.click(screen.getByTestId("secondary-button"));
    expect(spy).toHaveBeenCalledTimes(1);
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenLastCalledWith([]);
  });

  it("is single selection mode by default", async () => {
    const spy = vi.fn();
    render(simpleRichSelectList({ onChange: spy }));

    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(spy).not.toHaveBeenCalled();
    await user.click(screen.getByTestId("opt1"));
    await user.click(screen.getByTestId("opt2"));
    await user.click(screen.getByTestId("opt3"));
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(["opt3"]);
  });

  it("pressing escape clears staged changes", async () => {
    const spy = vi.fn();
    render(
      simpleRichSelectList({
        onChange: spy,
      }),
    );

    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(spy).not.toHaveBeenCalled();
    await user.click(screen.getByTestId("opt1"));
    await user.click(screen.getByTestId("opt2"));
    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("primary-button")).not.toBeInTheDocument();
    await user.click(screen.getByTestId("trigger")); // reopen
    await user.click(screen.getByTestId("primary-button"));
    expect(spy).toHaveBeenCalledTimes(0);
  });

  describe('"select" input value', () => {
    it("renders empty by default when no placeholderText is defined", async () => {
      render(simpleRichSelectList());
      await act(() => vi.runAllTimers());
      const trigger = screen.getByTestId("trigger");
      expect(trigger).toHaveTextContent("");
    });

    it("renders placeholderText initially with no selection", async () => {
      render(simpleRichSelectList({ placeholderText: "test-placeholder" }));
      await act(() => vi.runAllTimers());
      const trigger = screen.getByTestId("trigger");
      expect(trigger).toHaveTextContent("test-placeholder");
    });

    it("placeholder doesn't show when single selectedValues is passed", async () => {
      render(
        simpleRichSelectList({
          placeholderText: "test-placeholder",
          selectedValues: ["opt1"],
        }),
      );
      await act(() => vi.runAllTimers());
      const trigger = screen.getByTestId("trigger");
      expect(trigger).toHaveTextContent("1 selected");
    });

    it("placeholder doesn't show when single defaultSelectedValues is passed", async () => {
      render(
        simpleRichSelectList({
          placeholderText: "test-placeholder",
          defaultSelectedValues: ["opt1"],
        }),
      );
      await act(() => vi.runAllTimers());
      const trigger = screen.getByTestId("trigger");
      expect(trigger).toHaveTextContent("1 selected");
    });

    it("trigger reads # of items selected from selectedValues prop", async () => {
      render(
        simpleRichSelectList({
          placeholderText: "test-placeholder",
          selectedValues: ["opt1", "opt2"],
        }),
      );
      await act(() => vi.runAllTimers());
      const trigger = screen.getByTestId("trigger");
      expect(trigger).toHaveTextContent("2 selected");
    });

    it("trigger reads # of items selected from defaultSelectedValues prop", async () => {
      render(
        simpleRichSelectList({
          placeholderText: "test-placeholder",
          defaultSelectedValues: ["opt1", "opt2"],
        }),
      );
      await act(() => vi.runAllTimers());
      const trigger = screen.getByTestId("trigger");
      expect(trigger).toHaveTextContent("2 selected");
    });

    it("trigger reads # of items selected from selectedValues when both selectedValues and defaultSelectedValues prop", async () => {
      render(
        simpleRichSelectList({
          placeholderText: "test-placeholder",
          selectedValues: ["opt1", "opt2", "opt3"],
          defaultSelectedValues: ["opt1", "opt2"],
        }),
      );
      await act(() => vi.runAllTimers());
      const trigger = screen.getByTestId("trigger");
      expect(trigger).toHaveTextContent("3 selected");
    });

    it("updates trigger text when selection changes", async () => {
      render(simpleRichSelectList());
      const trigger = screen.getByTestId("trigger");
      await user.click(trigger);
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("primary-button"));
      expect(trigger).toHaveTextContent("1 selected");
    });

    it("updates trigger text when selection changes in multiple mode", async () => {
      render(simpleRichSelectList({ multiple: true }));
      const trigger = screen.getByTestId("trigger");
      await user.click(trigger);
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt3"));
      await user.click(screen.getByTestId("primary-button"));
      expect(trigger).toHaveTextContent("2 selected");
    });

    it("user can override trigger text rendering with `selectTextValue` prop", () => {
      render(
        simpleRichSelectList({
          selectTextValue: (selected) =>
            `test ${String(selected?.length)} selected`,
          selectedValues: ["opt1", "opt2"],
        }),
      );
      const trigger = screen.getByTestId("trigger");
      expect(trigger).toHaveTextContent("test 2 selected");
    });

    it("falls back to placeholderText when selectTextValue returns void", () => {
      render(
        simpleRichSelectList({
          selectTextValue: () => undefined,
          selectedValues: ["opt1", "opt2"],
          placeholderText: "test-placeholder",
        }),
      );
      const trigger = screen.getByTestId("trigger");
      expect(trigger).toHaveTextContent("test-placeholder");
    });

    it("uses selectTextValue when selection changes", async () => {
      render(
        simpleRichSelectList({
          selectTextValue: (selected) =>
            `test ${String(selected?.length)} selected`,
        }),
      );
      const trigger = screen.getByTestId("trigger");
      await user.click(trigger);
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("primary-button"));
      expect(trigger).toHaveTextContent("test 1 selected");
    });
  });

  describe("multiple=true", () => {
    it("allows staging multiple selections", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectList({
          onChange: spy,
          multiple: true,
        }),
      );

      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt3"));
      await user.click(screen.getByTestId("primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt1", "opt2", "opt3"]);
    });

    it("clears multiple selections when user presses secondary clear button", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectList({
          onChange: spy,
          multiple: true,
        }),
      );

      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt3"));
      await user.click(screen.getByTestId("secondary-button"));
      await user.click(screen.getByTestId("primary-button"));
      expect(spy).not.toHaveBeenCalled();
    });

    it("user can clear a default selection by clicking the clear button", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectList({
          onChange: spy,
          multiple: true,
          defaultSelectedValues: ["opt1"],
        }),
      );

      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("secondary-button"));
      await user.click(screen.getByTestId("primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith([]);
    });

    it("user can clear a committed selection by clicking the clear button", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectList({
          onChange: spy,
          multiple: true,
          defaultSelectedValues: ["opt1", "opt2"],
        }),
      );

      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt3"));
      await user.click(screen.getByTestId("primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt1", "opt2", "opt3"]);
      await user.click(screen.getByTestId("trigger")); // re-open overlay
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("secondary-button"));
      await user.click(screen.getByTestId("primary-button"));
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenLastCalledWith([]);
    });

    it("can toggle off a default selection", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectList({
          onChange: spy,
          multiple: true,
          defaultSelectedValues: ["opt1"],
        }),
      );

      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith([]);
    });

    it("pressing escape clears staged changes", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectList({
          onChange: spy,
          multiple: true,
        }),
      );

      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt2"));
      await user.keyboard("{Escape}");
      await act(() => vi.runAllTimers());
      expect(screen.queryByTestId("primary-button")).not.toBeInTheDocument();
      await user.click(screen.getByTestId("trigger")); // reopen
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("primary-button"));
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe("overlay behavior", () => {
    it("closes the dialog when user clicks outside of the dialog", async () => {
      render(simpleRichSelectList());
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(screen.getByTestId("optgroup")).toBeInTheDocument();
      await user.click(document.body);
      await act(() => vi.runAllTimers());
      expect(screen.queryByTestId("optgroup")).not.toBeInTheDocument();
    });

    it("closes the dialog when user presses escape", async () => {
      render(simpleRichSelectList());
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(screen.getByTestId("optgroup")).toBeInTheDocument();
      await user.keyboard("{Escape}");
      await act(() => vi.runAllTimers());
      expect(screen.queryByTestId("optgroup")).not.toBeInTheDocument();
    });

    it("closes the dialog when user saves a selection", async () => {
      render(simpleRichSelectList());
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("primary-button"));
      expect(screen.queryByTestId("optgroup")).not.toBeInTheDocument();
    });

    it("keeps state of selection between dialog open/close", async () => {
      render(simpleRichSelectList({ multiple: true }));
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("primary-button"));
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(screen.getByTestId("opt1")).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByTestId("opt2")).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    it("clears state of staged selection between dialog open/close, click on outside", async () => {
      render(simpleRichSelectList({ multiple: true }));
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt2"));
      await user.click(document.body);
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(screen.getByTestId("opt1")).toHaveAttribute(
        "aria-selected",
        "false",
      );
      expect(screen.getByTestId("opt2")).toHaveAttribute(
        "aria-selected",
        "false",
      );
    });

    it("clears state of staged selection between dialog open/close, Escape key", async () => {
      render(simpleRichSelectList({ multiple: true }));
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt2"));
      await user.keyboard("{Escape}");
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(screen.getByTestId("opt1")).toHaveAttribute(
        "aria-selected",
        "false",
      );
      expect(screen.getByTestId("opt2")).toHaveAttribute(
        "aria-selected",
        "false",
      );
    });

    it("keeps state of single selection between dialog open/close", async () => {
      render(simpleRichSelectList());
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      await user.click(document.body);
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(screen.getByTestId("opt1")).toHaveAttribute(
        "aria-selected",
        "false",
      );
    });

    it("does not keep state of staged single selection between dialog open/close", async () => {
      render(simpleRichSelectList());
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("primary-button"));
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      expect(screen.getByTestId("opt1")).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });
  });

  describe("controlled", () => {
    it("can clear a staged controlled selection", async () => {
      const spy = vi.fn();
      render(
        controlledRichSelectList({
          onChange: spy,
          selectedValues: [],
        }),
      );
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      expect(screen.getByTestId("opt1")).toHaveAttribute(
        // staged selection
        "aria-selected",
        "true",
      );
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt1"]);
      await user.click(screen.getByTestId("trigger")); // re-open overlay
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("secondary-button"));
      expect(screen.getByTestId("opt1")).toHaveAttribute(
        // staged selection not retained
        "aria-selected",
        "false",
      );
      expect(spy).toHaveBeenCalledTimes(1); // not called again
      await user.click(screen.getByTestId("primary-button"));
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenLastCalledWith([]);
    });

    it("can clear a staged controlled multiple selection", async () => {
      const spy = vi.fn();
      render(
        controlledRichSelectList({
          onChange: spy,
          selectedValues: [],
          multiple: true,
        }),
      );
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt3"));
      expect(screen.getByTestId("opt1")).toHaveAttribute(
        // staged selection
        "aria-selected",
        "true",
      );
      expect(screen.getByTestId("opt3")).toHaveAttribute(
        // staged selection
        "aria-selected",
        "true",
      );
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt1", "opt3"]);
      await user.click(screen.getByTestId("trigger")); // re-open overlay
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("secondary-button"));
      expect(screen.getByTestId("opt1")).toHaveAttribute(
        "aria-selected",
        "false",
      ); // staged selection cleared
      expect(screen.getByTestId("opt3")).toHaveAttribute(
        "aria-selected",
        "false",
      ); // staged selection cleared
      expect(spy).toHaveBeenCalledTimes(1); // not called again
      await user.click(screen.getByTestId("primary-button"));
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenLastCalledWith([]);
    });
  });
});
