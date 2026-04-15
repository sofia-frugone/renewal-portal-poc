# Session Prompt — Verify page: hero gradient layout

> Read CLAUDE.md before writing any code.

---

## Overview

Redesign the Verify page layout. Replace the plain grey background with a hero split: Orbit gradient fills the top section of the page, the lookup card overlaps the boundary between gradient and grey, and trust badges sit below the card.

---

## New page structure for `src/pages/Verify.tsx`

Remove the existing plain layout wrapper. Replace with:

```tsx
<Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

  {/* AppBar / Navbar — unchanged, sits above everything */}

  {/* Stepper — sits on the gradient (transparent background fixes the white bg issue too) */}

  {/* Hero gradient section */}
  <Box sx={{
    background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
    pt: 6,
    pb: 12, // extra bottom padding so the card can overlap
    px: 3,
    textAlign: 'center',
  }}>
    <Typography variant="h4" fontWeight={700} sx={{ color: '#fff', mb: 1 }}>
      Renew your membership
    </Typography>
    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 480, mx: 'auto' }}>
      Keep your roadside coverage active. Enter your details below to get started.
    </Typography>
  </Box>

  {/* Card — overlaps the gradient using negative margin */}
  <Box sx={{
    flex: 1,
    backgroundColor: '#ebebeb',
    px: 3,
    pb: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}>
    <Card sx={{
      width: '100%',
      maxWidth: 520,
      borderRadius: 3,
      boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
      mt: '-64px', // pulls card up to overlap the gradient
    }}>
      <CardContent sx={{ p: 4 }}>

        {/* Existing lookup form content goes here — tabs + input + button — unchanged */}

      </CardContent>
    </Card>

    {/* Trust badges — below the card */}
    <Box sx={{
      display: 'flex',
      gap: 3,
      mt: 3,
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      {[
        { icon: '🔒', label: 'Secure & encrypted' },
        { icon: '✓', label: 'Instant confirmation' },
        { icon: '⏱', label: 'Takes under 2 minutes' },
      ].map(({ icon, label }) => (
        <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Typography sx={{ fontSize: '1rem' }}>{icon}</Typography>
          <Typography variant="body2" color="text.secondary">{label}</Typography>
        </Box>
      ))}
    </Box>

  </Box>

</Box>
```

---

## Important notes

- The existing form content (tabs for Rego / Email / Membership Number, input fields, Find My Membership button, MFA OTP step, expired link state) must remain **completely unchanged** — only the outer layout/wrapper changes
- The stepper (`<RenewalStepper />`) should render inside the gradient section, above the heading, so it sits on the purple background (this naturally eliminates the white background issue)
- The card's `mt: '-64px'` pulls it up to overlap the gradient/grey boundary — adjust the value if the overlap looks too much or too little
- The AppBar sits above all of this as normal

---

## Do not change any other page or component.
