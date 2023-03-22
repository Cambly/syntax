import { StoryObj, Meta } from "@storybook/react";
import Button from "./Button";
import { Color, Size } from "../constants";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

export default {
  title: "Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/Cambly-Design-System-(Draft)?node-id=994%3A2346",
    },
  },
  argTypes: {
    color: {
      options: [
        Color.PRIMARY,
        Color.SECONDARY,
        Color.TERTIARY,
        Color.DESTRUCTIVE_PRIMARY,
        Color.DESTRUCTIVE_SECONDARY,
        Color.DESTRUCTIVE_TERTIARY,
        Color.SUCCESS,
        Color.BRANDED,
      ],
      control: { type: "radio" },
    },
    size: {
      options: [Size.SMALL, Size.MEDIUM, Size.LARGE],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
  tags: ["autodocs"],
} as Meta<typeof Button>;

export const Default: StoryObj<typeof Button> = {
  args: { text: "Call to action" },
};
export const Small: StoryObj<typeof Button> = {
  args: { ...Default.args, size: "sm" },
};
export const Medium: StoryObj<typeof Button> = {
  args: { ...Default.args, size: "md" },
};
export const Large: StoryObj<typeof Button> = {
  args: { ...Default.args, size: "lg" },
};
export const Secondary: StoryObj<typeof Button> = {
  args: { ...Default.args, color: Color.SECONDARY },
};
export const Tertiary: StoryObj<typeof Button> = {
  args: { ...Default.args, color: Color.TERTIARY },
};
export const DestructivePrimary: StoryObj<typeof Button> = {
  args: { ...Default.args, color: Color.DESTRUCTIVE_PRIMARY },
};
export const DestructiveSecondary: StoryObj<typeof Button> = {
  args: { ...Default.args, color: Color.DESTRUCTIVE_SECONDARY },
};
export const DestructiveTertiary: StoryObj<typeof Button> = {
  args: { ...Default.args, color: Color.DESTRUCTIVE_TERTIARY },
};
export const Branded: StoryObj<typeof Button> = {
  args: { ...Default.args, color: Color.BRANDED },
};
export const Loading: StoryObj<typeof Button> = {
  args: { ...Default.args, loading: true, loadingText: "Connecting…" },
};
export const WithStartIcon: StoryObj<typeof Button> = {
  args: { ...Default.args, startIcon: FavoriteBorder },
};
export const WithEndIcon: StoryObj<typeof Button> = {
  args: { ...Default.args, endIcon: FavoriteBorder },
};
