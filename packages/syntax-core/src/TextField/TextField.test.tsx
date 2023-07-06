import { render, screen } from "@testing-library/react";
import TextField from "./TextField";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("textField", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <TextField label="TextField label" value="" onChange={() => undefined} />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("displays the label", () => {
    render(
      <TextField label="TextField label" value="" onChange={() => undefined} />,
    );
    expect(screen.getByText("TextField label")).toBeInTheDocument();
  });

  it("displays the placeholder", () => {
    render(
      <TextField
        label="TextField label"
        placeholder="Placeholder"
        value=""
        onChange={() => undefined}
      />,
    );
    expect(screen.getByPlaceholderText("Placeholder")).toBeInTheDocument();
  });

  it("displays the value", () => {
    render(
      <TextField
        label="TextField label"
        value="Value"
        onChange={() => undefined}
      />,
    );
    expect(screen.getByDisplayValue("Value")).toBeInTheDocument();
  });

  it("displays the error", () => {
    render(
      <TextField
        label="TextField label"
        value=""
        onChange={() => undefined}
        errorText="Error"
      />,
    );
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("displays the helper text", () => {
    render(
      <TextField
        label="TextField label"
        value=""
        onChange={() => undefined}
        helperText="Helper text"
      />,
    );
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("displays the disabled state", () => {
    render(
      <TextField
        label="TextField label"
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
      <TextField
        label="TextField label"
        value=""
        onChange={handleChange}
        data-testid="syntax-textfield"
      />,
    );
    const textField = screen.getByTestId("syntax-textfield");
    await userEvent.type(textField, "test");
    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it("successfully grabs input value when changed", async () => {
    function TextFieldWithState() {
      const [value, setValue] = useState("");
      return (
        <TextField
          label="TextField label"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          data-testid="syntax-textfield"
        />
      );
    }

    render(<TextFieldWithState />);
    const textField = screen.getByTestId("syntax-textfield");
    await userEvent.type(textField, "test");
    expect(textField).toHaveValue("test");
  });

  it("sets the data-testid correctly", () => {
    render(
      <TextField
        data-testid="textfield-test-id"
        label="TextField label"
        value=""
        onChange={() => undefined}
      />,
    );
    expect(screen.getByTestId("textfield-test-id")).toBeInTheDocument();
  });
});
