import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const Youtube = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M15.84 4.8s-.156-1.103-.637-1.588c-.61-.637-1.29-.64-1.603-.678-2.237-.162-5.597-.162-5.597-.162h-.006s-3.36 0-5.597.162c-.312.038-.994.041-1.603.678C.316 3.697.162 4.8.162 4.8S0 6.097 0 7.39v1.213c0 1.294.16 2.59.16 2.59s.156 1.104.634 1.588c.61.638 1.41.616 1.765.685 1.282.122 5.441.159 5.441.159s3.363-.006 5.6-.166c.313-.037.994-.04 1.603-.678.481-.484.638-1.587.638-1.587S16 9.9 16 8.604V7.39c0-1.294-.16-2.591-.16-2.591m-9.493 5.275V5.578l4.322 2.256z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
Youtube.displayName = "Youtube";
export default Youtube;
