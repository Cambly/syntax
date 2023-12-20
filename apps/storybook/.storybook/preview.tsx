import React from "react";
import "@cambly/syntax-design-tokens/dist/css/variables.css";
import { initializeRTL } from "storybook-addon-rtl";

initializeRTL();

export const decorators = [(Story) => <Story />];
