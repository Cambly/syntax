import { render, screen } from "@testing-library/react";
import SelectList from "./SelectList";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

const SelectDropdown = ({
  numberOfOptions,
  onChange,
  onClick,
  selectedValue = "",
}: {
  selectedValue?: string;
  numberOfOptions: number;
  onClick?: React.MouseEventHandler<HTMLSelectElement>;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}) => {
  const options = Array.from({ length: numberOfOptions }, (item, idx) => ({
    value: String(idx),
    label: String(idx),
  }));
  return (
    <SelectList
      data-testid="syntax-select"
      selectedValue={selectedValue}
      onChange={onChange}
      onClick={onClick}
      placeholderText="placeholder"
      label="Select"
    >
      {options.map(({ label, value }) => (
        <SelectList.Option
          key={value}
          value={value}
          label={label}
          data-testid={`syntax-select-${value}`}
        />
      ))}
    </SelectList>
  );
};

const InteractiveSelectDropdown = ({
  numberOfOptions,
  handleChange,
  onClick,
}: {
  numberOfOptions: number;
  handleChange: (value: string) => void;
  onClick?: React.MouseEventHandler<HTMLSelectElement>;
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e.target.value);
    setSelectedValue(e.target.value);
  };
  return (
    <SelectDropdown
      onChange={onChange}
      onClick={onClick}
      selectedValue={selectedValue}
      numberOfOptions={numberOfOptions}
    />
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
    expect(screen.getAllByRole("option")).toHaveLength(numberOfOptions + 1);
  });
  it("calls onclick when clicking the select", async () => {
    const handleChange = vi.fn();
    const handleClick = vi.fn();

    render(
      <InteractiveSelectDropdown
        onClick={handleClick}
        handleChange={handleChange}
        numberOfOptions={3}
      />,
    );
    await userEvent.click(screen.getByTestId("syntax-select"));
    expect(handleClick).toHaveBeenCalledTimes(1);
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
    await userEvent.selectOptions(
      screen.getByTestId("syntax-select"),
      firstSelectionValue,
    );
    expect(handleChange).toHaveBeenCalledWith(firstSelectionValue);
    await userEvent.selectOptions(
      screen.getByTestId("syntax-select"),
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
    await userEvent.selectOptions(
      screen.getByTestId("syntax-select"),
      firstSelectionValue,
    );
    const option1 = screen.getByTestId<HTMLOptionElement>(
      `${"syntax-select"}-${firstSelectionValue}`,
    );
    expect(option1.selected).toBeTruthy();
    await userEvent.selectOptions(
      screen.getByTestId("syntax-select"),
      secondSelectionValue,
    );
    const option2 = screen.getByTestId<HTMLOptionElement>(
      `${"syntax-select"}-${secondSelectionValue}`,
    );
    expect(option2.selected).toBeTruthy();
    expect(option1.selected).toBeFalsy();
  });

  it("renders error text when the error text is set", () => {
    render(
      <div data-testid="syntax-select-container">
        <SelectList
          data-testid="syntax-select"
          selectedValue=""
          onChange={vi.fn()}
          helperText="helper text"
          errorText={"error text"}
          label="Select"
        >
          <SelectList.Option
            key={"key"}
            value={"value"}
            label={"label"}
            data-testid={`syntax-select-label`}
          />
        </SelectList>
      </div>,
    );
    expect(screen.getByTestId("syntax-select-container").textContent).toContain(
      "error text",
    );
  });

  it("renders helper text when the error text is an empty string", () => {
    render(
      <div data-testid="syntax-select-container">
        <SelectList
          data-testid="syntax-select"
          selectedValue=""
          onChange={vi.fn()}
          helperText="helper text"
          errorText={""}
          label="Select"
        >
          <SelectList.Option
            key={"key"}
            value={"value"}
            label={"label"}
            data-testid={`syntax-select-label`}
          />
        </SelectList>
      </div>,
    );
    expect(screen.getByTestId("syntax-select-container").textContent).toContain(
      "helper text",
    );
  });
});
