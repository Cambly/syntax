import Box from "../Box/Box";
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
};

/**
 * [Card](https://cambly-syntax.vercel.app/?path=/docs/components-card--docs) is a basic container component to apply consistent styling and render child components.
 */
export default function Card({
  backgroundColor = "white",
  children,
  "data-testid": dataTestId,
}: CardType): JSX.Element {
  return (
    <Box
      rounding="lg"
      padding={5}
      smPadding={7}
      lgPadding={7}
      width="100%"
      backgroundColor={backgroundColor}
      data-testid={dataTestId}
    >
      {children}
    </Box>
  );
}
