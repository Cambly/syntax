import React, { useMemo } from "react";

type ThemeName = "classic" | "cambio";

type Theme = {
  themeName: ThemeName;
};

const ThemeContext = React.createContext<Theme>({
  themeName: "classic",
});
ThemeContext.displayName = "ThemeContext";

export default function ThemeProvider({
  themeName = "classic",
  children,
}: {
  themeName: ThemeName;
  children: React.ReactNode;
}): React.ReactElement {
  const value = useMemo(() => ({ themeName }), [themeName]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  return React.useContext(ThemeContext);
}
