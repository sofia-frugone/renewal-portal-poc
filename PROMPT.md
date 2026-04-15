# Session Prompt — Fix ReferenceError: FooterNav is not defined

> Read CLAUDE.md before writing any code.

---

## Task

`Verify.tsx` is crashing with `ReferenceError: FooterNav is not defined` at line 144.

Open `src/pages/Verify.tsx` and:
1. Remove any `<FooterNav />` JSX usage (around line 144)
2. Remove the `FooterNav` import if it exists

Also check `src/pages/YourPlan.tsx`, `src/pages/Payment.tsx`, and `src/pages/Confirm.tsx` for the same issue — remove any remaining `<FooterNav />` references and their imports from all four files.

That's the only change needed.
