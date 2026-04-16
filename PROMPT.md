# Session Prompt — "Find my membership" button inactive/active state

> Read CLAUDE.md before writing any code.

---

## Task

In `src/pages/Verify.tsx`, add an inactive/active state to the "Find my membership" button.

The button should be **disabled** (greyed out) when the search input is empty, and **active** (gradient purple) when the input has content.

Find the "Find my membership" Button and update it:

```tsx
<Button
  variant="contained"
  fullWidth
  disabled={!searchValue.trim()}
  onClick={handleSearch}
  sx={{
    py: 1.5,
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
    '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' },
    '&.Mui-disabled': {
      background: '#e5e7eb',
      color: '#9ca3af',
    },
  }}
>
  Find my membership
</Button>
```

Where `searchValue` is the current input state (whatever variable holds the text field value). If the variable is named differently, use the correct name.

The `'&.Mui-disabled'` override ensures the button shows grey background with muted text when disabled, rather than MUI's default disabled styling.

---

## No other changes.
