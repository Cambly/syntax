import { useState, type ReactElement } from "react";
import type { StoryObj, Meta } from "@storybook/react";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import Popover from "./Popover";
import IconButton from "../../../syntax-core/src/IconButton/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "../Tooltip/Tooltip";

const ContentWithTooltips = () => (
  <Box width="100%" maxWidth="400px" display="flex" direction="column" gap={2}>
    <Typography transform="uppercase" color="gray700" size={100}>
      Weekly Plan{" "}
      <Tooltip content="Save more by subscribing to our monthly or yearly plans!">
        <InfoOutlinedIcon fontSize="inherit" />
      </Tooltip>
    </Typography>
    <Typography weight="bold" size={500}>
      30 Minutes x 2{" "}
      <Tooltip content="One 30 minute or two 15 minute lessons, twice per week">
        <InfoOutlinedIcon fontSize="inherit" />
      </Tooltip>
    </Typography>
    <Typography tooltip="This is a tooltip">
      Daily maximum of 30 minutes
    </Typography>
    <Button text="Change Plan" color="secondary" fullWidth />
  </Box>
);

const SuperLongContent = () => (
  <>
    <Typography tooltip="This is a tooltip">
      Daily maximum of 30 minutes. And a lot of really long text. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.{" "}
    </Typography>
    <Typography tooltip="This is a tooltip">
      Daily maximum of 30 minutes. And a lot of really long text. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.{" "}
    </Typography>
    <Typography tooltip="This is a tooltip">
      Daily maximum of 30 minutes. And a lot of really long text. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.{" "}
    </Typography>
    <Typography tooltip="This is a tooltip">
      Daily maximum of 30 minutes. And a lot of really long text. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.{" "}
    </Typography>
    <Typography tooltip="This is a tooltip">
      Daily maximum of 30 minutes. And a lot of really long text. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.{" "}
    </Typography>
    <Typography tooltip="This is a tooltip">
      Daily maximum of 30 minutes. And a lot of really long text. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.{" "}
    </Typography>
  </>
);

export default {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    design: {
      type: "figma",
    },
  },
  argTypes: {
    initialOpen: {
      control: { type: "radio" },
      defaultValue: true,
      options: [false, true],
    },
    open: {
      table: { disable: true },
      description:
        "Value of the 'open' state when controlled (disabled for story)",
    },
    onOpenChange: {
      table: { disable: true },
      description:
        "Function to change the value of 'open' when popover is interacted (diabled for story)",
    },
    placement: {
      control: { type: "select" },
      defaultValue: "right",
      options: ["top", "right", "bottom", "left"],
      table: {
        defaultValue: { summary: "right" },
      },
    },
    strategy: {
      control: { type: "select" },
      options: ["absolute", "fixed"],
      defaultValue: "absolute",
      table: {
        defaultValue: { summary: "absolute" },
      },
    },
    children: {},
    content: {},
    maxWidth: {
      control: { type: "number" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Popover>;

export const Default: StoryObj<typeof Popover> = {
  args: {
    placement: "bottom",
    children: (
      <IconButton
        accessibilityLabel="Info Icon Button"
        icon={InfoOutlinedIcon}
        onClick={() => alert("Default button pressed")}
        color="tertiary"
        size="lg"
      />
    ),
    content: <ContentWithTooltips />,
  },
  render: ({ placement, initialOpen, content, children }) => (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Popover
        placement={placement}
        initialOpen={initialOpen}
        content={
          <Box maxWidth="400px" width="100%">
            {content}
          </Box>
        }
      >
        {children}
      </Popover>
    </Box>
  ),
};

export const InitialOpen: StoryObj<typeof Popover> = {
  args: {
    initialOpen: true,
    children: (
      <IconButton
        accessibilityLabel="Info Icon Button"
        icon={InfoOutlinedIcon}
        onClick={() => alert("Default button pressed")}
        color="tertiary"
        size="lg"
      />
    ),
    content: <ContentWithTooltips />,
  },
  render: ({ placement, initialOpen, content, children }) => (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Popover
        placement={placement}
        initialOpen={initialOpen}
        content={
          <Box maxWidth="400px" width="100%">
            {content}
          </Box>
        }
      >
        {children}
      </Popover>
    </Box>
  ),
};

export const NestedPopovers = (): ReactElement => {
  return (
    <Popover
      placement="top"
      content={
        <>
          <ContentWithTooltips />
          <Popover
            placement="start"
            content={
              <>
                <ContentWithTooltips />
                <Popover
                  placement="start"
                  content={
                    <Box maxWidth="400px" width="100%">
                      <ContentWithTooltips />
                    </Box>
                  }
                >
                  <Button text="Nested popover" />
                </Popover>
              </>
            }
          >
            <Button text="Nested popover" />
          </Popover>
        </>
      }
    >
      <Button text="Nested popover" />
    </Popover>
  );
};

export const ControlledPopover = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const [openChildless, setOpenChildless] = useState(false);

  return (
    <Box display="flex" direction="column" gap={3} backgroundColor="purple100">
      <div
        style={{
          overflowY: "auto",
          width: "400px",
          height: "300px",
        }}
      >
        <Box
          marginTop={12}
          marginBottom={12}
          display="flex"
          justifyContent="center"
        >
          <Popover
            open={open}
            placement="bottom"
            onChangeContentVisibility={setOpen}
            content={<ContentWithTooltips />}
            accessibilityLabel="Popover with internal trigger, controlled"
          >
            <Button text="Internal trigger" />
          </Popover>
        </Box>
      </div>
      <Popover
        accessibilityLabel="Popover with no trigger, controlled"
        open={openChildless}
        placement="top"
        onChangeContentVisibility={setOpenChildless}
        content={
          <Box maxWidth={400} display="flex" direction="column" gap={3}>
            <ContentWithTooltips />
            <SuperLongContent />
          </Box>
        }
      />
      <Box display="flex" direction="column" gap={3} alignItems="center">
        <Box>
          <Button text="External trigger" onClick={() => setOpen((v) => !v)} />
        </Box>
        <Box>
          <Button
            text="External trigger for popover with no children"
            onClick={() => setOpenChildless((v) => !v)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export const ContentWhenLong = (): ReactElement => {
  return (
    <Box display="flex" direction="column" gap={3} backgroundColor="purple100">
      <Popover
        placement="bottom"
        content={
          <Box display="flex" direction="column" gap={3} maxWidth={400}>
            <ContentWithTooltips />
            <SuperLongContent />
            <ContentWithTooltips />
          </Box>
        }
      >
        <Button text="Open Popover" />
      </Popover>
      <Popover
        placement="bottom"
        modal
        content={
          <Box display="flex" direction="column" gap={3} maxWidth={400}>
            <ContentWithTooltips />
            <SuperLongContent />
            <ContentWithTooltips />
          </Box>
        }
      >
        <Button text="Open Popover as Modal Dialog" />
      </Popover>
    </Box>
  );
};
