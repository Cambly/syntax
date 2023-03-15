import { StoryObj, Meta } from "@storybook/react";
import Card from "./Card";

export default {
  title: "Card",
  component: Card,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1206-4420&t=yFh7Ijhf6PU7Lin3-0",
    },
  },
  argTypes: {
    size: {
      options: ["sm", "md", "lg", "xl"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Card>;

export const Default: StoryObj<typeof Card> = {
  args: {
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <h1>Headline</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
      </div>
    ),
  },
};
