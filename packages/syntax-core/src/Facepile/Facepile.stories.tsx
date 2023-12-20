import { type StoryObj, type Meta } from "@storybook/react";
import Facepile from "./Facepile";
import image from "../../../../apps/storybook/assets/images/jane.webp";
import { type ReactElement } from "react";
import defaultAvatar from "../../../../apps/storybook/assets/images/defaultAvatar.svg";
import Box from "../Box/Box";

export default {
  title: "Components/Facepile",
  component: Facepile,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?type=design&node-id=8051-10795&mode=design&t=3nfRP12usxROfc12-0",
    },
  },
  argTypes: {
    size: {
      options: ["sm", "md", "lg", "xl"],
      control: { type: "radio" },
    },
    orientation: {
      options: ["standard", "reverse"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Facepile>;

const filledAvatars = [
  {
    src: image,
    accessibilityLabel: "Jane",
    key: "Jane",
    icon: (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "green",
          borderRadius: "50%",
        }}
      />
    ),
  },
];

const defaultAvatars = Array(2)
  .fill(undefined)
  .map((_, idx) => ({
    src: defaultAvatar,
    accessibilityLabel: "defaultAccessibilityLAbel",
    key: `defaultAvatar${idx}`,
  }));

const Avatars = ({
  size,
  orientation,
}: {
  size: "sm" | "md" | "lg" | "xl";
  orientation: "standard" | "reverse";
}): ReactElement => {
  return (
    <>
      {filledAvatars.map(({ src, accessibilityLabel, key, icon }, index) => (
        <Facepile.Avatar
          src={src}
          accessibilityLabel={accessibilityLabel}
          key={key}
          icon={icon}
          orientation={orientation}
          size={size}
          zIndex={filledAvatars.length + defaultAvatars.length - index}
        />
      ))}
      {defaultAvatars.map(({ src, accessibilityLabel, key }, index) => (
        <Facepile.Avatar
          src={src}
          accessibilityLabel={accessibilityLabel}
          key={key}
          orientation={orientation}
          size={size}
          zIndex={defaultAvatars.length - index}
        />
      ))}
    </>
  );
};

const FacepileInteractive = ({
  size,
  orientation,
}: {
  size: "sm" | "md" | "lg" | "xl";
  orientation: "standard" | "reverse";
}): ReactElement => (
  <Box width={200} margin={4}>
    <Facepile orientation={orientation}>
      <Avatars size={size} orientation={orientation} />
    </Facepile>
  </Box>
);

export const Default: StoryObj<typeof FacepileInteractive> = {
  args: { size: "md", orientation: "standard" },
  render: (args) => <FacepileInteractive {...args} />,
};
