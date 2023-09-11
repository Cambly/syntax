import { useState, useRef, useEffect, type ReactElement } from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { Box, Typography, Button } from "../../../syntax-core/src/index";
import Popover from "./Popover";
import IconButton from "../../../syntax-core/src/IconButton/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "../Tooltip/Tooltip";

export default {
  title: "Floating-Components/Popover",
  component: Popover,
  decorators: [
    (Story) => (
      <Box
        width="calc(100vw - 2rem)"
        height="calc(100vh - 2rem)"
        backgroundColor="gray100"
        display="flex"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Story />
      </Box>
    ),
  ],
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
    content: (
      <Box width="100%" display="flex" direction="column" gap={2}>
        <Typography transform="uppercase" color="gray700" size={100}>
          Weekly Plan
        </Typography>
        <Typography weight="bold" size={500}>
          30 Minutes x 2
        </Typography>
        <Typography>Daily maximum of 30 minutes</Typography>
        <Button text="Change Plan" color="secondary" fullWidth />
      </Box>
    ),
  },
  render: ({ placement, initialOpen, content, children }) => (
    <div style={{ margin: "240px" }}>
      <Popover
        placement={placement}
        initialOpen={initialOpen}
        content={<Box maxWidth="400px" width="100%">{content}</Box>}
      >
        {children}
      </Popover>
    </div>
  ),
};

export const ControlledPopover = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop =
        scrollableRef.current.scrollHeight / 2 -
        scrollableRef.current.offsetHeight / 2;
    }
  }, [scrollableRef]);

  return (
    <>
      <div
        ref={scrollableRef}
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
            onChangeContentVisibility={(visible) => setOpen(visible)}
            content={(
              <Box maxWidth="700px" width="100%">
                <Box width="100%" display="flex" direction="column" gap={2}>
                  <Typography transform="uppercase" color="gray700" size={100}>
                    Weekly Plan
                  </Typography>
                  <Typography weight="bold" size={500}>
                    30 Minutes x 2
                  </Typography>
                  <Typography>Daily maximum of 30 minutes</Typography>
                  <Button text="Change Plan" color="secondary" fullWidth />
                </Box>
              </Box>
            )}
          >
            <Button text="Internal trigger" />
          </Popover>
        </Box>
      </div >
      <Button
        text="External trigger"
        onClick={() => setOpen((v) => !v)}
      />
    </>
  );
};

export const ContentHasTooltips = ({ placement }): ReactElement => (
  <Popover
    placement={placement}
    initialOpen
    content={(
      <Box width="100%" maxWidth="400px" display="flex" direction="column" gap={2}>
        <Typography transform="uppercase" color="gray700" size={100}>
          Weekly Plan <Tooltip content="Save more by subscribing to our monthly or yearly plans!"><InfoOutlinedIcon fontSize="inherit" /></Tooltip>
        </Typography>
        <Typography weight="bold" size={500}>
          30 Minutes x 2 <Tooltip content="One 30 minute or two 15 minute lessons, twice per week"><InfoOutlinedIcon fontSize="inherit" /></Tooltip>
        </Typography>
        <Typography tooltip="This is a tooltip">Daily maximum of 30 minutes</Typography>
        <Button text="Change Plan" color="secondary" fullWidth />
        <Typography tooltip="This is a tooltip">Daily maximum of 30 minutes. And a lot of really long text.     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </Typography>
      </Box>
    )}
  >
    <Button text="Trigger me" />
  </Popover>
);
