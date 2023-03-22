import { StoryObj, Meta } from "@storybook/react";
import ButtonGroup from "./ButtonGroup";
import { Color, Orientation, Size } from "../constants";
import Button from "../Button/Button";

export default {
  title: "ButtonGroup",
  component: ButtonGroup,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/Cambly-Design-System?node-id=1007%3A4097",
    },
  },
  argTypes: {
    orientation: {
      options: [Orientation.HORIZONTAL, Orientation.VERTICAL],
      control: { type: "radio" },
    },
    fullWidth: {
      control: "boolean",
    },
    size: {
      options: [Size.SMALL, Size.MEDIUM, Size.LARGE],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof ButtonGroup>;

function handleClick() {
  /* empty */
}

export const Default: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button color={Color.SECONDARY} text="Secondary" onClick={handleClick} />
      <Button color={Color.PRIMARY} text="Primary" onClick={handleClick} />
    </ButtonGroup>
  ),
};

export const Small: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <ButtonGroup {...args} size="sm">
      <Button color={Color.SECONDARY} text="Secondary" onClick={handleClick} />
      <Button color={Color.PRIMARY} text="Primary" onClick={handleClick} />
    </ButtonGroup>
  ),
};

export const Medium: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <ButtonGroup {...args} size="md">
      <Button color={Color.SECONDARY} text="Secondary" onClick={handleClick} />
      <Button color={Color.PRIMARY} text="Primary" onClick={handleClick} />
    </ButtonGroup>
  ),
};

export const Large: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <ButtonGroup {...args} size="lg">
      <Button color={Color.SECONDARY} text="Secondary" onClick={handleClick} />
      <Button color={Color.PRIMARY} text="Primary" onClick={handleClick} />
    </ButtonGroup>
  ),
};

export const FullWidth: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <ButtonGroup {...args} fullWidth>
      <Button color={Color.SECONDARY} text="Secondary" onClick={handleClick} />
      <Button color={Color.PRIMARY} text="Primary" onClick={handleClick} />
    </ButtonGroup>
  ),
};

export const Vertical: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <ButtonGroup {...args} orientation="vertical">
      <Button color={Color.SECONDARY} text="Secondary" onClick={handleClick} />
      <Button color={Color.PRIMARY} text="Primary" onClick={handleClick} />
    </ButtonGroup>
  ),
};
