/* Macrame math engine.
   Exact arithmetic over labeled knot-consumption norms.
   Patterns say "cut 8 cords of 3m"; the honest answer is multiplication. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.Macramemath = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  // Labeled norms from published macrame guidance.
  const STYLES = {
    open:   { label: 'open square knots',  factor: 4.0, spacingX: 1.5, note: 'airy net, the forgiving style' },
    dense:  { label: 'dense / double half hitch', factor: 5.5, spacingX: 0.8, note: 'solid fabric of knots - the rope eater' },
    spiral: { label: 'spiral sinnets',     factor: 6.0, spacingX: 1.2, note: 'half knots twisting down - the hungriest per cm' }
  };
  const FRINGE_CM = 15;  // labeled fringe allowance per end
  const LOOP_CM = 10;    // labeled fold-over allowance at the dowel

  function r2(x) { return Math.round(x * 100) / 100; }
  function pos(v, name) {
    if (typeof v !== 'number' || !isFinite(v)) throw new Error(name + ' must be a number');
    if (v <= 0) throw new Error(name + ' must be positive');
  }
  function style(key) {
    const s = STYLES[key];
    if (!s) throw new Error('unknown knot style');
    return s;
  }

  function plan(lengthCm, widthCm, styleKey, cordMm) {
    pos(lengthCm, 'finished length');
    pos(widthCm, 'width');
    pos(cordMm, 'cord thickness');
    const s = style(styleKey);
    const spacingMm = cordMm * s.spacingX;
    const cords = 2 * Math.max(1, Math.round(widthCm * 10 / spacingMm / 2));
    const workingCm = lengthCm * s.factor;
    const cutLenCm = 2 * (workingCm + FRINGE_CM) + LOOP_CM;
    const totalM = r2(cutLenCm * cords / 100);
    let verdict;
    if (totalM < 50) verdict = 'a weekend piece (labeled)';
    else if (totalM < 200) verdict = 'a proper wall hanging (labeled)';
    else verdict = 'a serious rope budget - measure the stash first (labeled)';
    return { cords: cords, cutLenCm: r2(cutLenCm), totalM: totalM, verdict: verdict, note: s.note };
  }

  function stash(totalM, onHandM) {
    pos(totalM, 'meters needed');
    if (typeof onHandM !== 'number' || !isFinite(onHandM)) throw new Error('meters on hand must be a number');
    if (onHandM < 0) throw new Error('meters on hand cannot be negative');
    const shortfall = r2(Math.max(0, totalM - onHandM));
    const covers = shortfall === 0;
    const verdict = covers ? 'the stash covers it (labeled)' : 'short by ' + shortfall + ' m - buy ' + Math.ceil(shortfall) + ' m (labeled)';
    return { covers: covers, shortfall: shortfall, verdict: verdict };
  }

  function hanger(potDiaCm, dropCm) {
    pos(potDiaCm, 'pot diameter');
    pos(dropCm, 'drop length');
    const arms = 4;                          // classic 4-arm hanger
    const armCm = dropCm * 1.5 + potDiaCm * Math.PI / 4 + 20; // labeled: knots eat half again, cup the pot, leave a tail
    const ringWrapCm = 50;                   // labeled gathering-knot wrap
    const totalM = r2((4 * armCm + ringWrapCm) / 100);
    const verdict = totalM < 20 ? 'one afternoon (labeled)' : 'a long evening of square knots (labeled)';
    return { arms: arms, armCm: r2(armCm), totalM: totalM, verdict: verdict };
  }

  return { plan: plan, stash: stash, hanger: hanger, styles: STYLES, constants: { FRINGE_CM: FRINGE_CM, LOOP_CM: LOOP_CM } };
});
