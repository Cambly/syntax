import { screen, render } from "@testing-library/react";
import RadioButton from "./RadioButton";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("radioButton", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <RadioButton
        label="Radio Button Label"
        name="radio-button"
        value="radio-button-value"
        onChange={() => {
          /* empty */
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("fires onChange when clicked", async () => {
    const handleChange = vi.fn();
    render(
      <RadioButton
        label="Radio Button Label"
        name="radio-button"
        value="radio-button-value"
        onChange={handleChange}
      />,
    );
    const radioButton = await screen.findByLabelText("Radio Button Label");
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.click(radioButton);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("successfully grabs input checked status when clicked", async () => {
    const handleChange = vi.fn();
    render(
      <RadioButton
        checked={true}
        name="radio-button"
        value="radio-button-value"
        label="Radio Button Label"
        onChange={handleChange}
      />,
    );
    const radioButton = await screen.findByLabelText("Radio Button Label");
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.click(radioButton);
    // NB: radio buttons do nothing if they're already checked
    // but got clicked on
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("successfully grabs input unchecked status when clicked", async () => {
    const handleChange = vi.fn();
    render(
      <RadioButton
        checked={false}
        name="radio-button"
        value="radio-button-value"
        label="Radio Button Label"
        onChange={handleChange}
      />,
    );
    const radioButton = await screen.findByLabelText("Radio Button Label");
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.click(radioButton);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        target: expect.objectContaining({
          checked: false,
        }),
      }),
    );
  });

  it("sets the data-testid", () => {
    const handleChange = vi.fn();
    render(
      <RadioButton
        checked={false}
        data-testid="radiobutton-test-id"
        name="radio-button"
        value="radio-button-value"
        label="Radio Button Label"
        onChange={handleChange}
      />,
    );
    expect(screen.getByTestId("radiobutton-test-id")).toBeInTheDocument();
  });
});
