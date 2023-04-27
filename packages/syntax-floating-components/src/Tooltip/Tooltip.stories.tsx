import { useState, useRef } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import styles from "./Tooltip.module.css";
import type { Placement } from "@floating-ui/react";
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
    children: {
      control: { type: null },
    },
    tooltipText: {
      control: { type: "text" },
      table: {
        defaultValue: { summary: "This is a book" },
      },
    },
    placement: {
      control: { type: "select" },
      defaultValue: "top",
      options: [
        "top",
        "top-start",
        "top-end",
        "right",
        "right-start",
        "right-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
      ],
      table: {
        defaultValue: { summary: "top" },
      },
    },
    initialOpen: {
      control: { type: null },
    },
    open: {
      control: { type: null },
    },
  },
  tags: ["autodocs"],
} as Meta<any>;

const UnControlledTooltip = ({ args }: any) => {
  const imgRef = useRef(null);
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    <Tooltip placement={args.placement as Placement}>
      <TooltipTrigger asChild>
        <img
          ref={imgRef}
          src={image as string}
          alt=""
          style={{ width: "50px", height: "50px" }}
        />
      </TooltipTrigger>
      <TooltipContent className={styles.tooltip}>
        {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
        {args.tooltipText || "This is a book"}
      </TooltipContent>
    </Tooltip>
  );
};

export const Default: StoryObj<typeof Tooltip> = {
  render: (args) => <UnControlledTooltip args={{ ...args }} />,
};

export const ControlledTooltip = () => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip open={open} onOpenChange={setOpen} placement="bottom">
      <TooltipTrigger onClick={() => setOpen((v) => !v)}>
        My trigger
      </TooltipTrigger>
      <TooltipContent className={styles.tooltip}>
        This is a tooltip
      </TooltipContent>
    </Tooltip>
  );
};
