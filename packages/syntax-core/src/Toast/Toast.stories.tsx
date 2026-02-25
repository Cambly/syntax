import { type StoryObj, type Meta } from "@storybook/react";
import { useState } from "react";
import Toast from "./Toast";
import Box from "../Box/Box";
import Button from "../Button/Button";
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

const ControlledToastExample = (args: React.ComponentProps<typeof Toast>) => {
  const [open, setOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const showToast = () => {
    setMessageCount((count) => count + 1);
    setOpen(true);
  };

  return (
    <Box
      backgroundColor={args.on === "lightBackground" ? "white" : "black"}
      width="100vw"
      height="100vh"
      padding={4}
      display="flex"
      direction="column"
      gap={4}
    >
      <Box display="flex" gap={2} alignItems="center">
        <Button onClick={showToast} text="Show Toast" />
        <Box>
          <span>Toast shown {messageCount} times</span>
        </Box>
      </Box>
      <Toast
        {...args}
        heading={`${args.heading} (${messageCount})`}
        open={open}
        onDismiss={() => setOpen(false)}
      />
    </Box>
  );
};

export const ControlledToast: StoryObj<typeof Toast> = {
  args: {
    heading: "Success!",
    body: "Your changes have been saved.",
    icon: Alert,
    timeout: 3000,
  },
  render: (args) => <ControlledToastExample {...args} />,
};
