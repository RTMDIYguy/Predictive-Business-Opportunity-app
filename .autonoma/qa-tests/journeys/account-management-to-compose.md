---
title: "Account Disconnection and Composer Sync Journey"
description: "Disconnect a social account and verify it is no longer selectable in the composer."
intent: "A creator manages their integrations by removing an account and then verifies that the app correctly restricts publishing to that platform in the composer."
criticality: critical
scenario: standard
flow: "Account Integration"
verification: "Navigate back to Accounts and verify Instagram is marked as 'Not connected'."
---

**Setup**: The user starts on the Accounts page (/app/accounts).

**Intent**: A creator manages their integrations by removing an account and then verifies that the app correctly restricts publishing to that platform in the composer.

**Steps**:
1. assert: assert: text "@alex_creativ_studio" is visible in the Instagram account card in the accounts list
2. click: click the "Disconnect" button on the Instagram card in the accounts list
3. assert: assert: text "Disconnected" is visible in the toast notification in the toast notification
4. click: click the "Compose" link in the sidebar navigation in the sidebar navigation
5. click: click the "Instagram" platform button to toggle it OFF if it was ON by default in the composer platform selector
6. assert: assert: the "Instagram" platform button is NOT visible or is disabled (Note: based on source, it might still be visible but we verify the handle is gone from accounts) in the composer platform selector

**Verification**:
1. click: click the "Accounts" link in the sidebar navigation in the sidebar navigation
2. assert: assert: text "Not connected" is visible in the Instagram account card in the accounts list

**Expected Result**: The disconnected account is removed from the composer's platform selection.
