# Syntax Design System Guide

Use this skill when working with Cambly's Syntax design system components in React applications.

## Installation

```bash
npm install @cambly/syntax-core @cambly/syntax-design-tokens @cambly/syntax-icons @cambly/syntax-floating-components
```

## Available Components

### Core Components (`@cambly/syntax-core`)

**Layout & Containers:**
- `Box` - Fundamental layout primitive with flexbox, spacing, and styling props
- `Card` - Content container with elevation and padding variants

**Buttons & Actions:**
- `Button` - Primary action button with multiple color variants
- `IconButton` - Icon-only button for compact actions
- `LinkButton` - Button styled as a link
- `IconLinkButton` - Icon-only link button
- `TapArea` - Clickable area without button semantics
- `LinkTapArea` - Clickable area as link
- `ButtonGroup` - Groups related buttons

**Typography:**
- `Typography` - Flexible text component with size/weight/color variants
- `Heading` - Semantic heading component (h1-h6)

**Form Inputs:**
- `TextField` - Single-line text input
- `TextArea` - Multi-line text input
- `Checkbox` - Checkbox input with label
- `RadioButton` - Radio button input with label
- `SelectList` - Native select dropdown
- `RichSelectList` - Enhanced select with custom styling

**Feedback & Overlays:**
- `Modal` - Dialog overlay for focused interactions
- `Popover` - Contextual overlay anchored to trigger element
- `Toast` - Temporary notification message
- `Tooltip` - Informational overlay on hover
- `Dialog` - Accessible dialog component

**Indicators:**
- `Badge` - Small status or count indicator
- `Icon` - Icon component (use with @cambly/syntax-icons)
- `Avatar` - User profile image component
- `AvatarGroup` - Stacked avatar display
- `Chip` - Compact, interactive element for filters/tags
- `Divider` - Visual separator

**Navigation:**
- `Tabs` - Tab navigation container
- `TabButton` - Individual tab button
- `TabLink` - Individual tab link

**Special:**
- `ThemeProvider` - Theme context provider
- `WordConfetti` - Celebratory animation effect

### Floating Components (`@cambly/syntax-floating-components`)
Provides enhanced positioning for tooltips and popovers using Floating UI.

### Icons (`@cambly/syntax-icons`)
SVG-based icon components. Import specific icons:
```typescript
import { IconName } from "@cambly/syntax-icons";
```

## Common Patterns

### Box Component - The Foundation

Box is the most versatile component for layout. Use it instead of divs for consistent spacing and responsive design.

**Layout with Flexbox:**
```typescript
<Box
  display="flex"
  direction="column"
  gap={4}
  justifyContent="center"
  alignItems="start"
>
  {children}
</Box>
```

**Responsive Layout:**
```typescript
<Box
  direction="column"           // Mobile: stack vertically
  smDirection="row"            // Tablet (480px+): horizontal
  lgDirection="row"            // Desktop (960px+): horizontal
  padding={2}
  smPadding={4}
  lgPadding={6}
>
  {children}
</Box>
```

**Spacing System (0-12 scale):**
```typescript
<Box
  margin={4}                   // All sides
  marginTop={2}                // Individual sides
  marginStart={3}              // Start (left in LTR, right in RTL)
  padding={4}
  paddingX={6}                 // Horizontal padding
  paddingY={2}                 // Vertical padding
>
```

**Semantic HTML:**
```typescript
<Box as="section" role="main">  // Renders as <section>
<Box as="nav">                   // Renders as <nav>
```

### Size Variants

Components use consistent size props:

**Button/IconButton/Chip:** `"sm" | "md" | "lg"` (32px, 48px, 64px heights)
```typescript
<Button text="Click me" size="md" />
```

**Typography/Heading:** `0 | 100 | 200 | 300 | 400 | 500 | 700 | 800 | 900 | 1100`
```typescript
<Typography size={400}>Body text</Typography>
<Heading size={600}>Page title</Heading>
```

**Icon:** `100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000`
```typescript
<Icon path={iconPath} size={400} />
```

### Color Variants

**Button Colors:**
- `primary` - Main call-to-action (blue)
- `secondary` - Secondary actions (gray)
- `tertiary` - Tertiary actions (minimal)
- `destructive-primary/secondary/tertiary` - Dangerous actions (red)
- `success-primary/secondary/tertiary` - Positive actions (green)
- `branded` - Brand-specific color

```typescript
<Button text="Delete" color="destructive-primary" />
<Button text="Cancel" color="secondary" />
```

**Background Context:**
Many components accept `on` prop to adjust for light/dark backgrounds:
```typescript
<Button text="Click" on="darkBackground" />
<TextField label="Name" on="lightBackground" />
```

**Universal Colors:**
Box, Icon, Typography support 55+ colors:
- Primary palette: `primary`, `primary100`-`primary900`
- Semantic: `success100`-`success900`, `destructive100`-`destructive900`
- Neutrals: `gray10`-`gray900`, `white`, `black`
- Brand: `sky`, `navy`, `teal`, `lilac`, `pink`, `cream`, etc.

```typescript
<Box backgroundColor="gray10" />
<Typography color="primary700">Text</Typography>
<Icon color="success500" size={300} />
```

### Form Patterns

**TextField with validation:**
```typescript
<TextField
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!!emailError}
  errorText={emailError}
  helperText="We'll never share your email"
  disabled={isSubmitting}
  data-testid="email-input"
/>
```

**Checkbox with state:**
```typescript
<Checkbox
  label="I agree to terms"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  error={submitted && !agreed}
  size="md"
/>
```

**RadioButton group:**
```typescript
{options.map(option => (
  <RadioButton
    key={option.value}
    label={option.label}
    checked={selected === option.value}
    onChange={() => setSelected(option.value)}
    name="options"
  />
))}
```

### Button Patterns

**Button with icons:**
```typescript
import { ChevronRightIcon } from "@cambly/syntax-icons";

<Button
  text="Continue"
  endIcon={ChevronRightIcon}
  color="primary"
  size="lg"
/>
```

**Loading state:**
```typescript
<Button
  text="Save"
  loading={isSubmitting}
  loadingText="Saving..."
  disabled={!isDirty}
/>
```

**IconButton (icon-only):**
```typescript
import { CloseIcon } from "@cambly/syntax-icons";

<IconButton
  icon={CloseIcon}
  accessibilityLabel="Close dialog"  // Required!
  color="secondary"
  size="sm"
  onClick={handleClose}
/>
```

### Typography Patterns

```typescript
// Headings
<Heading as="h1" size={800}>Page Title</Heading>
<Heading as="h2" size={600}>Section Heading</Heading>

// Body text
<Typography size={400}>Regular paragraph text</Typography>
<Typography size={300} color="gray700">Secondary text</Typography>

// Text styling
<Typography
  weight="semiBold"
  transform="uppercase"
  align="center"
  lineClamp={2}  // Truncate after 2 lines
>
  Content
</Typography>
```

### Modal & Dialog Patterns

```typescript
<Modal
  isOpen={isOpen}
  onDismiss={handleClose}
  title="Confirm Action"
  size="md"
>
  <Box padding={6}>
    <Typography>Are you sure?</Typography>
    <Box display="flex" gap={2} marginTop={4}>
      <Button text="Cancel" color="secondary" onClick={handleClose} />
      <Button text="Confirm" color="primary" onClick={handleConfirm} />
    </Box>
  </Box>
</Modal>
```

### Tooltip Pattern

```typescript
<Tooltip text="Additional information">
  <IconButton icon={InfoIcon} accessibilityLabel="Info" />
</Tooltip>
```

### Card Pattern

```typescript
<Card size="medium" backgroundColor="white">
  <Box padding={4}>
    <Heading size={500}>Card Title</Heading>
    <Typography size={300} color="gray700">
      Card content goes here
    </Typography>
  </Box>
</Card>
```

## Accessibility Best Practices

### Required Accessibility Props

**Always provide labels for form inputs:**
```typescript
<TextField label="Email" />  // Good
<Checkbox label="I agree" /> // Good
```

**Always provide accessibilityLabel for icon-only buttons:**
```typescript
<IconButton
  icon={TrashIcon}
  accessibilityLabel="Delete item"  // Required for screen readers
/>
```

**Use semantic HTML:**
```typescript
<Box as="nav">        // Use semantic elements
<Box as="main">
<Heading as="h1">     // Proper heading hierarchy
```

### Focus Management

- Components automatically handle keyboard focus visibility
- Focus outlines only appear on keyboard navigation (not mouse clicks)
- All interactive elements are keyboard accessible

### Form Accessibility

```typescript
// Associate helper text with input
<Box>
  <TextField
    label="Password"
    aria-describedby="password-help"
  />
  <Typography id="password-help" size={200}>
    Must be at least 8 characters
  </Typography>
</Box>
```

## Common Pitfalls & Solutions

### ❌ Don't use plain divs for layout
```typescript
// Bad
<div style={{ display: 'flex', gap: '16px' }}>
```

### ✅ Use Box component
```typescript
// Good
<Box display="flex" gap={4}>
```

### ❌ Don't forget accessibilityLabel on IconButton
```typescript
// Bad - inaccessible to screen readers
<IconButton icon={CloseIcon} />
```

### ✅ Always include accessibilityLabel
```typescript
// Good
<IconButton icon={CloseIcon} accessibilityLabel="Close" />
```

### ❌ Don't hardcode pixel values
```typescript
// Bad
<Box style={{ marginTop: '24px' }}>
```

### ✅ Use spacing scale
```typescript
// Good - uses design system spacing (0-12 scale)
<Box marginTop={6}>  // 6 = 24px in the system
```

### ❌ Don't import wrong icon package
```typescript
// Bad - wrong import path
import CloseIcon from "@cambly/syntax-icons/CloseIcon";
```

### ✅ Named imports from package root
```typescript
// Good
import { CloseIcon } from "@cambly/syntax-icons";
```

### ❌ Don't forget background context
```typescript
// Bad - button on dark background using default light background styling
<Box backgroundColor="navy">
  <Button text="Click me" />
</Box>
```

### ✅ Use 'on' prop for proper contrast
```typescript
// Good
<Box backgroundColor="navy">
  <Button text="Click me" on="darkBackground" />
</Box>
```

## Import Patterns

```typescript
// Core components
import {
  Box,
  Button,
  Typography,
  TextField
} from "@cambly/syntax-core";

// Icons (named imports)
import {
  ChevronRightIcon,
  CloseIcon,
  CheckIcon
} from "@cambly/syntax-icons";

// Floating components
import {
  FloatingTooltip
} from "@cambly/syntax-floating-components";

// Design tokens (if needed directly)
import { tokens } from "@cambly/syntax-design-tokens";
```

## Responsive Design

Use Box component's responsive props for mobile-first design:

```typescript
<Box
  // Mobile (default)
  direction="column"
  padding={2}
  gap={2}

  // Tablet (480px+)
  smDirection="row"
  smPadding={4}
  smGap={3}

  // Desktop (960px+)
  lgDirection="row"
  lgPadding={6}
  lgGap={4}
>
  {children}
</Box>
```

## Testing

Always add data-testid for testing:

```typescript
<Button
  text="Submit"
  data-testid="submit-button"
  onClick={handleSubmit}
/>

<TextField
  label="Email"
  data-testid="email-input"
  value={email}
/>
```

## Theme Provider

Wrap your app root with ThemeProvider:

```typescript
import { ThemeProvider } from "@cambly/syntax-core";

function App() {
  return (
    <ThemeProvider>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## When to Use Which Component

**Need a layout container?** → `Box`
**Need a button?** → `Button` (with text) or `IconButton` (icon only)
**Need text?** → `Typography` (body text) or `Heading` (headings)
**Need form input?** → `TextField` (single line) or `TextArea` (multi-line)
**Need selection?** → `Checkbox`, `RadioButton`, or `SelectList`
**Need overlay?** → `Modal` (blocking), `Popover` (contextual), or `Tooltip` (info)
**Need feedback?** → `Toast` (notifications) or `Badge` (status indicators)
**Need navigation?** → `Tabs` with `TabButton`/`TabLink`

## Additional Resources

- Storybook documentation: Run `pnpm start` in the syntax repo
- Component props documentation available in each component's TypeScript types
- All components support TypeScript with full type definitions
