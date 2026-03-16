import React, { type ReactElement } from "react";
import { I18nProvider } from "react-aria";
import classNames from "classnames";
import {
  DateRangePicker as ReactAriaDateRangePicker,
  Label,
  Group,
  DateInput,
  DateSegment,
  Button,
  FieldError,
  Text,
  Popover,
  RangeCalendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarGridBody,
  CalendarCell,
  Heading,
  type DateValue,
  type DateRange,
} from "react-aria-components";
import type { DateSegment as DateSegmentData } from "react-stately";
import ChevronLeft from "../../../syntax-icons/src/icons/ChevronLeft";
import ChevronRight from "../../../syntax-icons/src/icons/ChevronRight";
import styles from "./DateRangePicker.module.css";

export type DateRangePickerProps = {
  /** Field label */
  label: string;
  /** Controlled value */
  value?: DateRange | null;
  /** Uncontrolled default value */
  defaultValue?: DateRange | null;
  /** Called when the selected range changes */
  onChange?: (value: DateRange | null) => void;
  /**
   * Size of the input field
   * @defaultValue "md"
   */
  size?: "sm" | "md" | "lg";
  /** Makes the date field required */
  isRequired?: boolean;
  /** Disables the picker */
  isDisabled?: boolean;
  /** Makes the picker read-only */
  isReadOnly?: boolean;
  /** Error message displayed below the field; also triggers invalid styling */
  errorMessage?: string;
  /** Helper text displayed below the field */
  description?: string;
  /** Earliest selectable date */
  minValue?: DateValue;
  /** Latest selectable date */
  maxValue?: DateValue;
  /** Callback to mark specific dates as unavailable */
  isDateUnavailable?: (date: DateValue) => boolean;
  /** HTML name attribute for the start date (form submission) */
  startName?: string;
  /** HTML name attribute for the end date (form submission) */
  endName?: string;
  /**
   * Whether the range can include unavailable dates.
   * When true, the selected range may span across unavailable dates.
   * @defaultValue false
   */
  allowsNonContiguousRanges?: boolean;
  /**
   * BCP 47 locale string for date formatting and calendar localization.
   * @defaultValue "en-US"
   */
  locale?: string;
  /** Test ID applied to the input group element */
  "data-testid"?: string;
};

const NEXT_MONTH = { months: 1 };

// 2026/1/1 -> 2026/01/01
// to avoid layout shift, we pad the segment with a leading zero if it is a single digit
function padSegment(segment: DateSegmentData): DateSegmentData {
  if (
    (segment.type === "month" || segment.type === "day") &&
    !segment.isPlaceholder &&
    segment.text.length === 1
  ) {
    return { ...segment, text: segment.text.padStart(2, "0") };
  }
  return segment;
}

/**
 * [DateRangePicker](https://cambly-syntax.vercel.app/?path=/docs/components-daterangepicker--docs) allows users to select a date range via a text input with segment-based editing and a calendar popover.
 *
 * Example Usage:
 * ```
 * <DateRangePicker
 *   label="Trip dates"
 *   onChange={(range) => console.log(range)}
 * />
 * ```
 */
export default function DateRangePicker({
  label,
  value,
  defaultValue,
  onChange,
  size = "md",
  isRequired,
  isDisabled,
  isReadOnly,
  errorMessage,
  description,
  minValue,
  maxValue,
  isDateUnavailable,
  startName,
  endName,
  allowsNonContiguousRanges,
  locale = "en-US",
  "data-testid": dataTestId,
}: DateRangePickerProps): ReactElement {
  return (
    <I18nProvider locale={locale}>
      <ReactAriaDateRangePicker
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        isRequired={isRequired}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isInvalid={!!errorMessage}
        minValue={minValue}
        maxValue={maxValue}
        isDateUnavailable={isDateUnavailable}
        startName={startName}
        endName={endName}
        shouldCloseOnSelect
        className={styles.root}
      >
        <Label className={styles.label}>{label}</Label>
        <Group
          data-testid={dataTestId}
          className={classNames(styles.group, styles[size])}
        >
          <DateInput slot="start" className={styles.dateInput}>
            {(segment: DateSegmentData) => (
              <DateSegment
                segment={padSegment(segment)}
                className={styles.segment}
              />
            )}
          </DateInput>
          <span className={styles.separator} aria-hidden="true">
            –
          </span>
          <DateInput slot="end" className={styles.dateInput}>
            {(segment: DateSegmentData) => (
              <DateSegment
                segment={padSegment(segment)}
                className={styles.segment}
              />
            )}
          </DateInput>
          <Button className={styles.calendarButton}>
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              width={20}
              height={20}
            >
              <path d="M2.5 2v20h19V2zm2.111 17.895V5.158H19.39v14.737H4.61Zm4.222-6.316h-2.11v-2.105h2.11zm4.223 0h-2.112v-2.105h2.111zm4.222 0h-2.111v-2.105h2.11zm-4.222 4.21h-2.112v-2.105h2.112zm-4.223 0h-2.11v-2.105h2.11zm4.223-8.42h-2.112V7.262h2.112v2.105Zm4.222 0h-2.111V7.262h2.11v2.105Z" />
            </svg>
          </Button>
        </Group>
        {description && (
          <Text slot="description" className={styles.description}>
            {description}
          </Text>
        )}
        {errorMessage && (
          <FieldError className={styles.errorMessage}>
            {errorMessage}
          </FieldError>
        )}
        <Popover className={styles.popover}>
          <RangeCalendar
            visibleDuration={{ months: 2 }}
            allowsNonContiguousRanges={allowsNonContiguousRanges}
            className={styles.calendar}
          >
            <header className={styles.calendarHeader}>
              <Button slot="previous" className={styles.navButton}>
                <ChevronLeft size={100} color="gray700" />
              </Button>
              <Heading className={styles.calendarHeading} />
              <Button slot="next" className={styles.navButton}>
                <ChevronRight size={100} color="gray700" />
              </Button>
            </header>
            <div className={styles.calendarGrids}>
              <CalendarGrid className={styles.calendarGrid}>
                <CalendarGridHeader>
                  {(day) => (
                    <th className={styles.dayHeader} scope="col">
                      {day}
                    </th>
                  )}
                </CalendarGridHeader>
                <CalendarGridBody>
                  {(date) => (
                    <CalendarCell date={date} className={styles.cell} />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
              <CalendarGrid offset={NEXT_MONTH} className={styles.calendarGrid}>
                <CalendarGridHeader>
                  {(day) => (
                    <th className={styles.dayHeader} scope="col">
                      {day}
                    </th>
                  )}
                </CalendarGridHeader>
                <CalendarGridBody>
                  {(date) => (
                    <CalendarCell date={date} className={styles.cell} />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
            </div>
          </RangeCalendar>
        </Popover>
      </ReactAriaDateRangePicker>
    </I18nProvider>
  );
}
