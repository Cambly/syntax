import { type ReactElement } from "react";
import { type StoryObj, type Meta } from "@storybook/react";
import Icon from "./Icon";
import allColors from "../colors/allColors";

export default {
  title: "Components/Icon",
  component: Icon,
  args: {
    size: 200,
  },
  argTypes: {
    size: {
      options: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900],
      control: { type: "radio" },
    },
    color: {
      control: { type: "select" },
      options: allColors,
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Icon>;

export const Default: StoryObj<typeof Icon> = {
  args: {
    size: 200,
    path: "m22 11-.5-3.5h-6l-2-5.5h-3l-2 5.5h-6L2 11l4.5 3L4 20.5 7 22l5-4 5 4 3-1.5-2.5-6.5z",
  },
};

const IconWithLtrDirection = (): ReactElement => {
  return (
    <div dir="ltr">
      <Icon
        size={200}
        // Accent
        path="M22 9.368h-6.316V7.263H22zM19.895 2l-5.263 2.105 1.052 2.106 5.263-2.106zm1.052 10.526-5.263-2.105-1.052 2.105 5.263 2.106zM2 22h15.79l-2.106-5.263-5.263-3.158-2.632 4.21-2.631-4.21L2 15.684zM12.526 7.79a4.737 4.737 0 1 1-9.473 0 4.737 4.737 0 0 1 9.473 0"
      />
    </div>
  );
};

const IconWithRtlDirection = (): ReactElement => {
  return (
    <div dir="rtl">
      <Icon
        size={200}
        // Accent
        path="M22 9.368h-6.316V7.263H22zM19.895 2l-5.263 2.105 1.052 2.106 5.263-2.106zm1.052 10.526-5.263-2.105-1.052 2.105 5.263 2.106zM2 22h15.79l-2.106-5.263-5.263-3.158-2.632 4.21-2.631-4.21L2 15.684zM12.526 7.79a4.737 4.737 0 1 1-9.473 0 4.737 4.737 0 0 1 9.473 0"
      />
    </div>
  );
};

export const WithLtrDirection: StoryObj<typeof Icon> = {
  render: () => <IconWithLtrDirection />,
};

export const WithRtlDirection: StoryObj<typeof Icon> = {
  render: () => <IconWithRtlDirection />,
};
