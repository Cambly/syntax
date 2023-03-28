import { screen, render } from "@testing-library/react";
import Heading from "./Heading";
import { expect } from "vitest";

describe("heading", () => {
  it("renders successfully", () => {
    const { baseElement } = render(<Heading>Test</Heading>);
    expect(baseElement).toBeTruthy();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("sets the correct HTML tag", () => {
    render(
      <>
        <Heading as="h1">Heading 1</Heading>
        <Heading as="h2">Heading 2</Heading>
        <Heading as="h3">Heading 3</Heading>
        <Heading as="h4">Heading 4</Heading>
        <Heading as="h5">Heading 5</Heading>
        <Heading as="h6">Heading 6</Heading>
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
});
