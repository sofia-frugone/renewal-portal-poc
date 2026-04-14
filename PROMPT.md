# Session Prompt — Replace edit icon with outlined button + "Select plan" text fix

> Read CLAUDE.md before writing any code.

---

## Change 1 — Replace edit IconButton with outlined Button

In `src/pages/YourPlan.tsx`, replace the edit `IconButton` next to the plan chip with a proper outlined Button.

### Remove
```tsx
<IconButton size="small" onClick={() => setEditOpen(true)}
  sx={{ color: '#6b7280', '&:hover': { color: '#92248E' } }}>
  <EditIcon fontSize="small" />
</IconButton>
```

### Replace with
```tsx
<Button
  variant="outlined"
  size="small"
  onClick={() => setEditOpen(true)}
  sx={{
    borderRadius: 2,
    textTransform: 'none',
    borderColor: '#92248E',
    color: '#92248E',
    '&:hover': { borderColor: '#7a1f76', backgroundColor: '#fdf4ff' },
  }}
>
  Edit membership details
</Button>
```

Remove the `EditIcon` import and `IconButton` import if no longer used elsewhere.

---

## Change 2 — "See plan →" → "Select plan →"

In the upgrade nudge strip, change the text link from `See plan →` to `Select plan →`.

---

## No other changes.
