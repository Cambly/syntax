import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const MultiMediaDocument = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => (
  <Icon
    ref={ref}
    path="M8.75 5.575 8.1 7.5h1.3zM10.5 14a1.501 1.501 0 0 1 0 3 1.501 1.501 0 0 1 0-3m8-12h-13C4.673 2 4 2.672 4 3.5v17c0 .828.673 1.5 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 18.5 2M8 4h1.5l2 6h-1.275L9.8 8.75H7.7L7.275 10H6zm10 16-4-4-3 3-2-1-3 1.5V12h12zm0-10h-5V8h5zm0-4h-5V4h5z"
    color={color}
    size={size}
  />
));
MultiMediaDocument.displayName = "MultiMediaDocument";
export default MultiMediaDocument;
