---
title: "Login with invalid credentials shows error"
description: "Verify that the login form shows validation errors for invalid credentials."
intent: "The login form should prevent access with incorrect credentials and provide clear feedback to the user via a toast notification. This ensures that only authorized users can access their dashboards."
criticality: high
scenario: standard
flow: "User Authentication"
verification: "The user remains on the login page and an error toast is visible."
---

**Setup**: Navigate to the Login page at /login.

**Intent**: The login form should prevent access with incorrect credentials and provide clear feedback to the user via a toast notification. This ensures that only authorized users can access their dashboards.

**Steps**:
1. type: type: "wrong@email.com" into the Email input field in the login form
2. type: type: "wrongpassword" into the Password input field in the login form
3. click: click: the "Sign in" button in the login form
4. assert: assert: text "Login failed" or a specific error message is visible in the toast notification in the toast notification house

**Verification**:
1. assert: assert: text "Sign in" is visible as a form heading in the login form

**Expected Result**: An error message is displayed when invalid credentials are submitted.
