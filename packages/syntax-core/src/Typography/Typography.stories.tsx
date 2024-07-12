import { type StoryObj, type Meta } from "@storybook/react";
import Typography from "./Typography";
import Box from "../Box/Box";

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
      options: ["div", "h1", "h2", "h3", "h4", "h5", "h6", "p"],
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
        "white-secondary",
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
  },
  tags: ["autodocs"],
} as Meta<typeof Typography>;

export const Default: StoryObj<typeof Typography> = {
  args: { children: "Default text" },
};

export const sizes: StoryObj<typeof Typography> = {
  render: () => (
    <>
      <Typography {...Default.args} size={0}>
        Size 0
      </Typography>
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
        Size 400
      </Typography>
      <Typography {...Default.args} size={700}>
        Size 700
      </Typography>
      <Typography {...Default.args} size={900}>
        Size 900
      </Typography>
      <Typography {...Default.args} size={1100}>
        Size 1100
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
        Color destructive-darkBackground
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
        Color success-darkBackground
      </Typography>
      <Typography {...Default.args} color="white">
        Color white
      </Typography>
    </>
  ),
};

function SerifCharacterSupportExample() {
  return (
    <Box display="flex" gap={3} direction="column">
      <Typography size={200} fontStyle="serif">
        English: à, é, ñ
      </Typography>
      <Typography size={200} fontStyle="serif">
        Azerbaijani: ə, ı, ş, ü
      </Typography>
      <Typography size={200} fontStyle="serif">
        French: à, â, é, è, ê, ë, î, ï, ô, ö, ù, û, ü, ÿ, ç
      </Typography>
      <Typography size={200} fontStyle="serif">
        German: ä, ö, ü, ß
      </Typography>
      <Typography size={200} fontStyle="serif">
        Spanish: á, é, í, ó, ú, ü, ñ
      </Typography>
      <Typography size={200} fontStyle="serif">
        Italian: à, è, é, ì, ò, ó, ù
      </Typography>
      <Typography size={200} fontStyle="serif">
        Polish: ą, ć, ę, ł, ń, ó, ś, ź, ż
      </Typography>
      <Typography size={200} fontStyle="serif">
        Portuguese: á, â, ã, à, é, ê, í, ó, ô, õ, ú
      </Typography>
      <Typography size={200} fontStyle="serif">
        Turkish: ç, ğ, ı, ö, ş, ü
      </Typography>
    </Box>
  );
}

export const SerifCharacterSupport: StoryObj<typeof Typography> = {
  render: () => <SerifCharacterSupportExample />,
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
      <Typography {...args} weight="medium">
        Weight medium
      </Typography>
      <Typography {...args} weight="semiBold">
        Weight semiBold
      </Typography>
      <Typography {...args} weight="bold">
        Weight bold
      </Typography>
    </>
  ),
};
