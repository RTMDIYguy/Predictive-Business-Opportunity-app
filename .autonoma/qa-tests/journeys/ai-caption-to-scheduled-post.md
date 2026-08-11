---
title: "AI-Assisted Scheduling to Dashboard Journey"
description: "Generate a caption using AI and schedule it for a future date, then verify it appears in the upcoming list on the dashboard."
intent: "A creator uses AI to overcome writer's block, schedules the resulting content for next year, and verifies it is tracked in the dashboard's upcoming queue."
criticality: critical
scenario: standard
flow: "Post Composition & Scheduling"
verification: "Refresh the dashboard and verify the scheduled post remains in the upcoming list."
---

**Setup**: The user starts on the Compose page (/app/compose).

**Intent**: A creator uses AI to overcome writer's block, schedules the resulting content for next year, and verifies it is tracked in the dashboard's upcoming queue.

**Steps**:
1. type: type "Future of brutalist design" in the topic input field in the AI caption panel
2. click: click the "Generate caption" button in the AI caption panel
3. assert: assert: text "Caption ready" is visible in the toast notification in the toast notification
4. click: click the "Pick a date" button to open the calendar popover in the composer card schedule section
5. click: click the "15" day in the calendar grid in the calendar popover
6. click: click the "Schedule post" button in the composer card actions
7. assert: assert: text "Scheduled" is visible in the toast notification in the toast notification
8. click: click the "Dashboard" link in the sidebar navigation in the sidebar navigation
9. assert: assert: text "Future of brutalist design" is visible in the upcoming list in the dashboard upcoming section

**Verification**:
1. refresh: refresh the page
2. assert: assert: text "Future of brutalist design" is visible in the upcoming list in the dashboard upcoming section

**Expected Result**: The AI-generated caption is scheduled and appears correctly on the dashboard.
