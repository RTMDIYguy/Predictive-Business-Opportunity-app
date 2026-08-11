---
title: "Filter posts by status"
description: "Verify that posts can be filtered by status (Drafts, Scheduled, Published)."
intent: "Users need to be able to organize their content library by status. This test verifies that clicking the status filter buttons correctly updates the list to show only relevant posts."
criticality: high
scenario: standard
flow: "Post Management"
verification: "The posts list correctly filters content based on the selected status."
---

**Setup**: Navigate to the Posts page at /app/posts.

**Intent**: Users need to be able to organize their content library by status. This test verifies that clicking the status filter buttons correctly updates the list to show only relevant posts.

**Steps**:
1. click: click: the "Drafts" filter button in the filter bar
2. assert: assert: text "DRAFT" is visible on all displayed post cards in the posts list
3. click: click: the "Scheduled" filter button in the filter bar
4. assert: assert: text "SCHEDULED" is visible on all displayed post cards in the posts list
5. click: click: the "Published" filter button in the filter bar
6. assert: assert: text "PUBLISHED" is visible on all displayed post cards in the posts list

**Verification**:
1. click: click: the "Drafts" filter button in the filter bar
2. assert: assert: text "DRAFT" is visible on the post cards in the posts list

**Expected Result**: The posts list updates to show only posts matching the selected status filter.
