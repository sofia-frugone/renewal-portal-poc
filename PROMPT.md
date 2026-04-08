# Session Prompt — Stage 2: Header Reorder + Progress Bar Removal

> Copy everything below this line and paste into Claude Code.

---

Two surgical changes to Stage 2. Do not rebuild anything else.

**1. Remove the progress bar completely**
Delete ALL of the following — every line related to the progress bar:
- The Box containing "Step 2 of 4: Your Plan" and "50% Complete" text
- The `LinearProgress` component
- Any `progressPercentage` calculation variable if it's now unused

Keep the `Stepper` component. Keep the white Box that wraps the stepper. Only delete the progress bar and its label row.

**2. Move the welcome band BELOW the stepper**
Currently the order is: Navbar → Welcome band → Stepper → Content.

Change it to: Navbar → Stepper Box → Welcome band → Content.

The welcome band Box (the purple gradient with "Hi Michael, welcome back") should be moved so it sits AFTER the stepper Box and BEFORE the content area Box. The stepper Box should still have its white background and bottom border. The welcome band should appear as a full-width coloured section directly above the cards.

The final page structure top to bottom should be:
1. AppBar (navbar)
2. White Box with bottom border containing the Stepper
3. Gradient welcome Box (purple, "Hi Michael, welcome back")
4. Grey content Box (the cards)
5. White footer Box (Previous / Continue buttons)

Do not change any styles, copy, or other components.
