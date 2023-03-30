/* eslint-disable testing-library/no-await-sync-events */
import { render, screen } from "@testing-library/react";
import SelectList from "./SelectList";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

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
        <>
          <SelectList.Option value="1" label="1" />
          <SelectList.Option value="2" label="2" />
        </>
      </SelectList>,
    );
    expect(baseElement).toBeTruthy();
  });
  it("calls onchange on selecting option", async () => {
    const handleChange = vi.fn();
    render(
      <SelectList
        selectedValue=""
        onChange={handleChange}
        placeholderText="placeholder"
        label="Select"
      >
        <>
          <SelectList.Option value="1" label="1" />
          <SelectList.Option value="2" label="2" />
          <SelectList.Option value="3" label="3" />
        </>
      </SelectList>,
    );
    await userEvent.selectOptions(screen.getByTestId("test-select-id"), "1");
    await userEvent.selectOptions(screen.getByTestId("test-select-id"), "2");
    expect(handleChange).toHaveBeenCalledTimes(2);
  });
  it("changes updates selections when selecting multiple options  ", async () => {
    render(
      <SelectList
        selectedValue=""
        onChange={() => {
          /* empty */
        }}
        placeholderText="placeholder"
        label="Select"
      >
        <>
          <SelectList.Option value="1" label="1" />
          <SelectList.Option value="2" label="2" />
          <SelectList.Option value="3" label="3" />
        </>
      </SelectList>,
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
