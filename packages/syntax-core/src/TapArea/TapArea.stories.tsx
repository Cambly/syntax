import { type StoryObj, type Meta } from "@storybook/react";
import TapArea from "./TapArea";
import Avatar from "../Avatar/Avatar";
import image from "../../../../apps/storybook/assets/images/jane.webp";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";

export default {
  title: "Components/TapArea",
  component: TapArea,
  args: {
    disabled: false,
    rounding: "none",
    tabIndex: 0,
    fullWidth: true,
    accessibilityLabel: "",
    "data-testid": "",
  },
  argTypes: {
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
} as Meta<typeof TapArea>;

export const Default: StoryObj<typeof TapArea> = {
  args: {
    children: (
      <Box display="flex" alignItems="center" gap={4} padding={2}>
        <Avatar accessibilityLabel="Jane" src={image} size="md" />
        <Typography size={500}>Jane Doe</Typography>
      </Box>
    ),
  },
};

export const Disabled: StoryObj<typeof Default> = {
  args: { ...Default.args, disabled: true },
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
          {(["sm", "md", "lg", "xl", "full"] as const).map((rounding) => (
            <TapArea
              key={rounding}
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
            </TapArea>
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

        <TapArea
          fullWidth={false}
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
        </TapArea>
      </Box>
    </>
  ),
};

export const NestedLink: StoryObj<typeof Box> = {
  render: () => (
    <>
      <Box display="flex" direction="column" gap={4}>
        <TapArea
          fullWidth={false}
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
              <a href="https://www.cambly.com" target="_blank">
                Cambly
              </a>
            </Typography>
          </Box>
        </TapArea>
      </Box>
    </>
  ),
};
