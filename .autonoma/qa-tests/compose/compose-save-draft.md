---
title: "Create and save a post draft"
description: "Verify that a user can create and save a post as a draft."
intent: "Users should be able to write content, select platforms, and save their work as a draft for later editing. This test verifies the basic creation and persistence flow for drafts."
criticality: high
scenario: standard
flow: "Post Composition & Scheduling"
verification: "The new draft appears in the posts list with the correct content and status."
---

**Setup**: Navigate to the Compose page at /app/compose.

**Intent**: Users should be able to write content, select platforms, and save their work as a draft for later editing. This test verifies the basic creation and persistence flow for drafts.

**Steps**:
1. type: type: "This is a draft post content." into the Content textarea in the composer card
2. click: click: the "Instagram" platform button to deselect it (it's selected by default) in the platform selector
3. click: click: the "Facebook" platform button to select it in the platform selector
4. click: click: the "Save draft" button in the composer card
5. assert: assert: text "Saved as draft" is visible in the toast notification in the toast notification house

**Verification**:
1. assert: assert: text "This is a draft post content." is visible in the posts list in the posts list table
2. assert: assert: text "DRAFT" is visible as the status for the new post in the posts list table row for the new post

**Expected Result**: The post is saved as a draft and appears in the posts list.
