# Session Prompt — Stage 2: Header Gradient Swap

> Copy everything below this line and paste into Claude Code.

---

Two surgical changes. Do not rebuild anything else.

**1. Remove the gradient from the welcome band**
The welcome Box currently has `background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)'` and white text. Change it to sit on the grey background instead:
```tsx
<Box sx={{ px: 4, py: 3 }}>
  <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}>
    Hi Michael, welcome back.
  </Typography>
  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    This is your 3rd renewal. Your Standard membership expires on 30 April 2026.
  </Typography>
</Box>
```
No background colour — it inherits the grey content area background (`#ebebeb`). Text changes from white to `text.primary` and `text.secondary`.

**2. Add gradient to the navbar (AppBar)**
The AppBar currently has a flat solid colour. Change it to:
```tsx
<AppBar position="static" sx={{
  background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
  boxShadow: 'none',
}}>
```

Do not change anything else.
