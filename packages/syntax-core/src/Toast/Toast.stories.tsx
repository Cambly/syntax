import { type StoryObj, type Meta } from "@storybook/react";
import Toast from "./Toast";
import Box from "../Box/Box";
import Alert from "../../../syntax-icons/src/icons/Alert";

export default {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/G3UM2urgAYO2iiNU7nlulI/Cambio-Syntax?node-id=9047-10571&node-type=section&m=dev",
    },
  },
  args: {
    heading: "Attention",
    body: "You're doing great :)",
    on: "lightBackground",
    timeout: 5000,
  },
  argTypes: {
    body: {
      control: "text",
    },
    heading: {
      control: "text",
    },
    on: {
      options: ["lightBackground", "darkBackground"],
      control: { type: "radio" },
    },
    timeout: {
      control: "number",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Toast>;

export const Default: StoryObj<typeof Toast> = {
  render: (args) => {
    return (
      <Box
        backgroundColor={args.on === "lightBackground" ? "white" : "black"}
        width="100vw"
        height="100vh"
      >
        <Toast {...args} />
      </Box>
    );
  },
};

export const WithSyntaxIcon: StoryObj<typeof Toast> = {
  args: { icon: Alert },
};
