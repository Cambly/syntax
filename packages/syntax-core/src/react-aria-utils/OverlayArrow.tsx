import React, { type ReactElement } from "react";
import { OverlayArrow as RAOverlayArrow } from "react-aria-components";

const PATHS = {
  top: <path d="M5 5L0 0H10L5 5Z" />,
  bottom: <path d="M5 0L0 5H10L5 0Z" />,
  right: <path d="M0 5L5 10L5 0L0 5Z" />,
  left: <path d="M5 5L0 0L0 10L5 5Z" />,
} as const;

function OverlayArrow({
  width = 10,
  height = 5,
}: {
  width?: number;
  height?: number;
}): ReactElement {
  return (
    <RAOverlayArrow style={{ display: "block" }}>
      {({ placement }) => {
        if (placement === "center") return null;
        const vertical = placement === "right" || placement === "left";
        return (
          <svg
            width={vertical ? height : width}
            height={vertical ? width : height}
            viewBox={vertical ? "0 0 5 10" : "0 0 10 5"}
            style={{
              display: "block",
              fill: "currentcolor",
              paddingInline: vertical ? undefined : 16,
              paddingBlock: vertical ? 16 : undefined,
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            {PATHS[placement]}
          </svg>
        );
      }}
    </RAOverlayArrow>
  );
}

export default OverlayArrow;
