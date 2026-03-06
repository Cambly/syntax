import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  parseDate,
  getLocalTimeZone,
  today,
  isWeekend,
} from "@internationalized/date";
import { useLocale } from "react-aria";
import type { DateRange, DateValue } from "react-aria-components";
import Box from "../Box/Box";
import Typography from "../Typography/Typography";
import DateRangePicker from "./DateRangePicker";

export default {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    design: {
      name: "Figma",
      type: "figma",
      url: "https://www.figma.com/",
    },
  },
  tags: ["autodocs"],
  args: {
    label: "Date range",
    size: "md",
  },
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    isDisabled: { control: "boolean" },
    isRequired: { control: "boolean" },
    isReadOnly: { control: "boolean" },
    onChange: { action: "changed" },
    label: { control: "text" },
    description: { control: "text" },
    errorMessage: { control: "text" },
  },
} as Meta<typeof DateRangePicker>;

type Story = StoryObj<typeof DateRangePicker>;

function DateRangePickerWithState(
  args: Omit<React.ComponentProps<typeof DateRangePicker>, "onChange">,
) {
  const [value, setValue] = useState<DateRange | null>(null);
  return (
    <Box padding={2}>
      <DateRangePicker {...args} onChange={setValue} value={value} />
    </Box>
  );
}

export const Default: Story = {
  render: (args) => <DateRangePickerWithState {...args} />,
};

export const Controlled: Story = {
  render: function ControlledExample(args) {
    const [value, setValue] = useState<DateRange | null>({
      start: parseDate("2026-03-10"),
      end: parseDate("2026-03-20"),
    });

    const selectedText = value
      ? `Selected: ${value.start.toString()} – ${value.end.toString()}`
      : "No range selected";

    return (
      <Box padding={2} display="flex" direction="column" gap={4}>
        <DateRangePicker {...args} value={value} onChange={setValue} />
        <Typography size={100} color="gray700">
          {selectedText}
        </Typography>
      </Box>
    );
  },
};

export const WithHelperText: Story = {
  render: (args) => (
    <DateRangePickerWithState
      {...args}
      description="Select the start and end dates for your trip."
    />
  ),
};

export const WithErrorMessage: Story = {
  render: (args) => (
    <Box padding={2}>
      <DateRangePicker
        {...args}
        value={{ start: parseDate("2026-03-10"), end: parseDate("2026-03-05") }}
        errorMessage="End date must be after start date."
        onChange={() => undefined}
      />
    </Box>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Box padding={2}>
      <DateRangePicker
        {...args}
        isDisabled
        defaultValue={{
          start: parseDate("2026-03-10"),
          end: parseDate("2026-03-20"),
        }}
        onChange={() => undefined}
      />
    </Box>
  ),
};

export const ReadOnly: Story = {
  render: (args) => (
    <Box padding={2}>
      <DateRangePicker
        {...args}
        isReadOnly
        value={{
          start: parseDate("2026-03-10"),
          end: parseDate("2026-03-20"),
        }}
        onChange={() => undefined}
      />
    </Box>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Box padding={2} display="flex" direction="column" gap={4}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Box key={size} display="flex" direction="column" gap={1}>
          <Typography size={100} color="gray700">
            {size.toUpperCase()}
          </Typography>
          <DateRangePicker
            {...args}
            size={size}
            label={`Date range (${size})`}
            onChange={() => undefined}
          />
        </Box>
      ))}
    </Box>
  ),
};

export const WithMinMax: Story = {
  render: (args) => {
    const todayDate = today(getLocalTimeZone());
    const maxDate = todayDate.add({ months: 3 });
    return (
      <Box padding={2} display="flex" direction="column" gap={4}>
        <DateRangePicker
          {...args}
          label="Book a trip (next 3 months)"
          minValue={todayDate}
          maxValue={maxDate}
          description="Only dates within the next 3 months are available."
          onChange={() => undefined}
        />
      </Box>
    );
  },
};

export const WithUnavailableDates: Story = {
  render: function WithUnavailableDatesExample(args) {
    const { locale } = useLocale();
    const isUnavailable = (date: DateValue) => isWeekend(date, locale);
    return (
      <Box padding={2} display="flex" direction="column" gap={4}>
        <DateRangePicker
          {...args}
          label="Weekdays only"
          isDateUnavailable={isUnavailable}
          description="Weekends are unavailable."
          onChange={() => undefined}
        />
      </Box>
    );
  },
};
