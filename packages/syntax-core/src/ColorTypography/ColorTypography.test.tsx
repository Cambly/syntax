import { screen, render } from "@testing-library/react";
import ColorTypography from "./ColorTypography";
import { expect } from "vitest";

describe("colorTypography", () => {
  it("renders successfully", () => {
    const { baseElement } = render(<ColorTypography>Test</ColorTypography>);
    expect(baseElement).toBeTruthy();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("sets the correct HTML tag", () => {
    render(
      <>
        <ColorTypography as="h1">Heading 1</ColorTypography>
        <ColorTypography as="h2">Heading 2</ColorTypography>
        <ColorTypography as="h3">Heading 3</ColorTypography>
        <ColorTypography as="h4">Heading 4</ColorTypography>
        <ColorTypography as="h5">Heading 5</ColorTypography>
        <ColorTypography as="h6">Heading 6</ColorTypography>
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
    render(
      <ColorTypography data-testid="color-typography-testid">
        Test
      </ColorTypography>,
    );
    expect(screen.getByTestId("color-typography-testid")).toBeInTheDocument();
  });
});
