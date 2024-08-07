import { type StoryObj, type Meta } from "@storybook/react";
import IconButton from "./IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import StarFilled from "../../../syntax-icons/src/icons/StarFilled";
import allColors from "../colors/allColors";
import Box from "../Box/Box";

import CalendarBooking from "../../../syntax-icons/src/icons/CalendarBooking";

export default {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/Cambly-Design-System?node-id=1007%3A4105",
    },
  },
  args: {
    color: "primary",
    on: "lightBackground",
    size: "md",
    disabled: false,
    "data-testid": "",
    accessibilityLabel: "",
    tooltip: "",
    indicatorColor: undefined,
  },
  argTypes: {
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
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    on: {
      options: ["lightBackground", "darkBackground"],
      control: { type: "radio" },
    },
    onClick: { action: "clicked" },
    indicatorColor: {
      control: { type: "select" },
      options: allColors,
    },
  },
  tags: ["autodocs"],
} as Meta<typeof IconButton>;

export const Default: StoryObj<typeof IconButton> = {
  args: { accessibilityLabel: "Star", tooltip: "Demo title", icon: StarFilled },

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
        <IconButton {...args} />
      </Box>
    );
  },
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
export const DifferentIcon: StoryObj<typeof IconButton> = {
  args: { ...Default.args, icon: FavoriteBorder },
};

export const IndicatorColors: StoryObj<typeof IconButton> = {
  args: { ...Default.args, icon: CalendarBooking },
  render: (args) => {
    return (
      <Box display="flex" gap={4}>
        {allColors.map((color) => (
          <IconButton {...args} indicatorColor={color} key={color} />
        ))}
      </Box>
    );
  },
};

export const SyntaxIcons: StoryObj<typeof IconButton> = {
  args: { ...Default.args, icon: CalendarBooking },
  render: (args) => {
    return (
      <Box display="flex" gap={4}>
        {(
          [
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
          ] as const
        ).map((color) => (
          <IconButton {...args} color={color} key={color} />
        ))}
      </Box>
    );
  },
};
