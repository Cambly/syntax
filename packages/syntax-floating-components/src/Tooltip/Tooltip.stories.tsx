import { useState, useRef, useEffect } from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import styles from "./Tooltip.module.css";
import type { Placement, Strategy } from "@floating-ui/react";
import { FloatingDelayGroup, shift } from "@floating-ui/react";
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
    initialOpen: {
      control: { type: null },
    },
    open: {
      control: { type: null },
    },
    placement: {
      control: { type: "select" },
      defaultValue: "right",
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
        defaultValue: { summary: "right" },
      },
    },
    strategy: {
      control: { type: "select" },
      options: ["absolute", "fixed"],
      table: {
        defaultValue: { summary: "absolute" },
      },
    },
    tooltipText: {
      control: { type: "text" },
      table: {
        defaultValue: { summary: "This is a book" },
      },
    },
  },
  tags: ["autodocs"],
} as Meta<any>;

const ControlledTooltip = ({ args }: any) => {
  const [open, setOpen] = useState(false);
  const imgRef = useRef(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableRef && scrollableRef.current) {
      scrollableRef.current.scrollTop =
        scrollableRef.current.scrollHeight / 2 -
        scrollableRef.current.offsetHeight / 2;
    }
  }, [scrollableRef]);

  return (
    <div
      ref={scrollableRef}
      style={{
        padding: "8px",
        overflowY: "auto",
        width: "250px",
        height: "300px",
      }}
    >
      <div
        style={{
          height: "300px",
          width: "1px",
        }}
      />
      <div style={{ paddingLeft: "100px" }}>
        <FloatingDelayGroup delay={200}>
          {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
          <Tooltip
            open={open}
            onOpenChange={setOpen}
            placement={args.placement as Placement}
            strategy={args.strategy as Strategy}
          >
            <TooltipTrigger onClick={() => setOpen((v) => !v)} asChild>
              <img
                ref={imgRef}
                src={image as string}
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
            </TooltipTrigger>
            <TooltipContent className={styles.tooltip}>
              <div
                style={{
                  width: "80%",
                  wordWrap: "break-word",
                  textAlign: "center",
                }}
              >
                {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
                {args.tooltipText ||
                  "This is a book and a really long sentence."}
              </div>
              <a
                href="http://localhost:6006/?path=/docs/floating-components-tooltip--docs"
                style={{
                  textUnderlinePosition: "under",
                  color: "white",
                  paddingTop: "8px",
                }}
              >
                Learn more
              </a>
            </TooltipContent>
          </Tooltip>
        </FloatingDelayGroup>
      </div>

      <div
        style={{
          height: "300px",
          width: "1px",
        }}
      />
    </div>
  );
};

export const Default: StoryObj<typeof Tooltip> = {
  render: (args) => <ControlledTooltip args={{ ...args }} />,
};

export const UncontrolledTooltip = () => (
  <Tooltip placement="bottom">
    <TooltipTrigger>My trigger</TooltipTrigger>
    <TooltipContent className={styles.uncontrolledTooltip}>
      This is a tooltip
    </TooltipContent>
  </Tooltip>
);
