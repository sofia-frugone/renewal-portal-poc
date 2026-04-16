# Session Prompt — Verify page hero tweaks + stepper colours

> Read CLAUDE.md before writing any code.

---

## Fix 1 — Merge AppBar and hero into one continuous gradient

The AppBar and gradient hero must share the same gradient with no visible seam. Wrap both in a single gradient container.

In `src/pages/Verify.tsx` (or wherever the page layout is defined), restructure the top section:

```tsx
{/* Single gradient wrapper: AppBar + Stepper + Hero heading */}
<Box sx={{
  background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
  pb: 10, // space for card overlap
}}>

  {/* Navbar/AppBar — must be transparent so gradient shows through */}
  {/* If AppBar has its own background, override it: */}
  <AppBar position="static" elevation={0}
    sx={{ background: 'transparent', boxShadow: 'none' }}>
    {/* existing navbar content unchanged */}
  </AppBar>

  {/* Stepper */}
  <Box sx={{ px: 3, py: 2 }}>
    <RenewalStepper activeStep={0} />
  </Box>

  {/* Hero heading */}
  <Box sx={{ textAlign: 'center', px: 3, pt: 2, pb: 2 }}>
    <Typography variant="h4" fontWeight={800} sx={{ color: '#fff', mb: 1 }}>
      Renew your membership
    </Typography>
    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 480, mx: 'auto' }}>
      Keep your roadside coverage active. Enter your details below to get started.
    </Typography>
  </Box>

</Box>
```

If the Navbar is a shared component (`PageShell` or `Navbar.tsx`) that applies its own gradient, change it to accept a `transparent` prop or override its background with `sx={{ background: 'transparent', boxShadow: 'none' }}` on the AppBar when used in the Verify page context.

---

## Fix 2 — Stepper colours for gradient background

In `src/components/RenewalStepper.tsx`, update the MUI Stepper to display correctly on a dark gradient background.

```tsx
<Stepper activeStep={activeStep} alternativeLabel
  sx={{
    // Step labels
    '& .MuiStepLabel-label': {
      color: 'rgba(255,255,255,0.7)',
      '&.Mui-active': { color: '#fff', fontWeight: 600 },
      '&.Mui-completed': { color: 'rgba(255,255,255,0.8)' },
    },
    // Step connector line
    '& .MuiStepConnector-line': {
      borderColor: 'rgba(255,255,255,0.3)',
    },
    '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
      borderColor: 'rgba(255,255,255,0.6)',
    },
    '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
      borderColor: 'rgba(255,255,255,0.6)',
    },
    // Step icon circle — white background, dark text
    '& .MuiStepIcon-root': {
      color: 'rgba(255,255,255,0.25)', // inactive: semi-transparent white circle
      '&.Mui-active': {
        color: '#fff', // active: solid white circle
        '& .MuiStepIcon-text': { fill: '#4a0048' }, // text inside: dark purple
      },
      '&.Mui-completed': {
        color: '#fff', // completed: solid white circle
      },
    },
    '& .MuiStepIcon-text': {
      fill: 'rgba(74,0,72,0.5)', // inactive circle text: muted dark purple
    },
  }}
>
```

---

## Fix 3 — Widen the card

Change the card's `maxWidth` from `520` to `620`:

```tsx
<Card sx={{
  width: '100%',
  maxWidth: 620,  // was 520
  ...
}}>
```

---

## Fix 4 — Bolder heading

The "Renew your membership" heading should use `fontWeight: 800`:

```tsx
<Typography variant="h4" fontWeight={800} sx={{ color: '#fff', mb: 1 }}>
  Renew your membership
</Typography>
```

---

## Do not touch any other page or component.
