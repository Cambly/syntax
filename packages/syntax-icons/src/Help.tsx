import { type ComponentProps, forwardRef } from "react";
import Icon from "./Icon";

const Help = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>((props, ref) => (
  <Icon
    ref={ref}
    path="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm1.2 19.2h-2.4v-2.4h2.4v2.4Zm1.128-6.607c-.72.712-1.128 1.15-1.128 1.807h-2.4c0-1.691 1.02-2.703 1.84-3.514.741-.732 1.16-1.18 1.16-1.886 0-.454-.161-.917-.43-1.238-.314-.373-.775-.562-1.37-.562-.667 0-1.162.18-1.472.537-.249.286-.322.59-.328.663H7.8c0-.508.215-1.368.821-2.123C9.162 5.603 10.187 4.8 12 4.8c1.666 0 2.664.772 3.207 1.419.631.751.993 1.765.993 2.781 0 1.742-1.038 2.768-1.872 3.593Z"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
Help.displayName = "Help";
export default Help;
