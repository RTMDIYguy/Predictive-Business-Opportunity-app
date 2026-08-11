---
title: "Delete a post from the library"
description: "Verify that a user can delete a post from the library."
intent: "Users must be able to remove unwanted content from their queue or library. This test verifies the deletion flow, including the confirmation dialog and UI update."
criticality: high
scenario: standard
flow: "Post Management"
verification: "The post is permanently removed from the library."
---

**Setup**: Navigate to the Posts page at /app/posts. Ensure at least one post exists.

**Intent**: Users must be able to remove unwanted content from their queue or library. This test verifies the deletion flow, including the confirmation dialog and UI update.

**Steps**:
1. click: click: the "Drafts" filter button to find a specific post to delete in the filter bar
2. assert: assert: text "This is a post to be deleted" is visible in the posts list in the posts list
3. click: click: the "Delete" button on the post card for "This is a post to be deleted" on the specific post card
4. assert: assert: text "Post deleted" is visible in the toast notification in the toast notification house

**Verification**:
1. refresh: refresh: the page
2. assert: assert: text "This is a post to be deleted" is no longer visible in the posts list in the posts list

**Expected Result**: The post is removed from the list and remains gone after a refresh.
