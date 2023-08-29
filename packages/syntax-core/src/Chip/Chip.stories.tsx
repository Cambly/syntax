import React, { useState } from "react";
import { type StoryObj, type Meta } from "@storybook/react";
import Chip from "./Chip";
import Star from "@mui/icons-material/Star";
import Box from "../Box/Box";

export default {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?type=design&node-id=6156%3A25032&mode=design&t=SSblm5y2vyrOKil1-1",
    },
  },
  argTypes: {
    selected: {
      control: "boolean",
    },
    text: {
      control: "text",
    },
  },
} as Meta<typeof Chip>;

export const Default: StoryObj<typeof Chip> = {
  args: {
    text: "text on chip",
    selected: false,
  },
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  render: ({ ...args }) => <Chip {...args} />,
};

const ChipInteractive = () => {
  const [isSmSelected, setIsSmSelected] = useState(false);
  const [isLgSelected, setIsLgSelected] = useState(false);
  const handleSmChange = () => {
    setIsSmSelected(!isSmSelected);
  };
  const handleLgChange = () => {
    setIsLgSelected(!isLgSelected);
  };

  return (
    <>
      <Box margin={1} display="inlineBlock">
        <Chip
          data-testid="data-testid"
          text="interactive sm chip"
          size="sm"
          onChange={handleSmChange}
          selected={isSmSelected}
        />
      </Box>
      <Box margin={1} display="inlineBlock">
        <Chip
          data-testid="data-testid"
          text="interactive lg chip"
          size="lg"
          onChange={handleLgChange}
          selected={isLgSelected}
        />
      </Box>
    </>
  );
};
const ChipIconInteractive = () => {
  const [isSmSelected, setIsSmSelected] = useState(false);
  const [isLgSelected, setIsLgSelected] = useState(false);
  const handleSmChange = () => {
    setIsSmSelected(!isSmSelected);
  };
  const handleLgChange = () => {
    setIsLgSelected(!isLgSelected);
  };

  return (
    <>
      <Box margin={1} display="inlineBlock">
        <Chip
          icon={Star}
          data-testid="data-testid"
          text="interactive sm chip"
          size="sm"
          onChange={handleSmChange}
          selected={isSmSelected}
        />
      </Box>
      <Box margin={1} display="inlineBlock">
        <Chip
          icon={Star}
          data-testid="data-testid"
          text="interactive lg chip"
          size="lg"
          onChange={handleLgChange}
          selected={isLgSelected}
        />
      </Box>
    </>
  );
};

export const Interactive: StoryObj<typeof Chip> = {
  render: () => <ChipInteractive />,
};

export const IconInteractive: StoryObj<typeof Chip> = {
  render: () => <ChipIconInteractive />,
};
