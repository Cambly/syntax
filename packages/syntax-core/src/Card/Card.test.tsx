import { screen, render } from "@testing-library/react";
import Card from "./Card";
import Box from "../Box/Box";

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

  it("should stretch to the width of the container", () => {
    render(
      <Box width={1000}>
        <Card data-testid="card">
          <>
            <h1>title</h1>
            <p>text</p>
          </>
        </Card>
      </Box>,
    );
    expect(screen.getByTestId("card")).toHaveStyle({
      width: "100%",
      maxWidth: undefined,
    });
  });
});
