import React from "react";
import { screen, render } from "@testing-library/react";
import MiniActionCardGroup from "./MiniActionCardGroup";

// NOTE: Update this to be the lowercased version!
describe("MiniActionCardGroup", () => {
  it("renders successfully", () => {
    // Update tests here:
    // Don't forget to add your props!
    render(<MiniActionCardGroup text="text!!" />);
    expect(screen).toBeTruthy();
  });
});
