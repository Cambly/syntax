import Box from "../Box/Box";

// note: only sm + lg size currently, when design decides on the medium size, we can use the "size" constant
const CardSizes = ["sm", "lg"] as const;

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
   *
   * `sm`: 352px
   * `lg`: 744px
   *
   * @defaultValue sm
   */
  size?: (typeof CardSizes)[number];
};

/**
 * [Card](https://cambly-syntax.vercel.app/?path=/docs/components-card--docs) is a basic container component to apply consistent styling and render child components.
 */
export default function Card({
  children,
  size = "sm",
  "data-testid": dataTestId,
}: CardType): JSX.Element {
  const sizeWidth = {
    sm: 352,
    lg: 744,
  } as const;

  return (
    <Box
      rounding="xl"
      padding={7}
      smPadding={9}
      maxWidth={sizeWidth[size]}
      width="100%"
      backgroundColor="white"
      data-testid={dataTestId}
    >
      {children}
    </Box>
  );
}
