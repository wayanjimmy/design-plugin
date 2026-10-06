# Design and Refine

A design exploration workflow for Claude Code, Antigravity CLI, and Pi.

## What It Does

Design and Refine generates multiple distinct UI variations for any component or page, lets you compare them side-by-side in your browser, collects your feedback on what you like about each, and synthesizes a refined version—repeating until you're confident in the result.

Instead of guessing at the right design or going back-and-forth on revisions, you see real options, pick what works, and iterate quickly.

## When to Use It

- **Starting a new component or page** — explore different approaches before committing
- **Redesigning existing UI** — see alternatives to what you have today
- **Stuck on a design direction** — generate options when you're not sure what you want
- **Getting stakeholder buy-in** — show concrete variations instead of describing ideas
- **Learning what works** — see how different layouts, densities, and patterns feel in your actual codebase

## Why Use It

1. **Uses your existing design system** — infers colors, typography, spacing from your Tailwind config, CSS variables, or component library
2. **Generates real code** — not mockups, actual working components in your framework
3. **Side-by-side comparison** — view all variations at `/__design_lab` in your dev server
4. **Iterative refinement** — tell it what you like about each, get a synthesized version
5. **Clean handoff** — outputs `DESIGN_PLAN.md` with implementation steps when you're done
6. **No mess left behind** — automatically cleans up all temporary files

---

## Setup

### Claude Code

#### 1. Add the marketplace

In Claude Code, run:

```
/plugin marketplace add 0xdesign/design-plugin
```

#### 2. Install the plugin

```
/plugin install design-and-refine@design-plugins
```

### Antigravity CLI (`agy`)

From the **UI project's root**, copy the plugin directory from a local checkout of this repository:

```bash
mkdir -p .agents/plugins
cp -R /path/to/design-plugin/design-and-refine .agents/plugins/design-and-refine
agy plugin validate .agents/plugins/design-and-refine
```

Start `agy` in that project and request the `design-and-refine` Design Lab skill, for example `/design-and-refine:design-lab ProfileCard`. The plugin is scoped to this workspace, not installed into your global agy profile. If your agy version exposes the converted Claude commands, `/design-and-refine:start ProfileCard` and `/design-and-refine:cleanup` are also available; otherwise ask the agent to clean up the Design Lab files using the skill's cleanup rules.

### Pi

From the **UI project's root**, install the Pi package from a local checkout of this repository (use the full path to the repository root):

```bash
pi install -l /path/to/design-plugin
pi list --approve
```

The `-l` flag records the package only in the UI project's `.pi/settings.json`; Pi may ask you to trust the project package on first use. Then start `pi` in that project and use `/design-and-refine-start ProfileCard` or `/design-and-refine-start` without a target. Use `/design-and-refine-cleanup` to inspect and remove temporary files after confirmation. Pi packages the shared Design Lab skill and these two prompt templates; no TypeScript extension is required. Pi does not run the Claude Code session-end hook, so use the cleanup command if you exit mid-session.

For installation from Git instead of a checkout, run `pi install -l git:github.com/wayanjimmy/design-plugin` in the UI project (Pi needs access to that repository).

---

## Usage

### Start a session

```
/design-and-refine:start
```

Or with a specific target:

```
/design-and-refine:start ProfileCard
```

### What happens next

1. **Preflight** — detects your framework (Next.js, Vite, etc.) and styling system (Tailwind, MUI, etc.)

2. **Style inference** — reads your existing design tokens from Tailwind config, CSS variables, or theme files

3. **Interview** — asks about:
   - What you're designing (component vs page, new vs redesign)
   - Pain points and what should improve
   - Visual and interaction inspiration
   - Target user and key tasks

4. **Generation** — creates 5 distinct variations exploring different:
   - Information hierarchy
   - Layout models (cards, lists, tables, split-pane)
   - Density (compact vs spacious)
   - Interaction patterns (modal, inline, drawer)
   - Visual expression

5. **Review** — open `http://localhost:3000/__design_lab` (or your dev server port) to see all variations side-by-side

6. **Feedback** — use the interactive feedback overlay or describe what you like:
   - Click **"Add Feedback"** to enter feedback mode
   - Click any element to leave a comment (Figma-style)
   - Click **"Submit Feedback"** to copy to clipboard, then paste in terminal
   - Or just describe what you like about each variation in chat

7. **Iterate** — repeat until you're confident

8. **Finalize** — all temp files are deleted, `DESIGN_PLAN.md` is generated with implementation steps

### Clean up manually (if needed)

```
/design-and-refine:cleanup
```

---

## Supported Frameworks

- Next.js (App Router & Pages Router)
- Vite (React, Vue)
- Remix
- Astro
- Create React App

## Supported Styling

- Tailwind CSS
- CSS Modules
- Material UI (MUI)
- Chakra UI
- Ant Design
- styled-components
- Emotion

---

## Interactive Feedback

The Design Lab includes a Figma-style feedback overlay for precise comments:

1. **Enter feedback mode** — click the "💬 Add Feedback" button (bottom-right)
2. **Click any element** — a comment panel appears near your click
3. **Type your feedback** — "Make this button larger" or "Love this spacing"
4. **Save** — click Save or press ⌘+Enter
5. **Repeat** — add comments to multiple elements across different variants
6. **Submit** — fill in "Overall Direction" and click "Submit Feedback"
7. **Paste** — the formatted feedback is copied to clipboard, paste it in your terminal

Claude receives structured feedback with element selectors, so it knows exactly which elements you're referring to.

---

## Tips for Best Results

**Be specific in the interview.** The more context you give about pain points, target users, and inspiration, the more distinct and useful the variations will be.

**Reference products you admire.** "Like Linear's density" or "Stripe's clarity" gives Claude concrete direction.

**Don't settle on round one.** The synthesis step is where it gets good—describe what you like about each variant and let it combine them.

**Keep your dev server running.** The plugin won't start it for you (that would block). Just have it running in another terminal.

**Check the DESIGN_PLAN.md.** After finalizing, this file contains the implementation steps, component API, accessibility checklist, and testing guidance.

---

## What Gets Created (Temporarily)

During the session:
- `.claude-design/` — variants, previews, design brief
- `app/__design_lab/` or `pages/__design_lab.tsx` — the comparison route

All of this is deleted when you finalize or abort. Nothing is left behind.

## What Gets Created (Permanently)

After finalizing:
- `DESIGN_PLAN.md` — implementation plan for your chosen design
- `DESIGN_MEMORY.md` — captured style decisions (speeds up future sessions)

---

## License

MIT

---

Made by [0xdesigner](https://github.com/0xdesign)

## Codex

Register this repository as a local marketplace and install the plugin:

```sh
codex plugin marketplace add /absolute/path/to/design-plugin
codex plugin add design-and-refine@jimmy-design-plugins
```

Start a fresh Codex session. Ask it to use the `design-lab` skill for your target,
for example "Use design-and-refine's design-lab skill to explore ProfileCard".
Ask for `design-cleanup` to remove session-owned temporary artifacts.
The Codex adapter shares the existing workflow and React feedback template;
Claude commands and hooks are not required. Non-React overlays require adaptation.

The Codex manifest explicitly disables automatic discovery of Claude's cleanup
hooks. Cleanup runs when requested or when the design workflow is finalized,
not after every agent turn.
