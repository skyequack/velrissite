# Velris Site Code Quality Audit

Date: 2026-03-27

## Scope Reviewed

I reviewed the full project structure and all app/component source files, including:

- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `app/services/layout.tsx`
- `app/services/page.tsx`
- `app/sections/Hero.tsx`
- `app/sections/WhoWeAre.tsx`
- `app/sections/WhatWeDo.tsx`
- `app/sections/TypicalEngagements.tsx`
- `app/sections/HowItWorks.tsx`
- `app/sections/FinalCta.tsx`
- `app/sections/Footer.tsx`
- `app/sections/SelectedWork.tsx`
- `app/sections/WhyVelris.tsx`
- `components/nav.tsx`
- `components/ui/SectionDivider.tsx`
- `lib/utils.ts`
- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `eslint.config.mjs`
- `postcss.config.mjs`
- `components.json`
- `README.md`

Validation performed:

- `npm run lint` (3 warnings)
- `npm run build` (successful build + workspace root warning)

## Executive Summary

The codebase has a strong visual direction and clear section-based composition, but quality risks are concentrated in 4 areas:

1. Repeated animation and scroll logic across many sections.
2. Inline `<style>` blocks and duplicated design tokens increasing maintenance cost.
3. Incomplete UX flows (modal submit, placeholder sections/contact data, unused routes/components).
4. Performance and accessibility gaps (multiple scroll listeners, image optimization, modal/focus behavior).

The project is in a good state for a targeted refactor, not a rewrite.

## Priority Findings And Refactoring Strategies

### High Priority

### 1) Repeated scroll and reveal logic across sections

Locations:

- `app/sections/WhoWeAre.tsx`
- `app/sections/WhatWeDo.tsx`
- `app/sections/TypicalEngagements.tsx`
- `app/sections/HowItWorks.tsx`
- `app/sections/FinalCta.tsx`
- `app/sections/Hero.tsx`

Issue:

- Very similar `IntersectionObserver` setup and `scroll` event handlers are reimplemented per section.
- Every section maintains its own visibility/scroll state and lifecycle code.

Impact:

- Higher bug surface and inconsistent behavior over time.
- Harder performance tuning because updates are spread across files.

Refactor strategy:

- Create shared hooks:
  - `useRevealOnIntersect(options)` for one-time visibility triggers.
  - `useScrollProgress(ref)` for normalized section progress.
- Use `requestAnimationFrame` throttling in the scroll hook.
- Replace per-component logic with hook calls and keep components mostly declarative.

### 2) Massive inline CSS in components

Locations:

- `components/nav.tsx`
- `app/sections/Hero.tsx`
- `app/sections/WhoWeAre.tsx`
- `app/sections/WhatWeDo.tsx`
- `app/sections/TypicalEngagements.tsx`
- `app/sections/HowItWorks.tsx`
- `app/sections/FinalCta.tsx`

Issue:

- Most sections embed large `<style>` blocks including keyframes and utility-like classes.

Impact:

- Styling is hard to reuse, test, and reason about.
- Increased chance of naming collisions and drift.

Refactor strategy:

- Move animation and component-scoped styles to CSS Modules, e.g.:
  - `Hero.module.css`
  - `SectionAnimations.module.css`
- Keep design tokens in `app/globals.css`; keep layout/state in TSX.
- Standardize shared keyframes (`revealUp`, `lineGrow`, glow animations) once.

### 3) Modal submission flow is not real and can mislead users

Location:

- `app/sections/FinalCta.tsx`

Issue:

- `handleSubmit` only prevents default and closes the modal; no API call, no success/error state, no persistence.

Impact:

- Users believe a request was sent when it was not.
- Business-critical lead capture path is incomplete.

Refactor strategy:

- Add server action or API route (e.g. `app/api/contact/route.ts`) and submit payload.
- Add pending/success/error states and explicit completion message.
- Instrument analytics events for CTA open, submit success/failure.

### 4) Dead/placeholder content in production surface

Locations:

- `app/sections/SelectedWork.tsx`
- `app/sections/WhyVelris.tsx`
- `app/services/page.tsx`
- `app/sections/Footer.tsx`

Issue:

- Placeholder sections and copy exist, and some are imported but commented out from home page.
- `/services` route still uses the default starter UI.
- Footer includes placeholder phone/address/legal data.

Impact:

- Brand trust and perceived quality drop.
- Unclear product readiness.

Refactor strategy:

- Remove dormant sections until implemented, or complete them fully.
- Replace `/services` starter content with branded implementation or remove route temporarily.
- Replace placeholder legal/contact content with verified data.

## Medium Priority

### 5) Accessibility: modal lacks full focus management

Location:

- `app/sections/FinalCta.tsx`

Issue:

- Escape and backdrop close are implemented, but there is no focus trap and no focus return to trigger element.

Impact:

- Keyboard and assistive-tech experience is incomplete.

Refactor strategy:

- Use a focus trap library or Radix Dialog.
- Capture trigger element before opening and restore focus on close.
- Add initial focus target in modal.

### 6) Accessibility: `aria-expanded` does not reflect state

Location:

- `components/nav.tsx`

Issue:

- Mobile menu button uses hardcoded `aria-expanded="false"` even when menu is open.

Impact:

- Incorrect screen-reader feedback.

Refactor strategy:

- Bind to state: `aria-expanded={isOpen}`.

### 7) Performance warning from Next lint (`<img>` usage)

Location:

- `app/sections/Hero.tsx`

Issue:

- Uses native `<img>` for logo image.

Impact:

- Suboptimal LCP and bandwidth behavior.

Refactor strategy:

- Replace with `next/image` and explicit dimensions/sizes.

### 8) Multiple global scroll listeners can be consolidated

Locations:

- `components/nav.tsx`
- `app/sections/*` animated components

Issue:

- Several components subscribe to `window.scroll` independently.

Impact:

- Potential jank on low-end devices during heavy paint/animation.

Refactor strategy:

- Centralize scroll sampling in one shared hook/store and distribute derived values.
- Use passive listeners + `requestAnimationFrame` scheduling.

### 9) Inconsistent and duplicated layout/font setup

Locations:

- `app/layout.tsx`
- `app/services/layout.tsx`

Issue:

- Font loading/theme class setup is duplicated between root and services layout.

Impact:

- Configuration drift risk and harder global style changes.

Refactor strategy:

- Keep font setup exclusively in root layout.
- Let nested layouts provide structure only.

### 10) CSS token and rule duplication in globals

Location:

- `app/globals.css`

Issue:

- Scrollbar rules for `html` and `html::-webkit-scrollbar` are duplicated.
- Some token naming and usage are inconsistent (`--foreground` is dark despite being foreground token).

Impact:

- Harder to reason about design system consistency.

Refactor strategy:

- Remove duplicate rules.
- Normalize token semantics (`foreground` should be readable text default).
- Add token documentation comment block.

### 11) Potential invalid/unused utility classes

Locations:

- `app/sections/Hero.tsx` (`min-h-125`)
- `app/sections/FinalCta.tsx` (`z-70`)

Issue:

- These classes are likely not standard Tailwind classes unless explicitly extended.

Impact:

- Styles silently not applied, leading to layout inconsistencies.

Refactor strategy:

- Use valid utilities (`min-h-[31.25rem]`, `z-[70]`) or define custom utilities/tokens.

### 12) Minor CSS correctness issue in navbar

Location:

- `components/nav.tsx`

Issue:

- `\` appears before `box-shadow` in `.cta-primary:hover` declaration.

Impact:

- Can make the declaration invalid depending on parser behavior.

Refactor strategy:

- Remove the stray backslash and verify style output.

## Low Priority

### 13) Unused imports and dormant code paths

Location:

- `app/page.tsx`

Issue:

- `SelectedWork` and `WhyVelris` are imported but not rendered (commented out).

Impact:

- Lint warnings and noisy code.

Refactor strategy:

- Remove unused imports until sections are ready.

### 14) README is still generic starter text

Location:

- `README.md`

Issue:

- No project-specific architecture, setup, or deployment guidance.

Impact:

- Slower onboarding and inconsistent contributor workflow.

Refactor strategy:

- Replace with project README including:
  - architecture overview
  - design system notes
  - scripts and environments
  - release and QA checklist

### 15) Dependency hygiene and workspace-root warning

Locations:

- `package.json`
- Build output warning (multiple lockfiles)

Issue:

- Build warns about lockfile conflict (`C:\Users\omerm\package-lock.json` and workspace lockfile).
- Some dependencies may be unnecessary (`radix-ui`, `shadcn`) if not used directly.

Impact:

- Confusing build behavior and heavier dependency surface.

Refactor strategy:

- Resolve workspace root warning via `turbopack.root` or remove conflicting lockfile.
- Run dependency usage audit and remove unused packages.

## Suggested Refactor Plan

### Phase 1: Correctness and UX Reliability

- Implement real contact submission flow with success/error handling.
- Fix navbar `aria-expanded`, stray CSS backslash, and invalid utility classes.
- Remove unused imports and placeholder exports from active imports.

### Phase 2: Performance and Accessibility

- Replace `<img>` with `next/image`.
- Adopt accessible dialog primitive (Radix Dialog) with proper focus trap.
- Consolidate scroll listeners and throttle updates.

### Phase 3: Maintainability and Design System

- Extract repeated animation/observer logic into shared hooks.
- Move inline `<style>` blocks into CSS Modules and shared animation utilities.
- Unify layout/font config to root layout.
- Clean and document global tokens.

### Phase 4: Product and DevEx Completion

- Replace `/services` starter page with branded page.
- Complete/remove placeholder sections and legal/contact placeholders.
- Rewrite README for project-specific onboarding.
- Resolve lockfile/workspace root warning.

## Optional Structural Targets

Recommended additions:

- `hooks/useRevealOnIntersect.ts`
- `hooks/useScrollProgress.ts`
- `styles/animations.css` or `styles/section-animations.css`
- `types/content.ts` for typed section content models
- `app/api/contact/route.ts` (or server action equivalent)

## Lint Findings Snapshot

From `npm run lint`:

- `app/page.tsx`: 2 warnings (`@typescript-eslint/no-unused-vars`)
- `app/sections/Hero.tsx`: 1 warning (`@next/next/no-img-element`)

No TypeScript build errors were found in `npm run build`.
