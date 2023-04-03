import { screen, render } from "@testing-library/react";
import Checkbox from "./Checkbox";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("checkbox", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <Checkbox
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
    render(
      <Checkbox
        checked
        label="Continue to the next step"
        onChange={handleChange}
      />,
    );
    const checkbox = await screen.findByLabelText("Continue to the next step");
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  it("successfully grabs input checked status when clicked", async () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        checked
        label="Continue to the next step"
        onChange={handleChange}
      />,
    );
    const checkbox = await screen.findByLabelText("Continue to the next step");
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        target: expect.objectContaining({
          checked: true,
        }),
      }),
    );
  });
  it("successfully grabs input unchecked status when clicked", async () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        checked={false}
        label="Continue to the next step"
        onChange={handleChange}
      />,
    );
    const checkbox = await screen.findByLabelText("Continue to the next step");
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        target: expect.objectContaining({
          checked: false,
        }),
      }),
    );
  });
});
