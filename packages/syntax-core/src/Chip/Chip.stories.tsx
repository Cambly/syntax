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
    size: "sm",
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
    size: {
      options: ["sm", "md"],
      control: { type: "radio" },
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
  const [isMdSelected, setIsMdSelected] = useState(false);
  const handleSmChange = () => {
    setIsSmSelected(!isSmSelected);
  };
  const handleLgChange = () => {
    setIsMdSelected(!isMdSelected);
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
        selected={isMdSelected}
        size="md"
      />
    </Box>
  );
};
const ChipIconInteractive = () => {
  const [isSmSelected, setIsSmSelected] = useState(false);
  const [isMdSelected, setIsMdSelected] = useState(false);
  const handleSmChange = () => {
    setIsSmSelected(!isSmSelected);
  };
  const handleLgChange = () => {
    setIsMdSelected(!isMdSelected);
  };

  return (
    <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
      <Chip
        startIcon={Star}
        text="interactive chip"
        onChange={handleSmChange}
        selected={isSmSelected}
      />
      <Chip
        startIcon={Star}
        text="interactive chip"
        onChange={handleLgChange}
        selected={isMdSelected}
        size="md"
      />
    </Box>
  );
};

const SyntaxIconInteractive = () => {
  const [isSmSelected, setIsSmSelected] = useState(false);
  const [isMdSelected, setIsMdSelected] = useState(false);
  const handleSmChange = () => {
    setIsSmSelected(!isSmSelected);
  };
  const handleLgChange = () => {
    setIsMdSelected(!isMdSelected);
  };

  return (
    <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
      <Chip
        startIcon={HeartFilled}
        endIcon={HeartFilled}
        text="interactive chip"
        onChange={handleSmChange}
        selected={isSmSelected}
        size="sm"
      />
      <Chip
        startIcon={HeartFilled}
        endIcon={HeartFilled}
        text="interactive chip"
        onChange={handleLgChange}
        selected={isMdSelected}
        size="md"
      />
    </Box>
  );
};

const WithStartIconInteractive = () => {
  const [isSmSelected, setIsSmSelected] = useState(false);
  const [isMdSelected, setIsMdSelected] = useState(false);
  const handleSmChange = () => {
    setIsSmSelected(!isSmSelected);
  };
  const handleLgChange = () => {
    setIsMdSelected(!isMdSelected);
  };

  return (
    <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
      <Chip
        startIcon={HeartFilled}
        text="interactive chip"
        onChange={handleSmChange}
        selected={isSmSelected}
        size="sm"
      />
      <Chip
        startIcon={HeartFilled}
        text="interactive chip"
        onChange={handleLgChange}
        selected={isMdSelected}
        size="md"
      />
    </Box>
  );
};

const WithEndIconInteractive = () => {
  const [isSmSelected, setIsSmSelected] = useState(false);
  const [isMdSelected, setIsMdSelected] = useState(false);
  const handleSmChange = () => {
    setIsSmSelected(!isSmSelected);
  };
  const handleLgChange = () => {
    setIsMdSelected(!isMdSelected);
  };

  return (
    <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
      <Chip
        endIcon={HeartFilled}
        text="interactive chip"
        onChange={handleSmChange}
        selected={isSmSelected}
      />
      <Chip
        endIcon={HeartFilled}
        text="interactive chip"
        onChange={handleLgChange}
        selected={isMdSelected}
        size="md"
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

export const WithStartIcon: StoryObj<typeof Chip> = {
  render: () => <WithStartIconInteractive />,
};

export const WithEndIcons: StoryObj<typeof Chip> = {
  render: () => <WithEndIconInteractive />,
};
