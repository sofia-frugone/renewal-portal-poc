# Session Prompt — Stage 2: Full Width Fix

> Copy everything below this line and paste into Claude Code.

---

The two cards on the Stage 2 Membership Review screen are too narrow and centred. Fix this:

**Remove the maxWidth constraint.** The content wrapper around the Grid should NOT have `maxWidth: 900` or `mx: 'auto'`. Delete those styles entirely.

The content area Box should simply be:
```tsx
<Box sx={{ p: 3, flex: 1, overflowY: 'auto', backgroundColor: 'background.default' }}>
  <Grid container spacing={3}>
    <Grid item xs={12} md={7}>
      {/* Membership card */}
    </Grid>
    <Grid item xs={12} md={5}>
      {/* Renewal panel */}
    </Grid>
  </Grid>
</Box>
```

The Grid should stretch edge to edge within the padded content area. Both cards should fill their full column width with `sx={{ height: '100%' }}` on the Card component.

Do not change anything else.
