# Session Prompt — Fix: greeting must render in grey area, not gradient

> Read CLAUDE.md before writing any code.

---

## Problem

The "Hi Michael..." greeting is rendering inside the purple gradient section. It must render in the grey content area below.

## Exact fix in `src/pages/YourPlan.tsx`

The `PageLayout` (or `PageHero`) component should only receive:
- `activeStep={1}`
- `title="Your plan options"`
- NO `subtitle` prop — remove any subtitle being passed to PageLayout

The greeting text must be the **first JSX element inside the PageLayout children**, not passed as a prop:

```tsx
<PageLayout activeStep={1} title="Your plan options">

  {/* This greeting renders in the GREY area, not the gradient */}
  <Box sx={{ mb: 3 }}>
    <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
      Hi Michael, time to renew your membership.
    </Typography>
    <Typography variant="body1" color="text.secondary">
      Your Standard plan expires on 30 April 2026. Review your options below.
    </Typography>
  </Box>

  {/* Vehicle verification card */}
  {!vehicleConfirmed && ( ... )}

  {/* Two-column layout */}
  {vehicleConfirmed && ( ... )}

</PageLayout>
```

Make sure `PageLayout` does NOT render any subtitle or extra text inside the gradient Box. The gradient section should only contain the Navbar + Stepper + title ("Your plan options"). Everything else is in the grey content area as children.

---

## No other changes.
