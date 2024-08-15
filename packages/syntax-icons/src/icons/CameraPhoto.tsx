import { type ComponentProps, forwardRef } from "react";
import Icon from "../../../syntax-core/src/Icon/Icon";
const CameraPhoto = forwardRef<
  SVGSVGElement,
  Omit<ComponentProps<typeof Icon>, "path">
>(({ color, size }, ref) => {
  const path =
    "M12 17.5q1.875 0 3.188-1.313Q16.5 14.875 16.5 13t-1.313-3.188Q13.875 8.501 12 8.5q-1.875 0-3.188 1.313Q7.502 11.125 7.5 13q0 1.875 1.313 3.188Q10.125 17.5 12 17.5m0-2q-1.05 0-1.775-.725T9.5 13c0-1.05.242-1.292.725-1.775Q10.95 10.5 12 10.5c1.05 0 1.292.242 1.775.725q.725.725.725 1.775c0 1.05-.242 1.292-.725 1.775Q13.05 15.5 12 15.5M4 21q-.824 0-1.413-.587A1.93 1.93 0 0 1 2 19V7q0-.824.587-1.412A1.93 1.93 0 0 1 4 5h3.15L9 3h6l1.85 2H20q.824 0 1.413.588Q22 6.175 22 7v12q0 .824-.587 1.413A1.93 1.93 0 0 1 20 21z";
  return <Icon ref={ref} path={path} color={color} size={size} />;
});
CameraPhoto.displayName = "CameraPhoto";
export default CameraPhoto;
