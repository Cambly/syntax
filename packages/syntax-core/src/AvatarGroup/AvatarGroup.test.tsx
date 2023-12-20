import React from "react";
import { screen, render } from "@testing-library/react";
import AvatarGroup from "./AvatarGroup2";

// NOTE: Update this to be the lowercased version!
describe("AvatarGroup", () => {
  it("renders successfully", () => {
    // Update tests here:
    // Don't forget to add your props!
    render(<AvatarGroup text="text!!" />);
    expect(screen).toBeTruthy();
  });
});
