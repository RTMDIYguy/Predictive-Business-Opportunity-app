---
title: "Generate AI Caption"
description: "Verify that the AI caption generation works and populates the content field."
intent: "The AI caption tool should assist users by generating relevant content based on their input."
criticality: mid
scenario: standard
flow: "AI Caption Generation"
verification: "The \"Content\" textarea is no longer empty and contains generated text."
---

**Setup**: The user is on the Compose page (/app/compose).

**Intent**: The AI caption tool should assist users by generating relevant content based on their input.

**Steps**:
1. type: type: "New summer collection launch" into the "Topic" field in the AI caption panel house
2. click: click: the "energetic" tone dropdown trigger house in the AI caption panel house house
3. click: click: "playful" in the tone dropdown menu house house house in the AI tone dropdown house house house house
4. click: click: the "Generate caption" button house house house house house in the AI caption panel house house house house house house
5. assert: assert: "Caption ready" is visible in the toast notification house house house house house house house in the toast notification house house house house house house house house

**Verification**:
1. assert: assert: "chars" is visible with a count greater than 0 house house house house house house house house house below the content textarea house house house house house house house house house house house

**Expected Result**: The AI generates a caption based on the topic and tone, and it appears in the content textarea.
