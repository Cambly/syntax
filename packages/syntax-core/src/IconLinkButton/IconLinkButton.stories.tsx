import { type StoryObj, type Meta } from "@storybook/react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import StarFilled from "../../../syntax-icons/src/icons/StarFilled";
import Box from "../Box/Box";

import IconLinkButton from "./IconLinkButton";

import CalendarBooking from "../../../syntax-icons/src/icons/CalendarBooking";

export default {
  title: "Components/IconLinkButton",
  component: IconLinkButton,
  parameters: {},
  args: {
    color: "primary",
    on: "lightBackground",
    size: "md",
    "data-testid": "",
    accessibilityLabel: "",
    loading: false,
    href: "https://www.cambly.com",
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

    on: {
      options: ["lightBackground", "darkBackground"],
      control: { type: "radio" },
    },
    onClick: { action: "clicked" },
  },
  tags: ["autodocs"],
} as Meta<typeof IconLinkButton>;

export const Default: StoryObj<typeof IconLinkButton> = {
  args: { accessibilityLabel: "Star", icon: StarFilled },

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
        <IconLinkButton {...args} />
      </Box>
    );
  },
};
export const Small: StoryObj<typeof IconLinkButton> = {
  args: { ...Default.args, size: "sm" },
};
export const Medium: StoryObj<typeof IconLinkButton> = {
  args: { ...Default.args, size: "md" },
};
export const Large: StoryObj<typeof IconLinkButton> = {
  args: { ...Default.args, size: "lg" },
};
export const Secondary: StoryObj<typeof IconLinkButton> = {
  args: { ...Default.args, color: "secondary" },
};
export const Tertiary: StoryObj<typeof IconLinkButton> = {
  args: { ...Default.args, color: "tertiary" },
};
export const DestructivePrimary: StoryObj<typeof IconLinkButton> = {
  args: { ...Default.args, color: "destructive-primary" },
};
export const DestructiveSecondary: StoryObj<typeof IconLinkButton> = {
  args: { ...Default.args, color: "destructive-secondary" },
};
export const DestructiveTertiary: StoryObj<typeof IconLinkButton> = {
  args: { ...Default.args, color: "destructive-tertiary" },
};
export const DifferentIconMUI: StoryObj<typeof IconLinkButton> = {
  name: "Different Icon (MUI)",
  args: { ...Default.args, icon: FavoriteBorder },
};

export const SyntaxIcons: StoryObj<typeof IconLinkButton> = {
  name: "Different Colors",
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
          <IconLinkButton {...args} color={color} key={color} />
        ))}
      </Box>
    );
  },
};
