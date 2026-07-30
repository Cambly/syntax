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

  describe("lineHeight", () => {
    it("applies a 150% line-height when set to paragraph", () => {
      render(
        <Typography data-testid="paragraph" lineHeight="paragraph">
          Test
        </Typography>,
      );
      expect(screen.getByTestId("paragraph")).toHaveStyle({
        lineHeight: "150%",
      });
    });

    it("renders the 400-medium-paragraph serif style", () => {
      // `:lang(…) .serif` sets `line-height: 1.15em` at a higher specificity
      // than a single-class rule, so this style only works because that rule
      // reads `--syntax-typography-line-height`, which the paragraph class
      // sets. jsdom does not evaluate `:lang()`, so assert the custom property
      // — the actual override mechanism — rather than the resolved cascade.
      render(
        <>
          <Typography
            as="h2"
            data-testid="serif-default"
            fontStyle="serif"
            size={400}
            weight="medium"
          >
            400-medium
          </Typography>
          <Typography
            as="h2"
            data-testid="serif-paragraph"
            fontStyle="serif"
            lineHeight="paragraph"
            size={400}
            weight="medium"
          >
            400-medium-paragraph
          </Typography>
        </>,
      );

      // Unset, so the serif rule falls back to its 1.15em default (115%).
      expect(
        getComputedStyle(screen.getByTestId("serif-default")).getPropertyValue(
          "--syntax-typography-line-height",
        ),
      ).toBe("");

      const paragraph = getComputedStyle(screen.getByTestId("serif-paragraph"));
      expect(
        paragraph.getPropertyValue("--syntax-typography-line-height"),
      ).toBe("150%");
      expect(paragraph.lineHeight).toBe("150%");
      expect(paragraph.fontSize).toBe("25px");
      expect(paragraph.fontWeight).toBe("510");
    });

    it('leaves the per-size line-height of `as="p"` untouched by default', () => {
      render(
        <Typography as="p" data-testid="p400" size={400}>
          Test
        </Typography>,
      );
      expect(screen.getByTestId("p400")).toHaveStyle({ lineHeight: "130%" });
    });
  });
});
