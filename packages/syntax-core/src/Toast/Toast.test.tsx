import { render } from "@testing-library/react";
import Toast from "./Toast";
import { expect } from "vitest";

describe("toast", () => {
  it("renders successfully", () => {
    render(<Toast heading="Attention" body="You're doing great :)" />);
    expect(screen).toBeTruthy();
  });
  it("renders text successfully", () => {
    const screen = render(
      <Toast heading="Attention" body="You're doing great :)" />,
    );
    expect(screen.getByText(/Attention/)).toBeInTheDocument();
    expect(screen.getByText(/You're doing great/)).toBeInTheDocument();
  });
  it("sets the data-testid", () => {
    const screen = render(
      <Toast
        data-testid="toast-test-id"
        heading="Attention"
        body="You're doing great :)"
      />,
    );
    expect(screen.getByTestId("toast-test-id")).toBeInTheDocument();
  });
});
