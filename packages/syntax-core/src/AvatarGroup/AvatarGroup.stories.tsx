import { type StoryObj, type Meta } from "@storybook/react";
import AvatarGroup from "./AvatarGroup";
import Avatar from "../Avatar/Avatar";
import image from "../../../../apps/storybook/assets/images/jane.webp";
import defaultAvatar from "../../../../apps/storybook/assets/images/defaultAvatar.svg";
import Box from "../Box/Box";
import { type ComponentProps } from "react";

export default {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?type=design&node-id=8051-10795&mode=design&t=3nfRP12usxROfc12-0",
    },
  },
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "radio" },
    },
    orientation: {
      options: ["standard", "reverse"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof AvatarGroup>;

const defaultAvatars = Array(2)
  .fill(undefined)
  .map((_, idx) => ({
    src: defaultAvatar,
    accessibilityLabel: "defaultAccessibilityLabel",
    key: `defaultAvatar${idx}`,
  }));

export const Default: StoryObj<
  ComponentProps<typeof AvatarGroup> & {
    size: ComponentProps<typeof Avatar>["size"];
  }
> = {
  args: { size: "md", orientation: "standard" },
  render: (args) => {
    const { size, orientation } = args;
    return (
      <Box backgroundColor="gray100" padding={4}>
        <AvatarGroup size={size} orientation={orientation}>
          {defaultAvatars.map(({ src, accessibilityLabel, key }) => (
            <Avatar
              src={src}
              accessibilityLabel={accessibilityLabel}
              key={key}
            />
          ))}
          <Avatar
            src={image}
            accessibilityLabel="Jane"
            icon={
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "green",
                  borderRadius: "50%",
                }}
              />
            }
          />
        </AvatarGroup>
      </Box>
    );
  },
};

export const Standard: StoryObj<
  ComponentProps<typeof AvatarGroup> & {
    size: ComponentProps<typeof Avatar>["size"];
  }
> = {
  args: { size: "lg", orientation: "standard" },
  render: (args) => {
    const { size, orientation } = args;
    return (
      <Box backgroundColor="gray100" padding={4}>
        <AvatarGroup size={size} orientation={orientation}>
          {defaultAvatars.map(({ src, accessibilityLabel, key }) => (
            <Avatar
              src={src}
              accessibilityLabel={accessibilityLabel}
              key={key}
            />
          ))}
          <Avatar
            src={image}
            accessibilityLabel="Jane"
            icon={
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "green",
                  borderRadius: "50%",
                }}
              />
            }
          />
        </AvatarGroup>
      </Box>
    );
  },
};

export const Reverse: StoryObj<
  ComponentProps<typeof AvatarGroup> & {
    size: ComponentProps<typeof Avatar>["size"];
  }
> = {
  args: { size: "lg", orientation: "reverse" },
  render: (args) => {
    const { size, orientation } = args;
    return (
      <Box backgroundColor="gray100" padding={4}>
        <AvatarGroup size={size} orientation={orientation}>
          {defaultAvatars.map(({ src, accessibilityLabel, key }) => (
            <Avatar
              src={src}
              accessibilityLabel={accessibilityLabel}
              key={key}
            />
          ))}
          <Avatar
            src={image}
            accessibilityLabel="Jane"
            icon={
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "green",
                  borderRadius: "50%",
                }}
              />
            }
          />
        </AvatarGroup>
      </Box>
    );
  },
};
