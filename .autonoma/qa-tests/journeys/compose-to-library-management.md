---
title: "Draft Creation and Library Deletion Journey"
description: "Create a draft post in the composer and then delete it from the posts library."
intent: "A creator starts a new post, saves it as a draft to finish later, then decides to discard it from the library, ensuring the full lifecycle from creation to deletion works."
criticality: critical
scenario: standard
flow: "Post Composition & Scheduling"
verification: "Refresh the page and verify the post is no longer in the library."
---

**Setup**: The user starts on the Compose page (/app/compose).

**Intent**: A creator starts a new post, saves it as a draft to finish later, then decides to discard it from the library, ensuring the full lifecycle from creation to deletion works.

**Steps**:
1. type: type "This is a draft journey test post." in the content textarea in the composer card
2. click: click the "Save draft" button in the composer card actions
3. assert: assert: text "Saved as draft" is visible in the toast notification in the toast notification
4. assert: assert: text "This is a draft journey test post." is visible in the post list on the first post card in the library
5. click: click the "Delete" button on the post card containing "This is a draft journey test post." in the post library list
6. assert: assert: text "Post deleted" is visible in the toast notification in the toast notification

**Verification**:
1. refresh: refresh the page
2. assert: assert: text "This is a draft journey test post." is NOT visible in the post list in the post library list

**Expected Result**: The post is successfully created as a draft and then removed from the library.
