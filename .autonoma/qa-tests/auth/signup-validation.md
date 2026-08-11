---
title: "Signup Form Validation"
description: "Verify that the signup form requires valid name, email, and password inputs."
intent: "The signup form should enforce required fields and minimum password length to prevent invalid registration attempts."
criticality: high
scenario: standard
flow: "User Authentication"
verification: "The user remains on the signup page and the \"Create account\" button is still visible (not replaced by \"Creating...\")."
---

**Setup**: The user is on the Signup page (/signup).

**Intent**: The signup form should enforce required fields and minimum password length to prevent invalid registration attempts.

**Steps**:
1. click: click: the "Create account" button in the signup form
2. type: type: "Alex" into the "Name" field in the signup form house
3. type: type: "invalid-email" into the "Email" field in the signup form house
4. type: type: "123" into the "Password" field in the signup form house
5. click: click: the "Create account" button in the signup form house
6. assert: assert: "Create account" is visible on the button in the signup form house

**Verification**:
1. assert: assert: "Create account" is visible on the button in the signup form house
2. assert: assert: "It only takes a minute" is visible as a sub-heading in the signup form house

**Expected Result**: The browser prevents submission of empty or invalid fields, and the user remains on the signup page.
