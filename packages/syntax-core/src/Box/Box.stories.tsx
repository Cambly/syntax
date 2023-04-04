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
    color: {
      control: { type: "select" },
      options: allColors,
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
    children: {
      control: "text",
    },
    // Filter dangerous and responsive props from the table to keep the table readable
    ...[
      "dangerouslySetInlineStyle",
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

export const Color: StoryObj<typeof Box> = {
  render: () => (
    <Box display="flex" flexWrap="wrap" gap={4}>
      {allColors.map((color) => {
        const [number] = color.match(/\d\d\d/g) ?? [];

        return (
          <Box key={color} color={color} width={120} padding={2}>
            <Typography
              color={
                ["gray10", "gray30", "white"].includes(color) ||
                (number && parseInt(number) < 400)
                  ? "gray900"
                  : "white"
              }
            >
              {color}
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
        <Box color="gray700" width="50%" padding={4}>
          <Typography color="white">Column 1</Typography>
        </Box>
        <Box color="gray300" width="50%" padding={4}>
          <Typography>Column 2</Typography>
        </Box>
      </Box>
    </>
  ),
};

export const Margin: StoryObj<typeof Box> = {
  render: () => (
    <Box display="flex" gap={4} flexWrap="wrap" alignItems="start">
      {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const).map((margin) => (
        <Box key={margin} color="gray300">
          <Box
            margin={margin}
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography color="gray200">{margin}</Typography>
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
          color="gray300"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography>{padding}</Typography>
        </Box>
      ))}
    </Box>
  ),
};

export const Responsive: StoryObj<typeof Box> = {
  render: () => (
    <>
      <Box padding={2}>
        <Typography>Box visible on every screen width</Typography>
      </Box>
      <Box padding={2} display="none" smDisplay="block">
        <Typography>Box visible on small screens (480px) and up</Typography>
      </Box>

      <Box padding={2} display="none" lgDisplay="block">
        <Typography>Box visible on small screens (960px) and up</Typography>
      </Box>
    </>
  ),
};

export const Rounding: StoryObj<typeof Box> = {
  render: () => (
    <Box display="flex" gap={4} flexWrap="wrap">
      {(["sm", "md", "lg", "xl", "pill"] as const).map((rounding) => (
        <Box
          key={rounding}
          rounding={rounding}
          width={100}
          height={100}
          color="gray300"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography>{rounding}</Typography>
        </Box>
      ))}
    </Box>
  ),
};
