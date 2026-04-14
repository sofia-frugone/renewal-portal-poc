# Session Prompt — Fix right column: remove forced height, natural sizing

> Read CLAUDE.md before writing any code.

---

## Task

The two right-column cards on the Your Plan page are cutting off content because they are being forced to equal heights via flex. Fix this by removing all forced height sizing from the right column and letting both cards size naturally.

In `src/pages/YourPlan.tsx`, find the right column (`<Grid size={4}>`) and make these changes:

### 1. Remove height forcing from the outer Box

```tsx
// Change from:
<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>

// To:
<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
```

### 2. Remove flex stretching from both cards

On the renewal panel Card and the upgrade prompt Card, remove `flex: 1` and `justifyContent`:

```tsx
// Change from:
<Card sx={{ ..., flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>

// To:
<Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
```

### 3. Reset CardContent padding on both cards to uniform

```tsx
<CardContent sx={{ p: 3 }}>
```

Both cards should now be natural height — as tall as their content needs, stacked with a gap between them. They will not match the left card height exactly and that is fine.

---

## No other changes. Do not touch the left membership card or any other file.
