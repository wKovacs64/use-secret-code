export function isEqual<T>(array1: Array<T>, array2: Array<T>): boolean {
  return JSON.stringify(array1) === JSON.stringify(array2);
}

export function takeRight<T>(array: Array<T>, n: number): Array<T> {
  if (n < 1) return [];
  return array.slice(-1 * n);
}
