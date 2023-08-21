import { useState, useRef, useEffect, type ReactElement } from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { Box, Typography, Button } from "../../../syntax-core/src/index";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import IconButton from "../../../syntax-core/src/IconButton/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default {
  title: "Floating-Components/Popover",
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
  },
  tags: ["autodocs"],
} as Meta<typeof Popover>;

export const Default: StoryObj<typeof Popover> = {
  args: {
    delay: 0,
    placement: "bottom",
    initialOpen: true,
    strategy: "absolute",
    children: (
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
  render: ({ delay, placement, initialOpen, strategy, children }) => (
    <div style={{ margin: "240px" }}>
      <Popover
        delay={delay}
        placement={placement}
        initialOpen={initialOpen}
        strategy={strategy}
      >
        <PopoverTrigger>
          <IconButton
            accessibilityLabel="Info Icon Button"
            icon={InfoOutlinedIcon}
            onClick={() => alert("Default button pressed")}
            color="tertiary"
            size="lg"
          />
        </PopoverTrigger>
        <PopoverContent>{children}</PopoverContent>
      </Popover>
    </div>
  ),
};

export const ControlledPopover = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop =
        scrollableRef.current.scrollHeight / 2 -
        scrollableRef.current.offsetHeight / 2;
    }
  }, [scrollableRef]);

  return (
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
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <PopoverTrigger>
            <Button
              ref={ref}
              text="My trigger"
              onClick={() => setOpen((v) => !v)}
            />
          </PopoverTrigger>
          <PopoverContent>
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
          </PopoverContent>
        </Popover>
      </Box>
    </div>
  );
};
