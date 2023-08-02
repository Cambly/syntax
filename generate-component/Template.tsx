import React from "react";

export default function Template({
  // Props here! (Can delete if props not needed)
  text,
}: {
  // Add props types here!
  /**
   * Don't forget to add comments.
   */
  text: string;
}): JSX.Element {
  return (
    <div>
      {/**
       * Edit here: */}
      Hello 👋, I am a Template component.
      {text}
    </div>
  );
}
