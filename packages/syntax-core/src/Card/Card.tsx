import Box from "../Box/Box";

type CardType = {
  /**
   * Test id for the button
   */
  "data-testid"?: string;
  /**
   * The child components to render within Card.
   */
  children: JSX.Element;
  /**
   * The size of the card
   */
  maxWidth?: string | number;
};

/**
 * [Card](https://cambly-syntax.vercel.app/?path=/docs/components-card--docs) is a basic container component to apply consistent styling and render child components.
 */
export default function Card({
  children,
  maxWidth,
  "data-testid": dataTestId,
}: CardType): JSX.Element {
  return (
    <Box
      rounding="xl"
      padding={7}
      smPadding={9}
      maxWidth={maxWidth}
      width="100%"
      backgroundColor="white"
      data-testid={dataTestId}
    >
      {children}
    </Box>
  );
}
