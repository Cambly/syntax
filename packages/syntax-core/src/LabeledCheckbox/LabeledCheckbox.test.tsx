import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LabeledCheckbox from "./LabeledCheckbox";
import { expect, vi } from "vitest";

describe("checkbox", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <LabeledCheckbox
        checked
        label="test"
        onClick={() => {
          /* empty */
        }}
        onKeyDown={() => {
          /* empty */
        }}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
  it("fires the onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(
      <LabeledCheckbox
        onClick={handleClick}
        label="test checkbox"
        checked={false}
        onKeyDown={handleClick}
      />,
    );
    const checkbox = await screen.findAllByLabelText("test checkbox");
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.click(checkbox[0]);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
