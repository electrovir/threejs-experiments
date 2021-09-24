export function deleteArrayIndexes(array, indexes) {
  return array.filter((_, index) => !indexes.includes(index));
}
