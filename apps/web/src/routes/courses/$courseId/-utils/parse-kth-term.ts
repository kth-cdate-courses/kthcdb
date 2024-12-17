export function parseKthTerm(value: string) {
  return {
    year: parseInt(value.slice(0, 4)),
    period: parseInt(value.slice(4)),
  };
}
