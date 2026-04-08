# Session Prompt — Stage 2: Layout Refinement

> Copy everything below this line and paste into Claude Code.

---

The Stage 2 Membership Review screen needs layout fixes. Do not rebuild from scratch — just fix the following:

**1. Two-column proportions**
Change the Grid layout to 60/40 split:
- Left column (membership card): `<Grid item xs={12} md={7}>` 
- Right column (renewal panel): `<Grid item xs={12} md={5}>`

**2. Eliminate dead space on the right**
The renewal panel card should fill the full height of the column. Add `sx={{ height: '100%' }}` to the Card and ensure the CardContent stretches properly with `display: 'flex', flexDirection: 'column', justifyContent: 'space-between'`.

**3. Content area max width**
Wrap the two-column Grid in a container with `maxWidth: 900` and `mx: 'auto'` so it doesn't stretch across the full screen on wide viewports.

**4. No em dashes in copy**
Check all text content in the component. Replace any em dashes (--) with a space or reword the phrase. Use plain, clean Australian English copy throughout.

Do not change anything else — colours, components, stepper, navbar, and footer nav are correct as-is.
