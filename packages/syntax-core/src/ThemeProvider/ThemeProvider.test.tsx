import { render, screen } from "@testing-library/react";
import ThemeProvider, { useTheme } from "./ThemeProvider";

function ExampleComponent() {
  const { themeName } = useTheme();
  return <div data-testid="themeName">{themeName}</div>;
}

describe("themeProvider", () => {
  it("renders children with the provided themeName - classic", () => {
    const themeName = "classic";
    render(
      <ThemeProvider themeName={themeName}>
        <ExampleComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("themeName")).toHaveTextContent(themeName);
  });
  it("renders children with the provided themeName - cambio", () => {
    const themeName = "cambio";
    render(
      <ThemeProvider themeName={themeName}>
        <ExampleComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("themeName")).toHaveTextContent(themeName);
  });

  it("renders the correct classic styles", () => {
    render(
      <ThemeProvider themeName="classic">
        <ExampleComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("themeprovider-style")).toContainHTML(
      "--color-base-black: #000000;",
    );
    expect(screen.getByTestId("themeprovider-style")).toContainHTML(
      "--color-base-white: #ffffff;",
    );
    expect(screen.getByTestId("themeprovider-style")).toContainHTML(
      "--color-base-gray-10: rgba(203, 203, 203, 0.5);",
    );
    expect(screen.getByTestId("themeprovider-style")).toContainHTML(
      "--elevation-400: 0px 16px 32px 0px #00000040;",
    );
    expect(screen.getByTestId("themeprovider-style")).not.toContainHTML(
      "cambio",
    );
  });

  it("renders the correct cambio styles", () => {
    render(
      <ThemeProvider themeName="cambio">
        <ExampleComponent />
      </ThemeProvider>,
    );

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
