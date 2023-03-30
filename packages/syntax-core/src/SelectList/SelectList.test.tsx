import { render } from "@testing-library/react";
import SelectList from "./SelectList";
import { expect } from "vitest";
import SelectOption from "./SelectOption";

const options = [
  { label: "Option 1", value: "opt1" },
  { label: "Option 2", value: "opt2" },
  { label: "Option 3", value: "opt3" },
];

const Options = () => (
  <>
    {options.map((o) => (
      <SelectOption key={o.value} value={o.value} label={o.label} />
    ))}
  </>
);

describe("select", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <SelectList
        selectedValue=""
        onChange={() => {
          /* empty */
        }}
        placeholderText="placeholder"
      >
        <Options />
      </SelectList>,
    );
    expect(baseElement).toBeTruthy();
  });
  it("fires the onChange when option is clicked", async () => {
    const handleChange = vi.fn();
    render(
      <SelectList
        selectedValue=""
        onChange={handleChange}
        placeholderText="placeholder"
        label="Select"
      >
        <Options />
      </SelectList>,
    );
    const selectDropdown = await screen.findByLabel("Select");
    // eslint-disable-next-line testing-library/no-await-sync-events
    await userEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
