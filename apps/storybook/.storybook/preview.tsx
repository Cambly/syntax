import React from "react";

export const decorators = [
  (Story) => (
    <div style={{ margin: "3em" }}>
      <Story />
    </div>
  ),
];
