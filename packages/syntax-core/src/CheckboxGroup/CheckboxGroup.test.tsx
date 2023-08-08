import { render, screen } from "@testing-library/react";
import CheckboxGroup from "./CheckboxGroup";
import { expect } from "vitest";
import Checkbox from "../Checkbox/Checkbox";

describe("checkboxGroup", () => {
  it("renders the component with the correct props with 24px size", () => {
    const labels = ["Event 1", "Event 2", "Event 3"];

    render(
      <CheckboxGroup>
        {labels.map((label, i) => (
          <Checkbox
            key={i}
            checked={false}
            label={label}
            onChange={() => {
              /* empty */
            }}
            size="md"
          />
        ))}
      </CheckboxGroup>,
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
});
