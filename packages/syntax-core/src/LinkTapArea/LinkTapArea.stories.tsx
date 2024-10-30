import React from "react";
import { type StoryObj, type Meta } from "@storybook/react";
import LinkTapArea from "./LinkTapArea";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";
import Avatar from "../Avatar/Avatar";
import image from "../../../../apps/storybook/assets/images/jane.webp";

export default {
  title: "Components/LinkTapArea",
  component: LinkTapArea,
  args: {
    href: "https://www.cambly.com",
    target: "_blank",
    disabled: false,
    rounding: "none",
    tabIndex: 0,
    fullWidth: true,
    accessibilityLabel: "",
    "data-testid": "",
  },
  argTypes: {
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
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
    rounding: {
      options: ["none", "sm", "md", "lg", "xl", "full"],
      control: { type: "select" },
    },
    tabIndex: {
      control: { type: "number" },
      options: [0, -1],
    },
  },
  tags: ["autodocs"],
} as Meta<typeof LinkTapArea>;

export const Default: StoryObj<typeof LinkTapArea> = {
  args: {
    children: (
      <Box display="flex" alignItems="center" gap={4} padding={2}>
        <Avatar accessibilityLabel="Jane" src={image} size="md" />
        <Typography size={400}>Jane Doe</Typography>
      </Box>
    ),
  },
  render: ({ ...args }) => <LinkTapArea {...args} />,
};
