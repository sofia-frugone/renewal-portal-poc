# Session Prompt — Stage 2: Grid Syntax Fix

> Copy everything below this line and paste into Claude Code.

---

Replace the Grid layout in the Stage 2 content area with MUI Grid v2 syntax using the `size` prop. Each Grid child should have its own `size` set individually:

```tsx
<Grid container spacing={3}>
  <Grid size={8}>
    {/* Membership card — 60% width */}
  </Grid>
  <Grid size={4}>
    {/* Renewal panel — 40% width */}
  </Grid>
</Grid>
```

Remove any `item`, `xs`, `md` props from the Grid children — these are Grid v1 syntax and should not be used.

The import stays the same: `import Grid from '@mui/material/Grid'`

Do not change anything else — content, colours, copy, stepper, navbar, and footer nav stay as-is.
