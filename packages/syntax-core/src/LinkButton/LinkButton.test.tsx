import { screen, render } from "@testing-library/react";
import LinkButton from "./LinkButton";

describe("linkbutton", () => {
  it("it should render successfully", () => {
    // Update tests here:
    // Don't forget to add your props!
    render(<LinkButton />);
    expect(screen).toBeTruthy();
  });
});
