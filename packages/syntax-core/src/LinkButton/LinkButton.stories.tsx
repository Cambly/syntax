import { type StoryObj, type Meta } from "@storybook/react";
import LinkButton from "./LinkButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

export default {
  title: "Components/LinkButton",
  component: LinkButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/Cambly-Design-System-(Draft)?node-id=994%3A2346",
    },
  },
  argTypes: {
    color: {
      text: {
        control: { type: "text" },
      },
      href: {
        control: { type: "text" },
      },
      target: {
        control: { type: "text" },
      },
      options: [
        "primary",
        "secondary",
        "tertiary",
        "destructive-primary",
        "destructive-secondary",
        "destructive-tertiary",
        "success",
        "branded",
      ],
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
  },
  tags: ["autodocs"],
} as Meta<typeof LinkButton>;

export const Default: StoryObj<typeof LinkButton> = {
  args: {
    text: "Call to action",
    href: "www.google.com",
    target: "_blank",
  },
  render: ({ ...args }) => <LinkButton {...args} />,
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
