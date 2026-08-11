---
title: "Create Draft Post"
description: "Verify that a user can create and save a draft post with content and platform selection."
intent: "Users should be able to compose a post and save it as a draft for later editing."
criticality: high
scenario: standard
flow: "Post Composition & Scheduling"
verification: "The user is navigated to the Posts page, and the new draft post is visible in the list."
---

**Setup**: The user is on the Compose page (/app/compose).

**Intent**: Users should be able to compose a post and save it as a draft for later editing.

**Steps**:
1. type: type: "This is a draft post for testing." into the "Content" textarea in the composer card house
2. click: click: the "Instagram" button to toggle it OFF (it defaults to ON) in the Platforms section house
3. click: click: the "Facebook" button to toggle it ON in the Platforms section house
4. click: click: the "Save draft" button in the composer actions house

**Verification**:
1. assert: assert: "This is a draft post for testing." is visible in the post list house
2. assert: assert: "Draft" is visible as the status badge for the post on the "This is a draft post for testing." post card house

**Expected Result**: The post is saved as a draft and appears in the post list with the "Draft" status.
