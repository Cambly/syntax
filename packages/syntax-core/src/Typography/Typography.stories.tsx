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
  args: {
    color: "gray900",
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
    tooltip: "",
  },
  argTypes: {
    align: {
      options: ["start", "center", "end", "forceLeft", "forceRight"],
      control: { type: "radio" },
    },
    as: {
      options: ["div", "h1", "h2", "h3", "h4", "h5", "h6"],
      control: { type: "radio" },
    },
    color: {
      options: [
        "destructive-primary",
        "destructive-darkBackground",
        "gray700",
        "gray900",
        "primary",
        "success",
        "success-darkBackground",
        "white",
      ],
      control: { type: "radio" },
    },
    children: {
      control: "text",
    },
    fontStyle: {
      options: ["serif", "sans-serif"],
      control: { type: "radio" },
    },
    inline: {
      control: "boolean",
    },
    lineClamp: {
      control: { type: "number", min: 0, max: 10, step: 1 },
    },
    size: {
      options: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
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
      options: [
        "regular",
        "interactive",
        "medium",
        "semiBold",
        "bold",
        "heavy",
      ],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Typography>;

export const Default: StoryObj<typeof Typography> = {
  args: { children: "Default text" },
};

export const sizes: StoryObj<typeof Typography> = {
  render: () => (
    <>
      <Typography {...Default.args} size={100}>
        Size 100
      </Typography>
      <Typography {...Default.args} size={200}>
        Size 200
      </Typography>
      <Typography {...Default.args} size={300}>
        Size 300
      </Typography>
      <Typography {...Default.args} size={400}>
        Size 400 (Cambio only)
      </Typography>
      <Typography {...Default.args} size={500}>
        Size 500
      </Typography>
      <Typography {...Default.args} size={600}>
        Size 600
      </Typography>
      <Typography {...Default.args} size={700}>
        Size 700
      </Typography>
      <Typography {...Default.args} size={800}>
        Size 800
      </Typography>
      <Typography {...Default.args} size={900}>
        Size 900 (Cambio only)
      </Typography>
      <Typography {...Default.args} size={1000}>
        Size 1000 (Cambio only)
      </Typography>
      <Typography {...Default.args} size={1100}>
        Size 1100 (Cambio only)
      </Typography>
    </>
  ),
};

export const colors: StoryObj<typeof Typography> = {
  render: () => (
    <>
      <Typography {...Default.args} color="destructive-primary">
        Color destructive-primary
      </Typography>
      <Typography {...Default.args} color="destructive-darkBackground">
        Color destructive-darkBackground (Cambio only)
      </Typography>
      <Typography {...Default.args} color="gray700">
        Color gray700
      </Typography>
      <Typography {...Default.args} color="gray900">
        Color gray900 (default)
      </Typography>
      <Typography {...Default.args} color="primary">
        Color primary
      </Typography>
      <Typography {...Default.args} color="success">
        Color success
      </Typography>
      <Typography {...Default.args} color="success-darkBackground">
        Color success-darkBackground (Cambio only)
      </Typography>
      <Typography {...Default.args} color="white">
        Color white
      </Typography>
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
      <Typography {...args} weight="interactive">
        Weight interactive (classic only)
      </Typography>
      <Typography {...args} weight="medium">
        Weight medium (cambio only)
      </Typography>
      <Typography {...args} weight="semiBold">
        Weight semiBold
      </Typography>
      <Typography {...args} weight="bold">
        Weight bold (classic only)
      </Typography>
      <Typography {...args} weight="heavy">
        Weight heavy (classic only)
      </Typography>
    </>
  ),
};
