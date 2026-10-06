---
description: Remove all temporary design lab files created during a design-and-refine session
---

# Cleanup Command

Manually clean up all temporary files created during a design-and-refine session.

## Usage

```
/design-and-refine:cleanup
```

## What This Does

Removes all temporary files and directories created during design exploration:

1. **`.claude-design/`** - The main temporary directory containing:
   - Design lab variants
   - Preview files
   - Design brief JSON
   - Run logs

2. **Temporary routes:**
   - `app/%5F_design_lab/` (Next.js App Router)
   - `app/%5F_design_preview/` (Next.js App Router)
   - `pages/__design_lab.tsx` (Next.js Pages Router)
   - `pages/__design_preview.tsx` (Next.js Pages Router)

3. **Any App.tsx modifications** (for Vite projects without routers)

## Instructions

When this command is invoked:

1. Read the Design Lab skill artifact ownership rules and inspect `.claude-design/artifacts.json`
2. If it exists, list the contents and ask for confirmation before deleting
3. Check for temporary route files in common locations
4. Delete only session-owned files with matching recorded contents; preserve later user edits
5. Report what was deleted

**Safety rules:**
- ONLY delete files inside `.claude-design/`
- Route names alone are not proof of ownership; delete only files recorded as created by the session
- Always confirm with the user before deleting
- Never delete user-authored files
