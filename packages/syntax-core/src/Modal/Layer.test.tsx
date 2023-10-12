import { render, screen } from "@testing-library/react";
import Layer from "./Layer";

describe("layer", () => {
  it("should render a Layer", () => {
    render(
      <Layer>
        <div data-testid="child">Content</div>
      </Layer>,
    );
    expect(screen.getByTestId("syntax-layer")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
