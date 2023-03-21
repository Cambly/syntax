import { screen, render } from "@testing-library/react";
import ButtonGroup from "./ButtonGroup";
import Button from "../Button/Button";
import { expect } from "vitest";

describe("buttonGroup", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <ButtonGroup>
        <Button
          onClick={() => {
            /* empty */
          }}
          text="Cancel"
        />
        <Button
          onClick={() => {
            /* empty */
          }}
          text="Continue"
        />
      </ButtonGroup>,
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders 2 buttons", async () => {
    render(
      <ButtonGroup>
        <Button
          onClick={() => {
            /* empty */
          }}
          text="Cancel"
        />
        <Button
          onClick={() => {
            /* empty */
          }}
          text="Continue"
        />
      </ButtonGroup>,
    );
    const buttons = await screen.findAllByRole("button");
    expect(buttons).toHaveLength(2);
  });
});
