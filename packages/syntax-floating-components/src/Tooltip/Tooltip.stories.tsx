import { StoryObj, Meta } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import styles from "./Tooltip.module.css";
import { useState, useRef } from "react";
import image from "../../../../apps/storybook/assets/images/book.svg";

export default {
  title: "Floating-Components/Tooltip",
  component: Tooltip,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1007-4109&t=1jAyqXTkYBP57oZL-0",
    },
  },
  argTypes: {
    string: {
      control: "text",
    },
  },
  tags: ["autodocs"],
} as Meta<any>;

export const Default: StoryObj<typeof Tooltip> = {
  render: () => (
    <>
      <h1>Floating UI — Tooltip (uncontrolled)</h1>
      <Tooltip>
        <TooltipTrigger>My trigger</TooltipTrigger>
        <TooltipContent className={styles.tooltip}>My tooltip</TooltipContent>
      </Tooltip>
    </>
  ),
};

export const ControlledTooltip = () => {
  const [open, setOpen] = useState(false);
  const imgRef = useRef(null);
  return (
    <Tooltip open={open} onOpenChange={setOpen} placement="right">
      <TooltipTrigger asChild onClick={() => setOpen((v) => !v)}>
        <img
          ref={imgRef}
          src={image as string}
          alt=""
          style={{ width: "50px", height: "50px" }}
        />
      </TooltipTrigger>
      <TooltipContent className={styles.tooltip}>My tooltip</TooltipContent>
    </Tooltip>
  );
};
