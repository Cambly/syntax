import { StoryObj, Meta } from "@storybook/react";
import allColors from "../colors/allColors";
import Box from "./Box";
import Typography from "../Typography/Typography";

export default {
  title: "Components/Box",
  component: Box,
  argTypes: {
    alignItems: {
      options: ["flexStart", "flexEnd", "center", "baseline", "stretch"],
      control: { type: "select" },
    },
    alignSelf: {
      options: [
        "auto",
        "flexStart",
        "flexEnd",
        "center",
        "baseline",
        "stretch",
      ],
      control: { type: "select" },
    },
    as: {
      control: { type: "select" },
      options: [
        "article",
        "aside",
        "caption",
        "details",
        "div",
        "figcaption",
        "figure",
        "footer",
        "header",
        "main",
        "nav",
        "section",
        "summary",
      ],
    },
    backgroundColor: {
      control: { type: "select" },
      options: allColors,
    },
    dangerouslySetInlineStyle: {
      control: { type: "object" },
    },
    flexWrap: {
      options: ["wrap", "nowrap"],
      control: { type: "radio" },
    },
    direction: {
      options: ["column", "row"],
      control: { type: "radio" },
    },
    smDirection: {
      options: ["column", "row"],
      control: { type: "radio" },
    },
    lgDirection: {
      options: ["column", "row"],
      control: { type: "radio" },
    },
    display: {
      options: ["flex", "block", "inlineBlock", "visuallyHidden"],
      control: { type: "select" },
    },
    smDisplay: {
      options: ["flex", "block", "inlineBlock", "visuallyHidden"],
      control: { type: "select" },
    },
    lgDisplay: {
      options: ["flex", "block", "inlineBlock", "visuallyHidden"],
      control: { type: "select" },
    },
    justifyContent: {
      options: ["start", "end", "center", "between", "around", "evenly"],
      control: { type: "select" },
    },
    margin: {
      control: { type: "number", min: -12, max: 12, step: 1 },
    },
    marginBottom: {
      control: { type: "number", min: -12, max: 12, step: 1 },
    },
    marginStart: {
      control: { type: "number", min: -12, max: 12, step: 1 },
    },
    marginEnd: {
      control: { type: "number", min: -12, max: 12, step: 1 },
    },
    marginTop: {
      control: { type: "number", min: -12, max: 12, step: 1 },
    },
    gap: {
      control: { type: "number", min: 0, max: 12, step: 1 },
    },
    padding: {
      control: { type: "number", min: 0, max: 12, step: 1 },
    },
    paddingX: {
      control: { type: "number", min: 0, max: 12, step: 1 },
    },
    paddingY: {
      control: { type: "number", min: 0, max: 12, step: 1 },
    },
    id: {
      control: "text",
    },
    height: {
      control: "text",
    },
    width: {
      control: "text",
    },
    minHeight: {
      control: "text",
    },
    minWidth: {
      control: "text",
    },
    maxHeight: {
      control: "text",
    },
    maxWidth: {
      control: "text",
    },
    rounding: {
      options: ["none", "sm", "md", "lg", "xl", "full"],
      control: { type: "select" },
    },
    children: {
      control: "text",
    },
    // Filter responsive props from the table to keep the table readable
    ...[
      "lgAlignItems",
      "lgDirection",
      "lgDisplay",
      "lgJustifyContent",
      "lgMargin",
      "lgMarginBottom",
      "lgMarginEnd",
      "lgMarginStart",
      "lgMarginTop",
      "lgPadding",
      "lgPaddingX",
      "lgPaddingY",
      "smAlignItems",
      "smDirection",
      "smDisplay",
      "smJustifyContent",
      "smMargin",
      "smMarginBottom",
      "smMarginEnd",
      "smMarginStart",
      "smMarginTop",
      "smPadding",
      "smPaddingX",
      "smPaddingY",
    ].reduce(
      (acc, value) => ({ ...acc, [value]: { table: { disable: true } } }),
      {},
    ),
  },
  tags: ["autodocs"],
} as Meta<typeof Box>;

export const Default: StoryObj<typeof Box> = {
  render: ({ children, ...args }) => (
    <Box {...args}>
      <Typography>{children ?? "Box"}</Typography>
    </Box>
  ),
};

export const BackgroundColor: StoryObj<typeof Box> = {
  render: () => (
    <Box display="flex" flexWrap="wrap" gap={4}>
      {allColors.map((color) => {
        const [number] = color.match(/\d\d\d/g) ?? [];

        return (
          <Box key={color} backgroundColor={color} width={240} padding={2}>
            <Typography
              color={
                ["gray10", "gray30", "white"].includes(color) ||
                (number && parseInt(number) < 400)
                  ? "gray900"
                  : "white"
              }
            >
              backgroundColor=&quot;{color}&quot;
            </Typography>
          </Box>
        );
      })}
    </Box>
  ),
};

export const Display: StoryObj<typeof Box> = {
  render: () => (
    <>
      <Typography weight="bold">Display: flex</Typography>
      <Box display="flex" marginTop={2}>
        <Box backgroundColor="gray700" width="50%" padding={4}>
          <Typography color="white">width=&quot;50%&quot;</Typography>
        </Box>
        <Box backgroundColor="gray300" width="50%" padding={4}>
          <Typography>width=&quot;50%&quot;</Typography>
        </Box>
      </Box>
    </>
  ),
};

export const Margin: StoryObj<typeof Box> = {
  render: () => (
    <Box display="flex" gap={4} flexWrap="wrap" alignItems="start">
      {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const).map((margin) => (
        <Box key={margin} backgroundColor="gray300">
          <Box
            backgroundColor="white"
            margin={margin}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography color="gray200" tooltip={`${margin * 4}px`}>
              margin=&quot;{margin}&quot;
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  ),
};

export const Padding: StoryObj<typeof Box> = {
  render: () => (
    <Box display="flex" gap={4} flexWrap="wrap" alignItems="start">
      {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const).map((padding) => (
        <Box
          key={padding}
          padding={padding}
          backgroundColor="gray300"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography tooltip={`${padding * 4}px`}>
            padding=&quot;{padding}&quot;
          </Typography>
        </Box>
      ))}
    </Box>
  ),
};

export const Responsive: StoryObj<typeof Box> = {
  render: () => (
    <Box display="flex" gap={2} direction="column">
      <Box padding={2}>
        <Typography>
          Visible on every screen width:
          <code>
            <pre>&lt;Box /&gt;</pre>
          </code>
        </Typography>
      </Box>
      <Box padding={2} display="none" smDisplay="block">
        <Typography>
          Visible on small screens (480px) and up:
          <code>
            <pre>
              &lt;Box display=&quot;none&quot; smDisplay=&quot;block&quot;&gt;
            </pre>
          </code>
        </Typography>
      </Box>

      <Box padding={2} display="none" lgDisplay="block">
        <Typography>
          Visible on small screens (960px) and up:
          <code>
            <pre>
              &lt;Box display=&quot;none&quot; lgDisplay=&quot;block&quot;&gt;
            </pre>
          </code>
        </Typography>
      </Box>
    </Box>
  ),
};

const roundingLookup = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "32px",
  full: "999px",
} as const;

export const Rounding: StoryObj<typeof Box> = {
  render: () => (
    <Box display="flex" gap={4} flexWrap="wrap">
      {(["sm", "md", "lg", "xl", "full"] as const).map((rounding) => (
        <Box
          key={rounding}
          rounding={rounding}
          width={rounding === "full" ? 250 : 150}
          height={150}
          backgroundColor="gray300"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography tooltip={`${roundingLookup[rounding]}`}>
            rounding=&quot;{rounding}&quot;
          </Typography>
        </Box>
      ))}
    </Box>
  ),
};
