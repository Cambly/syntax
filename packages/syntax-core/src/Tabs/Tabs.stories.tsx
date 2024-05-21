import { useState } from "react";
import { type StoryObj, type Meta } from "@storybook/react";
import Tabs from "./Tabs";
import Badge from "../Badge/Badge";

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
} as Meta<typeof Tabs>;

const TabsButtonInteractive = () => {
  const [selected, setSelected] = useState<
    "Achievements" | "History" | "Quizzes" | "Levels" | "Tabatha" | "Tabathy"
  >("Achievements");

  return (
    <Tabs accessibilityLabel="My custom tabs">
      <Tabs.Button
        text="Achievements"
        onClick={() => setSelected("Achievements")}
        selected={selected === "Achievements"}
      />
      <Tabs.Button
        text="History"
        onClick={() => setSelected("History")}
        selected={selected === "History"}
      />
      <Tabs.Button
        text="Quizzes"
        onClick={() => setSelected("Quizzes")}
        selected={selected === "Quizzes"}
        itemCount={7}
      />
      <Tabs.Button
        text="Levels"
        onClick={() => setSelected("Levels")}
        selected={selected === "Levels"}
        endContent={<Badge text="New" />}
      />
      <Tabs.Button
        text="Tabatha"
        onClick={() => setSelected("Tabatha")}
        selected={selected === "Tabatha"}
        itemCount={99}
      />
      <Tabs.Button
        text="Tabathy"
        onClick={() => setSelected("Tabathy")}
        selected={selected === "Tabathy"}
        itemCount={100}
      />
    </Tabs>
  );
};

export const Default: StoryObj<typeof Tabs> = {
  args: {},
  render: () => {
    return <TabsButtonInteractive />;
  },
};
