// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Button } from "@cambly/syntax-core";
import { type ReactElement } from "react";
import Icon from "./Icon";

export default function Example(): ReactElement {
  return (
    <>
      <Button text="Test 1" startIcon={<Icon />} />
      <Button text="Test 2" endIcon={<Icon />} />
      <Button text="Test 3" />
    </>
  );
}
