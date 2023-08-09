function c(e) {
  const s = e < 0 ? Math.ceil : Math.floor, o = s(e % 1e3), t = s(e / 1e3), n = s(t / 60), d = s(n / 60);
  return {
    days: s(d / 24),
    hours: d % 24,
    minutes: n % 60,
    seconds: t % 60,
    milliseconds: o
  };
}
function y(e) {
  const s = typeof e == "number" ? c(e) : e;
  if (!s || typeof s != "object")
    throw new TypeError(`Invalid type passed to durationDisplay: ${s && typeof s}`);
  return Object.entries(s).reduce((o, [t, n]) => ((n || !o.length && t === "milliseconds") && o.push(`${n}${r[t][Math.abs(n) === 1 ? 0 : 1]}`), o), []).join(", ");
}
const r = {
  days: [" day", " days"],
  hours: ["h", "h"],
  minutes: ["m", "m"],
  seconds: ["s", "s"],
  milliseconds: ["ms", "ms"]
}, i = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 6e4 * 60,
  days: 6e4 * 60 * 24
}, u = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
};
export {
  u as DAY,
  i as MILLIS_AS,
  y as durationDisplay,
  c as parseDuration
};
