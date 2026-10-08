const M = require('./engine.js');
const cases = require('./expected.json').cases;
let pass = 0, fail = 0;
function ok(cond, label) { if (cond) pass++; else { fail++; console.log('FAIL:', label); } }
function eqObj(a, b, label) {
  const ka = Object.keys(a), kb = Object.keys(b);
  ok(ka.length === kb.length, label + ' key count');
  for (const k of ka) {
    const va = a[k], vb = b[k];
    if (typeof va === 'number' && typeof vb === 'number') ok(va === vb, label + '.' + k + ' ' + va + ' vs ' + vb);
    else ok(va === vb, label + '.' + k + ' ' + JSON.stringify(va) + ' vs ' + JSON.stringify(vb));
  }
}
for (const c of cases) eqObj(M[c.kind](...c.args), c.out, c.kind + '(' + c.args.join(',') + ')');
// anchors
const p1 = M.plan(60, 30, 'open', 3);
ok(p1.cords === 66 && p1.cutLenCm === 520 && p1.totalM === 343.2, 'anchor 60x30 open 3mm');
ok(M.plan(60, 30, 'spiral', 3).totalM > M.plan(60, 30, 'open', 3).totalM, 'spiral eats more than open');
ok(M.plan(60, 30, 'dense', 3).cords > M.plan(60, 30, 'open', 3).cords, 'dense packs more cords');
const s1 = M.stash(100, 120);
ok(s1.covers === true && s1.shortfall === 0, 'stash covers');
const s2 = M.stash(100, 87.5);
ok(s2.covers === false && s2.shortfall === 12.5, 'stash short');
const h1 = M.hanger(15, 80);
ok(h1.arms === 4 && h1.armCm > 80, 'hanger arms eat more than the drop');
// errors
function throws(fn, msg) { try { fn(); return false; } catch (e) { return e.message === msg; } }
ok(throws(() => M.plan(0, 30, 'open', 3), 'finished length must be positive'), 'zero length');
ok(throws(() => M.plan(60, 30, 'celtic', 3), 'unknown knot style'), 'bad style');
ok(throws(() => M.plan(60, 30, 'open', 0), 'cord thickness must be positive'), 'zero cord');
ok(throws(() => M.plan(60, NaN, 'open', 3), 'width must be a number'), 'NaN width');
ok(throws(() => M.stash(0, 10), 'meters needed must be positive'), 'zero needed');
ok(throws(() => M.stash(10, -5), 'meters on hand cannot be negative'), 'negative stash');
ok(throws(() => M.hanger(0, 80), 'pot diameter must be positive'), 'zero pot');
ok(throws(() => M.hanger(15, NaN), 'drop length must be a number'), 'NaN drop');
console.log(pass + '/' + (pass + fail) + ' checks pass');
process.exit(fail ? 1 : 0);
