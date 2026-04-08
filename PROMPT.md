# Session Prompt — Stage 2: Membership Review

> Copy everything below this line and paste into Claude Code.

---

Read CLAUDE.md carefully before writing any code.

This project needs to be rebuilt from scratch using MUI v5. The current codebase uses Tailwind CSS — remove it completely.

**Do this in order:**

1. **Clean up Tailwind**
   - Remove `tailwind.config.js`, `postcss.config.js`
   - Remove Tailwind from `package.json` dependencies
   - Clear any Tailwind imports from `src/index.css`

2. **Install MUI dependencies**
   ```
   npm install @mui/material @mui/icons-material @emotion/react @emotion/styled react-router-dom
   ```

3. **Set up ThemeContext** at `src/contexts/ThemeContext.tsx` — use the exact implementation from CLAUDE.md

4. **Set up ClientThemeContext** at `src/contexts/ClientThemeContext.tsx`:
   - Default client: `{ clientName: 'Roadside Assistance', primaryColor: '#92248E', logoText: 'Roadside Assistance' }`
   - Expose via `useClientTheme()` hook

5. **Set up routing** in `src/App.tsx` with these routes:
   - `/renew` → Stage 1 (placeholder for now)
   - `/renew/plan` → Stage 2 (build this fully)
   - `/renew/choose` → Stage 3 (placeholder)
   - `/renew/payment` → Stage 4 (placeholder)
   - `/renew/confirm` → Stage 5 (placeholder)
   - Default redirect `/` → `/renew/plan`

6. **Build Stage 2 — Membership Review** at `src/pages/MembershipReview.tsx`:
   - Use the page layout from CLAUDE.md (navbar → progress/stepper → content → footer nav)
   - Stepper shows all 5 steps, active step = 1 (index 1, "Your Plan")
   - Progress bar at 40% (step 2 of 5)
   - Navbar: Orbit purple `#92248E`, logoText from ClientThemeContext
   - Content: two-column layout (membership card left, renewal panel right)
   - Membership card shows: member name "Michael", plan "Standard", price "$109.00/year", expiry "30 April 2026", inclusions list
   - Renewal panel shows: price "$109.00", "Renew for $109.00" primary CTA, "See other plans" text button, reassurance copy below CTA ("✓ Instant confirmation  ✓ Covers you from today  ✓ Secure payment")
   - "Continue" in footer nav goes to `/renew/choose`
   - Mobile responsive

Use placeholder data from CLAUDE.md. Orbit branding only — no Toyota or other client branding.
