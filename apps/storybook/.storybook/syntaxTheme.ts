import { create } from "storybook/theming";

const shared = {
  brandTitle: "Syntax - Cambly's design system",
  brandUrl: "https://syntax-cambly.vercel.app/",
  brandTarget: "_self" as const,
};

export const darkTheme = create({
  base: "dark",
  ...shared,
});

export const lightTheme = create({
  base: "light",
  ...shared,
});

export default darkTheme;
