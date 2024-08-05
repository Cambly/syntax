import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const FlagCheckered = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M22 3h-2c-.003.005-.378.52-1.006 1.02-.818.65-1.654.98-2.485.98-.987 0-1.774-.382-2.685-.823C12.686 3.625 11.397 3 9.514 3 7.463 3 5.389 4.08 4 5V2H2v20h2v-4.525c.34-.272.918-.706 1.628-1.135C7.077 15.463 8.42 15 9.515 15c1.422 0 2.4.474 3.436.976C13.99 16.48 15.063 17 16.51 17c2.868 0 4.82-1.465 4.9-1.528L22 15zM12 13.399V9.45A6.9 6.9 0 0 0 9.515 9C9.01 9 8.5 9.014 8 9.1v4.08c-1.52.344-2.955 1.128-4 1.82v-4.55.002c.936-.45 2.423-1.08 4-1.352V5.246A5.3 5.3 0 0 1 9.515 5c.986 0 1.759.228 2.485.535V9.45c1.424.532 2.507 1.342 4 1.5V6.978q.247.021.509.022c1.425 0 2.617-.609 3.491-1.25V9.8c-.81.553-2.05 1.175-3.491 1.175A5 5 0 0 1 16 10.95v4.016c-.761-.104-1.427-.426-2.176-.79-.555-.268-1.146-.555-1.824-.777";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
FlagCheckered.displayName = "FlagCheckered";
export default FlagCheckered;
