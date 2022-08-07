function ensureDefined(value?: string): string {
  if (typeof value !== 'string') {
    const variableName = Object.keys({ value })[0];
    throw new Error(`Variable "${variableName} is not defined.`);
  }
  return value;
}

export const API_URL = ensureDefined(process.env.REACT_APP_API_URL);
