import { useState, useRef, useEffect, type ReactElement } from "react";
import type { StoryObj, Meta } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import Button from "../../../syntax-core/src/Button/Button";
import IconButton from "../../../syntax-core/src/IconButton/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Box from "../../../syntax-core/src/Box/Box";
import RadioButton from "../../../syntax-core/src/RadioButton/RadioButton";

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
    content: {
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
    content: "This is a tooltip",
  },
  render: ({ delay, placement, initialOpen, strategy, content }) => (
    <div style={{ margin: "240px" }}>
      <Tooltip
        delay={delay}
        placement={placement}
        initialOpen={initialOpen}
        strategy={strategy}
        content={content}
      >
        <IconButton
          accessibilityLabel="Info Icon Button"
          icon={InfoOutlinedIcon}
          onClick={() => alert("Default button pressed")}
          color="tertiary"
          size="lg"
        />
      </Tooltip>
    </div>
  ),
};

export const UncontrolledButtonTooltip: StoryObj<typeof Tooltip> = {
  args: {
    content: "This is a button",
  },
  render: () => (
    <Tooltip content="This is a button">
      <Button
        text="My trigger"
        onClick={() => alert("UncontrolledButtonTooltip pressed")}
      />
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
          content="This is really long text"
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <Button
            ref={ref}
            text="My trigger"
            onClick={() => setOpen((v) => !v)}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export const RadioButtonGroupWithTooltips = (): ReactElement => {
  const [choice, setChoice] = useState(0);

  const proficiencyChoices = [
    {
      text: "Beginner",
      value: 0,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    },
    {
      text: "Intermediate",
      value: 1,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    },
    {
      text: "Advanced",
      value: 2,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    },
  ];

  return (
    <Box paddingY={8} paddingX={4} backgroundColor="gray200">
      <Box display="flex" alignItems="center" direction="column">
        <Box padding={7} rounding="md" backgroundColor="white" width="100%">
          <Box
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box role="radiogroup">
              {proficiencyChoices.map(({ text, value, content }) => (
                <Box key={value} display="flex" alignItems="center" gap={1}>
                  <RadioButton
                    key={value}
                    label={text}
                    value={value}
                    name="proficiency"
                    onChange={(e) => setChoice(Number(e.target.value))}
                    checked={choice === value}
                  />
                  <Tooltip placement="left" content={content}>
                    <InfoOutlinedIcon width={20} height={20} />
                  </Tooltip>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
