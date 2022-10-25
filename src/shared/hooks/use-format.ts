import { format as formatFn } from 'date-fns-tz';

//@todo check if this is needed
export function useFormat() {
  return (date: Date, format: string) =>
    formatFn(date, format, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
}
