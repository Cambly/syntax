import { screen, render } from "@testing-library/react";
import Card from "./Card";

describe("card", () => {
  it("should render children successfully", () => {
    render(
      <Card>
        <>
          <h1>title</h1>
          <p>text</p>
        </>
      </Card>,
    );
    expect(screen.getByText(/title/)).toBeInTheDocument();
    expect(screen.getByText(/text/)).toBeInTheDocument();
  });

  it("should have the right width for sm", () => {
    render(
      <Card size="sm" data-testid="card-sm">
        <>
          <h1>title</h1>
          <p>text</p>
        </>
      </Card>,
    );
    expect(screen.getByTestId("card-sm")).toHaveStyle({
      width: "100%",
      maxWidth: "352px",
    });
  });

  it("should have the right width for lg", () => {
    render(
      <Card size="lg" data-testid="card-lg">
        <>
          <h1>title</h1>
          <p>text</p>
        </>
      </Card>,
    );
    expect(screen.getByTestId("card-lg")).toHaveStyle({
      width: "100%",
      maxWidth: "744px",
    });
  });
});
