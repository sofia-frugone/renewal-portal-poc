# Session Prompt — Stage 2: Visual Polish

> Copy everything below this line and paste into Claude Code.

---

Two changes to Stage 2 — Membership Review. Surgical edits only, do not rebuild.

**1. Remove the progress bar**
Delete the `LinearProgress` component and its surrounding Box (the one showing "Step X of Y" text and the gradient bar). Keep the `Stepper` component — that stays. Only remove the progress bar.

**2. Reduce the starkness — add visual depth to the background**
The page feels too white and flat. Make these changes:

- Change the content area background from `background.default` (`#f9fafb`) to a slightly deeper warm grey: `sx={{ backgroundColor: '#f0f0f0' }}`

- Add a subtle purple gradient hero band between the navbar and the stepper section. Insert this Box after the AppBar and before the stepper Box:
```tsx
<Box sx={{
  background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
  px: 3,
  py: 4,
  color: 'white',
}}>
  <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
    Hi Michael, your membership is due for renewal.
  </Typography>
  <Typography variant="body2" sx={{ opacity: 0.85 }}>
    Your Standard membership expires on 30 April 2026. Renew today to stay covered.
  </Typography>
</Box>
```

- Remove the greeting/expiry text from inside the membership card if it's duplicated there — the hero band now owns that message.

- Give both cards a slightly more elevated look: `boxShadow: '0 2px 8px rgba(0,0,0,0.10)'`

Do not change any copy, layout proportions, stepper, or footer nav.
