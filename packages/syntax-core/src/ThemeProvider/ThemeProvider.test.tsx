import { render, screen } from "@testing-library/react";
import ThemeProvider from "./ThemeProvider";

describe("themeProvider", () => {
  it("renders children", () => {
    render(
      <ThemeProvider>
        <div data-testid="children">Hello World</div>
      </ThemeProvider>,
    );

    expect(screen.getByTestId("children")).toHaveTextContent("Hello World");
  });

  it("renders the correct styles", () => {
    render(<ThemeProvider></ThemeProvider>);

    expect(screen.getByTestId("themeprovider-style")).toContainHTML(
      "--color-base-black: #050500;",
    );
    expect(screen.getByTestId("themeprovider-style")).toContainHTML(
      "--color-base-white: #ffffff;",
    );
    expect(screen.getByTestId("themeprovider-style")).toContainHTML(
      "--color-base-gray-100: #faf4eb;",
    );
    expect(screen.getByTestId("themeprovider-style")).toContainHTML(
      "--color-base-primary-100: #faf4eb;",
    );
    expect(screen.getByTestId("themeprovider-style")).toContainHTML(
      "elevation",
    );
    expect(screen.getByTestId("themeprovider-style")).toContainHTML("cambio");
  });
});
