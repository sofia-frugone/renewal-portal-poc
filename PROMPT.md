# Session Prompt — Replace edit icon with outlined button

> Read CLAUDE.md before writing any code.

---

## Task

In `src/pages/YourPlan.tsx`, replace the edit `IconButton` next to the plan chip with a proper outlined Button labelled "Edit membership details".

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

Also remove the `EditIcon` import and `IconButton` import if they are no longer used elsewhere.

---

## No other changes.
