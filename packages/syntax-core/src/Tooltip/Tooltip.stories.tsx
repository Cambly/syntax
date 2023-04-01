import { StoryObj, Meta } from "@storybook/react";
import Tooltip from "./Tooltip";
import React, { useState } from "react";
import Star from "@mui/icons-material/Star";

export default {
  title: "Tooltip",
  component: Tooltip,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1203-10363&t=b82bdzpvlytqO08L-0",
    },
  },
  argTypes: {
    text: {
      control: "string",
    },
    icon: {
      control: { type: "ReactElement" },
    },
    link: {
      control: "string",
    },
    direction: {
      options: ["belowLeft", "belowRight", "aboveLeft", "aboveRight"],
      control: "string",
    },
    children: { control: { type: "div" } },
  },
  tags: ["autodocs"],
} as Meta<typeof Tooltip>;

export const Default: StoryObj<typeof Tooltip> = {
  args: { text: "Tooltip text", link: "example-link.com" },
};

const TooltipInteractive = () => (
  <form style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
    <Tooltip text={"example text"} icon={Star} direction="belowRight" />
    <Tooltip
      text={"example text"}
      link="www.example.com"
      direction="belowRight"
      children={<div>Hover over me</div>}
    />
    <Tooltip
      text={"example text"}
      icon={Star}
      link="www.example.com"
      direction="belowRight"
      children={<div>Hover over me</div>}
    />
  </form>
);

export const Interactive: StoryObj<typeof Tooltip> = {
  render: () => <TooltipInteractive />,
};
