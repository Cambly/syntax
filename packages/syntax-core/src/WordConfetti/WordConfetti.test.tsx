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
    const wordsWithRotation = [
      {
        word: "a",
        rotation: "0deg",
        backgroundColor: "lilac",
      },
      {
        word: "b",
        rotation: "3deg",
        backgroundColor: "thistle",
      },
      {
        word: "c",
        rotation: "6deg",
        backgroundColor: "pink",
      },
      {
        word: "d",
        rotation: "-6deg",
        backgroundColor: "lilac",
      },
      {
        word: "e",
        rotation: "-3deg",
        backgroundColor: "thistle",
      },
      {
        word: "f",
        rotation: "0deg",
        backgroundColor: "pink",
      },
      {
        word: "g",
        rotation: "3deg",
        backgroundColor: "lilac",
      },
      {
        word: "h",
        rotation: "6deg",
        backgroundColor: "thistle",
      },
    ] as const;

    render(
      <WordConfetti
        data-testid="confetti"
        size={300}
        theme="neutral"
        words={wordsWithRotation.map((word) => word.word)}
      />,
    );

    Object.entries(wordsWithRotation).forEach(([index, word]) => {
      const confetto = screen.getByTestId(`confetti-${index}`);
      expect(confetto.getAttribute("style")).toContain(word.rotation);
      expect(confetto.className).toContain(word.backgroundColor);
    });
  });
});
