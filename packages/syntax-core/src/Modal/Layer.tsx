import { type ReactElement, type ReactPortal } from "react";
import { createPortal } from "react-dom";
import Box from "../Box/Box";

function Layer({
  children,
  zIndex = 0,
}: {
  children: ReactElement;
  zIndex?: number;
}): ReactPortal | ReactElement | null {
  return createPortal(
    <Box
      position="fixed"
      dangerouslySetInlineStyle={{
        __style: { zIndex, top: "0", bottom: "0", left: "0", right: "0" },
      }}
    >
      {children}
    </Box>,
    document.body,
  );
}

export default Layer;
