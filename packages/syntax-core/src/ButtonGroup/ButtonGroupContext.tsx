import { Size } from "../constants";
import React from "react";

interface ButtonGroupContextType {
  size?: (typeof Size)[number];
  disabled?: boolean;
  fullWidth?: boolean;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextType | null>(
  {},
);

ButtonGroupContext.displayName = "ButtonGroupContext";

export default ButtonGroupContext;
