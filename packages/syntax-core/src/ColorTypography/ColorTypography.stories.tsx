import { type StoryObj, type Meta } from "@storybook/react";
import ColorTypography from "./ColorTypography";
import Box from "../Box/Box";

export default {
  title: "Components/ColorTypography",
  component: ColorTypography,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=4003-11352&t=t9iBh7rbKNhWCMrt-0",
    },
  },
  args: {
    color: "navy",
    fontStyle: "sans-serif",
    size: 200,
    align: "start",
    as: "div",
    transform: "none",
    children: "Default text",
    underline: false,
    inline: false,
    lineClamp: 0,
    weight: "regular",
    whiteSpace: "inherit",
    tooltip: "",
  },
  argTypes: {
    align: {
      options: ["start", "center", "end", "forceLeft", "forceRight"],
      control: { type: "radio" },
    },
    as: {
      options: ["div", "h1", "h2", "h3", "h4", "h5", "h6", "p"],
      control: { type: "radio" },
    },
    color: {
      options: [
        "cream",
        "lilac",
        "navy",
        "orange",
        "pink",
        "purple",
        "red",
        "sky",
        "slate",
        "tan",
        "teal",
        "thistle",
      ],
      control: { type: "radio" },
    },
    children: {
      control: "text",
    },
    fontStyle: {
      options: ["serif", "sans-serif", "sans-serif-brand"],
      control: { type: "radio" },
    },
    inline: {
      control: "boolean",
    },
    lineClamp: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    size: {
      options: [0, 100, 200, 300, 400, 700, 800, 900, 1100],
      control: { type: "select", defaultValue: 200 },
    },
    tooltip: {
      control: "text",
    },
    transform: {
      options: ["none", "uppercase"],
    },
    underline: {
      control: "boolean",
    },
    weight: {
      options: ["regular", "medium", "semiBold", "bold"],
      control: { type: "radio" },
    },
    whiteSpace: {
      options: ["inherit", "normal", "nowrap", "preLine"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof ColorTypography>;

export const Default: StoryObj<typeof ColorTypography> = {
  args: { children: "Default text" },
};

export const colors: StoryObj<typeof ColorTypography> = {
  render: () => (
    <Box display="flex" gap={3} direction="column">
      <ColorTypography color="cream">Color cream</ColorTypography>
      <ColorTypography color="lilac">Color lilac</ColorTypography>
      <ColorTypography color="navy">Color navy</ColorTypography>
      <ColorTypography color="orange">Color orange</ColorTypography>
      <ColorTypography color="pink">Color pink</ColorTypography>
      <ColorTypography color="purple">Color purple</ColorTypography>
      <ColorTypography color="red">Color red</ColorTypography>
      <ColorTypography color="sky">Color sky</ColorTypography>
      <ColorTypography color="slate">Color slate</ColorTypography>
      <ColorTypography color="tan">Color tan</ColorTypography>
      <ColorTypography color="teal">Color teal</ColorTypography>
      <ColorTypography color="thistle">Color thistle</ColorTypography>
    </Box>
  ),
};
