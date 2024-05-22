import { type ComponentProps, useState } from "react";
import { type StoryObj, type Meta } from "@storybook/react";
import Tabs from "./Tabs";
import Badge from "../Badge/Badge";
import Box from "../Box/Box";

export default {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/G3UM2urgAYO2iiNU7nlulI/%F0%9F%9F%A1-Cambio-Syntax?node-id=4540-1486",
    },
  },
  tags: ["autodocs"],
  args: {
    on: "lightBackground",
    accessibilityLabel: "",
  },
  argTypes: {
    on: {
      options: ["lightBackground", "darkBackground"],
      control: { type: "radio" },
    },
  },
} as Meta<typeof Tabs>;

const TabsButtonInteractive = ({
  on,
}: {
  on: "lightBackground" | "darkBackground";
}) => {
  const [selected, setSelected] = useState<
    "Achievements" | "History" | "Quizzes" | "Levels" | "Tabatha" | "Tabathy"
  >("Achievements");

  return (
    <Tabs accessibilityLabel="My custom tabs" on={on}>
      <Tabs.Button
        text="Achievements"
        onClick={() => setSelected("Achievements")}
        selected={selected === "Achievements"}
        on={on}
      />
      <Tabs.Button
        text="History"
        onClick={() => setSelected("History")}
        selected={selected === "History"}
        on={on}
      />
      <Tabs.Button
        text="Quizzes"
        onClick={() => setSelected("Quizzes")}
        selected={selected === "Quizzes"}
        itemCount={7}
        on={on}
      />
      <Tabs.Button
        text="Levels"
        onClick={() => setSelected("Levels")}
        selected={selected === "Levels"}
        endContent={<Badge text="BETA" />}
        on={on}
      />
      <Tabs.Button
        text="Tabatha"
        onClick={() => setSelected("Tabatha")}
        selected={selected === "Tabatha"}
        itemCount={99}
        on={on}
      />
      <Tabs.Button
        text="Tabathy"
        onClick={() => setSelected("Tabathy")}
        selected={selected === "Tabathy"}
        itemCount={100}
        on={on}
      />
    </Tabs>
  );
};

const TabsLinkInteractive = ({
  on,
}: {
  on: "lightBackground" | "darkBackground";
}) => {
  const [selected, setSelected] = useState<"Tabrell" | "Tabara" | "Tabson">(
    "Tabrell",
  );

  return (
    <Tabs accessibilityLabel="My custom tabs" on={on}>
      <Tabs.Link
        href="https://cambly-syntax.vercel.app/?path=/docs/components-tabs--docs"
        text="Tabrell"
        onClick={() => setSelected("Tabrell")}
        selected={selected === "Tabrell"}
        on={on}
      />
      <Tabs.Link
        href="https://cambly-syntax.vercel.app/?path=/docs/components-tabs--docs"
        text="Tabara"
        onClick={() => setSelected("Tabara")}
        selected={selected === "Tabara"}
        on={on}
      />
      <Tabs.Link
        href="https://cambly-syntax.vercel.app/?path=/docs/components-tabs--docs"
        text="Tabson"
        onClick={() => setSelected("Tabson")}
        selected={selected === "Tabson"}
        on={on}
      />
    </Tabs>
  );
};

export const Default: StoryObj<
  ComponentProps<typeof Tabs> & { on: "lightBackground" | "darkBackground" }
> = {
  args: { accessibilityLabel: "My custom tabs" },
  render: (args) => {
    return (
      <Box
        padding={2}
        dangerouslySetInlineStyle={{
          __style: {
            backgroundImage:
              args.on === "darkBackground"
                ? "linear-gradient(0deg, #000, #555 )"
                : null,
          },
        }}
      >
        <TabsButtonInteractive {...args} />
      </Box>
    );
  },
};

export const Link: StoryObj<
  ComponentProps<typeof Tabs> & { on: "lightBackground" | "darkBackground" }
> = {
  args: { accessibilityLabel: "My custom tabs" },
  render: (args) => {
    return (
      <Box
        padding={2}
        dangerouslySetInlineStyle={{
          __style: {
            backgroundImage:
              args.on === "darkBackground"
                ? "linear-gradient(0deg, #000, #555 )"
                : null,
          },
        }}
      >
        <TabsLinkInteractive {...args} />
      </Box>
    );
  },
};
