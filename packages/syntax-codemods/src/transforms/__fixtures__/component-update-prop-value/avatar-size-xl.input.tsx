// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Avatar } from "@cambly/syntax-core";
import { type ReactElement } from "react";

export default function Example(): ReactElement {
  return (
    <>
      <Avatar size="xl" accessibilityLabel="Jane" src="/image.png" />
      <Avatar size="lg" accessibilityLabel="Jane" src="/image.png" />
    </>
  );
}
