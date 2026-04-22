---
"@cambly/syntax-core": patch
---

Modal FocusTrap: allow focus to land in react-aria overlays (Popover, Dialog, Menu, Tooltip, ListBox, AlertDialog) that portal out of the Modal subtree. Previously, the FocusTrap bounced focus back into the Modal whenever it landed on an element outside the Modal's DOM, breaking react-aria's internal FocusScope. The canonical symptom was a `DateRangePicker` inside a `Modal` where picking a single date collapsed the range to a single day, because the bounce triggered RangeCalendar's onBlur-while-anchored path.
