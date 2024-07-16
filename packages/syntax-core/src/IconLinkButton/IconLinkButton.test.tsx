import React from "react";
import { screen, render } from "@testing-library/react";
import IconLinkButton from "./IconLinkButton";

// NOTE: Update this to be the lowercased version!
describe("IconLinkButton", () => {
  it("renders successfully", () => {
    // Update tests here:
    // Don't forget to add your props!
    render(<IconLinkButton text="text!!" />);
    expect(screen).toBeTruthy();
  });
});
