/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable testing-library/no-await-sync-events */
import { render, screen } from "@testing-library/react";
import SelectList from "./SelectList";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

const SelectDropdown = ({
  numberOfOptions,
  onChange,
}: {
  numberOfOptions: number;
  onChange: () => void;
}) => {
  const options = Array.from({ length: numberOfOptions }, (item, idx) => ({
    value: String(idx),
    label: String(idx),
  }));
  return (
    <SelectList
      selectedValue=""
      onChange={onChange}
      placeholderText="placeholder"
      label="Select"
    >
      {options.map(({ label, value }) => (
        <SelectList.Option key={value} value={value} label={label} />
      ))}
    </SelectList>
  );
};

const selectTestId = "syntax-select";

describe("select", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <SelectDropdown
        onChange={() => {
          /* empty */
        }}
        numberOfOptions={1}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
  it("should display the correct number of options", () => {
    const numberOfOptions = 4;
    render(
      <SelectDropdown
        onChange={() => {
          /* empty */
        }}
        numberOfOptions={numberOfOptions}
      />,
    );

    // Expect one additional option because of the placeholder option
    expect(screen.getAllByRole("option").length).toBe(numberOfOptions + 1);
  });
  it("calls onchange on selecting option", async () => {
    const handleChange = vi.fn();
    render(<SelectDropdown onChange={handleChange} numberOfOptions={3} />);
    await userEvent.selectOptions(screen.getByTestId(selectTestId), "1");
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "1",
        }),
      }),
    );
    await userEvent.selectOptions(screen.getByTestId(selectTestId), "2");
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "2",
        }),
      }),
    );
  });
  it("updates selections when selecting multiple options", async () => {
    render(
      <SelectDropdown
        onChange={() => {
          /* empty */
        }}
        numberOfOptions={3}
      />,
    );
    await userEvent.selectOptions(screen.getByTestId(selectTestId), "1");
    const option1 = screen.getByTestId<HTMLOptionElement>("syntax-select-1");
    expect(option1.selected).toBeTruthy();
    await userEvent.selectOptions(screen.getByTestId(selectTestId), "2");
    const option2 = screen.getByTestId<HTMLOptionElement>("syntax-select-2");
    expect(option2.selected).toBeTruthy();
    expect(option1.selected).toBeFalsy();
  });
});
