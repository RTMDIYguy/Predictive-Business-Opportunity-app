---
title: "Generate a post caption using AI"
description: "Verify that the AI caption generation tool works and populates the content field."
intent: "Pulse provides AI assistance to help creators write captions. This test verifies that entering a topic and selecting a tone allows the AI to generate content that is then automatically inserted into the post editor."
criticality: mid
scenario: standard
flow: "AI Caption Generation"
verification: "The content textarea is populated with the AI-generated caption."
---

**Setup**: Navigate to the Compose page at /app/compose.

**Intent**: Pulse provides AI assistance to help creators write captions. This test verifies that entering a topic and selecting a tone allows the AI to generate content that is then automatically inserted into the post editor.

**Steps**:
1. type: type: "New summer collection launch" into the AI Topic input field in the AI panel
2. click: click: the tone dropdown trigger (currently showing "energetic") in the AI panel
3. click: click: the "playful" tone option in the dropdown menu in the dropdown menu
4. click: click: the "Generate caption" button in the AI panel
5. assert: assert: text "Caption ready" is visible in the toast notification in the toast notification house
6. assert: assert: the Content textarea is not empty and contains generated text in the composer card

**Verification**:
1. assert: assert: the Content textarea is not empty in the composer card

**Expected Result**: The AI generates a caption based on the topic and tone, and it appears in the content textarea.
