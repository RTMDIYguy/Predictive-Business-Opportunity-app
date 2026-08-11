---
title: "Navigate calendar months and select dates"
description: "Verify calendar navigation between months and selecting a date to view posts."
intent: "Users should be able to navigate the calendar to different months and select specific dates to see their content queue, ensuring the calendar correctly filters posts by date."
criticality: high
scenario: standard
flow: "Calendar View"
verification: "The post details panel updates to show the correct number of posts for the selected date."
---

**Setup**: Navigate to the Calendar page at /app/calendar.

**Intent**: Users should be able to navigate the calendar to different months and select specific dates to see their content queue, ensuring the calendar correctly filters posts by date.

**Steps**:
1. click: click: the "ChevronRight" icon button to navigate to the next month in the calendar header
2. click: click: the button for the 1st day of the month in the calendar grid
3. assert: assert: text "Nothing on this day." is visible if no posts exist for the 1st in the post details panel
4. click: click: the "ChevronLeft" icon button to navigate back to the current month in the calendar header
5. click: click: the button for the 15th day of the month in the calendar grid
6. assert: assert: text "1 post" is visible below the date heading in the post details panel

**Verification**:
1. assert: assert: text "1 post" is visible below the date heading in the post details panel

**Expected Result**: The calendar navigates to the next month and displays the posts for the selected date.
