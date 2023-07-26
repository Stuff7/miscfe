export function stringify<T>(value: T) {
  if (value == null) {
    return value as null | undefined;
  }
  return typeof value === "object" ?
    JSON.stringify(value) :
    String(value);
}
