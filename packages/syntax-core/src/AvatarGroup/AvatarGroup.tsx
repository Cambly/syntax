import {
  type ReactNode,
  createContext,
  useContext,
  type ReactElement,
} from "react";
import Box from "../Box/Box";

type AvatarGroupContextType = {
  size: "sm" | "md" | "lg" | "xl";
  orientation: "standard" | "reverse";
};

const AvatarGroupContext = createContext<AvatarGroupContextType | null>(null);

export function useAvatarGroup(): AvatarGroupContextType | null {
  const context = useContext(AvatarGroupContext);
  return !context ? null : context;
}

/**
 * [AvatarGroup](https://cambly-syntax.vercel.app/?path=/docs/components-avatargroup--docs) is a stack of avatars to represent a group of people
 */
function AvatarGroup({
  size,
  orientation,
  children,
}: {
  size: "sm" | "md" | "lg" | "xl";
  orientation: "standard" | "reverse";
  children: ReactNode;
}): ReactElement {
  return (
    <AvatarGroupContext.Provider value={{ size, orientation }}>
      <Box
        display="flex"
        justifyContent={orientation === "standard" ? "start" : "end"}
        dangerouslySetInlineStyle={{
          __style: {
            flexDirection: orientation === "standard" ? "row" : "row-reverse",
          },
        }}
      >
        {children}
      </Box>
    </AvatarGroupContext.Provider>
  );
}

export default AvatarGroup;
