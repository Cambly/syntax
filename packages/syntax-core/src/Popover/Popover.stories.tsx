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
    <Typography weight="bold" size={400}>
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
  argTypes: {
    accessibilityLabel: {
      control: { type: "string" },
      defaultValue: "My accessibility label",
      description: "Optional aria-label for the popover (content element)",
    },
    accessibilityCloseLabel: {
      control: { type: "string" },
      defaultValue: "My accessibility close label",
      description:
        "Optional aria-label for the close button (trigger element) when displayed as ModalDialog",
    },
    initialOpen: {
      control: { type: "radio" },
      defaultValue: undefined,
      options: [false, true, undefined],
    },
    modal: {
      control: { type: "radio" },
      defaultValue: false,
      options: [false, true],
      desciption:
        "Optional boolean to control whether popover content is rendered as a modal",
    },
    open: {
      control: { type: "radio" },
      defaultValue: undefined,
      options: [false, true, undefined],
      description:
        "Value of the 'open' state when controlled (disabled for story)",
    },
    onOpenChange: {
      table: { disable: true },
      description:
        "Function that is called when the open state changes (disabled for story)",
    },
    onChangeContentVisibility: {
      table: { disable: true },
      description:
        "Function that is called when the content visibility changes, after animations complete (disabled for story)",
    },
    placement: {
      control: { type: "select" },
      defaultValue: "bottom",
      options: ["top", "end", "bottom", "start"],
      table: {
        defaultValue: { summary: "bottom" },
      },
    },
    zIndex: {
      control: { type: "number" },
      defaultValue: undefined,
      description: "Optional z-index of the popover",
    },
    children: {},
    content: {},
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
  render: ({ content, ...otherProps }) => (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Popover
        {...otherProps}
        content={
          <Box maxWidth="400px" width="100%">
            {content}
          </Box>
        }
      />
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
  render: ({ content, ...otherProps }) => (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Popover
        {...otherProps}
        content={
          <Box maxWidth="400px" width="100%">
            {content}
          </Box>
        }
      />
    </Box>
  ),
};

export const NestedPopovers = (): ReactElement => {
  return (
    <Popover
      placement="top"
      content={
        <Box display="flex" direction="column" gap={3}>
          <ContentWithTooltips />
          <Popover
            placement="start"
            content={
              <Box display="flex" direction="column" gap={3}>
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
              </Box>
            }
          >
            <Button text="Nested popover" />
          </Popover>
        </Box>
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
            onOpenChange={setOpen}
            content={
              <Box maxWidth={400} display="flex" direction="column" gap={3}>
                <Typography>
                  This popover is controlled by an external piece of state. The
                  external trigger button below opens the popover. This button
                  inside can close the popover.
                </Typography>
                <Button
                  text="Close popover"
                  onClick={() => setOpen((v) => !v)}
                />
              </Box>
            }
            accessibilityLabel="Popover with internal trigger, controlled"
          >
            <Button text="Internal trigger" />
          </Popover>
        </Box>
      </div>
      <Popover
        accessibilityLabel="Popover with no trigger children, controlled"
        open={openChildless}
        placement="top"
        onOpenChange={setOpenChildless}
        content={
          <Box maxWidth={400} display="flex" direction="column" gap={3}>
            <ContentWithTooltips />
            <SuperLongContent />
          </Box>
        }
      />
      <Box display="flex" direction="column" gap={3} alignItems="center">
        <Box>
          <Button
            text="External trigger for popover, controlled, with internal trigger children (Open)"
            onClick={() => setOpen((v) => !v)}
          />
        </Box>
        <Box>
          <Button
            text="External trigger for popover with no trigger children"
            onClick={() => setOpenChildless((v) => !v)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export const LongContent = (): ReactElement => {
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

export const WideLongContent = (): ReactElement => {
  return (
    <Box display="flex" direction="column" gap={3} backgroundColor="purple100">
      <Popover
        placement="bottom"
        content={
          <Box display="flex" direction="column" gap={3}>
            <ContentWithTooltips />
            <SuperLongContent />
            <SuperLongContent />
            <SuperLongContent />
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
          <Box display="flex" direction="column" gap={3}>
            <ContentWithTooltips />
            <SuperLongContent />
            <SuperLongContent />
            <SuperLongContent />
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
