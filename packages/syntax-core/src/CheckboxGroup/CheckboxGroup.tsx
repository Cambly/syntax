import { type ReactNode, type ReactElement } from "react";
import Box from "../Box/Box";

export type checkedOptionProps = Record<string, boolean>;

/**
 * [CheckboxGroup](https://cambly-syntax.vercel.app/?path=/docs/components-typography--docs) is a component that renders a list of checkboxes.
 */
const CheckboxGroup = ({
  children,
}: {
  /**
   * The child components to render within Card.
   */
  children: ReactNode;
}): ReactElement => (
  <Box display="flex" direction="column" gap={3}>
    {children}
  </Box>
);

export default CheckboxGroup;
