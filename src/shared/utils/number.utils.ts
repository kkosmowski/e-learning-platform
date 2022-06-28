export const average = (values: number[], toFixed?: number): number => {
  const rawAverage =
    values.reduce((sum, value) => sum + value, 0) / values.length;

  if (typeof toFixed === 'number') {
    return Number(rawAverage.toFixed(toFixed));
  }

  return rawAverage;
};
