export function stringify<T>(value: T) {
  if (value === null) {
    return null;
  }
  return typeof value === "object" ?
    JSON.stringify(value) :
    `${value}`;
}
