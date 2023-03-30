import { screen, render } from "@testing-library/react";
import RadioButton from "./RadioButton";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("radioButton", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <RadioButton
        label="Radio Button Label"
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
        checked
        label="Radio Button Label"
        onChange={handleChange}
      />,
    );
    const radioButton = await screen.findByLabelText("Radio Button Label");
    await userEvent.click(radioButton);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("successfully grabs input checked status when clicked", async () => {
    const handleChange = vi.fn();
    render(
      <RadioButton
        checked
        label="Radio Button Label"
        onChange={handleChange}
      />,
    );
    const radioButton = await screen.findByLabelText("Radio Button Label");
    await userEvent.click(radioButton);
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
      <RadioButton
        checked={false}
        label="Radio Button Label"
        onChange={handleChange}
      />,
    );
    const radioButton = await screen.findByLabelText("Radio Button Label");
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
});
