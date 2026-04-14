# Session Prompt — Progressive disclosure: rego verification gates the page

> Read CLAUDE.md before writing any code.

---

## Overview

Remove the modal approach. Instead, when the Plan page loads, only the vehicle verification card is rendered at the top. Everything else (membership card, plan comparison, help card) is hidden until the vehicle is confirmed. Once confirmed, the rego card disappears and the full page reveals. A small persistent "vehicle" line in the membership card lets the member view and change their rego after the fact.

---

## State

```tsx
const [vehicleConfirmed, setVehicleConfirmed] = useState(false);
const [vehicleState, setVehicleState] = useState<'idle' | 'editing' | 'looking_up' | 'found' | 'not_found'>('idle');
const [newRego, setNewRego] = useState('');
const [regoState, setRegoState] = useState('VIC');
const [confirmedRego, setConfirmedRego] = useState('ABC 123');
const [confirmedRegoState, setConfirmedRegoState] = useState('VIC');
const [confirmedVehicleDesc, setConfirmedVehicleDesc] = useState('2019 Toyota Corolla Ascent Sport · White');
const [changeRegoOpen, setChangeRegoOpen] = useState(false); // for post-confirm change modal
const [foundVehicle, setFoundVehicle] = useState<{ rego: string; description: string } | null>(null);
```

---

## Page render logic

```tsx
return (
  <PageShell>
    <Box sx={{ maxWidth: 900, mx: 'auto', px: 3, py: 4 }}>

      {/* STEP 1 — Vehicle verification (shown until confirmed) */}
      {!vehicleConfirmed && (
        <RegoVerifyCard
          vehicleState={vehicleState}
          setVehicleState={setVehicleState}
          newRego={newRego}
          setNewRego={setNewRego}
          regoState={regoState}
          setRegoState={setRegoState}
          foundVehicle={foundVehicle}
          handleRegoLookup={handleRegoLookup}
          onConfirm={(rego, state, desc) => {
            setConfirmedRego(rego);
            setConfirmedRegoState(state);
            setConfirmedVehicleDesc(desc);
            setVehicleConfirmed(true);
          }}
        />
      )}

      {/* STEP 2 — Full page content (shown only after vehicle confirmed) */}
      {vehicleConfirmed && (
        <>
          {/* Welcome */}
          <Typography ...>Hi Michael, ...</Typography>

          {/* Membership card — now includes vehicle row */}
          ...

          {/* Plan comparison */}
          ...

          {/* Help me choose */}
          ...
        </>
      )}

    </Box>
  </PageShell>
);
```

---

## Vehicle verification card (inline, not a modal)

Create this as an inline section (not inside a Dialog). It is a single full-width Card:

```tsx
<Card sx={{ borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', mb: 3 }}>
  <CardContent sx={{ p: 3 }}>
    <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
      Confirm your vehicle
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      Please confirm the vehicle registered to this membership before renewing.
    </Typography>

    {/* idle */}
    {vehicleState === 'idle' && (
      <Box>
        <Box sx={{ backgroundColor: '#f9fafb', borderRadius: 2, px: 2.5, py: 2, mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>Registered vehicle</Typography>
          <Typography variant="body1" fontWeight={600}>ABC 123 · VIC</Typography>
          <Typography variant="body2" color="text.secondary">2019 Toyota Corolla Ascent Sport · White</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="contained"
            onClick={() => {
              setConfirmedRego('ABC 123');
              setConfirmedRegoState('VIC');
              setConfirmedVehicleDesc('2019 Toyota Corolla Ascent Sport · White');
              setVehicleConfirmed(true);
            }}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600,
              background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
            This is still my vehicle
          </Button>
          <Button variant="outlined"
            onClick={() => setVehicleState('editing')}
            sx={{ borderRadius: 2, textTransform: 'none', borderColor: '#d1d5db', color: '#374151',
              '&:hover': { borderColor: '#92248E', color: '#92248E', backgroundColor: '#fdf4ff' } }}>
            Registration has changed
          </Button>
        </Box>
      </Box>
    )}

    {/* editing / not_found */}
    {(vehicleState === 'editing' || vehicleState === 'not_found') && (
      <Box>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
          <TextField label="New registration" size="small" value={newRego}
            onChange={e => setNewRego(e.target.value.toUpperCase())}
            placeholder="e.g. XYZ789"
            sx={{ flex: 1, minWidth: 140, '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          <TextField select label="State" size="small" value={regoState}
            onChange={e => setRegoState(e.target.value)}
            sx={{ width: 100, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
            {['NSW','VIC','QLD','SA','WA','TAS','ACT','NT'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
          <Button variant="contained" size="small" disabled={newRego.length < 3}
            onClick={handleRegoLookup}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600,
              background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
            Look up
          </Button>
        </Box>
        {vehicleState === 'not_found' && (
          <Alert severity="warning" sx={{ borderRadius: 2, mb: 1.5 }}>
            We couldn't find a vehicle for that plate. Check the details or call 1800 123 456.
          </Alert>
        )}
        <Button size="small" variant="text" onClick={() => { setVehicleState('idle'); setNewRego(''); }}
          sx={{ color: '#6b7280', textTransform: 'none' }}>← Back</Button>
      </Box>
    )}

    {/* looking up */}
    {vehicleState === 'looking_up' && (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
        <CircularProgress size={20} sx={{ color: '#92248E' }} />
        <Typography variant="body2" color="text.secondary">Verifying with Redbook…</Typography>
      </Box>
    )}

    {/* found */}
    {vehicleState === 'found' && foundVehicle && (
      <Box>
        <Box sx={{ backgroundColor: '#f0fdf4', borderRadius: 2, px: 2.5, py: 2, mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>Vehicle found</Typography>
          <Typography variant="body1" fontWeight={600}>{foundVehicle.rego} · {regoState}</Typography>
          <Typography variant="body2" color="text.secondary">{foundVehicle.description}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="contained"
            onClick={() => {
              setConfirmedRego(foundVehicle.rego);
              setConfirmedRegoState(regoState);
              setConfirmedVehicleDesc(foundVehicle.description);
              setVehicleConfirmed(true);
            }}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600,
              background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
            Confirm this vehicle
          </Button>
          <Button variant="outlined"
            onClick={() => { setVehicleState('editing'); setNewRego(''); }}
            sx={{ borderRadius: 2, textTransform: 'none', borderColor: '#d1d5db', color: '#374151' }}>
            That's not right
          </Button>
        </Box>
      </Box>
    )}

  </CardContent>
</Card>
```

---

## Vehicle row in membership card (post-confirmation)

In the membership card, add a vehicle line below the ref + expiry row:

```tsx
<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
  <Typography variant="body2" color="text.secondary">
    {confirmedRego} · {confirmedRegoState} — {confirmedVehicleDesc}
  </Typography>
  <Typography variant="body2"
    sx={{ color: '#92248E', cursor: 'pointer', ml: 0.5, textDecoration: 'underline',
      '&:hover': { color: '#7a1f76' } }}
    onClick={() => setChangeRegoOpen(true)}>
    Change
  </Typography>
</Box>
```

---

## "Change rego" modal (post-confirm)

A small modal that lets the member update their rego after confirmation, using the same Redbook lookup flow. It opens from the "Change" link in the membership card.

```tsx
<Dialog open={changeRegoOpen} onClose={() => setChangeRegoOpen(false)} maxWidth="xs" fullWidth>
  <DialogTitle sx={{ fontWeight: 600 }}>Update registration</DialogTitle>
  <DialogContent>
    <Box sx={{ display: 'flex', gap: 1.5, pt: 1, flexWrap: 'wrap' }}>
      <TextField label="Registration" size="small" value={newRego}
        onChange={e => setNewRego(e.target.value.toUpperCase())}
        sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
      <TextField select label="State" size="small" value={regoState}
        onChange={e => setRegoState(e.target.value)}
        sx={{ width: 100, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
        {['NSW','VIC','QLD','SA','WA','TAS','ACT','NT'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
      </TextField>
    </Box>
    {foundVehicle && vehicleState === 'found' && (
      <Box sx={{ backgroundColor: '#f0fdf4', borderRadius: 2, px: 2, py: 1.5, mt: 2 }}>
        <Typography variant="body2" fontWeight={600}>{foundVehicle.rego} · {regoState}</Typography>
        <Typography variant="body2" color="text.secondary">{foundVehicle.description}</Typography>
      </Box>
    )}
  </DialogContent>
  <DialogActions sx={{ px: 3, pb: 3 }}>
    <Button onClick={() => { setChangeRegoOpen(false); setVehicleState('idle'); setNewRego(''); }}
      sx={{ color: '#6b7280', textTransform: 'none' }}>Cancel</Button>
    <Button variant="contained"
      disabled={newRego.length < 3}
      onClick={() => {
        handleRegoLookup();
        // After lookup succeeds (vehicleState === 'found'), auto-update and close
      }}
      sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600,
        background: 'linear-gradient(135deg, #4a0048 0%, #92248E 100%)',
        '&:hover': { background: 'linear-gradient(135deg, #3d003b 0%, #7a1f76 100%)' } }}>
      Look up & confirm
    </Button>
  </DialogActions>
</Dialog>
```

In `handleRegoLookup`, after a successful find, also check if `changeRegoOpen` is true and if so: update confirmedRego/State/Desc and close the modal.

---

## Do not touch any other page or component.
