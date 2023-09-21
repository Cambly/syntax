import { type ReactElement, type ReactPortal } from "react";
import { createPortal } from "react-dom";
import Box from "../Box/Box";

export default function Layer({
  children,
  zIndex = 1,
}: {
  children: ReactElement;
  zIndex?: number;
}): ReactPortal | null {
  return typeof document !== "undefined"
    ? createPortal(
        <Box
          data-testid="syntax-layer"
          position="fixed"
          dangerouslySetInlineStyle={{
            __style: { zIndex, inset: 0 },
          }}
        >
          {children}
        </Box>,
        document.body,
      )
    : null;
}
