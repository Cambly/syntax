import React, {
  useRef,
  useEffect,
  type ReactElement,
  useState,
  Fragment,
} from "react";
import type { StoryObj, Meta } from "@storybook/react";
import Tooltip from "./Tooltip";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RadioButton from "../../../syntax-core/src/RadioButton/RadioButton";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1007-4109&t=1jAyqXTkYBP57oZL-0",
    },
  },
  argTypes: {
    delay: {
      control: { type: "number" },
      defaultValue: 0,
      table: {
        defaultValue: { summary: 0 },
      },
    },
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
        "Function that is called when the open state changes (disabled for story)",
    },
    onChangeContentVisibility: {
      table: { disable: true },
      description:
        "Function that is called when the content visibility changes, after animations complete (disabled for story)",
    },
    placement: {
      control: { type: "select" },
      defaultValue: "right",
      options: ["top", "right", "bottom", "left"],
      table: {
        defaultValue: { summary: "right" },
      },
    },
    children: {
      control: { type: "text" },
      description:
        "The string value to show for tooltip trigger (can also be a ReactElement)",
    },
    content: {
      control: { type: "text" },
      description:
        "The string value to show on the tooltip content (can also be a ReactElement",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Tooltip>;

export const Default: StoryObj<typeof Tooltip> = {
  args: {
    children: <span>Hover / Focus me</span>,
    content: (
      <>
        This is a tooltip content{" "}
        <button role="button" title="a button">
          a button
        </button>
      </>
    ),
  },
  render: ({ delay, placement, initialOpen, content, children }) => (
    <Box
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="400px"
      gap={2}
    >
      <Tooltip
        delay={delay}
        placement={placement}
        initialOpen={initialOpen}
        content={content}
      >
        {children}
      </Tooltip>
    </Box>
  ),
};

export const AddContextToLabel: StoryObj<typeof Tooltip> = {
  args: {
    placement: "top-end",
    children: <span>tutor rating</span>,
    content:
      "The tutor's rating is calculated from these types of information: 1) something, 2) something else",
  },
  render: (props) => (
    <Box
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="400px"
      gap={2}
    >
      <Tooltip {...props} />
    </Box>
  ),
};

export const LargeTooltipContent: StoryObj<typeof Tooltip> = {
  args: {
    placement: "top-end",
    children: <InfoOutlinedIcon />,
    content: (
      <Box maxWidth="400px" display="flex" direction="column" gap={2}>
        <Typography color="inherit" weight="semiBold" size={500}>
          Learn English with Cambly.
          <br />
          We help you progress.
        </Typography>
        <Typography color="inherit">
          Welcome to Cambly, your trusted platform for learning English. With
          our expert tutors and interactive sessions, we are here to help you
          progress and achieve fluency in the English language. Whether you are
          a beginner or looking to refine your language skills, our personalized
          approach ensures that you receive the guidance you need. Join Cambly
          today and embark on your journey to English proficiency.
        </Typography>
        <a href="https://news.ycombinator.com" target="_blank">
          Here is a link to HackerNews
        </a>
      </Box>
    ),
  },
  render: (props) => (
    <Box
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="400px"
      gap={2}
    >
      <Tooltip {...props} />
    </Box>
  ),
};

export const FocusedInParagraph: StoryObj<typeof Tooltip> = {
  args: {
    placement: "top-start",
    children: <InfoOutlinedIcon fontSize="inherit" />,
    content: "Focused tooltip content",
  },
  render: (props) => (
    <>
      This tooltip content is inline <Tooltip {...props} initialOpen /> and also
      within a paragraph.
    </>
  ),
};

export const MultipleTooltipsStacked: StoryObj<typeof Tooltip> = {
  args: {
    content: (
      <>
        This is a tooltip content{" "}
        <button role="button" title="a button">
          a button
        </button>
      </>
    ),
  },
  render: ({ content }) => (
    <>
      <div>
        <Typography>Label 1 </Typography>
        <Tooltip content={content} initialOpen>
          <InfoOutlinedIcon fontSize="inherit" />
        </Tooltip>
      </div>
      <div>
        <Typography>Label 2 </Typography>
        <Tooltip content={content}>
          <InfoOutlinedIcon fontSize="inherit" />
        </Tooltip>
      </div>
      <div>
        <Typography>Label 3 </Typography>
        <Tooltip content={content}>
          <InfoOutlinedIcon fontSize="inherit" />
        </Tooltip>
      </div>
    </>
  ),
};

export const PlacementOptions: StoryObj<typeof Tooltip> = {
  args: {
    content: (
      <>
        This is a tooltip content{" "}
        <button role="button" title="a button">
          a button
        </button>
      </>
    ),
  },
  render: ({ content }) => (
    <Box display="flex" direction="row" justifyContent="between" flex="grow">
      {Array.from({ length: 5 }).map((_, i) => (
        <Box
          key={i}
          display="flex"
          direction="column"
          justifyContent="between"
          gap={12}
        >
          {Array.from({ length: 2 }).map((__, j) =>
            (
              ["top-end", "bottom-end", "top-start", "bottom-start"] as const
            ).map((placement) => (
              <Fragment key={`${placement}${j}`}>
                <Tooltip
                  placement={placement}
                  content={content}
                  initialOpen={i % 2 === 0}
                  open={i % 2 === 0 ? true : undefined}
                >
                  <Button text={placement} />
                </Tooltip>
                <Box paddingY={6} />
              </Fragment>
            )),
          )}
        </Box>
      ))}
    </Box>
  ),
};

export const MultipleOpenInTightSpaces: StoryObj<typeof Tooltip> = {
  args: {
    content: (
      <>
        This is a tooltip content{" "}
        <button role="button" title="a button">
          a button
        </button>
      </>
    ),
  },
  render: ({ content }) => (
    <Box display="flex" direction="column" gap={10}>
      {(["top-end", "bottom-end", "top-start", "bottom-start"] as const).map(
        (placement) => (
          <Box key={placement} display="flex" gap={2}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Tooltip
                key={i}
                placement={placement}
                content={content}
                initialOpen
              >
                <Button text={placement} />
              </Tooltip>
            ))}
          </Box>
        ),
      )}
    </Box>
  ),
};

export const ButtonAsTrigger: StoryObj<typeof Tooltip> = {
  args: {
    content: (
      <>
        This is a tooltip content{" "}
        <button role="button" title="a button">
          a button
        </button>
      </>
    ),
  },
  render: ({ content }) => (
    <Tooltip placement="top-end" content={content}>
      <Button
        text="My trigger"
        onClick={() => alert("UncontrolledButtonTooltip pressed")}
      />
    </Tooltip>
  ),
};

export const IconButtonAsTrigger: StoryObj<typeof Tooltip> = {
  args: {
    content: (
      <>
        This is a tooltip content{" "}
        <button role="button" title="a button">
          a button
        </button>
      </>
    ),
  },
  render: ({ content }) => (
    <Tooltip placement="top-end" content={content}>
      <IconButton
        accessibilityLabel="Info Icon Button"
        icon={InfoOutlinedIcon}
        onClick={() => alert("icon button pressed")}
        color="tertiary"
        size="md"
      />
    </Tooltip>
  ),
};

export const DivAsTrigger: StoryObj<typeof Tooltip> = {
  render: () => (
    <Tooltip placement="top-end" content="some content">
      <div>hover or focus me</div>
    </Tooltip>
  ),
};

export const InputAsTrigger: StoryObj<typeof Tooltip> = {
  render: () => (
    <>
      <Typography>
        (a little wonky, but not terrible, just an example, not trying to
        support)
      </Typography>
      <Tooltip placement="top-end" content="some content">
        <input
          type="text"
          placeholder="with tooltip"
          style={{ border: "1px solid" }}
        />
      </Tooltip>
    </>
  ),
};

export const OpenedBelowTheFold = (): ReactElement => {
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
        position: "relative",
        overflowY: "auto",
        width: "400px",
        height: "300px",
        border: "1px solid black",
      }}
    >
      There is a tooltip befow the fold here. scroll this box to see it.
      <div
        style={{
          marginTop: "400px",
          marginBottom: "400px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tooltip
          initialOpen
          content={
            <>
              <span style={{ display: "block" }}>
                This is a button and a really long sentence.
              </span>
              <a
                href="http://localhost:6006/?path=/docs/floating-components-tooltip--docs"
                style={{ textUnderlinePosition: "under", color: "white" }}
              >
                Learn more
              </a>
            </>
          }
        >
          <Button ref={ref} text="My trigger.  Hover or focus me." />
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
        <Box padding={7} rounding="xl" backgroundColor="white" width="100%">
          <Box
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box role="radiogroup">
              {proficiencyChoices.map(({ text, value, content }, i) => (
                <Box key={value} display="flex" alignItems="center" gap={1}>
                  <RadioButton
                    key={value}
                    label={text}
                    value={value}
                    name="proficiency"
                    onChange={(e) => setChoice(Number(e.target.value))}
                    checked={choice === value}
                  />
                  <Tooltip
                    initialOpen={i === 1}
                    placement="top-start"
                    content={content}
                  >
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
export const OpenControlledExternally = (): ReactElement => {
  const [open, setOpen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const id = setInterval(() => setOpen((_open) => !_open), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <Box
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="400px"
      gap={2}
    >
      <Typography>
        There is a 3 second interval running to toggle the tooltip open state.
        It can also be toggled externally with the button below.
      </Typography>
      <Tooltip
        open={open}
        initialOpen
        onOpenChange={setOpen}
        content={
          <>
            This is a tooltip content{" "}
            <button role="button" title="a button">
              a button
            </button>
          </>
        }
      >
        <Button text="Trigger me" />
      </Tooltip>

      <Button text="External Trigger" onClick={() => setOpen(!open)} />
    </Box>
  );
};
