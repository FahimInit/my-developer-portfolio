# Workspace Rules — Portfolio

## Adding New Projects
Whenever the user asks to add a new project to the portfolio:

1. **Newest-First Ordering (`src/config/projects.ts`):**
   - **Always prepend** the new `ProjectSpec` entry at **index `0`** of the `PROJECTS` array (never append at the end).
   - Because `ProjectShowcase` renders `PROJECTS` in array order and `src/features/hero/CodeCard.tsx` picks the first live project in `PROJECTS`, prepending at index `0` automatically:
     - Places the latest project first in the **Selected work** grid.
     - Connects the **Latest live app** badge on the Hero `about.ts` card to the new project.

2. **Card Preview Styling (`src/features/project-sandboxes/ProjectShowcase.tsx`):**
   - Always add a matching entry for the new project's `id` in the `PREVIEW` map with a distinct Tailwind gradient and `lucide-react` icon.

3. **Verification & Git:**
   - Run `npm run typecheck` and `npm run build` before committing.
   - Always commit and push to the `master` branch.
