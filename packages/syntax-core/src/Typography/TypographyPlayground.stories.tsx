import { type StoryObj, type Meta } from "@storybook/react";
import Typography from "./Typography";

function TypographyWrapper(
  args: /* eslint-disable @typescript-eslint/no-explicit-any */
  any,
) {
  const lineHeight = args.lineHeight ? parseFloat(args.lineHeight) : undefined;
  const letterSpacing = args.letterSpacing
    ? parseFloat(args.letterSpacing)
    : undefined;
  return (
    <Typography {...args}>
      <div
        style={{
          lineHeight: lineHeight,
          letterSpacing: letterSpacing,
        }}
      >
        {args.text ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
      </div>
    </Typography>
  );
}

export default {
  title: "Playground/TypographyPlayground",
  component: TypographyWrapper,
  argTypes: {
    color: {
      options: [
        "destructive-primary",
        "gray700",
        "gray900",
        "primary",
        "success",
        "white",
      ],
      control: { type: "radio" },
    },
    text: {
      control: "text",
    },
    lineHeight: {
      control: { type: "text" },
    },
    letterSpacing: {
      control: { type: "text" },
    },
    fontStyle: {
      options: ["serif", "sans-serif"],
      control: { type: "radio" },
    },
    lineClamp: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    size: {
      options: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
      control: { type: "select" },
    },

    weight: {
      options: ["regular", "interactive", "semiBold", "bold", "heavy"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Typography>;

export const Default: StoryObj<typeof Typography> = {
  render: (args) => <TypographyWrapper {...args}></TypographyWrapper>,
};

export const Size100: StoryObj<typeof Typography> = {
  args: { ...Default.args, size: 100 },
};

export const Size200: StoryObj<typeof Typography> = {
  args: { ...Default.args, size: 200 },
};

export const Size300: StoryObj<typeof Typography> = {
  args: { ...Default.args, size: 300 },
};

export const Size500: StoryObj<typeof Typography> = {
  args: { ...Default.args, size: 500 },
};

export const Size600: StoryObj<typeof Typography> = {
  args: { ...Default.args, size: 600 },
};

export const Size700: StoryObj<typeof Typography> = {
  args: { ...Default.args, size: 700 },
};

export const Size800: StoryObj<typeof Typography> = {
  args: { ...Default.args, size: 800 },
};

export const WeigthRegular: StoryObj<typeof Typography> = {
  args: { ...Default.args, weight: "regular" },
};

export const WeigthInteractive: StoryObj<typeof Typography> = {
  args: { ...Default.args, weight: "interactive" },
};

export const WeigthSemiBold: StoryObj<typeof Typography> = {
  args: { ...Default.args, weight: "semiBold" },
};

export const WeigthBold: StoryObj<typeof Typography> = {
  args: { ...Default.args, weight: "bold" },
};

export const WeigthHeavy: StoryObj<typeof Typography> = {
  args: { ...Default.args, weight: "heavy" },
};

export const Colors: StoryObj<typeof Typography> = {
  render: (args) => (
    <>
      <TypographyWrapper
        {...args}
        color="destructive-primary"
      ></TypographyWrapper>
      <TypographyWrapper {...args} color="gray700"></TypographyWrapper>
      <TypographyWrapper {...args} color="gray900"></TypographyWrapper>
      <TypographyWrapper {...args} color="primary"></TypographyWrapper>
      <TypographyWrapper {...args} color="success"></TypographyWrapper>
      <div style={{ backgroundColor: "#000" }}>
        <TypographyWrapper {...args} color="white"></TypographyWrapper>
      </div>
    </>
  ),
};
