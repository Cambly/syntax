import { render } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  it("should render children successfully", () => {
    const screen = render(
      <Card>
        <h1>title</h1>
        <p>text</p>
      </Card>,
    );
    expect(screen.getByText(/title/)).toBeInTheDocument();
    expect(screen.getByText(/text/)).toBeInTheDocument();
  });
});
