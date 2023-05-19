import Box from "../Box/Box";

/**
 * Card is a basic container component to apply consistent styling and render child components.
 */
const Card = ({
  children,
}: {
  /**
   * The child components to render within Card.
   */
  children: JSX.Element;
}): JSX.Element => (
  <Box rounding="xl" padding={7} smPadding={9} backgroundColor="white">
    {children}
  </Box>
);

export default Card;
