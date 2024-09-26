import {
  type ReactNode,
  forwardRef,
  useMemo,
  type ReactElement,
  useCallback,
} from "react";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";

const themeBackgroundColors = {
  neutral: ["pink", "lilac", "thistle"],
  cool: ["sky", "slate", "teal"],
  warm: ["red", "tan", "orange"],
} as const;

const degreeOfTiltOptions = [-6, -3, 0, 3, 6];

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

const WordConfetto = ({
  backgroundColor,
  rotation,
  size,
  text,
}: {
  backgroundColor:
    | "pink"
    | "lilac"
    | "thistle"
    | "sky"
    | "slate"
    | "teal"
    | "red"
    | "tan"
    | "orange";
  rotation: number;
  size: 300 | 400 | 700 | 800 | 900 | 1100;
  text: string;
}): ReactElement => {
  return (
    <Box
      backgroundColor={backgroundColor}
      dangerouslySetInlineStyle={{
        __style: {
          padding: paddings[size],
          transform: `rotate(${rotation}deg)`,
        },
      }}
      width="fit-content"
    >
      <Typography size={size} weight="bold" fontStyle="serif">
        {text}
      </Typography>
    </Box>
  );
};

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

    const hashCode = useCallback((string: string) => {
      let hash = 0;
      if (string.length === 0) return hash;
      for (let i = 0; i < string.length; i++) {
        const char = string.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
      }
      return Math.abs(hash);
    }, []);

    const styledWords = useMemo(
      () =>
        words.map((word) => ({
          text: word,
          backgroundColor: themeBackgroundColors[theme][hashCode(word) % 3],
          rotation: degreeOfTiltOptions[hashCode(word) % 5],
        })),
      [hashCode, theme, words],
    );

    return (
      <Box
        display="flex"
        direction={direction}
        flexWrap="wrap"
        data-testid={dataTestId}
        ref={ref}
        gap={gaps[size]}
      >
        {styledWords.map(
          ({ text, backgroundColor, rotation }, index): ReactNode => {
            return (
              <WordConfetto
                key={`${text}+${index}`}
                backgroundColor={backgroundColor}
                rotation={rotation}
                size={size}
                text={text}
              />
            );
          },
        )}
      </Box>
    );
  },
);

export default WordConfetti;
