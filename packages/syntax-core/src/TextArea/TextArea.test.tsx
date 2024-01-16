import { render, screen } from "@testing-library/react";
import TextArea from "./TextArea";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("textArea", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <TextArea label="TextArea label" value="" onChange={() => undefined} />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("displays the label", () => {
    render(
      <TextArea label="TextArea label" value="" onChange={() => undefined} />,
    );
    expect(screen.getByText("TextArea label")).toBeInTheDocument();
  });

  it("displays the placeholder", () => {
    render(
      <TextArea
        label="TextArea label"
        placeholder="Placeholder"
        value=""
        onChange={() => undefined}
      />,
    );
    expect(screen.getByPlaceholderText("Placeholder")).toBeInTheDocument();
  });

  it("displays the value", () => {
    render(
      <TextArea
        label="TextArea label"
        value="Value"
        onChange={() => undefined}
      />,
    );
    expect(screen.getByDisplayValue("Value")).toBeInTheDocument();
  });

  it("displays the error", () => {
    render(
      <TextArea
        label="TextArea label"
        value=""
        onChange={() => undefined}
        errorText="Error"
      />,
    );
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("displays the helper text", () => {
    render(
      <TextArea
        label="TextArea label"
        value=""
        onChange={() => undefined}
        helperText="Helper text"
      />,
    );
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("displays the disabled state", () => {
    render(
      <TextArea
        label="TextArea label"
        value=""
        onChange={() => undefined}
        disabled
      />,
    );
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("fires the onChange event", async () => {
    const handleChange = vi.fn();
    render(
      <TextArea
        label="TextArea label"
        value=""
        onChange={handleChange}
        data-testid="syntax-TextArea"
      />,
    );
    const textArea = screen.getByTestId("syntax-TextArea");
    await userEvent.type(textArea, "test");
    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it("successfully grabs input value when changed", async () => {
    function TextAreaWithState() {
      const [value, setValue] = useState("");
      return (
        <TextArea
          label="TextArea label"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          data-testid="syntax-TextArea"
        />
      );
    }

    render(<TextAreaWithState />);
    const textArea = screen.getByTestId("syntax-TextArea");
    await userEvent.type(textArea, "test");
    expect(textArea).toHaveValue("test");
  });

  it("sets the data-testid correctly", () => {
    render(
      <TextArea
        data-testid="TextArea-test-id"
        label="TextArea label"
        value=""
        onChange={() => undefined}
      />,
    );
    expect(screen.getByTestId("TextArea-test-id")).toBeInTheDocument();
  });
});
