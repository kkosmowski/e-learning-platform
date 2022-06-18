import { MEGABYTE } from 'shared/consts/file';

export const bytesToKilobytes = (
  bytes: number,
  roundTo?: number,
  suffix?: boolean
): number | string => {
  let kilobytes: string | number = bytes / 1024;

  if (roundTo) {
    kilobytes = kilobytes.toFixed(roundTo);
  }

  if (suffix) {
    return `${kilobytes} KB`;
  }
  return kilobytes;
};

export const bytesToMegabytes = (
  bytes: number,
  roundTo?: number,
  suffix?: boolean
): number | string => {
  let megabytes: string | number = bytes / (1024 * 1024);

  if (roundTo) {
    megabytes = megabytes.toFixed(roundTo);
  }

  if (suffix) {
    return `${megabytes} MB`;
  }
  return megabytes;
};

export const bytesToKilobytesOrMegabytes = (
  bytes: number,
  boundary = MEGABYTE,
  roundTo?: number,
  suffix?: boolean
): number | string => {
  if (bytes > boundary) {
    return bytesToMegabytes(bytes, roundTo, suffix);
  }
  return bytesToKilobytes(bytes, roundTo, suffix);
};
