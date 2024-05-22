import { type StoryObj, type Meta } from "@storybook/react";
import Heading from "./Heading";

export default {
  title: "Components/Heading",
  component: Heading,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=4003-11352&t=t9iBh7rbKNhWCMrt-0",
    },
  },
  args: {
    color: "gray900",
    fontStyle: "sans-serif",
    size: 400,
    align: "start",
    transform: "none",
    children: "Default text",
    underline: false,
    inline: false,
    lineClamp: 0,
    "data-testid": "",
  },
  argTypes: {
    align: {
      options: ["start", "center", "end", "forceLeft", "forceRight"],
      control: { type: "radio" },
      defaultValue: "start",
    },
    as: {
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      control: { type: "radio" },
    },
    children: {
      control: "text",
    },
    color: {
      options: [
        "destructive-primary",
        "black",
        "gray700",
        "gray900",
        "primary",
        "success",
        "white",
      ],
      control: { type: "radio" },
    },
    lineClamp: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    fontStyle: {
      options: ["serif", "sans-serif"],
      control: { type: "radio" },
    },
    size: {
      options: [400, 700, 900, 1100],
      control: { type: "select" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Heading>;

export const Default: StoryObj<typeof Heading> = {
  render: (args) => (
    <Heading {...args}>{args.children ?? "Default heading"}</Heading>
  ),
};

export const Sizes: StoryObj<typeof Heading> = {
  render: (args) => (
    <>
      <Heading {...args} size={400}>
        Size 400
      </Heading>
      <Heading {...args} size={700}>
        Size 700
      </Heading>
      <Heading {...args} size={900}>
        Size 900
      </Heading>
      <Heading {...args} size={1100}>
        Size 1100
      </Heading>
    </>
  ),
};

export const Colors: StoryObj<typeof Heading> = {
  render: (args) => (
    <>
      <Heading {...args} color="destructive-primary">
        Color destructive-primary
      </Heading>
      <Heading {...args} color="gray700">
        Color gray700
      </Heading>
      <Heading {...args} color="gray900">
        Color gray900 (default)
      </Heading>
      <Heading {...args} color="primary">
        Color primary
      </Heading>
      <Heading {...args} color="success">
        Color success
      </Heading>
      <div style={{ backgroundColor: "#000" }}>
        <Heading {...args} color="white">
          Color white
        </Heading>
      </div>
    </>
  ),
};
