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
  const options = [];
  for (let i = 1; i <= numberOfOptions; i++) {
    options.push({ value: String(i), label: String(i) });
  }
  return (
    <SelectList
      selectedValue=""
      onChange={onChange}
      placeholderText="placeholder"
      label="Select"
    >
      <>
        {options.map((o) => (
          <SelectList.Option key={o.value} value={o.value} label={o.value} />
        ))}
      </>
    </SelectList>
  );
};

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
    await userEvent.selectOptions(screen.getByTestId("test-select-id"), "1");
    await userEvent.selectOptions(screen.getByTestId("test-select-id"), "2");
    expect(handleChange).toHaveBeenCalledTimes(2);
  });
  it("updates selections when selecting multiple options  ", async () => {
    render(
      <SelectDropdown
        onChange={() => {
          /* empty */
        }}
        numberOfOptions={3}
      />,
    );
    await userEvent.selectOptions(screen.getByTestId("test-select-id"), "1");
    const option1 = screen.getByTestId<HTMLOptionElement>("select-option-1");
    expect(option1.selected).toBeTruthy();
    await userEvent.selectOptions(screen.getByTestId("test-select-id"), "2");
    const option2 = screen.getByTestId<HTMLOptionElement>("select-option-2");
    expect(option2.selected).toBeTruthy();
    expect(option1.selected).toBeFalsy();
  });
});
