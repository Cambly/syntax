import { useState } from "react";
import { action } from "@storybook/addon-actions";
import { type StoryObj, type Meta } from "@storybook/react";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import Modal from "./Modal";
import Box from "../Box/Box";

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
  args: {
    header: "One Button Modal Text",
    accessibilityCloseLabel: "close modal",
    zIndex: 1,
    "data-testid": "",
  },
  argTypes: {
    onDismiss: {
      control: {},
    },
    header: {
      control: { type: "text" },
    },
    children: {},
    footer: {},
    zIndex: {
      control: { type: "number" },
    },
    image: {},
    "data-testid": { control: { type: "text" } },
  },
  size: {
    options: ["sm", "md", "lg"],
    control: { type: "radio" },
  },
  tags: ["autodocs"],
} as Meta<typeof Modal>;

const ModalTemplate = ({ ...args }): JSX.Element => {
  const { children } = args;
  return (
    <Modal header="Header Text" onDismiss={action("onDismiss")} {...args}>
      <Typography size={100}>{children}</Typography>
    </Modal>
  );
};

export const Default: StoryObj<typeof Modal> = {
  args: {
    children: (
      <Typography size={200}>
        Confirmation of the action the user is about to take. This description
        can be up to 4 lines long and will lorem ipsum until then dolor sit
        amet, consectetur.
      </Typography>
    ),
  },
  render: function DefaultExample({ ...args }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          text={"Click here to open Modal"}
        />
        {isOpen && (
          <ModalTemplate
            {...args}
            onDismiss={() => setIsOpen(false)}
            header={args.header || "One Button Modal Text"}
            footer={
              <Button
                text="Confirm"
                onClick={() => {
                  action("confirm");
                  setIsOpen(false);
                }}
              />
            }
          />
        )}
      </>
    );
  },
};

export const WithImage: StoryObj<typeof Modal> = {
  args: {
    ...Default.args,
    header: "With Image",
    image: <img src="https://placehold.co/600x200" alt="placeholder image" />,
  },
  render: function WithImageExample({ ...args }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          text={"Click here to open Modal"}
        />
        {isOpen && (
          <ModalTemplate
            {...args}
            onDismiss={() => setIsOpen(false)}
            header={args.header}
            footer={
              <>
                <Button
                  text="Cancel"
                  color="secondary"
                  onClick={() => {
                    action("cancel");
                    setIsOpen(false);
                  }}
                />
                <Button
                  text="Confirm"
                  onClick={() => {
                    action("confirm");
                    setIsOpen(false);
                  }}
                />
              </>
            }
          />
        )}
      </>
    );
  },
};

export const TwoButtons: StoryObj<typeof Modal> = {
  args: {
    ...Default.args,
    header: "Two Button Modal Header",
  },
  render: function WithImageExample({ ...args }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          text={"Click here to open Modal"}
        />
        {isOpen && (
          <ModalTemplate
            {...args}
            onDismiss={() => setIsOpen(false)}
            header={args.header}
            footer={
              <>
                <Button
                  text="Cancel"
                  color="secondary"
                  onClick={() => {
                    action("cancel");
                    setIsOpen(false);
                  }}
                />
                <Button
                  text="Confirm"
                  onClick={() => {
                    action("confirm");
                    setIsOpen(false);
                  }}
                />
              </>
            }
          />
        )}
      </>
    );
  },
};

export const TwoButtonsDanger: StoryObj<typeof Modal> = {
  args: {
    ...Default.args,
    header: "Two Button Danger Modal Header",
  },
  render: function WithImageExample({ ...args }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          text={"Click here to open Modal"}
        />
        {isOpen && (
          <ModalTemplate
            {...args}
            onDismiss={() => setIsOpen(false)}
            header={args.header}
            footer={
              <>
                <Button
                  text="Cancel"
                  color="destructive-secondary"
                  onClick={() => {
                    action("cancel");
                    setIsOpen(false);
                  }}
                />
                <Button
                  text="Confirm"
                  color="destructive-primary"
                  onClick={() => {
                    action("confirm");
                    setIsOpen(false);
                  }}
                />
              </>
            }
          />
        )}
      </>
    );
  },
};

export const NoButtons: StoryObj<typeof Modal> = {
  args: {
    ...Default.args,
    header: "No Button Modal Header",
    footer: undefined,
  },
  render: function WithImageExample({ ...args }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          text={"Click here to open Modal"}
        />
        {isOpen && (
          <ModalTemplate
            {...args}
            onDismiss={() => setIsOpen(false)}
            header={args.header}
          />
        )}
      </>
    );
  },
};

export const Scrollable: StoryObj<typeof Modal> = {
  args: {
    ...Default.args,
    header: "Scrollable",
  },
  render: function WithImageExample({ ...args }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          text={"Click here to open Modal"}
        />
        {isOpen && (
          <Modal
            {...args}
            onDismiss={() => setIsOpen(false)}
            footer={
              <>
                <Button
                  text="Cancel"
                  color="secondary"
                  onClick={() => {
                    action("cancel");
                    setIsOpen(false);
                  }}
                />
                <Button
                  text="Confirm"
                  onClick={() => {
                    action("confirm");
                    setIsOpen(false);
                  }}
                />
              </>
            }
          >
            <Box>{Array(100).fill(<Typography>Content</Typography>)}</Box>
          </Modal>
        )}
      </>
    );
  },
};

export const LongHeader: StoryObj<typeof Modal> = {
  args: {
    ...Default.args,
    header:
      "Modal title with a really long title and they shouldn’t really be this long but it’s helpful to see how it should operate just in case!",
  },
  render: function WithImageExample({ ...args }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          text={"Click here to open Modal"}
        />
        {isOpen && (
          <Modal
            {...args}
            onDismiss={() => setIsOpen(false)}
            footer={
              <>
                <Button
                  text="Cancel"
                  color="secondary"
                  onClick={() => {
                    action("cancel");
                    setIsOpen(false);
                  }}
                />
                <Button
                  text="Confirm"
                  onClick={() => {
                    action("confirm");
                    setIsOpen(false);
                  }}
                />
              </>
            }
          >
            <Typography>Content</Typography>
          </Modal>
        )}
      </>
    );
  },
};
