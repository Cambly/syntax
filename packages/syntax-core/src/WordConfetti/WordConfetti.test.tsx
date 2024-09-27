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
    render(
      <WordConfetti
        size={300}
        theme="neutral"
        words={["test", "word", "confetti"]}
      />,
    );
    expect(screen.getByText("confetti")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("word")).toBeInTheDocument();
  });

  it("returns a consistent color and tilt for words", () => {
    render(
      <WordConfetti
        size={300}
        theme="neutral"
        words={["test", "word", "confetti"]}
      />,
    );

    const confetti = screen.getByTestId("confetti");
    expect(confetti.getAttribute("style")).toMatchInlineSnapshot(
      `"padding: 16px 20px 16px 20px; transform: rotate(3deg);"`,
    );
    expect(confetti.className).toMatchInlineSnapshot(
      `"_box_b2ac18 _thistleBackgroundColor_0d99d4"`,
    );
  });
});
