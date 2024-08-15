import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Paperclip = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M18 15.75q0 2.6-1.825 4.425Q14.349 22 11.75 22q-2.6 0-4.425-1.825T5.5 15.75V6.5q0-1.875 1.313-3.188Q8.125 2.001 10 2q1.875 0 3.188 1.313Q14.5 4.624 14.5 6.5v8.75q0 1.15-.8 1.95t-1.95.8a2.65 2.65 0 0 1-1.95-.8 2.65 2.65 0 0 1-.8-1.95V6h2v9.25a.73.73 0 0 0 .75.75.73.73 0 0 0 .75-.75V6.5q-.025-1.05-.738-1.775Q11.05 4 10 4c-1.05 0-1.292.242-1.775.725Q7.5 5.45 7.5 6.5v9.25q-.025 1.775 1.225 3.012T11.75 20q1.75 0 2.975-1.238T16 15.75V6h2z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Paperclip.displayName = "Paperclip";
export default Paperclip;
