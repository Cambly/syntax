import { useEffect, useState } from "react";

export default function useIsHydrated(): boolean {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return isHydrated;
}
