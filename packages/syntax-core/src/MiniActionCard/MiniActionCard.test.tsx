import { render } from "@testing-library/react";
import MiniActionCard from "./MiniActionCard";

describe("miniActionCard", () => {
  it("should render children successfully", () => {
    const screen = render((
      <>
        <MiniActionCard>
          <h1>title</h1>
          <p>text</p>
        </MiniActionCard>
      </>
    ));
    expect(screen.getByText(/title/)).toBeInTheDocument();
    expect(screen.getByText(/text/)).toBeInTheDocument();
  });
});
