---
title: "Schedule a post for a future date"
description: "Verify that a user can schedule a post for a future date and time."
intent: "The core value of Pulse is scheduling content. This test verifies that a user can select a date and time, write content, and successfully schedule a post across multiple platforms."
criticality: critical
scenario: standard
flow: "Post Composition & Scheduling"
verification: "The post appears in the posts list with the \"Scheduled\" status and correct platforms."
---

**Setup**: Navigate to the Compose page at /app/compose.

**Intent**: The core value of Pulse is scheduling content. This test verifies that a user can select a date and time, write content, and successfully schedule a post across multiple platforms.

**Steps**:
1. type: type: "Scheduling this post for later!" into the Content textarea in the composer card
2. click: click: the "LinkedIn" platform button to select it in the platform selector
3. click: click: the "Pick a date" button to open the calendar popover in the schedule section
4. click: click: the button for the 25th day of the month in the calendar popover in the calendar popover
5. type: type: "14:30" into the Time input field in the schedule section
6. click: click: the "Schedule post" button in the composer card
7. assert: assert: text "Scheduled" is visible in the toast notification in the toast notification house

**Verification**:
1. assert: assert: text "Scheduling this post for later!" is visible in the posts list in the posts list table
2. assert: assert: text "SCHEDULED" is visible as the status for the new post in the posts list table row for the new post

**Expected Result**: The post is scheduled and appears in the posts list with the "Scheduled" status.
