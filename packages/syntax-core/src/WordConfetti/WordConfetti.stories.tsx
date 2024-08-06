import { type StoryObj, type Meta } from "@storybook/react";
import WordConfetti from "./WordConfetti";

export default {
  title: "Components/WordConfetti",
  component: WordConfetti,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/G3UM2urgAYO2iiNU7nlulI/Cambio-Syntax?node-id=6803-23390&t=f4WOjInBkq4pw2kN-0",
    },
  },
  args: {
    "data-testid": "",
    direction: "row",
    size: 300,
    theme: "neutral",
    words: [
      "hello",
      "world",
      "meteor",
      "react",
      "storybook",
      "cambly",
      "expeditiously",
      "indubitably",
    ],
  },
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["row", "column"],
    },
    size: {
      options: [300, 400, 700, 800, 900, 1100],
      control: { type: "select" },
    },
    theme: {
      options: ["neutral", "cool", "warm"],
      control: { type: "select" },
    },
    words: {
      control: "array",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof WordConfetti>;

export const Default: StoryObj<typeof WordConfetti> = {
  render: ({ ...args }) => <WordConfetti {...args} />,
};
