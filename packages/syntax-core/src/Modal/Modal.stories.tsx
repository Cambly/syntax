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
    size: "sm",
    zIndex: 0,
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
    size: {
      options: ["sm", "lg"],
      control: { type: "radio" },
    },
    "data-testid": { control: { type: "text" } },
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
            <Box height={1800}>
              <Typography size={100}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus et erat lectus. In eget commodo ipsum, sit amet
                posuere velit. Aenean placerat purus nec neque interdum lacinia.
                Nullam suscipit finibus lectus, sit amet ullamcorper augue
                interdum id. Sed placerat leo quis orci scelerisque, vitae
                tristique metus dictum. Phasellus pellentesque sapien sed rutrum
                vehicula. Duis vehicula vel purus et varius. Curabitur quis
                lorem quam. Aliquam eu massa nec lectus luctus aliquet a sed
                augue. Integer malesuada massa quis quam sodales vestibulum.
                Maecenas mollis risus in justo efficitur, ut faucibus ex
                finibus. Cras a tempus magna. Duis pharetra id eros nec
                venenatis. Phasellus convallis lectus at suscipit commodo.
                Suspendisse mattis, nisl sit amet maximus interdum, purus tellus
                posuere lacus, at semper diam urna eget ante. Nulla augue
                mauris, porta a iaculis vitae, convallis eu elit. Etiam id risus
                non nibh tincidunt feugiat eget ut nisl. Nulla vestibulum, odio
                vitae molestie egestas, lorem neque tempus magna, at cursus eros
                elit eget mauris. Proin dignissim mi a nunc semper venenatis.
                Fusce sollicitudin ipsum ut orci convallis, sed congue lacus
                finibus. Quisque in ligula sit amet massa luctus maximus. Donec
                sollicitudin, velit sed ornare gravida, nunc libero viverra est,
                et laoreet turpis massa at nisl. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis
                egestas. In ut egestas lectus. Aenean ut condimentum erat.
                Praesent elementum nunc non dui commodo posuere. Quisque
                pulvinar, velit sed lacinia accumsan, augue nunc vestibulum leo,
                a hendrerit lacus ligula in elit. Vivamus sed lorem aliquam,
                sagittis ante et, venenatis sapien. Integer congue finibus
                lobortis. Nullam a eros finibus, eleifend mi sed, tincidunt
                tellus. Ut gravida augue quis hendrerit dignissim. Morbi
                volutpat elit quis ligula suscipit mattis. Sed blandit, velit
                vitae malesuada cursus, arcu ipsum rhoncus erat, et auctor nibh
                turpis a lacus. Curabitur fringilla varius diam, at dapibus
                ipsum volutpat ac. Phasellus nec accumsan lorem. Curabitur in
                sagittis nisl. Quisque ante mi, rutrum in neque dictum, placerat
                pretium lorem. Maecenas eget lacus sagittis, sollicitudin massa
                sodales, consectetur arcu. Interdum et malesuada fames ac ante
                ipsum primis in faucibus. Nam sit amet arcu ut erat lacinia
                bibendum at elementum turpis. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis
                egestas. Ut gravida tortor sed sagittis pellentesque. Ut
                ullamcorper ante sed turpis vestibulum ultricies vitae nec
                mauris. Nullam convallis sem in diam porttitor posuere. Fusce
                neque nibh, varius vel faucibus sed, facilisis eget leo.
                Curabitur ipsum risus, mattis facilisis vestibulum a, gravida
                non lacus. Etiam gravida vitae tortor in laoreet. Curabitur non
                vestibulum nibh. Morbi non consectetur neque, in mattis ipsum.
                Praesent purus erat, consectetur sed lobortis vel, lobortis
                porttitor augue. Maecenas fringilla, massa malesuada sagittis
                aliquet, lorem lorem faucibus metus, non placerat leo tortor eu
                ligula. Donec in lacus purus. Fusce diam est, accumsan eget nisi
                nec, commodo eleifend orci. Vestibulum ante ipsum primis in
                faucibus orci luctus et ultrices posuere cubilia curae; Nunc
                commodo elit non lobortis faucibus. Pellentesque lacus ex, porta
                in consectetur vitae, venenatis a risus. Donec eu luctus mauris.
              </Typography>
            </Box>
          </Modal>
        )}
      </>
    );
  },
};
