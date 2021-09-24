export function areRoutesEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((entryA, index) => b[index] === entryA);
}
