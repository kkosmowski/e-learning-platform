import { TFunction } from 'i18next';
import { differenceInMinutes } from 'date-fns';

import { HOURS_IN_A_DAY, MINUTE, MINUTES_IN_AN_HOUR } from 'shared/consts/date';

export const timeLeft = (t: TFunction, deadline: Date): [string, number] => {
  const diffInMinutes = differenceInMinutes(deadline, new Date());
  const timeLeftString =
    diffInMinutes < 0
      ? t('pastDeadline')
      : getReadableTimeDifference(deadline, new Date(), t, {
          shouldRound: true,
          short: true,
        });

  return [timeLeftString, diffInMinutes];
};

export const dateStringToUTCString = (dateString: string): string =>
  dateString + 'Z';

export const isPastDate = (date: Date): boolean =>
  new Date().getTime() > date.getTime();

export const isDateAfterAnother = (date: Date, anotherDate: Date): boolean =>
  date.getTime() > anotherDate.getTime();

export const getReadableTimeDifference = (
  date1: Date,
  date2: Date,
  t: TFunction,
  options?: { shouldRound?: boolean; short?: boolean }
) => {
  return getReadableDuration(
    (date1.getTime() - date2.getTime()) / MINUTE,
    t,
    options
  );
};

export const getReadableDuration = (
  _duration: number,
  t: TFunction,
  options: { shouldRound?: boolean; short?: boolean } = {}
): string => {
  const { shouldRound = false, short = false } = options;
  let duration = _duration;
  let roundTo: 'hours' | 'minutes' | undefined;

  if (duration < 0 || Number.isNaN(duration)) {
    return '';
  }

  const values: { [key: string]: number } = {};

  const days = Math.floor(duration / (MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY));
  if (days > 0) {
    duration -= days * (MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY);
    values['days'] = days;
    if (shouldRound) {
      roundTo = 'hours';
    }
  }

  const hours = Math.floor(duration / MINUTES_IN_AN_HOUR);
  const minutes = duration % MINUTES_IN_AN_HOUR;

  if (hours > 0) {
    if (!roundTo && shouldRound) {
      roundTo = 'minutes';
    }
    values['hours'] = roundTo === 'hours' ? Math.round(hours) : hours;
  }
  if (minutes > 0 && (!roundTo || roundTo === 'minutes')) {
    values['minutes'] = Math.round(minutes);
  }

  return translateDuration(values, t, short);
};

const getPlural = (n: number, translationKey: 'hours' | 'minutes') => {
  if (n % 10 > 1 && n % 10 < 5 && (n % 100 < 10 || n % 100 > 20)) {
    return translationKey + 1;
  }
  return translationKey + 2;
};

export const translateDuration = (
  values: { [key: string]: number },
  t: TFunction,
  short?: boolean
) => {
  const { days, hours, minutes } = values;
  const resultArr = [];

  if (short) {
    if (days) resultArr.push(t('common:short.days', { days }));
    if (hours) resultArr.push(t('common:short.hours', { hours }));
    if (minutes) resultArr.push(t('common:short.minutes', { minutes }));
  } else {
    if (days > 1) {
      resultArr.push(t('common:days', { days }));
    } else if (days === 1) {
      resultArr.push(t('common:1day'));
    }

    if (hours > 1) {
      resultArr.push(t('common:' + getPlural(hours, 'hours'), { hours }));
    } else if (hours === 1) {
      resultArr.push(t('common:1hour'));
    }

    if (minutes > 1) {
      resultArr.push(t('common:' + getPlural(minutes, 'minutes'), { minutes }));
    } else if (minutes === 1) {
      resultArr.push(t('common:1minute'));
    }
  }

  const spacer = short ? ', ' : ' ' + t('common:and');
  if (resultArr.length === 3) {
    return `${resultArr[0]}, ${resultArr[1]}${spacer} ${resultArr[2]}`;
  }
  if (resultArr.length === 2) {
    return `${resultArr[0]}${spacer} ${resultArr[1]}`;
  }
  return resultArr[0];
};
