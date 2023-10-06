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

  it("should have the specified maxWidth ", () => {
    render(
      <Card data-testid="card" maxWidth={352}>
        <>
          <h1>title</h1>
          <p>text</p>
        </>
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveStyle({
      width: "100%",
      maxWidth: "352px",
    });
  });

  it("should stretch to width of the container for no maxWidth specification", () => {
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
