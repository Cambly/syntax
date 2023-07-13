import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckboxGroup from "./CheckboxGroup";
import { expect, vi } from "vitest";

const options = [
  { value: "event1", label: "Event 1" },
  { value: "event2", label: "Event 2" },
  { value: "event3", label: "Event 3" },
];

describe("checkboxGroup", () => {
  it("renders the component with the correct props with 24px size", () => {
    const visibleEventTypes = { event1: true, event2: false, event3: true };
    const onFormChange = vi.fn();

    render(
      <CheckboxGroup
        options={options}
        onFormChange={onFormChange}
        selections={visibleEventTypes}
      />,
    );

    expect(screen.getByLabelText("Event 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Event 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Event 3")).toBeInTheDocument();

    expect(screen.getByLabelText("Event 1")).toHaveStyle({
      height: "24px",
      width: "24px",
    });
    expect(screen.getByLabelText("Event 2")).toHaveStyle({
      height: "24px",
      width: "24px",
    });
    expect(screen.getByLabelText("Event 3")).toHaveStyle({
      height: "24px",
      width: "24px",
    });
  });

  it("calls onFormChange when a checkbox is clicked", async () => {
    const selections = { event1: true, event2: false, event3: true };
    const onFormChange = vi.fn();

    render(
      <CheckboxGroup
        options={options}
        onFormChange={onFormChange}
        selections={selections}
      />,
    );

    const checkbox2 = screen.getByLabelText("Event 2");

    await userEvent.click(checkbox2);

    expect(onFormChange).toHaveBeenCalledWith({
      event1: true,
      event2: true,
      event3: true,
    });
  });

  it("changes to 16px checkboxes when set to size: small", async () => {
    const visibleEventTypes = { event1: true, event2: false, event3: true };
    const onFormChange = vi.fn();

    render(
      <CheckboxGroup
        options={options}
        onFormChange={onFormChange}
        selections={visibleEventTypes}
        size="sm"
      />,
    );

    const checkbox2 = screen.getByLabelText("Event 2");

    await userEvent.click(checkbox2);

    expect(screen.getByLabelText("Event 1")).toHaveStyle({
      height: "16px",
      width: "16px",
    });
    expect(screen.getByLabelText("Event 2")).toHaveStyle({
      height: "16px",
      width: "16px",
    });
    expect(screen.getByLabelText("Event 3")).toHaveStyle({
      height: "16px",
      width: "16px",
    });
  });
});
