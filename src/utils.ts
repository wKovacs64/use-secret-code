export function isEqual<T>(array1: T[], array2: T[]): boolean {
  return JSON.stringify(array1) === JSON.stringify(array2);
}

export function takeRight<T>(array: T[], n: number): T[] {
  if (n < 1) return [];
  return array.slice(-1 * n);
}
