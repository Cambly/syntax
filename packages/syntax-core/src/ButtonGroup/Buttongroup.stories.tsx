import { StoryObj, Meta } from "@storybook/react";
import ButtonGroup from "./ButtonGroup";
import Button from "../Button/Button";

export default {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/Cambly-Design-System?node-id=1007%3A4097",
    },
  },
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
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
      <Button
        color="secondary"
        size={args.size}
        text="Secondary"
        onClick={handleClick}
      />
      <Button
        color="primary"
        size={args.size}
        text="Primary"
        onClick={handleClick}
      />
    </ButtonGroup>
  ),
};

export const Small: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <ButtonGroup {...args} size="sm">
      <Button
        size="sm"
        color="secondary"
        text="Secondary"
        onClick={handleClick}
      />
      <Button size="sm" color="primary" text="Primary" onClick={handleClick} />
    </ButtonGroup>
  ),
};

export const Medium: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <ButtonGroup {...args} size="md">
      <Button
        size="md"
        color="secondary"
        text="Secondary"
        onClick={handleClick}
      />
      <Button size="md" color="primary" text="Primary" onClick={handleClick} />
    </ButtonGroup>
  ),
};

export const Large: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <ButtonGroup {...args} size="lg">
      <Button
        size="lg"
        color="secondary"
        text="Secondary"
        onClick={handleClick}
      />
      <Button size="lg" color="primary" text="Primary" onClick={handleClick} />
    </ButtonGroup>
  ),
};

export const Vertical: StoryObj<typeof ButtonGroup> = {
  render: (args) => (
    <ButtonGroup {...args} orientation="vertical">
      <Button color="secondary" text="Secondary" onClick={handleClick} />
      <Button color="primary" text="Primary" onClick={handleClick} />
    </ButtonGroup>
  ),
};
