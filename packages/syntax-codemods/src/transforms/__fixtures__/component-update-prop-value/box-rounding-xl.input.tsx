// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box } from "@cambly/syntax-core";
import { type ReactElement } from "react";

export default function Example(): ReactElement {
  return (
    <>
      <Box rounding="xl" display="flex" />
      <Box rounding="lg" display="flex" />
      <Box rounding="md" display="flex" />
      <Box rounding="sm" display="flex" />
      <Box rounding="full" display="flex" />
      <Box rounding="none" display="flex" />
    </>
  );
}
