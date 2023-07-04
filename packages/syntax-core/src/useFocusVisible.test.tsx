import { screen, render } from "@testing-library/react";
import useFocusVisible from "./useFocusVisible";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

const TestInput = () => {
  const { isFocusVisible } = useFocusVisible();
  return (
    <>
      <input
        type="checkbox"
        id="checkboxId"
        name="checkboxName"
        data-testid="syntax-custom-checkbox-input"
      />
      <p data-testid="syntax-is-focus-visible">
        {isFocusVisible ? "true" : "false"}
      </p>
    </>
  );
};

describe("useFocusVisible", () => {
  it("do not focus when a user clicks on the component", async () => {
    render(<TestInput />);
    const checkboxInput = screen.getByTestId("syntax-custom-checkbox-input");
    const isFocusVisible = screen.getByTestId("syntax-is-focus-visible");
    await userEvent.click(checkboxInput);
    expect(isFocusVisible).toHaveTextContent("false");
  });

  it("focus when a user uses a keyboard to select the component", async () => {
    render(<TestInput />);
    const isFocusVisible = screen.getByTestId("syntax-is-focus-visible");
    await userEvent.keyboard("{Tab}");
    expect(isFocusVisible).toHaveTextContent("true");
  });
});
