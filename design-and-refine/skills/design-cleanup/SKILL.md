---
name: design-cleanup
description: Remove temporary files from a Design Lab session. Use when the user requests design-and-refine cleanup or wants to remove its lab and preview routes.
---

Read the sibling `../design-lab/SKILL.md` cleanup ownership rules. Inspect
`.claude-design/artifacts.json` and the current changes before deleting anything.
Remove only recorded session-created files that still match their recorded contents.
Reverse only recorded integration edits, preserving subsequent user changes.
If ownership is missing or a file has changed since generation, report it and ask
before removing it. Never delete by route name alone. Keep DESIGN_PLAN.md and
DESIGN_MEMORY.md. Report removed files and anything requiring manual review.
