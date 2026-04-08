# Session Prompt — Stage 2: Full Width Fix (explicit)

> Copy everything below this line and paste into Claude Code.

---

The Stage 2 page cards are still only filling about half the screen width. There is a width constraint somewhere in the component tree. Find and fix it.

**Search the entire MembershipReview component for any of these and remove them:**
- `maxWidth` (any value)
- `width: '50%'` or similar fixed widths
- `Container` from MUI (this adds a maxWidth by default — replace with `Box` if found)
- Any `mx: 'auto'` combined with a width constraint

**The outer page Box must be:**
```tsx
<Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
```

**The content area Box must be:**
```tsx
<Box sx={{ flex: 1, overflowY: 'auto', p: 3, backgroundColor: 'background.default', width: '100%' }}>
```

**The Grid container must be:**
```tsx
<Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
  <Grid item xs={12} md={7}>
    {/* Membership card */}
  </Grid>
  <Grid item xs={12} md={5}>
    {/* Renewal panel */}
  </Grid>
</Grid>
```

Also check `src/App.tsx` and `src/main.tsx` — if there is a MUI `Container` component wrapping the routes, replace it with a plain `Box sx={{ width: '100%' }}`.

Do not change anything else — colours, copy, stepper, and footer nav are correct.
