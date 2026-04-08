# Session Prompt — Stage 2: Hero Band + Background Fix

> Copy everything below this line and paste into Claude Code.

---

Surgical fixes to Stage 2. Do not rebuild.

**1. Add the purple hero band**
The greeting ("Hi Michael, welcome back") is currently plain text in the content area. Move it into a proper full-width gradient hero band. Replace that plain text with this — insert it as a direct child of the outer page Box, AFTER the AppBar (navbar) and BEFORE the stepper Box:

```tsx
<Box sx={{
  background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
  px: 4,
  py: 3,
  color: 'white',
}}>
  <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
    Hi Michael, welcome back.
  </Typography>
  <Typography variant="body2" sx={{ opacity: 0.85 }}>
    This is your 3rd renewal. Your Standard membership expires on 30 April 2026.
  </Typography>
</Box>
```

Remove the plain text greeting from inside the content area entirely.

**2. Fix the background colour**
The content area Box background is still too light. Set it explicitly to `'#ebebeb'` — not a theme token, hardcode this value so it definitely applies:
```tsx
<Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', p: 3, backgroundColor: '#ebebeb' }}>
```

**3. Fix left card dead space**
The membership card is stretching to fill the column height, leaving a large gap below the expiry chip. Fix this:
- Remove `sx={{ height: '100%' }}` from the LEFT card only
- The left card should be `height: 'auto'` — it should only be as tall as its content
- The right column cards (renewal panel + upgrade prompt) can stay as-is

**4. Restore the stepper if missing**
The stepper (showing steps 1-4: Verify, Your Plan, Payment, Confirmation) should appear between the hero band and the content area, inside a white Box with a bottom border. If it was removed, add it back. Active step = 1 (index 1, "Your Plan"). Use `#92248E` for active and completed step icon colour.

Do not change any other styles, copy, or components.
