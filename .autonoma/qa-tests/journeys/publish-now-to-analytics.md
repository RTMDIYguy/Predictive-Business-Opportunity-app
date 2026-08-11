---
title: "Immediate Publishing and Dashboard Update Journey"
description: "Publish a scheduled post immediately and verify it appears in the recently published list on the dashboard."
intent: "A creator decides to skip the queue for an important update, publishing a scheduled post immediately and verifying the dashboard reflects the new activity."
criticality: critical
scenario: standard
flow: "Post Management"
verification: "Refresh the dashboard and verify the post remains in the recently published list."
---

**Setup**: The user starts on the Posts page (/app/posts).

**Intent**: A creator decides to skip the queue for an important update, publishing a scheduled post immediately and verifying the dashboard reflects the new activity.

**Steps**:
1. click: click the "Scheduled" filter button in the posts library filter bar
2. assert: assert: text "Early morning productivity hack" is visible in the post list in the post library list
3. click: click the "Publish now" button on the post card for "Early morning productivity hack" (pst-905) in the post library list
4. assert: assert: text "Published" is visible in the toast notification in the toast notification
5. click: click the "Dashboard" link in the sidebar navigation in the sidebar navigation
6. assert: assert: text "Early morning productivity hack" is visible in the recently published list in the dashboard recently published section

**Verification**:
1. refresh: refresh the page
2. assert: assert: text "Early morning productivity hack" is visible in the recently published list in the dashboard recently published section

**Expected Result**: The post status changes to published and it appears in the dashboard's recent activity.
