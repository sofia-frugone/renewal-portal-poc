# Session Prompt — Move greeting below hero + stepper spacing

> Read CLAUDE.md before writing any code.

---

## Fix 1 — Move "Hi Michael..." below the gradient

In `src/pages/YourPlan.tsx`, the greeting ("Hi Michael, time to renew your membership." + subtitle) is currently rendering inside the gradient hero area. It must move into the grey content area below the hero.

Remove the greeting from wherever it currently sits inside the gradient/PageLayout hero section and place it as the FIRST element inside the content area — above the vehicle verification card:

```tsx
{/* Grey content area starts here */}

{/* Greeting — below the gradient */}
<Typography variant="h5" fontWeight={700} sx={{ mt: 1, mb: 0.5 }}>
  Hi Michael, time to renew your membership.
</Typography>
<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
  Your Standard plan expires on 30 April 2026. Review your options below.
</Typography>

{/* Vehicle verification card */}
{!vehicleConfirmed && <RegoVerifySection ... />}

{/* Two-column layout */}
{vehicleConfirmed && ( ... )}
```

---

## Fix 2 — More space between stepper and hero heading

In `src/components/PageHero.tsx`, increase the padding between the stepper and the title:

```tsx
{/* Stepper */}
<Box sx={{ px: 3, pt: 3, pb: 4 }}>  {/* increased pb from 2 to 4 */}
  <RenewalStepper activeStep={activeStep} />
</Box>

{/* Heading */}
<Box sx={{ textAlign: 'center', px: 3, pt: 0, pb: 4 }}>
  ...
</Box>
```

---

## No other changes.
