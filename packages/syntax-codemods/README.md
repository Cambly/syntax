# Syntax Codemods

Codemods (short for "code modifications") are tools that assist in large-scale, partially automated codebase refactors. They are especially useful for migrating codebases between different versions of a library, or migrating codebases to a different library entirely.

## Example

Let's say you want to convert all instances of the `color` prop on `<Box />` to `backgroundColor`:

You could write a codemod that does the following:

1.  Find all instances of `<Box color="red" />`
2.  Replace them with `<Box backgroundColor="red" />`

Before

```jsx
import { Box } from "@cambly/syntax-ui";

<Box color="red" />;
```

After

```jsx
import { Box } from "@cambly/syntax-ui";

<Box backgroundColor="red" />;
```

## Usage

### Installation

```sh
npm install --save-dev @cambly/syntax-codemods
```

### Running a codemod

```sh
npx @cambly/syntax-codemods -c={codemod id} -p=relative/path/to/code/to/modify
```
