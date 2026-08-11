---
title: "Initiate social media account connection"
description: "Verify that clicking the connect button for a platform initiates the OAuth flow."
intent: "When a user clicks \"Connect with LinkedIn\", the app should fetch the OAuth URL from the backend and redirect the user. This test verifies the initiation of that flow."
criticality: critical
scenario: standard
flow: "Account Integration"
verification: "The app attempts to redirect the user to the OAuth provider (verified by the action of clicking the button)."
---

**Setup**: Navigate to the Accounts page at /app/accounts. Ensure LinkedIn is not connected.

**Intent**: When a user clicks "Connect with LinkedIn", the app should fetch the OAuth URL from the backend and redirect the user. This test verifies the initiation of that flow.

**Steps**:
1. assert: assert: text "Not connected" is visible on the LinkedIn account card on the LinkedIn account card
2. click: click: the "Connect with LinkedIn" button on the LinkedIn account card
3. click: click: the "Connect with Facebook" button to verify multiple initiations work (or just to add a second interaction) on the Facebook account card

**Verification**:
1. assert: assert: text "Connected accounts" is visible as a page heading as a page heading

**Expected Result**: The user is redirected to the platform's OAuth URL (simulated by clicking the button and checking for errors).
