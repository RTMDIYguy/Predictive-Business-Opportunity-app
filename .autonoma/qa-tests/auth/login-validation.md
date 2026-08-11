---
title: "Login Form Validation"
description: "Verify that the login form requires valid email and password inputs."
intent: "The login form should enforce required fields and minimum password length to prevent invalid authentication attempts."
criticality: high
scenario: standard
flow: "User Authentication"
verification: "The user remains on the login page and the \"Sign in\" button is still visible (not replaced by \"Signing in...\")."
---

**Setup**: The user is on the Login page (/login).

**Intent**: The login form should enforce required fields and minimum password length to prevent invalid authentication attempts.

**Steps**:
1. click: click: the "Sign in" button in the login form
2. type: type: "invalid-email" into the "Email" field in the login form
3. type: type: "123" into the "Password" field in the login form
4. click: click: the "Sign in" button in the login form
5. assert: assert: "Sign in" is visible on the button in the login form

**Verification**:
1. assert: assert: "Sign in" is visible on the button in the login form
2. assert: assert: "to your Pulse account" is visible as a sub-heading in the login form

**Expected Result**: The browser prevents submission of empty or invalid fields, and the user remains on the login page.
