export const relativeBase = "threejs-experiments";
export const startingBaseRegExp = new RegExp(`^\\/${relativeBase}`);
export function containsRelativeBase() {
  return !!window.location.pathname.match(startingBaseRegExp);
}
