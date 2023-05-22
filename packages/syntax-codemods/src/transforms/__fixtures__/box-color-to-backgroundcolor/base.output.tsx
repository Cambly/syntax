// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box } from "@cambly/syntax-core";
import { type ReactElement } from "react";

export default function Example(): ReactElement {
  const color = "red";
  return (
    <>
      <Box rounding="pill" />
      <Box backgroundColor="red" />
      <Box backgroundColor={color} />
    </>
  );
}
