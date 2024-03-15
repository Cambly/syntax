import {
  type ReactNode,
  createContext,
  useContext,
  type ReactElement,
} from "react";
import Box from "../Box/Box";
import { useTheme } from "../ThemeProvider/ThemeProvider";

type Size =
  | "sm"
  | "md"
  | "lg"
  /* `xl` is deprecated and mapped to `lg` in Cambio */
  | "xl";
type Orientation = "standard" | "reverse";

type AvatarGroupContextType = {
  size: Size;
  orientation: Orientation;
};

const AvatarGroupContext = createContext<AvatarGroupContextType | null>(null);

export function useAvatarGroup(): AvatarGroupContextType | null {
  const context = useContext(AvatarGroupContext);
  return !context ? null : context;
}

/**
 * [AvatarGroup](https://cambly-syntax.vercel.app/?path=/docs/components-avatargroup--docs) is a stack of avatars to represent a group of people
 *
 * Pass in Avatar components as children to the AvatarGroup component. The size prop that is passed into the AvatarGroup component will override Avatar's size prop..
 *
 * Usage:
 *
 * <AvatarGroup size="xl" orientation="standard">
 *   <Avatar accessibilityLabel="Joseph Liotta" src="image.png" />
 *   <Avatar accessibilityLabel="Joseph Liotta" src="image.png" />
 *   <Avatar accessibilityLabel="Joseph Liotta" src="image.png" />
 * </AvatarGroup>
 *
 */
export default function AvatarGroup({
  size = "md",
  orientation = "standard",
  children,
}: {
  /**
   * Size of the avatars in the AvatarGroup.
   *
   * Classic:
   * * `sm`: 24px
   * * `md`: 40px
   * * `lg`: 72px
   * * `xl`: 128px
   *
   * Cambio:
   * * `sm`: 32px
   * * `md`: 48px
   * * `lg`: 64px
   * * `xl`: 64px (deprecated, maps to `lg` in Cambio)
   *
   * @defaultValue `md`
   */
  size?: Size;
  /**
   * Orientation of the AvatarGroup.
   * This describes the order of rendering of the Avatar components.
   * Standard renders the Avatar components with the right component on top.
   * Reverse renders the Avatar components with the left component on top.
   *
   * @defaultValue `standard`
   */
  orientation?: Orientation;
  /**
   * Avatars to be rendered within the AvatarGroup.
   */
  children: ReactNode;
}): ReactElement {
  const { themeName } = useTheme();
  const parsedSize = themeName === "cambio" && size === "xl" ? "lg" : size;

  return (
    <AvatarGroupContext.Provider value={{ size: parsedSize, orientation }}>
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

AvatarGroup.displayName = "AvatarGroup";
