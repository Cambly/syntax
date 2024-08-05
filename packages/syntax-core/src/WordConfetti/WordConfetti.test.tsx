import { screen, render } from "@testing-library/react";
import WordConfetti from "./WordConfetti";

describe("wordConfetti", () => {
  it("renders successfully", () => {
    const { baseElement } = render(
      <WordConfetti
        size={300}
        theme="neutral"
        words={["test", "word", "confetti"]}
      />,
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByText("confetti")).toBeInTheDocument();
  });

  it("renders all words successfully", () => {
    const { baseElement } = render(
      <WordConfetti
        size={300}
        theme="neutral"
        words={["test", "word", "confetti"]}
      />,
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByText("confetti")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("word")).toBeInTheDocument();
  });
});
