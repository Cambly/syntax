import { screen, render } from "@testing-library/react";
import Box from "./Box";
import { expect } from "vitest";

describe("box", () => {
  it("renders successfully", () => {
    const { baseElement } = render(<Box>Test</Box>);
    expect(baseElement).toBeTruthy();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("passes trough certain props", () => {
    render(
      <Box aria-labelledby="other-element" data-testid="testId" id="id">
        Test
      </Box>,
    );

    const box = screen.getByTestId("testId");
    expect(box).toBeInTheDocument();
    expect(box.getAttribute("aria-labelledby")).toBe("other-element");
    expect(box.getAttribute("id")).toBe("id");
  });

  it("ignores most props", () => {
    render(
      <Box
        // @ts-expect-error className is not allowed
        className="whatever"
        data-testid="testId"
        src="test"
        style={{ color: "red" }}
      >
        Test
      </Box>,
    );

    const box = screen.getByTestId("testId");
    expect(box).toBeInTheDocument();
    expect(box.getAttribute("src")).toBe(null);
    expect(box.getAttribute("className")).toBe(null);
    expect(box.getAttribute("style")).toBe(null);
  });

  it("sets the correct style props on the box", () => {
    render(
      <Box
        data-testid="testId"
        height={1}
        maxHeight={2}
        maxWidth={3}
        minHeight={4}
        minWidth={5}
        width={6}
      ></Box>,
    );

    const box = screen.getByTestId("testId");
    expect(box).toBeInTheDocument();
    expect(box.getAttribute("style")).toMatchInlineSnapshot(
      '"height: 1px; max-height: 2px; max-width: 3px; min-height: 4px; min-width: 5px; width: 6px;"',
    );
  });

  it("sets the correct style props on the box (px)", () => {
    render(
      <Box
        data-testid="testId"
        height="1px"
        maxHeight="2px"
        maxWidth="3px"
        minHeight="4px"
        minWidth="5px"
        width="6px"
      ></Box>,
    );

    const box = screen.getByTestId("testId");
    expect(box).toBeInTheDocument();
    expect(box.getAttribute("style")).toMatchInlineSnapshot(
      '"height: 1px; max-height: 2px; max-width: 3px; min-height: 4px; min-width: 5px; width: 6px;"',
    );
  });

  it("allows for style overrides with dangerouslySetInlineStyle", () => {
    render(
      <Box
        data-testid="testId"
        dangerouslySetInlineStyle={{
          __style: {
            opacity: 0.9,
          },
        }}
      ></Box>,
    );

    const box = screen.getByTestId("testId");
    expect(box).toBeInTheDocument();
    expect(box.getAttribute("style")).toMatchInlineSnapshot('"opacity: 0.9;"');
  });
});
