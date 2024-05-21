# Syntax - Cambly's design system &middot; [![NPM Version](https://img.shields.io/npm/v/@cambly/syntax-core.svg)](https://www.npmjs.com/package/@cambly/syntax-core) [![License](https://img.shields.io/npm/l/@cambly/syntax-core?style=flat)](https://github.com/Cambly/syntax/blob/main/LICENSE)

## Setup

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
# Install node
nvm install
# Install dependencies
npm install -g pnpm@9.0.4
pnpm install
# Run the dev server
pnpm start
```

## Syntax-Icons: Generate new Icons:

1. Update `@syntax-icons/svgs` folder with new icons.
1. Run `pnpm run generate-icons`
1. If you added a new Icon

- Add it into the `Icons.stories.tsx` and update the array.
- Update the `syntax-icons/package.json` with the proper export.

1. Run `pnpm run changeset`

## Generate a new React Component

1. Run `pnpm generate ComponentName`
1. Update newly generated files.
1. (Don't forget to StartCase your ComponentName)

## Usage guidelines

https://docs.google.com/document/d/1zXAR4Lz0M_--SluTlEUpGUW16TpWWaZNh5h39cU3gQk/edit

## Contribute

1. [Fork the syntax repository](https://github.com/Cambly/syntax/fork)
1. Create a new branch:
1. Make your changes: `git commit -am "Avatar: add component"`
1. Add a [changeset](https://github.com/changesets/changesets#documentation) with `pnpm changeset`
1. Open a pull request

## Acknowledgements

- Originally forked from [vercel/turbo/examples/design-system](https://github.com/vercel/turbo/tree/main/examples/design-system)

```

```
