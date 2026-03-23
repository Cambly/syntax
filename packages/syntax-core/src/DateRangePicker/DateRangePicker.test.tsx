import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { parseDate } from "@internationalized/date";
import { expect, vi } from "vitest";
import DateRangePicker from "./DateRangePicker";

describe("dateRangePicker", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <DateRangePicker label="Date range" onChange={() => undefined} />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("displays the label", () => {
    render(<DateRangePicker label="Trip dates" onChange={() => undefined} />);
    expect(screen.getByText("Trip dates")).toBeInTheDocument();
  });

  it("renders the calendar open button", () => {
    render(<DateRangePicker label="Date range" onChange={() => undefined} />);
    expect(
      screen.getByRole("button", { name: /calendar/i }),
    ).toBeInTheDocument();
  });

  it("opens the calendar popover on button click", async () => {
    render(<DateRangePicker label="Date range" onChange={() => undefined} />);
    const button = screen.getByRole("button", { name: /calendar/i });
    await userEvent.click(button);
    // Two calendar grids are rendered (current month + next month)
    expect(screen.getAllByRole("grid")).toHaveLength(2);
  });

  it("displays description text", () => {
    render(
      <DateRangePicker
        label="Date range"
        description="Select a start and end date."
        onChange={() => undefined}
      />,
    );
    expect(
      screen.getByText("Select a start and end date."),
    ).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(
      <DateRangePicker
        label="Date range"
        errorMessage="Invalid date range."
        onChange={() => undefined}
      />,
    );
    expect(screen.getByText("Invalid date range.")).toBeInTheDocument();
  });

  it("does not display error message when not set", () => {
    render(<DateRangePicker label="Date range" onChange={() => undefined} />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders in disabled state", () => {
    render(
      <DateRangePicker
        label="Date range"
        isDisabled
        onChange={() => undefined}
      />,
    );
    expect(screen.getByRole("button", { name: /calendar/i })).toBeDisabled();
  });

  it("does not open calendar when disabled", async () => {
    render(
      <DateRangePicker
        label="Date range"
        isDisabled
        onChange={() => undefined}
      />,
    );
    const button = screen.getByRole("button", { name: /calendar/i });
    await userEvent.click(button);
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });

  it("renders with a pre-selected value without crashing", () => {
    render(
      <DateRangePicker
        label="Date range"
        value={{
          start: parseDate("2026-03-10"),
          end: parseDate("2026-03-20"),
        }}
        onChange={() => undefined}
      />,
    );
    expect(screen.getByText("Date range")).toBeInTheDocument();
  });

  it("calls onChange when a date range is selected", async () => {
    const handleChange = vi.fn();
    render(<DateRangePicker label="Date range" onChange={handleChange} />);

    // Open the calendar
    await userEvent.click(screen.getByRole("button", { name: /calendar/i }));

    // Click two specific date cells by their accessible label
    // The calendar shows the current month (March 2026 per test date)
    await userEvent.click(screen.getByRole("button", { name: /March 10/ }));
    await userEvent.click(screen.getByRole("button", { name: /March 15/ }));

    expect(handleChange).toHaveBeenCalledWith({
      start: parseDate("2026-03-10"),
      end: parseDate("2026-03-15"),
    });
  });

  it("applies data-testid to the group element", () => {
    render(
      <DateRangePicker
        label="Date range"
        data-testid="date-range-picker"
        onChange={() => undefined}
      />,
    );
    expect(screen.getByTestId("date-range-picker")).toBeInTheDocument();
  });

  it("renders sm size without errors", () => {
    const { baseElement } = render(
      <DateRangePicker
        label="Date range"
        size="sm"
        onChange={() => undefined}
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders md size without errors", () => {
    const { baseElement } = render(
      <DateRangePicker
        label="Date range"
        size="md"
        onChange={() => undefined}
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders lg size without errors", () => {
    const { baseElement } = render(
      <DateRangePicker
        label="Date range"
        size="lg"
        onChange={() => undefined}
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("pads single-digit month and day segments with leading zeros", () => {
    render(
      <DateRangePicker
        label="Date range"
        value={{
          start: parseDate("2026-01-05"),
          end: parseDate("2026-02-03"),
        }}
        onChange={() => undefined}
      />,
    );
    // padSegment should ensure "1" → "01", "5" → "05", etc.
    expect(screen.getAllByText("01")).toHaveLength(1);
    expect(screen.getAllByText("05")).toHaveLength(1);
    expect(screen.getAllByText("02")).toHaveLength(1);
    expect(screen.getAllByText("03")).toHaveLength(1);
  });

  it("renders with a custom locale", () => {
    const { baseElement } = render(
      <DateRangePicker
        label="日期范围"
        locale="zh-CN"
        onChange={() => undefined}
      />,
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByText("日期范围")).toBeInTheDocument();
  });

  it("renders with allowsNonContiguousRanges", () => {
    const { baseElement } = render(
      <DateRangePicker
        label="Date range"
        allowsNonContiguousRanges
        isDateUnavailable={(date) => {
          const jsDate = date.toDate("UTC");
          return jsDate.getDay() === 0; // Sundays unavailable
        }}
        onChange={() => undefined}
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders two calendar grids showing two months", async () => {
    render(<DateRangePicker label="Date range" onChange={() => undefined} />);
    await userEvent.click(screen.getByRole("button", { name: /calendar/i }));
    const grids = screen.getAllByRole("grid");
    expect(grids).toHaveLength(2);
  });
});
