import { type StoryObj, type Meta } from "@storybook/react";
import IconButton from "./IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Star from "@mui/icons-material/Star";
import { Color } from "../constants";
import Box from "../Box/Box";

export default {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/Cambly-Design-System?node-id=1007%3A4105",
    },
  },
  argTypes: {
    color: {
      options: Color,
      control: { type: "radio" },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof IconButton>;

export const Default: StoryObj<typeof IconButton> = {
  args: { accessibilityLabel: "Star", tooltip: "Demo title", icon: Star },
};
export const Small: StoryObj<typeof IconButton> = {
  args: { ...Default.args, size: "sm" },
};
export const Medium: StoryObj<typeof IconButton> = {
  args: { ...Default.args, size: "md" },
};
export const Large: StoryObj<typeof IconButton> = {
  args: { ...Default.args, size: "lg" },
};
export const Secondary: StoryObj<typeof IconButton> = {
  args: { ...Default.args, color: "secondary" },
};
export const Tertiary: StoryObj<typeof IconButton> = {
  args: { ...Default.args, color: "tertiary" },
};
export const DestructivePrimary: StoryObj<typeof IconButton> = {
  args: { ...Default.args, color: "destructive-primary" },
};
export const DestructiveSecondary: StoryObj<typeof IconButton> = {
  args: { ...Default.args, color: "destructive-secondary" },
};
export const DestructiveTertiary: StoryObj<typeof IconButton> = {
  args: { ...Default.args, color: "destructive-tertiary" },
};
export const Success: StoryObj<typeof IconButton> = {
  args: { ...Default.args, color: "success" },
};
export const DifferentIcon: StoryObj<typeof IconButton> = {
  args: { ...Default.args, icon: FavoriteBorder },
};
export const Colors: StoryObj<typeof IconButton> = {
  render: () => (
    <Box display="flex" gap={3}>
      {Color.map((color) => (
        <IconButton
          key={color}
          color={color}
          icon={Star}
          accessibilityLabel={color}
        />
      ))}
    </Box>
  ),
};
