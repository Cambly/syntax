export const component = (name) => `
import Box from "../Box/Box";

export type ${name}Type = {
  // Add props types here!
  /**
   * Don't forget to add comments.
   */
}

const ${name} = ({
  // Props here! (Can delete if props not needed)
}: ${name}Type): JSX.Element => {
  return (
    <Box>
      {/**
        * Edit here: */}
      Hello 👋, I am a ${name} component.
    </Box>
  );
};

export default ${name};
`;

// component.stories.jsx
export const story = (name) => `
import { type StoryObj, type Meta } from "@storybook/react";
import ${name} from './${name}';

export default {
  title: 'Components/${name}',
  component: ${name},
  parameters: {
    design: {
      type: "figma",
      url: "UPDATE_FIGMA_LINK_HERE"
    }
  },
  argTypes: {
    // argTypes here (can delete if none)
  },
  tags: ["autodocs"],
} as Meta<typeof ${name}>;

export const Default: StoryObj<typeof ${name}> = {
  args: {},
  render: ({ ...args }) => <${name} {...args}/>
};
`;

// component.test.tsx
export const test = (name) => `
import { screen, render } from '@testing-library/react';
import ${name} from './${name}';

describe('${name.toLowerCase()}', () => {
  it('it should render successfully', () => {
    // Update tests here:
    // Don't forget to add your props!
    render(<${name} />);
    expect(screen).toBeTruthy()
  });
});
`;
