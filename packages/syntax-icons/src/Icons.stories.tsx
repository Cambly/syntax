import { type StoryObj, type Meta } from "@storybook/react";
import Box from "../../syntax-core/src/Box/Box";

import Accent from "./Accent";
import Achievement from "./Achievement";
import AddNew from "./AddNew";
import AddUsers from "./AddUsers";
import Alert from "./Alert";
import Bell from "./Bell";
import Book from "./Book";
import Calendar from "./Calendar";
import CalendarBooking from "./CalendarBooking";
import CameraOff from "./CameraOff";
import CameraOn from "./CameraOn";
import Certificate from "./Certificate";
import ChevronDown from "./ChevronDown";
import ChevronLeft from "./ChevronLeft";
import ChevronRight from "./ChevronRight";
import ChevronUp from "./ChevronUp";
import CircleEnclosedCross from "./CircleEnclosedCross";
import CircleEnclosedStar from "./CircleEnclosedStar";
import CircleEnclosedTick from "./CircleEnclosedTick";
import Clock from "./Clock";
import Cross from "./Cross";
import Education from "./Education";
import Exit from "./Exit";
import Eye from "./Eye";
import FlagCheckered from "./FlagCheckered";
import FlagFilled from "./FlagFilled";
import FlagUnfilled from "./FlagUnfilled";
import Globe from "./Globe";
import Graphs from "./Graphs";
import Hand from "./Hand";
import HangUp from "./HangUp";
import HeartFilled from "./HeartFilled";
import HeartUnfilled from "./HeartUnfilled";
import Help from "./Help";
import Home from "./Home";
import IdentifyDocument from "./IdentifyDocument";
import Information from "./Information";
import Joystick from "./Joystick";
import Keyboard from "./Keyboard";
import Leaf from "./Leaf";
import Lightbulb from "./Lightbulb";
import List from "./List";
import Location from "./Location";
import Menu from "./Menu";
import Message from "./Message";
import MicrophoneOff from "./MicrophoneOff";
import MicrophoneOn from "./MicrophoneOn";
import More from "./More";
import MultiMediaDocument from "./MultiMediaDocument";
import MultipleUsers from "./MultipleUsers";
import NewStarter from "./NewStarter";
import Pause from "./Pause";
import Pencil from "./Pencil";
import PhoneOff from "./PhoneOff";
import PhoneOn from "./PhoneOn";
import Play from "./Play";
import Progress from "./Progress";
import Refresh from "./Refresh";
import Safety from "./Safety";
import Screen from "./Screen";
import Search from "./Search";
import SearchUsers from "./SearchUsers";
import Send from "./Send";
import Settings from "./Settings";
import Shop from "./Shop";
import Shuffle from "./Shuffle";
import SideArrow from "./SideArrow";
import SquareEnclosedPlus from "./SquareEnclosedPlus";
import StarFilled from "./StarFilled";
import StarHalfFilled from "./StarHalfFilled";
import Stars from "./Stars";
import StarUnfilled from "./StarUnfilled";
import Subtitles from "./Subtitles";
import Suitcase from "./Suitcase";
import SuperTutor from "./SuperTutor";
import Sync from "./Sync";
import TeachingCertificate from "./TeachingCertificate";
import TextDocument from "./TextDocument";
import ThumbsDown from "./ThumbsDown";
import ThumbsUp from "./ThumbsUp";
import Timer from "./Timer";
import ToggleSettings from "./ToggleSettings";
import Translate from "./Translate";
import TwoUsers from "./TwoUsers";
import Type from "./Type";
import User from "./User";
import Wifi from "./Wifi";
import WifiRouter from "./WifiRouter";

const icons = [
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

export default {
  title: "Icons/Icons",
  // component: ,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/p7LKna9JMU0JEkcKamzs53/%F0%9F%93%90-Syntax?node-id=1206-4420&t=yFh7Ijhf6PU7Lin3-0",
    },
  },
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg"],
      control: { type: "radio" },
    },
  },
  tags: ["autodocs"],
} as Meta;

export const Default: StoryObj = {
  args: {},
  render: () => {
    return (
      <Box display="flex" flexWrap="wrap" gap={4}>
        {icons.map((icon) => {
          const Icon = icon.component;
          return (
            <Box
              key={icon.name}
              display="flex"
              direction="column"
              gap={2}
              justifyContent="center"
              alignItems="center"
              maxWidth={100}
              width="100%"
              padding={2}
            >
              <Icon size="lg" />
              <span style={{ fontSize: "12px" }}>{icon.name}</span>
            </Box>
          );
        })}
      </Box>
    );
  },
};
