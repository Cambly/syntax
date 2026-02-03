# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Syntax is Cambly's design system, built as a monorepo using pnpm workspaces and Turborepo. It provides React components, design tokens, icons, and utilities for building Cambly applications.

## Environment Setup

This project requires specific Node.js and package manager versions:

- Use nvm to install the Node.js version specified in `.nvmrc`
- Must use pnpm 9.4.0 (`npm install -g pnpm@9.4.0`)
- Run `pnpm install` to install dependencies

## Common Commands

### Development

- `pnpm start` or `pnpm dev` - Start Storybook dev server on port 6006
- `pnpm build` - Build all packages using Turborepo
- `pnpm test` - Run tests across all packages
- `pnpm test:watch` - Run tests in watch mode

### Code Quality

- `pnpm lint` - Run ESLint across all packages
- `pnpm stylelint` - Run Stylelint on CSS files
- `pnpm format` - Format all TypeScript, TSX, and Markdown files with Prettier
- `pnpm check-exports` - Verify package exports using @arethetypeswrong/cli

### Versioning & Publishing

- `pnpm changeset` - Create a changeset for versioning (required for all PRs that change packages)
- `pnpm version-packages` - Bump versions based on changesets
- `pnpm release` - Build and publish packages to npm

### Component Generation

- `pnpm generate ComponentName` - Scaffold a new component (use StartCase naming)

### Icon Generation

1. Add SVG files to `packages/syntax-icons/svgs/`
2. Run `pnpm run generate-icons`
3. Update `Icons.stories.tsx` array
4. Update `syntax-icons/package.json` exports
5. Run `pnpm changeset`

## Architecture

### Monorepo Structure

The repository is organized as a pnpm workspace with Turborepo for build orchestration:

**Packages** (`packages/`):

- `syntax-core` - Main component library with React components
- `syntax-floating-components` - Floating UI components (tooltips, popovers) using @floating-ui/react
- `syntax-icons` - Icon library with SVG-based React components
- `syntax-design-tokens` - Design tokens (colors, spacing, etc.) generated via style-dictionary
- `syntax-utils` - Shared utility functions
- `syntax-codemods` - JSCodeshift codemods for automated migrations
- `eslint-config-syntax` - Shared ESLint configuration
- `syntax-tsconfig` - Shared TypeScript configurations

**Apps** (`apps/`):

- `storybook` - Storybook documentation and development environment

### Build System

- **Turborepo**: Orchestrates builds with dependency-aware task scheduling
- **tsup**: Bundles TypeScript packages with esbuild
  - ESM-only output format
  - Custom CSS Modules plugin (esbuild doesn't natively support them)
  - Generates `.d.ts` files and sourcemaps
  - Uses code splitting with `__chunks/[hash]` naming
  - Adds `"use client"` banner for React Server Components compatibility
- **Vite**: Used for Storybook and testing
- **Vitest**: Test runner with jsdom environment

### Component Structure

Each component in `syntax-core` follows a consistent pattern:

```
ComponentName/
├── ComponentName.tsx          # Main component implementation
├── ComponentName.module.css   # CSS Modules styles
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Component tests
└── constants/                 # Component-specific constants
```

Components use:

- React 18 with forwardRef pattern
- CSS Modules for styling (processed by custom tsup plugin)
- TypeScript with strict typing
- React Aria for accessibility primitives (via `react-aria` and `react-aria-components`)

### Design Tokens

`syntax-design-tokens` uses style-dictionary to transform JSON token definitions into consumable formats (CSS, JS). The tokens are defined in `tokens/**/*.json` and built into `dist/` during the build process.

### Testing

- Tests use Vitest with jsdom environment
- Setup in root `test/setup.ts` imports `@testing-library/jest-dom`
- Use `@testing-library/react` and `@testing-library/user-event` for component testing
- Each package has its own test script

### CSS Handling

- CSS Modules are used throughout for scoped styling
- Custom tsup plugin processes `.module.css` files through postcss with postcss-modules
- Shared utility classes in `syntax-core/src/` (e.g., `layout.module.css`, `border.module.css`)
- Color system organized in `syntax-core/src/colors/`

### Package Exports

All packages are published to npm under the `@cambly` scope:

- Main entry points use ESM format
- Type definitions included via `types` field
- `sideEffects: false` for optimal tree-shaking
- Packages use workspace protocol for internal dependencies

## Development Workflow

1. Make changes to code
2. Add tests if creating new functionality
3. Run `pnpm changeset` to document changes (follow semantic versioning)
4. Create a PR - changesets will be validated
5. After merge, Version Packages PR is automatically created
6. Merging Version Packages PR triggers publish to npm

## Important Notes

- Never commit to `main` without a changeset for package changes
- Component names must be in StartCase (e.g., `TextField`, not `textField`)
- All new components need: component file, styles, tests, and Storybook story
- Storybook runs with `NODE_OPTIONS=--openssl-legacy-provider` flag
- Core components depend on `syntax-design-tokens` but it's bundled (not external)
- The `test` directory at root contains shared test setup
