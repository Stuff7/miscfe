function f(s, c) {
  const o = [{ obj1: s, obj2: c }];
  for (; o.length; ) {
    const { obj1: t, obj2: e } = o.pop();
    if (t !== e) {
      if (typeof t != "object" || t === null || typeof e != "object" || e === null)
        return !1;
      const r = Object.keys(t), l = Object.keys(e);
      if (r.length !== l.length)
        return !1;
      for (const n of r) {
        if (!Object.prototype.hasOwnProperty.call(e, n))
          return !1;
        o.push({ obj1: t[n], obj2: e[n] });
      }
    }
  }
  return !0;
}
export {
  f as deepCompare
};
