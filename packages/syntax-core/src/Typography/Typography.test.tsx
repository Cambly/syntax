import { screen, render } from "@testing-library/react";
import Typography from "./Typography";
import { expect } from "vitest";

describe("typography", () => {
  it("renders successfully", () => {
    const { baseElement } = render(<Typography>Test</Typography>);
    expect(baseElement).toBeTruthy();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("sets the correct HTML tag", () => {
    render(
      <>
        <Typography as="h1">Heading 1</Typography>
        <Typography as="h2">Heading 2</Typography>
        <Typography as="h3">Heading 3</Typography>
        <Typography as="h4">Heading 4</Typography>
        <Typography as="h5">Heading 5</Typography>
        <Typography as="h6">Heading 6</Typography>
      </>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Heading 1",
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Heading 2",
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Heading 3",
    );
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
      "Heading 4",
    );
    expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
      "Heading 5",
    );
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      "Heading 6",
    );
  });

  it("sets test id", () => {
    render(<Typography data-testid="typography-testid">Test</Typography>);
    expect(screen.getByTestId("typography-testid")).toBeInTheDocument();
  });
});
