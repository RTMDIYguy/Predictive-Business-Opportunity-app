---
title: "Navigate between login and signup pages"
description: "Verify that users can navigate from the login page to the signup page."
intent: "New users who land on the login page by mistake should be able to easily find the account creation flow. This test ensures the \"Create an account\" link correctly redirects to the signup page."
criticality: mid
scenario: standard
flow: "User Authentication"
verification: "The user can toggle between the login and signup pages using the provided links."
---

**Setup**: Navigate to the Login page at /login.

**Intent**: New users who land on the login page by mistake should be able to easily find the account creation flow. This test ensures the "Create an account" link correctly redirects to the signup page.

**Steps**:
1. click: click: the "Create an account" link in the login form
2. assert: assert: text "Create your account" is visible as a page heading on the signup page
3. click: click: the "Sign in" link to return to the login page on the signup page
4. assert: assert: text "Sign in" is visible as a page heading on the login page

**Verification**:
1. assert: assert: text "Sign in" is visible as a page heading on the login page

**Expected Result**: The user is redirected to the signup page.
