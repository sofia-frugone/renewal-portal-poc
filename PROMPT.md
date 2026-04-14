# Session Prompt — Show welcome greeting before vehicle verification

> Read CLAUDE.md before writing any code.

---

## Task

In `src/pages/YourPlan.tsx`, move the "Hi Michael..." welcome greeting **outside** the `{vehicleConfirmed && ...}` block so it renders regardless of whether the vehicle has been confirmed yet.

The greeting should appear at the top of the page, above the vehicle verification card, at all times.

The order should be:
1. Welcome greeting (always visible)
2. Vehicle verification card (shown until confirmed)
3. Rest of page content (shown only after confirmed)

No other changes.
