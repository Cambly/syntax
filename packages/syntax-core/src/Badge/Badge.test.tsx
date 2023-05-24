import { render } from "@testing-library/react";
import Badge from "./Badge";

describe("badge", () => {
  it("should render text successfully", () => {
    const screen = render(<Badge text="beta" />);
    expect(screen.getByText(/beta/)).toBeInTheDocument();
  });
});
