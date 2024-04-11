import { type StoryObj, type Meta } from "@storybook/react";
import LinkButton from "./LinkButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Box from "../Box/Box";

export default {
  title: "Components/LinkButton",
  component: LinkButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/Cambly-Design-System-(Draft)?node-id=994%3A2346",
    },
  },
  args: {
    text: "Call to action",
    href: "https://www.cambly.com",
    target: "_blank",
    color: "primary",
    on: "lightBackground",
    size: "md",
    fullWidth: false,
    "data-testid": "",
    loading: false,
  },
  argTypes: {
    text: {
      control: { type: "text" },
    },
    href: {
      control: { type: "text" },
    },
    target: {
      options: ["_blank", "_self", "_parent", "_top", undefined],
      control: { type: "radio" },
    },
    rel: {
      options: [
        "prev",
        "next",
        "nofollow",
        "noreferrer",
        "search",
        "tag",
        "related",
        "alternate",
      ],
      control: { type: "radio" },
    },
    color: {
      options: [
        "primary",
        "secondary",
        "tertiary",
        "destructive-primary",
        "destructive-secondary",
        "destructive-tertiary",
        "success-primary",
        "success-secondary",
        "success-tertiary",
        "branded",
      ],
      control: { type: "radio" },
    },
    on: {
      options: ["lightBackground", "darkBackground"],
      control: { type: "radio" },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    fullWidth: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
    loading: { control: "boolean" },
  },
  tags: ["autodocs"],
} as Meta<typeof LinkButton>;

export const Default: StoryObj<typeof LinkButton> = {
  args: {
    text: "Call to action",
    href: "https://www.cambly.com",
    target: "_blank",
  },
  render: (args) => {
    return (
      <Box
        padding={2}
        dangerouslySetInlineStyle={{
          __style: {
            backgroundImage:
              args.on === "darkBackground"
                ? "linear-gradient(0deg, #000, #555 )"
                : null,
          },
        }}
      >
        <LinkButton {...args} />
      </Box>
    );
  },
};

export const Small: StoryObj<typeof LinkButton> = {
  args: { ...Default.args, size: "sm" },
};
export const Medium: StoryObj<typeof LinkButton> = {
  args: { ...Default.args, size: "md" },
};
export const Large: StoryObj<typeof LinkButton> = {
  args: { ...Default.args, size: "lg" },
};
export const Secondary: StoryObj<typeof LinkButton> = {
  args: { ...Default.args, color: "secondary" },
};
export const Tertiary: StoryObj<typeof LinkButton> = {
  args: { ...Default.args, color: "tertiary" },
};
export const DestructivePrimary: StoryObj<typeof LinkButton> = {
  args: { ...Default.args, color: "destructive-primary" },
};
export const DestructiveSecondary: StoryObj<typeof LinkButton> = {
  args: { ...Default.args, color: "destructive-secondary" },
};
export const DestructiveTertiary: StoryObj<typeof LinkButton> = {
  args: { ...Default.args, color: "destructive-tertiary" },
};
export const Branded: StoryObj<typeof LinkButton> = {
  args: { ...Default.args, color: "branded" },
};
export const WithStartIcon: StoryObj<typeof LinkButton> = {
  args: { ...Default.args, startIcon: FavoriteBorder },
};
export const WithEndIcon: StoryObj<typeof LinkButton> = {
  args: { ...Default.args, endIcon: FavoriteBorder },
};
