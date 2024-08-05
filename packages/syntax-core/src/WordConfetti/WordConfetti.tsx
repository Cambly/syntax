import { type ReactNode, forwardRef } from "react";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";

type Direction = "row" | "column";
type WordConfettiProps = {
  /**
   * Test id for the confetti
   */
  "data-testid"?: string;
  /**
   * The direction to display the words.
   * @defaultValue row
   */
  direction?: Direction;
  /**
   * The size of the font in the confetti.
   */
  size: 300 | 400 | 700 | 800 | 900 | 1100;
  /**
   * The theme for the background colors of the confetti.
   */
  theme: "neutral" | "cool" | "warm";
  /**
   * The words to display as confetti.
   */
  words: string[];
};

const themeBackgroundColors = {
  neutral: ["pink", "lilac", "thistle"],
  cool: ["sky", "slate", "teal"],
  warm: ["red", "tan", "orange"],
} as const;

const degreeOfTiltOptions = [-6, -6, -3, -3, 0, 3, 3, 6, 6];

const paddings = {
  300: "16px 20px 16px 20px",
  400: "20px 24px 20px 24px",
  700: "24px 28px 24px 28px",
  800: "28px 40px 28px 40px",
  900: "32px 48px 32px 48px",
  1100: "36px 56px 36px 56px",
};

const gaps = {
  300: 3,
  400: 4,
  700: 6,
  800: 6,
  900: 9,
  1100: 10,
} as const;

/**
 * [WordConfetti](https://cambly-syntax.vercel.app/?path=/docs/components-wordconfetti--docs) is a container for displaying words in different color themes and fun offset angles.
 */
const WordConfetti = forwardRef<HTMLDivElement, WordConfettiProps>(
  function WordConfetti(props: WordConfettiProps, ref): JSX.Element {
    const {
      "data-testid": dataTestId,
      direction = "row",
      size,
      theme,
      words,
    } = props;

    return (
      <Box
        display="flex"
        direction={direction}
        flexWrap="wrap"
        data-testid={dataTestId}
        ref={ref}
        gap={gaps[size]}
      >
        {words.map((word, index): ReactNode => {
          const randomBackgroundColorIndex = Math.floor(Math.random() * 3);
          const randomDegreeOfTiltIndex = Math.floor(Math.random() * 9);

          return (
            <Box
              key={`${word}+${index}`}
              backgroundColor={
                themeBackgroundColors[theme][randomBackgroundColorIndex]
              }
              dangerouslySetInlineStyle={{
                __style: {
                  padding: paddings[size],
                  transform: `rotate(${degreeOfTiltOptions[randomDegreeOfTiltIndex]}deg)`,
                },
              }}
              width="fit-content"
            >
              <Typography size={size} weight="bold" fontStyle="serif">
                {word}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  },
);

export default WordConfetti;
