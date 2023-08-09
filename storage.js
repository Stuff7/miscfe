import { stringify as a } from "./string.js";
let r = "MISCFE";
function n(e) {
  return `${r}__${e}`;
}
function m(e) {
  r = e;
}
function i(e, l = null, o = null) {
  const t = localStorage.getItem(n(e));
  return t ? o ? o(t) : t : l;
}
function u(e, l) {
  const o = n(e), t = a(l);
  t == null ? localStorage.removeItem(o) : localStorage.setItem(o, t);
}
function f(e) {
  localStorage.removeItem(n(e));
}
export {
  i as getLocalItem,
  f as removeLocalItem,
  u as setLocalItem,
  m as setLocalNamespace
};
