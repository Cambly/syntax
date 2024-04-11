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
  /**
   * The size of the card which specifies the padding and spacing of the card.
   *
   * `compact`: 8px padding
   * `roomy`: 16px padding
   *
   * @defaultValue `roomy`
   */
  size?: "compact" | "roomy";
  /**
   * The border color of the box.
   * This is a passthrough prop directly to the Box component.
   *
   * Usage example: `border="1px solid var(--color-base-gray-300)"`
   * * @defaultValue `none`
   */
  border?: string;
};

/**
 * [Card](https://cambly-syntax.vercel.app/?path=/docs/components-card--docs) is a basic container component to apply consistent styling and render child components.
 */
export default function Card({
  backgroundColor = "white",
  children,
  size,
  border = "none",
  "data-testid": dataTestId,
}: CardType): JSX.Element {
  return (
    <Box
      rounding="md"
      padding={size === "compact" ? 2 : 4}
      width="100%"
      backgroundColor={backgroundColor}
      data-testid={dataTestId}
      dangerouslySetInlineStyle={{
        __style: { border: border ? border : "none" },
      }}
    >
      {children}
    </Box>
  );
}
