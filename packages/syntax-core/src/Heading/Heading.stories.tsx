import { StoryObj, Meta } from "@storybook/react";
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
        "gray700",
        "gray900",
        "primary",
        "white",
      ],
      control: { type: "radio" },
    },
    size: {
      options: [500, 600, 700, 800],
      control: { type: "radio" },
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
      <Heading {...args} size={500}>
        Size 500
      </Heading>
      <Heading {...args} size={600}>
        Size 600
      </Heading>
      <Heading {...args} size={700}>
        Size 700
      </Heading>
      <Heading {...args} size={800}>
        Size 800
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
      <div style={{ backgroundColor: "#000" }}>
        <Heading {...args} color="white">
          Color white
        </Heading>
      </div>
    </>
  ),
};
