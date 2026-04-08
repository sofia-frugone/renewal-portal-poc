# Session Prompt — Stage 2: Grid Fix

> Copy everything below this line and paste into Claude Code.

---

The Grid layout is broken because of a margin conflict with MUI's spacing system. Fix it exactly like this:

**Content area Box — add `overflow: 'hidden'` and remove any padding from the sides:**
```tsx
<Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', pt: 3, pb: 3, px: 3, backgroundColor: 'background.default' }}>
```

**Grid container — remove `margin: 0` and `width: '100%'` entirely. Just use:**
```tsx
<Grid container spacing={3}>
```

MUI Grid manages its own negative margins for spacing internally. Adding `margin: 0` overrides this and breaks the layout. The parent Box with `overflowX: 'hidden'` handles any edge bleed from the negative margins.

**Grid items stay as:**
```tsx
<Grid item xs={12} md={7}>  {/* Membership card */}
<Grid item xs={12} md={5}>  {/* Renewal panel */}
```

Do not change anything else.
