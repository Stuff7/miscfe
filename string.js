function n(t) {
  return t == null ? t : typeof t == "object" ? JSON.stringify(t) : String(t);
}
export {
  n as stringify
};
