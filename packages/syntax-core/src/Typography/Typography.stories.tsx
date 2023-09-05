import { type StoryObj, type Meta } from "@storybook/react";
import Typography from "./Typography";

export default {
  title: "Components/Typography",
  component: Typography,
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
      options: ["div", "h1", "h2", "h3", "h4", "h5", "h6"],
      control: { type: "radio" },
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
    children: {
      control: "text",
    },
    inline: {
      control: "boolean",
    },
    lineClamp: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    size: {
      options: [100, 200, 300, 500, 600, 700, 800],
      control: { type: "radio" },
    },
    tooltip: {
      control: "text",
    },
    transform: {
      options: ["none", "uppercase"],
      defaultValue: "none",
    },
    underline: {
      control: "boolean",
    },
    weight: {
      options: ["regular", "semiBold", "bold", "heavy", "interactive"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Typography>;

export const Default: StoryObj<typeof Typography> = {
  render: (args) => (
    <Typography {...args}>{args.children ?? "Default text"}</Typography>
  ),
};

export const Sizes: StoryObj<typeof Typography> = {
  render: (args) => (
    <>
      <Typography {...args} size={100}>
        Size 100
      </Typography>
      <Typography {...args} size={200}>
        Size 200 (default)
      </Typography>
      <Typography {...args} size={300}>
        Size 300
      </Typography>
      <Typography {...args} size={500} weight="bold">
        Size 500 Bold
      </Typography>
      <Typography {...args} size={600} weight="bold">
        Size 600 Bold
      </Typography>
      <Typography {...args} size={700} weight="heavy">
        Size 700 Heavy
      </Typography>
      <Typography {...args} size={800} weight="heavy">
        Size 800 Heavy
      </Typography>
    </>
  ),
};

export const Colors: StoryObj<typeof Typography> = {
  render: (args) => (
    <>
      <Typography {...args} color="destructive-primary">
        Color destructive-primary
      </Typography>
      <Typography {...args} color="gray700">
        Color gray700
      </Typography>
      <Typography {...args} color="gray900">
        Color gray900 (default)
      </Typography>
      <Typography {...args} color="primary">
        Color primary
      </Typography>
      <div style={{ backgroundColor: "#000" }}>
        <Typography {...args} color="white">
          Color white
        </Typography>
      </div>
    </>
  ),
};

export const Inline: StoryObj<typeof Typography> = {
  render: (args) => (
    <>
      <Typography {...args}>Block (default)</Typography>
      <Typography {...args}>Block</Typography>
      <Typography {...args} inline>
        Inline
      </Typography>{" "}
      <Typography {...args} inline>
        Inline
      </Typography>
    </>
  ),
};

export const Uppercase: StoryObj<typeof Typography> = {
  render: (args) => (
    <Typography {...args} transform="uppercase">
      Uppercase
    </Typography>
  ),
};

export const Underline: StoryObj<typeof Typography> = {
  render: (args) => (
    <Typography {...args} underline>
      Underlined
    </Typography>
  ),
};

export const Weight: StoryObj<typeof Typography> = {
  render: (args) => (
    <>
      <Typography {...args} weight="regular">
        Weight Regular
      </Typography>
      <Typography {...args} weight="semiBold">
        Weight semiBold
      </Typography>
      <Typography {...args} weight="bold">
        Weight bold
      </Typography>
      <Typography {...args} weight="heavy">
        Weight heavy
      </Typography>
      <Typography {...args} weight="interactive">
        Weight interactive
      </Typography>
    </>
  ),
};
