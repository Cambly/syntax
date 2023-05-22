// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box } from "@cambly/syntax-core";
import { type ReactElement } from "react";

export default function Example(): ReactElement {
  return (
    <>
      <Box rounding="sm" />
      <Box rounding="pill" />
      <Box rounding="circle" />
    </>
  );
}
