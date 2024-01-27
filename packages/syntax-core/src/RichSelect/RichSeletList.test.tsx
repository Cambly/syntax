import { act, render, screen } from "@testing-library/react";
import React from "react";
import RichSelectList from "./RichSelectList";
import { ListBoxItem as ReactAriaListBoxItem } from "react-aria-components";
import { vi } from "vitest";
import RichSelectOptGroup from "./RichSelectOptGroup";
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

describe("richSelectList", () => {
  it("should render without errors on first pass", async () => {
    render(
      <RichSelectList label="x" onChange={() => undefined}>
        <RichSelectList.Chip label="Opt1" value="opt1" />
        <RichSelectList.Chip label="Opt2" value="opt2" />
        <RichSelectList.Chip label="Opt3" value="opt3" />
      </RichSelectList>,
    );
    await act(() => vi.runAllTimers());
  });

  it("opens menu when trigger is clicked", async () => {
    render(
      <RichSelectList
        data-testid="trigger"
        label="x"
        onChange={() => undefined}
      >
        <RichSelectOptGroup data-testid="optgroup" label="Group 1">
          <RichSelectList.Chip label="Opt1" value="opt1" />
          <RichSelectList.Chip label="Opt2" value="opt2" />
          <RichSelectList.Chip label="Opt3" value="opt3" />
        </RichSelectOptGroup>
      </RichSelectList>,
    );
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    const listBox = screen.getByTestId("optgroup");
    expect(listBox).toBeInTheDocument();
  });

  it("clicks on an option without erroring", async () => {
    render(
      <RichSelectList
        data-testid="trigger"
        label="x"
        onChange={() => undefined}
      >
        <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
        <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
        <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
      </RichSelectList>,
    );
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    for (const id of ["opt1", "opt2", "opt3"]) {
      await user.click(screen.getByTestId(id));
      await act(() => vi.runAllTimers());
    }
  });

  it("does not call onChange after initial render", async () => {
    const spy = vi.fn();
    render(
      <RichSelectList data-testid="trigger" label="x" onChange={spy}>
        <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
        <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
        <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
      </RichSelectList>,
    );
    await act(() => vi.runAllTimers());
    expect(spy).not.toHaveBeenCalled();
  });

  it("does not call onChange when opening the dialog", async () => {
    const spy = vi.fn();
    render(
      <RichSelectList data-testid="trigger" label="x" onChange={spy}>
        <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
        <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
        <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
      </RichSelectList>,
    );
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(spy).not.toHaveBeenCalled();
  });

  it("calls onChange when an option is clicked (autoCommit)", async () => {
    const spy = vi.fn();
    render(
      <RichSelectList data-testid="trigger" label="x" onChange={spy} autoCommit>
        <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
        <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
        <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
      </RichSelectList>,
    );
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    await user.click(screen.getByTestId("opt1"));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(new Set(["opt1"]));
  });

  it("does not show primary/secondary save/clear buttons when autoCommit=true (default)", async () => {
    render(
      <RichSelectList
        data-testid="trigger"
        label="x"
        onChange={() => undefined}
      >
        <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
        <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
        <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
      </RichSelectList>,
    );
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(
      screen.queryByTestId("select-primary-button"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("select-secondary-button"),
    ).not.toBeInTheDocument();
  });

  it("does not show primary/secondary save/clear buttons when autoCommit=true (explicit)", async () => {
    render(
      <RichSelectList
        autoCommit={true}
        data-testid="trigger"
        label="x"
        onChange={() => undefined}
      >
        <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
        <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
        <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
      </RichSelectList>,
    );
    await user.click(screen.getByTestId("trigger"));
    await act(() => vi.runAllTimers());
    expect(
      screen.queryByTestId("select-primary-button"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("select-secondary-button"),
    ).not.toBeInTheDocument();
  });

  describe("autoCommit=false", () => {
    it("does not call onChange when an option is clicked", async () => {
      const spy = vi.fn();
      render(
        <RichSelectList
          autoCommit={false}
          data-testid="trigger"
          label="x"
          onChange={spy}
        >
          <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
          <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
          <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
        </RichSelectList>,
      );
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      expect(spy).not.toHaveBeenCalled();
    });

    it("does not onChange when the dialog is closed", async () => {
      const spy = vi.fn();
      render(
        <RichSelectList
          autoCommit={false}
          data-testid="trigger"
          label="x"
          onChange={spy}
        >
          <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
          <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
          <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
        </RichSelectList>,
      );
      await user.click(screen.getByTestId("trigger"));
      await act(() => vi.runAllTimers());
      await user.click(document.body);
      expect(spy).not.toHaveBeenCalled();
    });

    it("calls onChange when primary button is clicked", async () => {
      const spy = vi.fn();
      render(
        <RichSelectList
          autoCommit={false}
          data-testid="select"
          label="x"
          onChange={spy}
        >
          <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
          <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
          <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
        </RichSelectList>,
      );
      await user.click(screen.getByTestId("select"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("select-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(new Set(["opt1"]));
    });

    it("user can select different options before clicking save, onChange called once at end", async () => {
      const spy = vi.fn();
      render(
        <RichSelectList
          autoCommit={false}
          data-testid="select"
          label="x"
          onChange={spy}
        >
          <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
          <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
          <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
        </RichSelectList>,
      );
      await user.click(screen.getByTestId("select"));
      await act(() => vi.runAllTimers());
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt3"));
      await user.click(screen.getByTestId("select-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(new Set(["opt3"]));
    });

    it("user can select different options, onChange is not called when user clicks primary button if selection is same at end as beginning", async () => {
      const spy = vi.fn();
      render(
        <RichSelectList
          autoCommit={false}
          data-testid="select"
          label="x"
          onChange={spy}
        >
          <RichSelectList.Chip data-testid="opt1" label="Opt1" value="opt1" />
          <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
          <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
        </RichSelectList>,
      );
      await user.click(screen.getByTestId("select"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("select-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt3"));
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("select-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1); // did not call onChange again because final value did not change
    });

    it("does not call onChange if final selection is same as initial selection", async () => {
      const spy = vi.fn();
      render(
        <RichSelectList
          autoCommit={false}
          data-testid="select"
          label="x"
          onChange={spy}
          defaultSelectedValues={["opt1"]}
        >
          <RichSelectList.Chip
            data-testid="opt1"
            label="Opt1"
            value="opt1"
            selected
          />
          <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
          <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
        </RichSelectList>,
      );
      await user.click(screen.getByTestId("select"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("opt1"));
      await user.click(screen.getByTestId("select-primary-button"));
      expect(spy).not.toHaveBeenCalled();
    });

    it("does not call onChange if user clicks save without changing initial selection", async () => {
      const spy = vi.fn();
      render(
        <RichSelectList
          autoCommit={false}
          data-testid="select"
          label="x"
          onChange={spy}
          defaultSelectedValues={["opt1"]}
        >
          <RichSelectList.Chip
            data-testid="opt1"
            label="Opt1"
            value="opt1"
            selected
          />
          <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
          <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
        </RichSelectList>,
      );
      await user.click(screen.getByTestId("select"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("select-primary-button"));
      expect(spy).not.toHaveBeenCalled();
    });

    it("calls onChange if user clicks save after changing initial selection", async () => {
      const spy = vi.fn();
      render(
        <RichSelectList
          autoCommit={false}
          data-testid="select"
          label="x"
          onChange={spy}
          defaultSelectedValues={["opt1"]}
        >
          <RichSelectList.Chip
            data-testid="opt1"
            label="Opt1"
            value="opt1"
            selected
          />
          <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
          <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
        </RichSelectList>,
      );
      await user.click(screen.getByTestId("select"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("select-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(new Set(["opt2"]));
    });

    it("user can clear staged selection by clicking secondary button", async () => {
      const spy = vi.fn();
      render(
        <RichSelectList
          autoCommit={false}
          data-testid="select"
          label="x"
          onChange={spy}
          defaultSelectedValues={["opt1"]}
        >
          <RichSelectList.Chip
            data-testid="opt1"
            label="Opt1"
            value="opt1"
            selected
          />
          <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
          <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
        </RichSelectList>,
      );
      await user.click(screen.getByTestId("select"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("select-secondary-button"));
      expect(spy).not.toHaveBeenCalled();
    });

    it("clears the selection and calls onChange when user clicks clear then save if default selected values were provided", async () => {
      const spy = vi.fn();
      render(
        <RichSelectList
          autoCommit={false}
          data-testid="select"
          label="x"
          onChange={spy}
          defaultSelectedValues={["opt1"]}
        >
          <RichSelectList.Chip
            data-testid="opt1"
            label="Opt1"
            value="opt1"
            selected
          />
          <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
          <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
        </RichSelectList>,
      );
      await user.click(screen.getByTestId("select"));
      await act(() => vi.runAllTimers());
      expect(spy).not.toHaveBeenCalled();
      await user.click(screen.getByTestId("opt2"));
      await user.click(screen.getByTestId("select-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      await user.click(screen.getByTestId("select-secondary-button"));
      await user.click(screen.getByTestId("select-primary-button"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(new Set());
    });

    describe("multiple=true", () => {
      it("allows multiple selections", async () => {
        const spy = vi.fn();
        render(
          <RichSelectList
            autoCommit={false}
            data-testid="select"
            label="x"
            onChange={spy}
            multiple
          >
            <RichSelectList.Chip
              data-testid="opt1"
              label="Opt1"
              value="opt1"
              selected
            />
            <RichSelectList.Chip data-testid="opt2" label="Opt2" value="opt2" />
            <RichSelectList.Chip data-testid="opt3" label="Opt3" value="opt3" />
          </RichSelectList>,
        );
        await user.click(screen.getByTestId("select"));
        await act(() => vi.runAllTimers());
        expect(spy).not.toHaveBeenCalled();
        await user.click(screen.getByTestId("opt1"));
        await user.click(screen.getByTestId("opt2"));
        await user.click(screen.getByTestId("opt3"));
        await user.click(screen.getByTestId("select-primary-button"));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(new Set(["opt1", "opt2", "opt3"]));
      });
    });
  });
});
