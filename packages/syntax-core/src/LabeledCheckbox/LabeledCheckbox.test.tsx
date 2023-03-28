import { screen, render } from "@testing-library/react";
import LabeledCheckbox from "./LabeledCheckbox";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("checkbox", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <LabeledCheckbox
        checked
        label="test"
        onChange={() => {
          /* empty */
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
  it("fires the onClick when clicked", async () => {
    const handleChange = vi.fn();
    render(<LabeledCheckbox checked label="test" onChange={handleChange} />);
    const checkbox = await screen.findAllByLabelText(
      "Continue to the next step",
    );
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.click(checkbox[0]);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
