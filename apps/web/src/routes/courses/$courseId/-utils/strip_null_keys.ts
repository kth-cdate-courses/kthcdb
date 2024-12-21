export function stripNullKeys<T extends object>(object: T): T {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      // @ts-expect-error to lazy to fix
      acc[key] = value;
    }
    return acc;
  }, {} as T);
}
