import React from "react";
import { screen, render } from "@testing-library/react";
import Template from "./Template";

// NOTE: Update this to be the lowercased version!
describe("Template", () => {
  it("it should render successfully", () => {
    // Update tests here:
    // Don't forget to add your props!
    render(<Template text="text!!" />);
    expect(screen).toBeTruthy();
  });
});
