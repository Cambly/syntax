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
});
