import { type StoryObj, type Meta } from "@storybook/react";
import Card from "./Card";
import Box from "../Box/Box";
import Heading from "../Heading/Heading";
import Typography from "../Typography/Typography";

export default {
  title: "Components/Card",
  component: Card,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1206-4420&t=yFh7Ijhf6PU7Lin3-0",
    },
  },
  argTypes: {
    size: {
      options: ["sm", "lg"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Card>;

const CardContainer = ({ ...args }): JSX.Element => (
  <Box backgroundColor="gray700" padding={6}>
    <Card {...args}>
      <Box display="flex" direction="column" gap={6}>
        <Heading>Headline</Heading>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Box>
    </Card>
  </Box>
);

export const Default: StoryObj<typeof Card> = {
  render: ({ ...args }) => <CardContainer {...args} />,
};

export const Small: StoryObj<typeof Card> = {
  render: ({ ...args }) => <CardContainer size="sm" {...args} />,
};

export const Large: StoryObj<typeof Card> = {
  render: ({ ...args }) => <CardContainer size="lg" {...args} />,
};
