# Session Prompt — Fix stepper white background (final fix)

> Read CLAUDE.md before writing any code.

---

## Task — One change only

The stepper is still rendering on a white background. Find and remove it.

Run this search first to locate the problem:

```
grep -rn "backgroundColor\|background.*#fff\|background.*white\|borderBottom" src/
```

Then look at every result. Find the Box (or Paper, or AppBar, or any MUI component) that wraps `<RenewalStepper />` and has a white or light background. Remove the `backgroundColor` and `borderBottom` (or `border`) from that wrapper.

The stepper wrapper should have **no background color** at all — it must be fully transparent. The correct sx for the stepper wrapper is padding only:

```tsx
sx={{ py: 2, px: 3 }}
```

If `RenewalStepper.tsx` itself has a background, remove it there too.
If `PageShell.tsx` (or `Layout.tsx`, or `App.tsx`, or wherever the stepper is rendered) has a background wrapper, remove it there too.

Check every file that renders or wraps the stepper until the white background is gone.

---

## No other changes. Do not touch any other component or file.
