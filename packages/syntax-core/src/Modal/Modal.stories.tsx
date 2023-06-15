import { useState } from "react";
import { action } from "@storybook/addon-actions";
import { type StoryObj, type Meta } from "@storybook/react";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import Modal from "./Modal";

export default {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1197-6345&viewport=45%2C215%2C0.26&t=Otn1UThmrXufnj46-0",
    },
  },
  argTypes: {
    onDismiss: {
      control: {},
    },
    header: {
      control: { type: "text" },
    },
    children: {
      control: { type: "text" },
    },
    footer: {
      control: { type: "text" },
    },
    zIndex: {
      control: { type: "number" },
    },
    image: {},
    size: {
      options: ["sm", "lg"],
      control: { type: "radio" },
    },
    "data-testid": { control: { type: "text" } },
  },
  tags: ["autodocs"],
} as Meta<typeof Modal>;

const ModalTemplate = ({ ...args }): JSX.Element => (
  <Modal header="Header Text" onDismiss={action("onDismiss")} {...args}>
    <Typography size={100}>
      Confirmation of the action the user is about to take. This description can
      be up to 4 lines long and will lorem ipsum until then dolor sit amet,
      consectetur.
    </Typography>
  </Modal>
);

const ModalController = ({ ...args }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        text={"Click here to open Modal"}
      />
      {isOpen && <ModalTemplate onDismiss={() => setIsOpen(false)} {...args} />}
    </>
  );
};

export const Default: StoryObj<typeof Modal> = {
  args: {
    header: "One Button Modal Text",
    footer: <Button text="Confirm" onClick={action("confirm")} />,
  },
  render: (args) => <ModalController {...args} />,
};

export const WithImage: StoryObj<typeof Modal> = {
  args: {
    header: "With Image",
    image: <img src="https://placehold.co/400x200" alt="placeholder image" />,
    footer: (
      <>
        <Button text="Confirm" onClick={action("primary on click")} />
        <Button
          text="Cancel"
          color="secondary"
          onClick={action("secondary on click")}
        />
      </>
    ),
  },
  render: (args) => <ModalController {...args} />,
};

export const TwoButtons: StoryObj<typeof Modal> = {
  args: {
    header: "Two Button Modal Header",
    footer: (
      <>
        <Button text="Confirm" onClick={action("primary on click")} />
        <Button
          text="Cancel"
          color="secondary"
          onClick={action("secondary on click")}
        />
      </>
    ),
  },
  render: (args) => <ModalController {...args} />,
};

export const TwoButtonsDanger: StoryObj<typeof Modal> = {
  args: {
    header: "Two Button Danger Modal Header",
    footer: (
      <>
        <Button
          text="Confirm"
          color="destructive-primary"
          onClick={action("primary on click")}
        />
        <Button
          text="Cancel"
          color="destructive-secondary"
          onClick={action("secondary on click")}
        />
      </>
    ),
  },
  render: (args) => <ModalController {...args} />,
};

export const NoButtons: StoryObj<typeof Modal> = {
  args: {
    header: "No Button Modal Header",
    footer: undefined,
  },
  render: (args) => <ModalController {...args} />,
};
