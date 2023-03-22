import { SizeValue } from "../constants";
import React from "react";

interface ButtonGroupContextType {
  size?: SizeValue;
  disabled?: boolean;
  fullWidth?: boolean;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextType | null>(
  {},
);

ButtonGroupContext.displayName = "ButtonGroupContext";

export default ButtonGroupContext;
