# Session Prompt — Stage 2 Revised: Inline Upgrade Prompt

> Copy everything below this line and paste into Claude Code.

---

Read CLAUDE.md before writing any code.

We are revising the portal from a 5-stage flow to a 4-stage flow. The separate Plan Comparison page (Stage 3, `/renew/choose`) is being removed. Plan selection is now handled inline on the Membership Review page.

**Update the routes in `App.tsx`:**
```
/renew           → Stage 1 (Verify — placeholder)
/renew/plan      → Stage 2 (Membership Review — update this)
/renew/payment   → Stage 3 (Payment — placeholder)
/renew/confirm   → Stage 4 (Confirmation — placeholder)
```
Delete the `/renew/choose` route entirely.

**Update the Stepper in all pages to 4 steps:**
```ts
const RENEWAL_STEPS = ['Verify', 'Your Plan', 'Payment', 'Confirmation'];
```

---

**Update Stage 2 — Membership Review (`src/pages/MembershipReview.tsx`):**

The page layout stays the same. Update the content area:

**Left column (size={8}) — Membership card:** no changes needed.

**Right column (size={4}) — Renewal panel:** add an upgrade prompt section below the existing renewal panel card.

After the renewal panel Card, add a second Card for the upgrade prompt:

```tsx
<Card sx={{ borderRadius: 3, border: '1px solid #e5e7eb', mt: 2 }}>
  <CardContent sx={{ p: 3 }}>
    <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 1 }}>
      WANT MORE COVER?
    </Typography>
    <Typography variant="h6" sx={{ fontWeight: 600, mt: 0.5, mb: 0.5 }}>
      Upgrade to Premium
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      Towing up to 100km, key lockout assistance and caravan cover — for $40 more per year.
    </Typography>
    <Button variant="outlined" color="primary" fullWidth sx={{ borderRadius: 2, mb: 1 }}>
      Upgrade for $149/year
    </Button>
    <Button variant="text" color="primary" fullWidth sx={{ fontSize: '0.8rem' }}>
      Compare all plans
    </Button>
  </CardContent>
</Card>
```

"Compare all plans" opens a MUI `Drawer` from the right side (anchor="right", width 420px) showing the 3 plan cards stacked vertically (Basic $79, Standard $109 current, Premium $149). Each plan card in the drawer shows name, price, inclusions list with CheckCircle icons, and a select button. Selecting a plan closes the drawer and updates a `selectedPlan` state on the page. The renewal panel CTA updates to reflect the selected plan price.

**Footer nav:**
- "Previous" — disabled on this page (it's the entry point from magic link)
- "Continue" → `/renew/payment`

Do not rebuild everything — surgical updates only. Keep all existing styles, colours, and copy.
