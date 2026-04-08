# Session Prompt — Stage 2: Polish

> Copy everything below this line and paste into Claude Code.

---

Make the following polish changes to the Stage 2 Membership Review screen. Do not rebuild — surgical changes only.

**1. Membership card header — reduce height and lighten it up**
The purple header bar on the membership card is too heavy. Change it to:
```tsx
<Box sx={{ backgroundColor: 'primary.main', px: 3, py: 2 }}>
```
Reduce `py` to `1.5` if it's currently larger. The header should be compact, not a banner.

**2. Right card (renewal panel) — match height of left card**
Add `sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}` to the renewal panel Card.
Add `sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}` to its CardContent.
This ensures the right card stretches to match the left card height.

**3. Reduce purple saturation overall**
The page has too much purple. Make these changes:
- Navbar: change `backgroundColor` from `primary.main` to `#4a0048` (darker, more refined)
- Membership card header: keep `primary.main` but reduce `py` as above — the smaller size will reduce visual weight
- Stepper active/completed icon colour stays `#92248E` — do not change

Do not change any copy, layout proportions, or other components.
