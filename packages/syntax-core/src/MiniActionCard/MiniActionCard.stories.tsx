import { StoryObj, Meta } from "@storybook/react";
import MiniActionCard from "./MiniActionCard";
import image from "../../../../apps/storybook/assets/images/book.svg";

export default {
  title: "MiniActionCard",
  component: MiniActionCard,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1206-4420&t=yFh7Ijhf6PU7Lin3-0",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof MiniActionCard>;

export const Default: StoryObj<typeof MiniActionCard> = {
  args: {
    children: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: "24px",
        }}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <img src={image} alt="book icon" style={{ width: "50%" }} />
        <button type="button">Pick a course</button>
      </div>
    ),
  },
};
