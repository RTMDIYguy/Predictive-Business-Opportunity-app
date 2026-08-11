---
title: "Disconnect a social media account"
description: "Verify that a user can disconnect a linked social media account."
intent: "Users must be able to revoke access and disconnect their social media accounts from Pulse to maintain control over their integrations. Disconnecting should remove the account handle and update the status to \"Not connected\"."
criticality: critical
scenario: standard
flow: "Account Integration"
verification: "The account status remains \"Not connected\" after a page refresh."
---

**Setup**: Navigate to the Accounts page at /app/accounts. Ensure at least one account (e.g., Facebook) is connected.

**Intent**: Users must be able to revoke access and disconnect their social media accounts from Pulse to maintain control over their integrations. Disconnecting should remove the account handle and update the status to "Not connected".

**Steps**:
1. assert: assert: text "Connected" is visible on the Facebook account card on the Facebook account card
2. click: click: the "Disconnect" button on the Facebook account card on the Facebook account card
3. assert: assert: text "Disconnected" is visible in the toast notification in the toast notification house
4. click: click: the "Connect with Facebook" button to verify it has returned to the disconnected state on the Facebook account card

**Verification**:
1. refresh: refresh: the page
2. assert: assert: text "Not connected" is visible on the Facebook account card on the Facebook account card

**Expected Result**: The account is disconnected and the UI updates to show "Not connected" for that platform.
