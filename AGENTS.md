# Repository Guidelines

## Project Structure & Module Organization
- Source: `src/` with a `pages/` (Pages Router). Components in `src/components/`, shared code in `src/lib/`, styles in `src/styles/`.
- Public assets: `public/` (images, fonts, static files).
- Tests: colocated `*.test.ts(x)` files or `__tests__/` next to code.
- Build output: `.next/` (do not edit or commit). Local env files: `.env.local`, `.env.development`.
- This project will be built to Github pages, add necessary build script for this.

Example layout:
```
src/
  pages/
  components/
  lib/
  styles/
public/
  CNAME # contents should be: www.dannymickleburgh.com
.next/           # generated
```


## Build, Test, and Development Commands
- `pnpm dev`: Start Next.js in development with HMR.
- `pnpm build`: Create a production build into `.next/`.
- `pnpm start`: Run the production server (after `build`).
- `pnpm lint`: Lint code (ESLint) and apply repo rules.
- `pnpm test`: Run unit tests and report results.


## Coding Style & Naming Conventions
- Indentation: 2 spaces; end lines with LF; UTF-8 encoding.
- Languages: TypeScript (`.ts/.tsx`) when possible; avoid `any`.
- React: Components `PascalCase` (e.g., `UserCard.tsx`); hooks `useCamelCase`.
- Files: shared utilities `camelCase.ts`; route folders `kebab-case`.
- Lint/format: ESLint + Prettier. Run `npm run lint` before committing.
- Environment: client-exposed variables must be prefixed `NEXT_PUBLIC_`.
- This should be using Tailwind 5 and be built responsively.

## Testing Guidelines
- Frameworks: Jest + React Testing Library.
- Naming: `*.test.ts(x)` mirrors the source filename.
- Coverage: aim for meaningful coverage on logic and rendering paths.
- Run tests locally with `pnpm test`; add focused tests for bug fixes.

## Commit & Pull Request Guidelines
- Commits: follow Conventional Commits.
  - Examples: `feat: add project list grid`, `fix: correct image path on home`, `chore: update eslint config`.
- PRs: include a clear summary, rationale, screenshots for UI changes, and linked issues (e.g., `Closes #123`). Keep PRs small and focused.
- Checks: ensure `build`, `lint`, and `test` pass before requesting review.

## Security & Configuration Tips
- Never commit secrets; use `.env.local` and secret managers.
- Validate and narrow API inputs; avoid trusting client data.
- Ignore generated folders like `.next/` in commits; keep lockfile consistent.

## Instructions
- Create a package.json file, using pnpm, create the folder structure as defined above.
- There should be a simple index page with my name "Danny Mickleburgh" as an H1 tag.
- The content on the index page should include a table (not an actual html table, use a tailwind group) of my roles from Resume.mdx. For example, "Quizlet, Software Engineer, 2020-2025" the entire row should clickable to open a role detail page.
- There should be a simple, seamless animation to access the role detail page, this should be built using MDX and extract the role descriptions for each role in Resume.mdx.
- There should be a footer with links to Linkedin (https://www.linkedin.com/in/danny-mickleburgh-868b64183/), Github (https://github.com/dannymick), PDF (link to resume pdf)