---
title: "Signup with existing email shows error"
description: "Verify that the signup form shows validation errors for existing users or invalid data."
intent: "The signup form should validate user input and prevent duplicate registrations, providing feedback via toast notifications. This ensures data integrity and a smooth onboarding experience."
criticality: high
scenario: standard
flow: "User Authentication"
verification: "The user remains on the signup page and an error toast is visible."
---

**Setup**: Navigate to the Signup page at /signup.

**Intent**: The signup form should validate user input and prevent duplicate registrations, providing feedback via toast notifications. This ensures data integrity and a smooth onboarding experience.

**Steps**:
1. type: type: "Existing User" into the Name input field in the signup form
2. type: type: "creator@pulse.app" into the Email input field in the signup form
3. type: type: "password123" into the Password input field in the signup form
4. click: click: the "Create account" button in the signup form
5. assert: assert: text "Signup failed" or a specific error message is visible in the toast notification in the toast notification house

**Verification**:
1. assert: assert: text "Create account" is visible as a form heading in the signup form

**Expected Result**: An error message is displayed when signup fails.
