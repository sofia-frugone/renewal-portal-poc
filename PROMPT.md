# Session Prompt — Fix right column card padding

> Read CLAUDE.md before writing any code.

---

## Task

In `src/pages/YourPlan.tsx`, adjust the padding on the two stacked right-column cards only. Do not touch the left membership card.

### Top card (renewal panel — the one with $109.00 and RENEW button)
Reduce the bottom padding — there is too much whitespace at the bottom of this card.

Find its `CardContent` and change:
```tsx
// From:
<CardContent sx={{ p: 3 }}>
// To:
<CardContent sx={{ pt: 2.5, px: 3, pb: 2 }}>
```

Also remove `justifyContent: 'center'` from this card if present — align content to the top instead:
```tsx
// On the Card itself, change/add:
sx={{ ..., display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
```

### Bottom card (upgrade prompt — "Upgrade to Premium")
Increase the top padding — there is not enough breathing room at the top of this card.

Find its `CardContent` and change:
```tsx
// From:
<CardContent sx={{ p: 3 }}>
// To:
<CardContent sx={{ pt: 3.5, px: 3, pb: 3 }}>
```

Also remove `justifyContent: 'center'` from this card if present:
```tsx
sx={{ ..., display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
```

---

## No other changes. Do not touch any other file or any other card.
