import React, { useMemo } from "react";
import variables from "@cambly/syntax-design-tokens/dist/json/variables.json";

type ThemeName = "classic" | "cambio";

type Theme = {
  themeName: ThemeName;
};

const ThemeContext = React.createContext<Theme>({
  themeName: "classic",
});
ThemeContext.displayName = "ThemeContext";

const classicToCambioKeyLookup = {
  "color-base-black": "color-cambio-black",
  "color-base-destructive-100": "color-cambio-destructive-100",
  "color-base-destructive-200": undefined, // Deprecated - to be deleted
  "color-base-destructive-300": "color-cambio-destructive-300",
  "color-base-destructive-700": "color-cambio-destructive-700",
  "color-base-destructive-800": undefined, // Deprecated - to be deleted
  "color-base-destructive-900": "color-cambio-destructive-900",
  "color-base-gray-10": "color-cambio-gray-370",
  "color-base-gray-30": "color-cambio-gray-370",
  "color-base-gray-60": "color-cambio-gray-870",
  "color-base-gray-80": "color-cambio-gray-870",
  "color-base-gray-100": "color-cambio-gray-100",
  "color-base-gray-200": "color-cambio-gray-200",
  "color-base-gray-300": "color-cambio-gray-300",
  "color-base-gray-700": "color-cambio-gray-700",
  "color-base-gray-800": "color-cambio-gray-800",
  "color-base-gray-900": "color-cambio-gray-900",
  "color-base-orange-100": undefined, // Deprecated - to be deleted
  "color-base-orange-200": undefined, // Deprecated - to be deleted
  "color-base-orange-300": undefined, // Deprecated - to be deleted
  "color-base-orange-700": "color-cambio-orange",
  "color-base-orange-800": undefined, // Deprecated - to be deleted
  "color-base-orange-900": undefined, // Deprecated - to be deleted
  "color-base-primary-100": "color-cambio-gray-100",
  "color-base-primary-200": "color-cambio-gray-200",
  "color-base-primary-300": "color-cambio-gray-300",
  "color-base-primary-700": "color-cambio-gray-700",
  "color-base-primary-800": "color-cambio-gray-800",
  "color-base-primary-900": "color-cambio-gray-900",
  "color-base-success-100": "color-cambio-success-100",
  "color-base-success-200": undefined, // Deprecated - to be deleted
  "color-base-success-300": "color-cambio-success-300",
  "color-base-success-700": "color-cambio-success-700",
  "color-base-success-800": undefined, // Deprecated - to be deleted
  "color-base-success-900": "color-cambio-success-900",
  "color-base-purple-100": undefined, // Deprecated - to be deleted
  "color-base-purple-200": undefined, // Deprecated - to be deleted
  "color-base-purple-300": undefined, // Deprecated - to be deleted
  "color-base-purple-700": "color-cambio-purple",
  "color-base-purple-800": undefined, // Deprecated - to be deleted
  "color-base-purple-900": undefined, // Deprecated - to be deleted
  "color-base-yellow-100": undefined, // Deprecated - to be deleted
  "color-base-yellow-200": undefined, // Deprecated - to be deleted
  "color-base-yellow-300": undefined, // Deprecated - to be deleted
  "color-base-yellow-700": "color-cambio-yellow-700",
  "color-base-yellow-800": undefined, // Deprecated - to be deleted
  "color-base-yellow-900": undefined, // Deprecated - to be deleted
  "color-base-white": "color-cambio-white",
};

function stylesForTheme(themeName: ThemeName) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const tokenVariables: Record<string, string> = variables;
  return `
    :root {
      ${Object.entries(tokenVariables)
        .filter(([key]) => {
          return themeName === "classic" ? !key.includes("cambio") : true;
        })
        .map(([key, value]) => {
          // Replace classic values with cambio ones if they exist
          if (
            themeName === "cambio" &&
            classicToCambioKeyLookup[
              key as keyof typeof classicToCambioKeyLookup
            ]
          ) {
            return [
              key,
              tokenVariables[
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                classicToCambioKeyLookup[
                  key as keyof typeof classicToCambioKeyLookup
                ]!
              ],
            ];
          }
          return [key, value];
        })
        .map(([key, value]) => `--${key}: ${value};`)
        .join("\n")}
    }
  `;
}

export default function ThemeProvider({
  themeName = "classic",
  children,
}: {
  themeName: ThemeName;
  children: React.ReactNode;
}): React.ReactElement {
  const value = useMemo(() => ({ themeName }), [themeName]);

  const innerStyles = useMemo(() => stylesForTheme(themeName), [themeName]);

  return (
    <ThemeContext.Provider value={value}>
      <style
        dangerouslySetInnerHTML={{ __html: innerStyles }}
        data-testid="themeprovider-style"
      ></style>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  return React.useContext(ThemeContext);
}
