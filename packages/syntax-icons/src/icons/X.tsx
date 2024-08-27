import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const X = forwardRef<SVGSVGElement, Omit<ComponentProps<typeof Icon>, "path">>(
  ({ color, size }, ref) => {
    const path =
      "M12.218 1.27h2.249L9.553 6.884l5.78 7.642h-4.525L7.263 9.892l-4.056 4.635H.957L6.211 8.52.667 1.27h4.64l3.205 4.236zm-.79 11.91h1.246L4.63 2.546H3.293z";
    return <Icon ref={ref} path={path} color={color} size={size} />;
  },
);
X.displayName = "X";
export default X;
