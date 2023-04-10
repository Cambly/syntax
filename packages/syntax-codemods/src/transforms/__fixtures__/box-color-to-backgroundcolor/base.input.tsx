// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box } from "@cambly/syntax-core";

export default function Example() {
  const color = "red";
  return (
    <>
      <Box rounding="pill" />
      <Box color="red" />
      <Box color={color} />
    </>
  );
}
