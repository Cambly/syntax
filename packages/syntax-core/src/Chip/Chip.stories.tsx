import { useState } from "react";
import { type StoryObj, type Meta } from "@storybook/react";
import Chip from "./Chip";
import Star from "@mui/icons-material/Star";
import Box from "../Box/Box";

import HeartFilled from "../../../syntax-icons/src/icons/HeartFilled";

export default {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?type=design&node-id=6156%3A25032&mode=design&t=SSblm5y2vyrOKil1-1",
    },
  },
  args: {
    selected: false,
    text: "text on chip",
    on: "lightBackground",
    disabled: false,
    "data-testid": "",
    dangerouslyForceFocusStyles: false,
  },
  argTypes: {
    on: {
      options: ["lightBackground", "darkBackground"],
      control: { type: "radio" },
    },
    selected: {
      control: "boolean",
    },
    text: {
      control: "text",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Chip>;

export const Default: StoryObj<typeof Chip> = {
  args: {
    text: "text on chip",
    selected: false,
  },
  render: (args) => {
    return (
      <Box
        backgroundColor={args.on === "lightBackground" ? "white" : "black"}
        padding={2}
      >
        <Chip {...args} />
      </Box>
    );
  },
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
    <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
      <Chip
        text="interactive chip"
        onChange={handleSmChange}
        selected={isSmSelected}
      />
      <Chip
        text="interactive chip"
        onChange={handleLgChange}
        selected={isLgSelected}
      />
    </Box>
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
    <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
      <Chip
        icon={Star}
        text="interactive chip"
        onChange={handleSmChange}
        selected={isSmSelected}
      />
      <Chip
        icon={Star}
        text="interactive chip"
        onChange={handleLgChange}
        selected={isLgSelected}
      />
    </Box>
  );
};

const SyntaxIconInteractive = () => {
  const [isSmSelected, setIsSmSelected] = useState(false);
  const [isLgSelected, setIsLgSelected] = useState(false);
  const handleSmChange = () => {
    setIsSmSelected(!isSmSelected);
  };
  const handleLgChange = () => {
    setIsLgSelected(!isLgSelected);
  };

  return (
    <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
      <Chip
        icon={HeartFilled}
        text="interactive chip"
        onChange={handleSmChange}
        selected={isSmSelected}
      />
      <Chip
        icon={HeartFilled}
        text="interactive chip"
        onChange={handleLgChange}
        selected={isLgSelected}
      />
    </Box>
  );
};

export const Interactive: StoryObj<typeof Chip> = {
  render: () => <ChipInteractive />,
};

export const IconInteractive: StoryObj<typeof Chip> = {
  render: () => <ChipIconInteractive />,
};

export const SyntaxIcons: StoryObj<typeof Chip> = {
  render: () => <SyntaxIconInteractive />,
};
