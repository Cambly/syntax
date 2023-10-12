import React from "react";
import { type StoryObj, type Meta } from "@storybook/react";

import Box from "../Box/Box";
import Button from "../Button/Button";
import MiniActionCard from "../MiniActionCard/MiniActionCard";
import MiniActionCardGroup from "./MiniActionCardGroup";

import image from "../../../../apps/storybook/assets/images/book.svg";

export default {
  title: "Components/MiniActionCardGroup",
  component: MiniActionCardGroup,
  parameters: {
    design: {
      type: "figma",
      url: "UPDATE_FIGMA_LINK_HERE",
    },
  },
  argTypes: {
    // argTypes here (can delete if none)
  },
  tags: ["autodocs"],
} as Meta<typeof MiniActionCardGroup>;

const MiniActionCardExample = () => (
  <MiniActionCard>
    <Box
      display="flex"
      direction="row"
      smDirection="row"
      lgDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={6}
      height="100%"
    >
      <img src={image} alt="" style={{ height: "80px" }} />
      <Button color="tertiary" size="sm" text={"Browse tutors"} />
    </Box>
  </MiniActionCard>
);

export const Default: StoryObj<typeof MiniActionCardGroup> = {
  render: () => (
    <Box backgroundColor="gray700" padding={6}>
      <MiniActionCardGroup>
        <MiniActionCardExample />
        <MiniActionCardExample />
        <MiniActionCardExample />
      </MiniActionCardGroup>
    </Box>
  ),
};
