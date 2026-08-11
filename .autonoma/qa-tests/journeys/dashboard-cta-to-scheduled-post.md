---
title: "Dashboard CTA to Scheduling Workflow Journey"
description: "Use the dashboard CTA to start a new post, schedule it, and verify the dashboard count updates."
intent: "A creator notices their queue is empty on the dashboard, uses the quick-action CTA to create and schedule content, and verifies the dashboard metrics update to reflect the new work."
criticality: critical
scenario: standard
flow: "Post Composition & Scheduling"
verification: "Refresh the dashboard and verify the scheduled count remains 3."
---

**Setup**: The user starts on the Dashboard page (/app/dashboard).

**Intent**: A creator notices their queue is empty on the dashboard, uses the quick-action CTA to create and schedule content, and verifies the dashboard metrics update to reflect the new work.

**Steps**:
1. assert: assert: text "2" is visible in the Scheduled stat card (pst-905, pst-906) in the dashboard stat tiles
2. click: click the "New post" button (CTA) in the dashboard header
3. type: type "Dashboard CTA journey post content." in the content textarea in the composer card
4. click: click the "Pick a date" button to open the calendar popover in the composer card schedule section
5. click: click the "20" day in the calendar grid in the calendar popover
6. click: click the "Schedule post" button in the composer card actions
7. assert: assert: text "Scheduled" is visible in the toast notification in the toast notification
8. click: click the "Dashboard" link in the sidebar navigation in the sidebar navigation
9. assert: assert: text "3" is visible in the Scheduled stat card in the dashboard stat tiles

**Verification**:
1. refresh: refresh the page
2. assert: assert: text "3" is visible in the Scheduled stat card in the dashboard stat tiles

**Expected Result**: The dashboard scheduled count increases after scheduling a new post.
