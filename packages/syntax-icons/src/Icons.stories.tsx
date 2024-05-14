import { type StoryObj, type Meta } from "@storybook/react";
import Box from "../../syntax-core/src/Box/Box";
import Typography from "../../syntax-core/src/Typography/Typography";
import TapArea from "../../syntax-core/src/TapArea/TapArea";
import Icon from "../../syntax-core/src/Icon/Icon";

import Accent from "./icons/Accent";
import Achievement from "./icons/Achievement";
import AddNew from "./icons/AddNew";
import AddUsers from "./icons/AddUsers";
import Alert from "./icons/Alert";
import Bell from "./icons/Bell";
import Book from "./icons/Book";
import Calendar from "./icons/Calendar";
import CalendarBooking from "./icons/CalendarBooking";
import CameraOff from "./icons/CameraOff";
import CameraOn from "./icons/CameraOn";
import Certificate from "./icons/Certificate";
import ChevronDown from "./icons/ChevronDown";
import ChevronLeft from "./icons/ChevronLeft";
import ChevronRight from "./icons/ChevronRight";
import ChevronUp from "./icons/ChevronUp";
import CircleEnclosedCross from "./icons/CircleEnclosedCross";
import CircleEnclosedStar from "./icons/CircleEnclosedStar";
import CircleEnclosedTick from "./icons/CircleEnclosedTick";
import Clock from "./icons/Clock";
import Cross from "./icons/Cross";
import Education from "./icons/Education";
import Exit from "./icons/Exit";
import Eye from "./icons/Eye";
import FlagCheckered from "./icons/FlagCheckered";
import FlagFilled from "./icons/FlagFilled";
import FlagUnfilled from "./icons/FlagUnfilled";
import Globe from "./icons/Globe";
import Graphs from "./icons/Graphs";
import Hand from "./icons/Hand";
import HangUp from "./icons/HangUp";
import HeartFilled from "./icons/HeartFilled";
import HeartUnfilled from "./icons/HeartUnfilled";
import Help from "./icons/Help";
import Home from "./icons/Home";
import IdentifyDocument from "./icons/IdentityDocument";
import Information from "./icons/Information";
import Joystick from "./icons/Joystick";
import Keyboard from "./icons/Keyboard";
import Leaf from "./icons/Leaf";
import Lightbulb from "./icons/Lightbulb";
import List from "./icons/List";
import Location from "./icons/Location";
import Menu from "./icons/Menu";
import Message from "./icons/Message";
import MicrophoneOff from "./icons/MicrophoneOff";
import MicrophoneOn from "./icons/MicrophoneOn";
import More from "./icons/More";
import MultiMediaDocument from "./icons/MultiMediaDocument";
import MultipleUsers from "./icons/MultipleUsers";
import NewStarter from "./icons/NewStarter";
import Pause from "./icons/Pause";
import Pencil from "./icons/Pencil";
import PhoneOff from "./icons/PhoneOff";
import PhoneOn from "./icons/PhoneOn";
import Play from "./icons/Play";
import Progress from "./icons/Progress";
import Refresh from "./icons/Refresh";
import Safety from "./icons/Safety";
import Screen from "./icons/Screen";
import Search from "./icons/Search";
import SearchUsers from "./icons/SearchUsers";
import Send from "./icons/Send";
import Settings from "./icons/Settings";
import Shop from "./icons/Shop";
import Shuffle from "./icons/Shuffle";
import SideArrow from "./icons/SideArrow";
import SquareEnclosedPlus from "./icons/SquareEnclosedPlus";
import StarFilled from "./icons/StarFilled";
import StarHalfFilled from "./icons/StarHalfFilled";
import Stars from "./icons/Stars";
import StarUnfilled from "./icons/StarUnfilled";
import Subtitles from "./icons/Subtitles";
import Suitcase from "./icons/Suitcase";
import SuperTutor from "./icons/SuperTutor";
import Sync from "./icons/Sync";
import TeachingCertificate from "./icons/TeachingCertificate";
import TextDocument from "./icons/TextDocument";
import ThumbsDown from "./icons/ThumbsDown";
import ThumbsUp from "./icons/ThumbsUp";
import Timer from "./icons/Timer";
import ToggleSettings from "./icons/ToggleSettings";
import Translate from "./icons/Translate";
import TwoUsers from "./icons/TwoUsers";
import Type from "./icons/Type";
import User from "./icons/User";
import Wifi from "./icons/Wifi";
import WifiRouter from "./icons/WifiRouter";

const cambioIcons = [
  { name: "Accent", component: Accent },
  { name: "Achievement", component: Achievement },
  { name: "AddNew", component: AddNew },
  { name: "AddUsers", component: AddUsers },
  { name: "Alert", component: Alert },
  { name: "Bell", component: Bell },
  { name: "Book", component: Book },
  { name: "Calendar", component: Calendar },
  { name: "CalendarBooking", component: CalendarBooking },
  { name: "CameraOff", component: CameraOff },
  { name: "CameraOn", component: CameraOn },
  { name: "Certificate", component: Certificate },
  { name: "ChevronDown", component: ChevronDown },
  { name: "ChevronLeft", component: ChevronLeft },
  { name: "ChevronRight", component: ChevronRight },
  { name: "ChevronUp", component: ChevronUp },
  { name: "CircleEnclosedCross", component: CircleEnclosedCross },
  { name: "CircleEnclosedStar", component: CircleEnclosedStar },
  { name: "CircleEnclosedTick", component: CircleEnclosedTick },
  { name: "Clock", component: Clock },
  { name: "Cross", component: Cross },
  { name: "Education", component: Education },
  { name: "Exit", component: Exit },
  { name: "Eye", component: Eye },
  { name: "FlagCheckered", component: FlagCheckered },
  { name: "FlagFilled", component: FlagFilled },
  { name: "FlagUnfilled", component: FlagUnfilled },
  { name: "Globe", component: Globe },
  { name: "Graphs", component: Graphs },
  { name: "Hand", component: Hand },
  { name: "HangUp", component: HangUp },
  { name: "HeartFilled", component: HeartFilled },
  { name: "HeartUnfilled", component: HeartUnfilled },
  { name: "Help", component: Help },
  { name: "Home", component: Home },
  { name: "IdentifyDocument", component: IdentifyDocument },
  { name: "Information", component: Information },
  { name: "Joystick", component: Joystick },
  { name: "Keyboard", component: Keyboard },
  { name: "Leaf", component: Leaf },
  { name: "Lightbulb", component: Lightbulb },
  { name: "List", component: List },
  { name: "Location", component: Location },
  { name: "Menu", component: Menu },
  { name: "Message", component: Message },
  { name: "MicrophoneOff", component: MicrophoneOff },
  { name: "MicrophoneOn", component: MicrophoneOn },
  { name: "More", component: More },
  { name: "MultiMediaDocument", component: MultiMediaDocument },
  { name: "MultipleUsers", component: MultipleUsers },
  { name: "NewStarter", component: NewStarter },
  { name: "Pause", component: Pause },
  { name: "Pencil", component: Pencil },
  { name: "PhoneOff", component: PhoneOff },
  { name: "PhoneOn", component: PhoneOn },
  { name: "Play", component: Play },
  { name: "Progress", component: Progress },
  { name: "Refresh", component: Refresh },
  { name: "Safety", component: Safety },
  { name: "Screen", component: Screen },
  { name: "Search", component: Search },
  { name: "SearchUsers", component: SearchUsers },
  { name: "Send", component: Send },
  { name: "Settings", component: Settings },
  { name: "Shop", component: Shop },
  { name: "Shuffle", component: Shuffle },
  { name: "SideArrow", component: SideArrow },
  { name: "SquareEnclosedPlus", component: SquareEnclosedPlus },
  { name: "StarFilled", component: StarFilled },
  { name: "StarHalfFilled", component: StarHalfFilled },
  { name: "Stars", component: Stars },
  { name: "StarUnfilled", component: StarUnfilled },
  { name: "Subtitles", component: Subtitles },
  { name: "Suitcase", component: Suitcase },
  { name: "SuperTutor", component: SuperTutor },
  { name: "Sync", component: Sync },
  { name: "TeachingCertificate", component: TeachingCertificate },
  { name: "TextDocument", component: TextDocument },
  { name: "ThumbsDown", component: ThumbsDown },
  { name: "ThumbsUp", component: ThumbsUp },
  { name: "Timer", component: Timer },
  { name: "ToggleSettings", component: ToggleSettings },
  { name: "Translate", component: Translate },
  { name: "TwoUsers", component: TwoUsers },
  { name: "Type", component: Type },
  { name: "User", component: User },
  { name: "Wifi", component: Wifi },
  { name: "WifiRouter", component: WifiRouter },
];

const copyTextToClipboard = async (iconName: string) => {
  const importString = `import ${iconName} from "@cambly/syntax-icons/${iconName}";`;
  await window.navigator.clipboard.writeText(importString);
};

export default {
  title: "Icons",
  component: Icon,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/G3UM2urgAYO2iiNU7nlulI/%F0%9F%9F%A1-Cambio-Syntax?type=design&node-id=3773-8017&mode=design&t=Xxc7MvYNNbA7RoPM-0",
    },
  },
  args: {
    size: "md",
    color: "primary",
  },
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg"],
      control: { type: "radio" },
    },
    color: {
      options: [
        "black",
        "gray700",
        "gray900",
        "primary",
        "destructive-primary",
        "destructive-darkBackground",
        "success",
        "success-darkBackground",
        "white",
        "inherit",
      ],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Icon>;

const getBackgroundColor = (
  color:
    | "black"
    | "gray900"
    | "gray700"
    | "primary"
    | "destructive-primary"
    | "destructive-darkBackground"
    | "success"
    | "success-darkBackground"
    | "white"
    | "inherit"
    | undefined,
) => {
  const listOfLightFontColors = [
    "white",
    "destructive-darkBackground",
    "success-darkBackground",
  ];

  if (!color) return "white";

  if (listOfLightFontColors.includes(color)) {
    return "black";
  }

  return "white";
};

export const Default: StoryObj<typeof Icon> = {
  args: {
    size: "md",
    color: "primary",
  },
  render: ({ size, color }) => {
    return (
      <Box display="flex" flexWrap="wrap" gap={4}>
        {cambioIcons.map((icon) => {
          const IndIcon = icon.component;
          return (
            <Box
              key={icon.name}
              display="flex"
              maxWidth={150}
              width="100%"
              backgroundColor={getBackgroundColor(color)}
            >
              <TapArea
                onClick={() => {
                  void (async () => {
                    await copyTextToClipboard(icon.name);
                  })();
                }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                  padding={2}
                  gap={2}
                >
                  <IndIcon size={size} color={color} />
                  <Typography color={color} size={100}>
                    {icon.name}
                  </Typography>
                </Box>
              </TapArea>
            </Box>
          );
        })}
      </Box>
    );
  },
};
