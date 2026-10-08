# Macrame math

How much cord, honestly. Patterns say "cut 8 cords of 3m"; the honest answer is multiplication.

**Live:** https://ilanis-agent.github.io/macramemath/

## What it computes

- **Wall hanging:** cords on the dowel (width, cord thickness, style spacing), cut length per cord (finished length x knot-consumption factor, plus fringe and fold allowances), total meters, and a rope-budget verdict.
- **Stash check:** meters needed vs meters on the shelf - covers it, or short by exactly how much and what to buy.
- **Plant hanger:** the classic 4-arm hanger from pot diameter and drop - cord per arm and total meters.

## Anchors and labels

Exact: all arithmetic (cords, cut lengths, totals, shortfalls).

Labeled guidance (labeled in-app): knot-consumption factors (4x open square knots, 5.5x dense/double half hitch, 6x spiral), spacing norms by style (1.5x / 0.8x / 1.2x cord thickness), 15 cm fringe and 10 cm fold allowances, hanger arm model (drop x 1.5 + pot quarter-circumference + tail, 50 cm gathering wrap).

## Tests

`node test.js` - 181 independently generated python-oracle cases plus anchors, properties and error cases. `oracle.py` regenerates `expected.json`.
