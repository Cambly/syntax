import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const FlagFilled = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M22 3h-2c-.003.005-.378.52-1.006 1.02-.818.65-1.654.98-2.485.98-.987 0-1.774-.382-2.685-.823C12.686 3.625 11.397 3 9.514 3 7.463 3 5.389 4.08 4 5V2H2v20h2v-4.525c.34-.272.918-.706 1.628-1.135C7.077 15.463 8.42 15 9.515 15c1.422 0 2.4.474 3.436.976C13.99 16.48 15.063 17 16.51 17c2.868 0 4.82-1.465 4.9-1.528L22 15z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
FlagFilled.displayName = "FlagFilled";
export default FlagFilled;
