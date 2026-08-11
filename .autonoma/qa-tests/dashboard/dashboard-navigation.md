---
title: "Dashboard Hub Navigation"
description: "Verify that the dashboard navigation links work correctly."
intent: "The dashboard should serve as a central hub with working links to all major features."
criticality: high
scenario: standard
flow: "Dashboard & Analytics"
verification: "The user is on the Calendar page."
---

**Setup**: The user is on the Dashboard page (/app/dashboard).

**Intent**: The dashboard should serve as a central hub with working links to all major features.

**Steps**:
1. click: click: the "View analytics" link in the Engagement totals section
2. assert: assert: "Analytics" is visible as a page heading on the analytics page
3. click: click: "Dashboard" in the sidebar navigation in the app layout sidebar house
4. click: click: the "Calendar" link in the Upcoming section header house
5. assert: assert: "Calendar" is visible as a page heading house on the calendar page house

**Verification**:
1. assert: assert: "Calendar" is visible as a page heading house on the calendar page house

**Expected Result**: The user can navigate to Compose, Analytics, Calendar, and All Posts from the dashboard.
