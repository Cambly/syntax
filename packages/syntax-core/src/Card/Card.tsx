import { forwardRef } from "react";
import Box from "../Box/Box";
import type allColors from "../colors/allColors";

type CardProps = {
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
   * The size of the card which specifies the padding and spacing of the card.
   *
   * `compact`: 8px padding
   * `medium`: 16px padding
   * `roomy`: 24px padding
   *
   * @defaultValue `medium`
   */
  size?: "compact" | "medium" | "roomy";
};

/**
 * [Card](https://cambly-syntax.vercel.app/?path=/docs/components-card--docs) is a basic container component to apply consistent styling and render child components.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  props: CardProps,
  ref,
): JSX.Element {
  const { children, ...cardProps } = props;
  const {
    backgroundColor = "white",
    size = "medium",
    "data-testid": dataTestId,
  } = cardProps;
  const getPadding = (size?: "compact" | "medium" | "roomy") => {
    if (size === "compact") return 2;
    if (size === "roomy") return 6;
    return 4;
  };

  return (
    <Box
      rounding="md"
      padding={getPadding(size)}
      width="100%"
      backgroundColor={backgroundColor}
      data-testid={dataTestId}
      ref={ref}
    >
      {children}
    </Box>
  );
});

export default Card;
