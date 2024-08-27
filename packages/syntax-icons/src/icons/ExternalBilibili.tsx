import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const ExternalBilibili = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M18.223 3.38a1.25 1.25 0 0 1 0 1.768L17.08 6.29h1.17A3.75 3.75 0 0 1 22 10.041v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.541v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.166L5.775 5.15a1.25 1.25 0 1 1 1.767-1.768l2.652 2.652q.119.12.198.257h3.213q.08-.14.199-.258l2.651-2.652a1.25 1.25 0 0 1 1.768 0Zm.027 5.42H5.75a1.25 1.25 0 0 0-1.247 1.157l-.003.094v7.5c0 .66.51 1.2 1.157 1.246l.093.004h12.5a1.25 1.25 0 0 0 1.247-1.157l.003-.093v-7.5c0-.69-.56-1.25-1.25-1.25Zm-10 2.5c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 0 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25m7.5 0c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 0 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
ExternalBilibili.displayName = "ExternalBilibili";
export default ExternalBilibili;
