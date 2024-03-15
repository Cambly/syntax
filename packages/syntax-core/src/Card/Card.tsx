import Box from "../Box/Box";
import { useTheme } from "../ThemeProvider/ThemeProvider";
import type allColors from "../colors/allColors";

type CardType = {
  /**
   * Test id for the button
   */
  "data-testid"?: string;
  /**
   * The background color of the box.
   * @defaultValue `white`
   */
  backgroundColor?: (typeof allColors)[number];
  /**
   * The child components to render within Card.
   */
  children: JSX.Element;
  /**
   * The size of the card (Cambio only) which specifies the padding and spacing of the card.
   *
   * `compact`: 8px padding
   * `roomy`: 16px padding
   *
   * @defaultValue `roomy`
   */
  size?: "compact" | "roomy";
};

/**
 * [Card](https://cambly-syntax.vercel.app/?path=/docs/components-card--docs) is a basic container component to apply consistent styling and render child components.
 */
export default function Card({
  backgroundColor = "white",
  children,
  size,
  "data-testid": dataTestId,
}: CardType): JSX.Element {
  const { themeName } = useTheme();

  const cambioPadding = size === "compact" ? 2 : 4;

  return (
    <Box
      rounding={themeName === "classic" ? "lg" : "md"}
      padding={themeName === "classic" ? 5 : cambioPadding}
      smPadding={themeName === "classic" ? 7 : undefined}
      width="100%"
      backgroundColor={backgroundColor}
      data-testid={dataTestId}
    >
      {children}
    </Box>
  );
}
