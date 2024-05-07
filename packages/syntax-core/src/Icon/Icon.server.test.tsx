import { render } from "@testing-library/react";
import Icon from "./Icon";
import { expect } from "vitest";
import Accent from "../../../syntax-icons/src/Accent";

describe("iconButton", () => {
  it("renders base Icon component successfully", () => {
    const { baseElement } = render(
      <Icon path="m0 19.2 15-15L19.8 9l-15 15H0v-4.8ZM16.8 2.4l4.8 4.8L24 4.8 19.2 0l-2.4 2.4Z" />,
    );
    expect(baseElement).toBeTruthy();
  });

  it("renders an Accent component", () => {
    const { baseElement } = render(<Accent />);
    expect(baseElement).toBeTruthy();
  });
});
