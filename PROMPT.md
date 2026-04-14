# Session Prompt — Move "Help me choose" to standalone card

> Read CLAUDE.md before writing any code.

---

## Task

In `src/pages/YourPlan.tsx`, move the "Not sure? Help me choose" button out of the upgrade prompt card and into its own full-width white card placed **below** the Grid (below the membership card and renewal panel), before the footer.

Remove the small text button from the upgrade prompt card entirely.

---

## New card layout

Add this directly below the `<Grid container>` closing tag and above the `<FooterNav>`:

```tsx
{/* Plan recommendation card */}
<Box sx={{
  mt: 3,
  backgroundColor: '#fff',
  borderRadius: 3,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  p: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 3,
}}>
  <Box>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
      Not sure which plan is right for you?
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Answer 3 quick questions and we'll recommend the best cover for your driving habits.
    </Typography>
  </Box>
  <Button
    variant="contained"
    onClick={() => { setQuizOpen(true); setQuizStep(0); setQuizAnswers({}); setQuizResult(null); }}
    sx={{
      whiteSpace: 'nowrap',
      flexShrink: 0,
      px: 3,
      py: 1.25,
      borderRadius: 2,
      textTransform: 'none',
      fontWeight: 600,
      background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
      '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' },
    }}
  >
    Help me choose
  </Button>
</Box>
```

---

## Also remove

In the upgrade prompt card (right column, second card), remove the small text button:
```tsx
// Remove this:
<Button size="small" variant="text" onClick={...} sx={{ color: '#92248E', ... }}>
  Not sure? Help me choose
</Button>
```

---

## That's the only change. Do not touch any other files.
