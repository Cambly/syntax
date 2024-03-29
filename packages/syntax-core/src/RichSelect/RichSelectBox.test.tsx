import { act, render, screen } from "@testing-library/react";
import React, { useState, type ReactElement } from "react";
import RichSelectBox, { type RichSelectBoxProps } from "./RichSelectBox";
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
  accessibilityLabel: "x",
  primaryButtonText: "Save",
  primaryButtonAccessibilityLabel: "Save",
  secondaryButtonText: "Clear",
  secondaryButtonAccessibilityLabel: "Clear",
};

function simpleRichSelectBox(
  props: Partial<RichSelectBoxProps> = {},
): ReactElement<RichSelectBoxProps> {
  return (
    <RichSelectBox data-testid="box" {...defaultRequiredProps} {...props}>
      <RichSelectBox.Section data-testid="section1" label="Group1">
        <RichSelectBox.Chip data-testid="opt1" label="Opt1" value="opt1" />
        <RichSelectBox.Chip data-testid="opt2" label="Opt2" value="opt2" />
        <RichSelectBox.Chip data-testid="opt3" label="Opt3" value="opt3" />
      </RichSelectBox.Section>
    </RichSelectBox>
  );
}

describe("component: RichSelectBox", () => {
  it("renders", () => {
    render(simpleRichSelectBox());
    expect(screen.getByTestId("opt1")).toBeInTheDocument();
  });

  it("can render chips", () => {
    render(
      <RichSelectBox data-testid="box" {...defaultRequiredProps}>
        <RichSelectBox.Chip data-testid="opt1" label="Opt1" value="opt1" />
        <RichSelectBox.Chip data-testid="opt2" label="Opt2" value="opt2" />
        <RichSelectBox.Chip data-testid="opt3" label="Opt3" value="opt3" />
      </RichSelectBox>,
    );
    expect(screen.getByTestId("opt1")).toBeVisible();
    expect(screen.getByTestId("opt2")).toBeVisible();
    expect(screen.getByTestId("opt3")).toBeVisible();
  });

  it("can render sections", () => {
    render(
      <RichSelectBox data-testid="box" {...defaultRequiredProps}>
        <RichSelectBox.Section data-testid="section1" label="section1">
          <RichSelectBox.Chip data-testid="opt1" label="Opt1" value="opt1" />
        </RichSelectBox.Section>
        <RichSelectBox.Section data-testid="section2" label="section2">
          <RichSelectBox.Chip data-testid="opt2" label="Opt2" value="opt2" />
        </RichSelectBox.Section>
        <RichSelectBox.Section data-testid="section3" label="section3">
          <RichSelectBox.Chip data-testid="opt3" label="Opt3" value="opt3" />
        </RichSelectBox.Section>
      </RichSelectBox>,
    );
    expect(screen.getByTestId("section1")).toBeVisible();
    expect(screen.getByTestId("section2")).toBeVisible();
    expect(screen.getByTestId("section3")).toBeVisible();
    expect(screen.getByTestId("opt1")).toBeVisible();
    expect(screen.getByTestId("opt2")).toBeVisible();
    expect(screen.getByTestId("opt3")).toBeVisible();
  });

  it("can render RadioButtons", () => {
    render(
      <RichSelectBox data-testid="box" {...defaultRequiredProps}>
        <RichSelectBox.RadioButton
          data-testid="opt1"
          label="Opt1"
          value="opt1"
          name="opt1name"
        />
        <RichSelectBox.RadioButton
          data-testid="opt2"
          label="Opt2"
          value="opt2"
          name="opt2name"
        />
        <RichSelectBox.RadioButton
          data-testid="opt3"
          label="Opt3"
          value="opt3"
          name="opt3name"
        />
      </RichSelectBox>,
    );
    expect(screen.getByTestId("opt1")).toBeVisible();
    expect(screen.getByTestId("opt2")).toBeVisible();
    expect(screen.getByTestId("opt3")).toBeVisible();
  });

  it("clicks on an option without erroring", async () => {
    render(simpleRichSelectBox());
    for (const id of ["opt1", "opt2", "opt3"]) {
      await user.click(screen.getByTestId(id));
    }
  });

  it("does not call onChange after initial render", () => {
    const spy = vi.fn();
    render(simpleRichSelectBox({ onChange: spy }));
    expect(spy).not.toHaveBeenCalled();
  });

  it("does not call onChange when primary button clicked when defaultSelectedValues provided", async () => {
    const spy = vi.fn();
    render(
      simpleRichSelectBox({ onChange: spy, defaultSelectedValues: ["opt1"] }),
    );
    await user.click(screen.getByTestId("box-primary-button"));
    expect(spy).not.toHaveBeenCalled();
  });

  // TODO: MERGE THE DESCRIBE BLOCKS OR REORGANIZE
  describe("(mergeme?) autosave=false", () => {
    it("can stage a selection", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectBox({
          autosave: false,
          onChange: spy,
        }),
      );
      const opt1 = screen.getByTestId("opt1");
      await user.click(opt1);
      expect(opt1).toHaveAttribute("aria-selected", "true");
      expect(spy).not.toHaveBeenCalled();
    });

    it("can stage a selection and clear it", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectBox({
          autosave: false,
          onChange: spy,
        }),
      );
      const opt1 = screen.getByTestId("opt1");
      const clear = screen.getByTestId("box-secondary-button");
      await user.click(opt1);
      await user.click(clear);
      expect(spy).not.toHaveBeenCalled();
      expect(opt1).toHaveAttribute("aria-selected", "false");
    });

    it("can commit a staged selection", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectBox({
          autosave: false,
          onChange: spy,
        }),
      );
      const opt1 = screen.getByTestId("opt1");
      await user.click(opt1);
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt1"]);
      expect(opt1).toHaveAttribute("aria-selected", "true");
    });

    it("can clear a saved selection", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectBox({
          autosave: false,
          onChange: spy,
        }),
      );
      const opt1 = screen.getByTestId("opt1");
      await user.click(opt1);
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt1"]);
      expect(opt1).toHaveAttribute("aria-selected", "true");
      await user.click(screen.getByTestId("box-secondary-button"));
      expect(spy).toHaveBeenCalledTimes(1); // clearing only stages, does not commit yet
      expect(opt1).toHaveAttribute("aria-selected", "false");
    });

    it("can stage multiple selections", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectBox({
          autosave: false,
          onChange: spy,
          multiple: true,
        }),
      );
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
        simpleRichSelectBox({
          autosave: false,
          onChange: spy,
          multiple: true,
        }),
      );
      const opt1 = screen.getByTestId("opt1");
      const opt2 = screen.getByTestId("opt2");
      await user.click(opt1);
      await user.click(opt2);
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt1", "opt2"]);
      expect(opt1).toHaveAttribute("aria-selected", "true");
      expect(opt2).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("autosave=false", () => {
    it("does not call onChange when an option is clicked", async () => {
      const spy = vi.fn();
      render(simpleRichSelectBox({ onChange: spy, autosave: false }));
      await user.click(screen.getByTestId("opt1"));
      expect(spy).not.toHaveBeenCalled();
    });

    it("does not onChange when the dialog is closed", async () => {
      const spy = vi.fn();
      render(simpleRichSelectBox({ onChange: spy, autosave: false }));
      await user.click(document.body);
      expect(spy).not.toHaveBeenCalled();
    });

    it("calls onChange when primary button is clicked", async () => {
      const spy = vi.fn();
      render(simpleRichSelectBox({ onChange: spy, autosave: false }));
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt1"]);
    });

    it("user can select different options before clicking save, onChange called once at end", async () => {
      const spy = vi.fn();
      render(simpleRichSelectBox({ onChange: spy, autosave: false }));
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt3"));
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt3"]);
    });

    it("user can select different options, onChange is not called when user clicks primary button if selection is same at end as beginning", async () => {
      const spy = vi.fn();
      render(simpleRichSelectBox({ onChange: spy, autosave: false }));
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt3"));
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1); // did not call onChange again because final value did not change
    });

    it("does not call onChange if final selection is same as initial selection", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectBox({
          onChange: spy,
          autosave: false,
          defaultSelectedValues: ["opt1"],
        }),
      );

      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).not.toHaveBeenCalled();
    });

    it("does not call onChange if user clicks save without changing initial selection", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectBox({
          onChange: spy,
          autosave: false,
          defaultSelectedValues: ["opt1"],
        }),
      );

      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).not.toHaveBeenCalled();
    });

    it("calls onChange if user clicks save after changing initial selection", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectBox({
          onChange: spy,
          autosave: false,
          defaultSelectedValues: ["opt1"],
        }),
      );

      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt2"]);
    });

    it("user can clear staged selection by clicking secondary button", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectBox({
          onChange: spy,
          autosave: false,
          defaultSelectedValues: ["opt1"],
        }),
      );

      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("box-secondary-button"));
      expect(spy).not.toHaveBeenCalled();
    });

    it("clears the selection and calls onChange when user clicks clear then save if default selected values were provided", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectBox({
          onChange: spy,
          autosave: false,
          defaultSelectedValues: ["opt1"],
        }),
      );

      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      await user.click(screen.getByTestId("box-secondary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenLastCalledWith([]);
    });

    it("is single selection mode by default", async () => {
      const spy = vi.fn();
      render(simpleRichSelectBox({ onChange: spy, autosave: false }));

      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt3"));
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt3"]);
    });

    it("pressing escape clears staged changes", async () => {
      const spy = vi.fn();
      render(
        simpleRichSelectBox({
          onChange: spy,
          autosave: false,
        }),
      );
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt2"));
      await user.keyboard("{Escape}");
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(0);
    });

    describe("multiple=true", () => {
      it("allows staging multiple selections", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectBox({
            onChange: spy,
            autosave: false,
            multiple: true,
          }),
        );

        expect(spy).not.toHaveBeenCalled();
        await user.click(screen.getByTestId("opt1"));
        await user.click(screen.getByTestId("opt2"));
        await user.click(screen.getByTestId("opt3"));
        await user.click(screen.getByTestId("box-primary-button"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith(["opt1", "opt2", "opt3"]);
      });

      it("clears multiple selections when user presses secondary clear button", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectBox({
            onChange: spy,
            autosave: false,
            multiple: true,
          }),
        );

        expect(spy).not.toHaveBeenCalled();
        await user.click(screen.getByTestId("opt1"));
        await user.click(screen.getByTestId("opt2"));
        await user.click(screen.getByTestId("opt3"));
        await user.click(screen.getByTestId("box-secondary-button"));
        await user.click(screen.getByTestId("box-primary-button"));
        expect(spy).not.toHaveBeenCalled();
      });

      it("user can clear a default selection by clicking the clear button", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectBox({
            onChange: spy,
            autosave: false,
            multiple: true,
            defaultSelectedValues: ["opt1"],
          }),
        );

        expect(spy).not.toHaveBeenCalled();
        await user.click(screen.getByTestId("box-secondary-button"));
        await user.click(screen.getByTestId("box-primary-button"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith([]);
      });

      it("user can clear a committed selection by clicking the clear button", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectBox({
            onChange: spy,
            autosave: false,
            multiple: true,
            defaultSelectedValues: ["opt1", "opt2"],
          }),
        );

        expect(spy).not.toHaveBeenCalled();
        await user.click(screen.getByTestId("opt3"));
        await user.click(screen.getByTestId("box-primary-button"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith(["opt1", "opt2", "opt3"]);
        await user.click(screen.getByTestId("box-secondary-button"));
        await user.click(screen.getByTestId("box-primary-button"));
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenLastCalledWith([]);
      });

      it("can toggle off a default selection", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectBox({
            onChange: spy,
            autosave: false,
            multiple: true,
            defaultSelectedValues: ["opt1"],
          }),
        );

        expect(spy).not.toHaveBeenCalled();
        await user.click(screen.getByTestId("opt1"));
        await user.click(screen.getByTestId("box-primary-button"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith([]);
      });

      it("pressing escape clears staged changes", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectBox({
            onChange: spy,
            autosave: false,
            multiple: true,
          }),
        );

        expect(spy).not.toHaveBeenCalled();
        await user.click(screen.getByTestId("opt1"));
        await user.click(screen.getByTestId("opt2"));
        await user.keyboard("{Escape}");
        await user.click(screen.getByTestId("box-primary-button"));
        expect(spy).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe("autosave=true", () => {
    it("does not show primary/secondary save/clear buttons %p", () => {
      render(simpleRichSelectBox({ autosave: true }));
      expect(
        screen.queryByTestId("box-primary-button"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("box-secondary-button"),
      ).not.toBeInTheDocument();
    });
  });

  describe('controlled, autosave="false"', () => {
    const ControlledRichSelectBox = ({
      selectedValues,
      onChange,
      ...props
    }: RichSelectBoxProps) => {
      const [value, setValue] = useState(selectedValues);
      return (
        <RichSelectBox
          {...props}
          selectedValues={value}
          onChange={(v) => {
            setValue(v);
            onChange(v);
          }}
        />
      );
    };

    function controlledRichSelectBox(props: Partial<RichSelectBoxProps> = {}) {
      return (
        <ControlledRichSelectBox
          data-testid="box"
          {...defaultRequiredProps}
          {...props}
        >
          <RichSelectBox.Section data-testid="section1" label="Group1">
            <RichSelectBox.Chip data-testid="opt1" label="Opt1" value="opt1" />
            <RichSelectBox.Chip data-testid="opt2" label="Opt2" value="opt2" />
            <RichSelectBox.Chip data-testid="opt3" label="Opt3" value="opt3" />
          </RichSelectBox.Section>
        </ControlledRichSelectBox>
      );
    }

    it("renders controlled selectedValues", async () => {
      const spy = vi.fn();
      render(
        controlledRichSelectBox({
          autosave: false,
          onChange: spy,
          selectedValues: ["opt1"],
        }),
      );
      await act(() => vi.runAllTimers());
      const opt1 = screen.getByTestId("opt1");
      expect(opt1).toHaveAttribute("aria-selected", "true");
    });

    it("can stage a clear of controlled selection", async () => {
      const spy = vi.fn();
      render(
        controlledRichSelectBox({
          autosave: false,
          onChange: spy,
          selectedValues: [],
        }),
      );
      const opt1 = screen.getByTestId("opt1");
      await user.click(opt1);
      expect(opt1).toHaveAttribute("aria-selected", "true"); // staged selection
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt1"]);
      await user.click(screen.getByTestId("box-secondary-button"));
      expect(opt1).toHaveAttribute("aria-selected", "false"); // staged selection
      expect(spy).toHaveBeenCalledTimes(1); // not called again
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenLastCalledWith([]);
    });

    describe("autosave=true", () => {
      it("autosave saves selections immediately, uncontrolled single selection", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectBox({
            autosave: true,
            onChange: spy,
          }),
        );
        await user.click(screen.getByTestId("opt1"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith(["opt1"]);
        await user.click(screen.getByTestId("opt2"));
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenLastCalledWith(["opt2"]);
      });

      it("autosave saves selections immediately, uncontrolled multiple selection", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectBox({
            autosave: true,
            multiple: true,
            onChange: spy,
          }),
        );
        await user.click(screen.getByTestId("opt1"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith(["opt1"]);
        await user.click(screen.getByTestId("opt2"));
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenLastCalledWith(["opt1", "opt2"]);
        await user.click(screen.getByTestId("opt1"));
        expect(spy).toHaveBeenCalledTimes(3);
        expect(spy).toHaveBeenLastCalledWith(["opt2"]);
      });

      it("autosave saves selections immediately, controlled, selectedValues not empty", async () => {
        const spy = vi.fn();
        render(
          controlledRichSelectBox({
            autosave: true,
            onChange: spy,
            selectedValues: ["opt1"],
          }),
        );
        await user.click(screen.getByTestId("opt1"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith([]);
        await user.click(screen.getByTestId("opt2"));
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenLastCalledWith(["opt2"]);
      });

      it("autosave saves selections immediately, controlled, multiple, selectedValues not empty", async () => {
        const spy = vi.fn();
        render(
          controlledRichSelectBox({
            autosave: true,
            multiple: true,
            onChange: spy,
            selectedValues: ["opt1"],
          }),
        );
        await user.click(screen.getByTestId("opt1"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith([]);
        await user.click(screen.getByTestId("opt2"));
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenLastCalledWith(["opt2"]);
        await user.click(screen.getByTestId("opt1"));
        expect(spy).toHaveBeenCalledTimes(3);
        expect(spy).toHaveBeenLastCalledWith(["opt2", "opt1"]);
      });

      it("autosave saves selections immediately, uncontrolled, single, defaultSelectedValues not empty", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectBox({
            autosave: true,
            onChange: spy,
            defaultSelectedValues: ["opt1"],
          }),
        );
        await user.click(screen.getByTestId("opt1"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith([]);
        await user.click(screen.getByTestId("opt2"));
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenLastCalledWith(["opt2"]);
      });

      it("autosave saves selections immediately, uncontrolled, multiple, defaultSelectedValues not empty", async () => {
        const spy = vi.fn();
        render(
          simpleRichSelectBox({
            autosave: true,
            multiple: true,
            onChange: spy,
            defaultSelectedValues: ["opt1"],
          }),
        );
        await user.click(screen.getByTestId("opt2"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith(["opt1", "opt2"]);
        await user.click(screen.getByTestId("opt1"));
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenLastCalledWith(["opt2"]);
      });
    });
  });

  describe("composition with RichSelectItem", () => {
    it("uses disabled prop on items", async () => {
      const spy = vi.fn();
      render(
        <RichSelectBox
          data-testid="box"
          {...defaultRequiredProps}
          onChange={spy}
        >
          <RichSelectBox.Section data-testid="section1" label="Group1">
            <RichSelectBox.Chip data-testid="opt1" label="Opt1" value="opt1" />
            <RichSelectBox.Chip
              data-testid="opt2"
              label="Opt2"
              value="opt2"
              disabled
            />
            <RichSelectBox.Chip data-testid="opt3" label="Opt3" value="opt3" />
          </RichSelectBox.Section>
        </RichSelectBox>,
      );
      const opt2 = screen.getByTestId("opt2");
      expect(opt2).toHaveAttribute("aria-disabled", "true");
      expect(opt2).toHaveAttribute("aria-selected", "false");
      await user.click(opt2);
      expect(opt2).toHaveAttribute("aria-selected", "false");
      expect(spy).not.toHaveBeenCalled();
    });

    it("uses disabled prop on items, defaultSelectedValues not empty", async () => {
      const spy = vi.fn();
      render(
        <RichSelectBox
          data-testid="box"
          {...defaultRequiredProps}
          onChange={spy}
          defaultSelectedValues={["opt2"]}
        >
          <RichSelectBox.Section data-testid="section1" label="Group1">
            <RichSelectBox.Chip data-testid="opt1" label="Opt1" value="opt1" />
            <RichSelectBox.Chip
              data-testid="opt2"
              label="Opt2"
              value="opt2"
              disabled
            />
            <RichSelectBox.Chip
              data-testid="opt3"
              label="Opt3"
              value="opt3"
              disabled
            />
          </RichSelectBox.Section>
        </RichSelectBox>,
      );
      const opt2 = screen.getByTestId("opt2");
      expect(opt2).toHaveAttribute("aria-disabled", "true");
      expect(opt2).toHaveAttribute("aria-selected", "true");
      await user.click(opt2);
      expect(opt2).toHaveAttribute("aria-selected", "true");
      expect(spy).not.toHaveBeenCalled();
      const opt1 = screen.getByTestId("opt1");
      await user.click(opt1);
      expect(opt1).toHaveAttribute("aria-selected", "true");
      expect(opt2).toHaveAttribute("aria-selected", "false");
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt1"]);
    });

    it("uses disabled prop on items, selectedValues not empty", async () => {
      const spy = vi.fn();
      render(
        <RichSelectBox
          data-testid="box"
          {...defaultRequiredProps}
          onChange={spy}
          selectedValues={["opt2"]}
        >
          <RichSelectBox.Section data-testid="section1" label="Group1">
            <RichSelectBox.Chip data-testid="opt1" label="Opt1" value="opt1" />
            <RichSelectBox.Chip
              data-testid="opt2"
              label="Opt2"
              value="opt2"
              disabled
            />
            <RichSelectBox.Chip data-testid="opt3" label="Opt3" value="opt3" />
          </RichSelectBox.Section>
        </RichSelectBox>,
      );
      const opt2 = screen.getByTestId("opt2");
      expect(opt2).toHaveAttribute("aria-disabled", "true");
      expect(opt2).toHaveAttribute("aria-selected", "true");
      await user.click(opt2);
      expect(opt2).toHaveAttribute("aria-selected", "true");
      expect(spy).not.toHaveBeenCalled();
      const opt1 = screen.getByTestId("opt1");
      await user.click(opt1);
      expect(opt1).toHaveAttribute("aria-selected", "true");
      expect(opt2).toHaveAttribute("aria-selected", "false");
      await user.click(screen.getByTestId("box-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(["opt1"]);
    });
  });
});
