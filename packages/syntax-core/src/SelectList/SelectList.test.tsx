import { render, screen } from "@testing-library/react";
import SelectList from "./SelectList";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

const InteractiveSelectDropdown = ({
  numberOfOptions,
  handleChange,
}: {
  numberOfOptions: number;
  handleChange: (value: string) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e.target.value);
    setSelectedValue(e.target.value);
  };
  return (
    <SelectDropdown
      onChange={onChange}
      selectedValue={selectedValue}
      numberOfOptions={numberOfOptions}
    />
  );
};

const SelectDropdown = ({
  numberOfOptions,
  onChange,
  selectedValue = "",
}: {
  selectedValue?: string;
  numberOfOptions: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const options = Array.from({ length: numberOfOptions }, (item, idx) => ({
    value: String(idx),
    label: String(idx),
  }));
  return (
    <SelectList
      selectedValue={selectedValue}
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

    render(
      <InteractiveSelectDropdown
        handleChange={handleChange}
        numberOfOptions={3}
      />,
    );
    const firstSelectionValue = "1";
    const secondSelectionValue = "2";
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.selectOptions(
      screen.getByTestId(selectTestId),
      firstSelectionValue,
    );
    expect(handleChange).toHaveBeenCalledWith(firstSelectionValue);
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.selectOptions(
      screen.getByTestId(selectTestId),
      secondSelectionValue,
    );
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith(secondSelectionValue);
  });
  it("updates selections when selecting multiple options", async () => {
    render(
      <InteractiveSelectDropdown
        handleChange={() => {
          /*empty*/
        }}
        numberOfOptions={3}
      />,
    );
    const firstSelectionValue = "1";
    const secondSelectionValue = "2";
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.selectOptions(
      screen.getByTestId(selectTestId),
      firstSelectionValue,
    );
    const option1 = screen.getByTestId<HTMLOptionElement>(
      `${selectTestId}-${firstSelectionValue}`,
    );
    expect(option1.selected).toBeTruthy();
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.selectOptions(
      screen.getByTestId(selectTestId),
      secondSelectionValue,
    );
    const option2 = screen.getByTestId<HTMLOptionElement>(
      `${selectTestId}-${secondSelectionValue}`,
    );
    expect(option2.selected).toBeTruthy();
    expect(option1.selected).toBeFalsy();
  });
});
