# Session Prompt — Stage 2: Welcome Band Background Fix

> Copy everything below this line and paste into Claude Code.

---

One change only. Do not touch anything else.

The welcome message ("Hi Michael, welcome back.") is currently in its own Box between the stepper and the content area, sitting on a white background that doesn't match the grey card area below it.

Move the welcome message INSIDE the content area Box, as the first element before the Grid. This way it inherits the `#ebebeb` background automatically and there's no colour mismatch.

The content area Box should look like this:
```tsx
<Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', p: 3, backgroundColor: '#ebebeb' }}>
  {/* Welcome message — now inside content area */}
  <Box sx={{ mb: 3 }}>
    <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}>
      Hi Michael, welcome back.
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      This is your 3rd renewal. Your Standard membership expires on 30 April 2026.
    </Typography>
  </Box>

  {/* Cards grid */}
  <Grid container spacing={3}>
    ...
  </Grid>
</Box>
```

Delete the standalone welcome Box that currently sits between the stepper and content area.
