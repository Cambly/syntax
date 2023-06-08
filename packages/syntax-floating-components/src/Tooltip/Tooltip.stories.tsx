import { useState, useRef, useEffect, type ReactElement } from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import Button from "../../../syntax-core/src/Button/Button";
import IconButton from "../../../syntax-core/src/IconButton/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default {
  title: "Floating-Components/Tooltip",
  component: Tooltip,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1007-4109&t=1jAyqXTkYBP57oZL-0",
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
        "Function to change the value of 'open' when tooltip is interacted (diabled for story)",
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
    children: {
      control: { type: "text" },
      description: "The string value to show on the tooltip content",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Tooltip>;

export const Default: StoryObj<typeof Tooltip> = {
  args: {
    delay: 0,
    placement: "right",
    initialOpen: true,
    strategy: "absolute",
    children: "This is a tooltip",
  },
  render: ({ delay, placement, initialOpen, strategy, children }) => (
    <div style={{ margin: "240px" }}>
      <Tooltip
        delay={delay}
        placement={placement}
        initialOpen={initialOpen}
        strategy={strategy}
      >
        <TooltipTrigger>
          <IconButton
            accessibilityLabel="Info Icon Button"
            icon={InfoOutlinedIcon}
            onClick={() => alert("Default button pressed")}
            color="tertiary"
            size="lg"
          />
        </TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const UncontrolledButtonTooltip: StoryObj<typeof Tooltip> = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <Button
          text="My trigger"
          onClick={() => alert("UncontrolledButtonTooltip pressed")}
        />
      </TooltipTrigger>
      <TooltipContent>This is a button</TooltipContent>
    </Tooltip>
  ),
};

export const ControlledTooltip = (): ReactElement => {
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
      <div
        style={{
          marginTop: "300px",
          marginBottom: "300px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tooltip
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <TooltipTrigger>
            <Button
              ref={ref}
              text="My trigger"
              onClick={() => setOpen((v) => !v)}
            />
          </TooltipTrigger>
          <TooltipContent>
            <span style={{ display: "block" }}>
              This is a button and a really long sentence.
            </span>
            <a
              href="http://localhost:6006/?path=/docs/floating-components-tooltip--docs"
              style={{ textUnderlinePosition: "under", color: "white" }}
            >
              Learn more
            </a>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
