import React from "react";
import { type StoryObj, type Meta } from "@storybook/react";
import LinkTapArea from "./LinkTapArea";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";
import Avatar from "../Avatar/Avatar";
import image from "../../../../apps/storybook/assets/images/jane.webp";

export default {
  title: "Components/LinkTapArea",
  component: LinkTapArea,
  args: {
    href: "https://www.cambly.com",
    target: "_blank",
    disabled: false,
    rounding: "none",
    tabIndex: 0,
    fullWidth: true,
    accessibilityLabel: "",
    "data-testid": "",
  },
  argTypes: {
    href: {
      control: { type: "text" },
    },
    target: {
      options: ["_blank", "_self", "_parent", "_top", undefined],
      control: { type: "radio" },
    },
    rel: {
      options: [
        "prev",
        "next",
        "nofollow",
        "noreferrer",
        "search",
        "tag",
        "related",
        "alternate",
      ],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
    rounding: {
      options: ["none", "sm", "md", "lg", "xl", "full"],
      control: { type: "select" },
    },
    tabIndex: {
      control: { type: "number" },
      options: [0, -1],
    },
  },
  tags: ["autodocs"],
} as Meta<typeof LinkTapArea>;

export const Default: StoryObj<typeof LinkTapArea> = {
  args: {
    children: (
      <Box display="flex" alignItems="center" gap={4} padding={2}>
        <Avatar accessibilityLabel="Jane" src={image} size="md" />
        <Typography size={400}>Jane Doe</Typography>
      </Box>
    ),
  },
  render: ({ ...args }) => <LinkTapArea {...args} />,
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
    <>
      <Box display="flex" direction="column" gap={4}>
        <Typography>Hover to see the rounding effect</Typography>

        <Box
          display="flex"
          gap={4}
          flexWrap="wrap"
          backgroundColor="gray100"
          padding={4}
        >
          {(["sm", "md", "full"] as const).map((rounding) => (
            <LinkTapArea
              key={rounding}
              href="https://www.cambly.com"
              rounding={rounding}
              fullWidth={false}
              onClick={() => {
                /* empty */
              }}
            >
              <Box display="flex" alignItems="center" gap={2} padding={2}>
                <Typography tooltip={`${roundingLookup[rounding]}`}>
                  rounding=&quot;{rounding}&quot;
                </Typography>
              </Box>
            </LinkTapArea>
          ))}
        </Box>
      </Box>
    </>
  ),
};

export const Colored: StoryObj<typeof Box> = {
  render: () => (
    <>
      <Box display="flex" direction="column" gap={4}>
        <Typography>Hover to see the overlay</Typography>

        <LinkTapArea
          fullWidth={false}
          href="https://www.cambly.com"
          onClick={() => {
            /* empty */
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            padding={2}
            backgroundColor="purple300"
          >
            <Typography>Colored</Typography>
          </Box>
        </LinkTapArea>
      </Box>
    </>
  ),
};

export const NestedLink: StoryObj<typeof Box> = {
  render: () => (
    <>
      <Box display="flex" direction="column" gap={4}>
        <LinkTapArea
          fullWidth={false}
          href="https://www.cambly.com"
          onClick={() => {
            /* empty */
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            padding={2}
            backgroundColor="purple200"
          >
            <Typography>
              Link:{" "}
              <a href="https://www.cambly.com/learn" target="_blank">
                Cambly
              </a>
            </Typography>
          </Box>
        </LinkTapArea>
      </Box>
    </>
  ),
};
