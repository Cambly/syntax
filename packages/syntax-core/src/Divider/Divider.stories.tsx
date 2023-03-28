import { StoryObj, Meta } from "@storybook/react";
import Divider from "./Divider";

export default {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    design: {
      name: "Figma",
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/Cambly-Design-System?node-id=1007%3A4101",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Divider>;

export const Default: StoryObj<typeof Divider> = { args: {} };
