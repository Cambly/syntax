import { type StoryObj, type Meta } from "@storybook/react";
import CheckboxGroup from "./CheckboxGroup";
import { useState, type ReactElement } from "react";
import Checkbox from "../Checkbox/Checkbox";

export default {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1197%3A6474&mode=dev",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof CheckboxGroup>;

export const Default: StoryObj<typeof CheckboxGroup> = {
  args: {
    children: ["Event 1", "Event 2", "Event 3"].map((label, i) => (
      <Checkbox
        key={i}
        checked={false}
        label={label}
        onChange={() => {
          /* empty */
        }}
      />
    )),
  },
};

const CheckboxGroupInteractive = (): ReactElement => {
  const [isEvent1Checked, setIsEvent1Checked] = useState(false);
  const [isEvent2Checked, setIsEvent2Checked] = useState(false);
  const [isEvent3Checked, setIsEvent3Checked] = useState(true);

  return (
    <CheckboxGroup>
      <Checkbox
        label="1989"
        checked={isEvent1Checked}
        onChange={() => setIsEvent1Checked(!isEvent1Checked)}
      />
      <Checkbox
        label="Reputation"
        checked={isEvent2Checked}
        onChange={() => setIsEvent2Checked(!isEvent2Checked)}
      />
      <Checkbox
        label="Speak Now"
        checked={isEvent3Checked}
        onChange={() => setIsEvent3Checked(!isEvent3Checked)}
      />
    </CheckboxGroup>
  );
};

export const Interactive: StoryObj<typeof CheckboxGroup> = {
  render: () => <CheckboxGroupInteractive />,
};
