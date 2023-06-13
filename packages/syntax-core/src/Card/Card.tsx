import Box from "../Box/Box";
import { type Size } from "../constants";

/**
 * Card is a basic container component to apply consistent styling and render child components.
 */

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
   * `md`: 400px
   * `lg`: 744px
   *
   * @defaultValue sm
   */
  size?: (typeof Size)[number];
};

const Card = ({
  children,
  size = "sm",
  "data-testid": dataTestId,
}: CardType): JSX.Element => {
  const sizeWidth = {
    sm: 352,
    md: 400,
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
};

export default Card;
