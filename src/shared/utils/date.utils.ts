import { TFunction } from 'i18next';
import {
  differenceInMinutes,
  differenceInSeconds,
  minutesToHours,
} from 'date-fns';

import { HOURS_IN_A_DAY, MINUTE, MINUTES_IN_AN_HOUR } from 'shared/consts/date';

export const timeLeft = (t: TFunction, deadline: Date): [string, number] => {
  const diffInSeconds = differenceInSeconds(deadline, new Date());
  const diffInMinutes = differenceInMinutes(deadline, new Date());
  let timeLeftString;

  if (diffInSeconds <= 0) {
    timeLeftString = t('pastDeadline');
  } else if (diffInMinutes > MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY) {
    timeLeftString = `${Math.ceil(
      minutesToHours(diffInMinutes) / HOURS_IN_A_DAY
    )} ${t('daysLeft')}`;
  } else if (diffInMinutes > MINUTES_IN_AN_HOUR) {
    timeLeftString = `${Math.ceil(minutesToHours(diffInMinutes))} ${t(
      'hoursLeft'
    )}`;
  } else {
    timeLeftString = `${diffInMinutes} ${t('minutesLeft')}`;
  }

  return [timeLeftString, diffInMinutes];
};

export const dateStringToUTCString = (dateString: string): string =>
  dateString + 'Z';

export const isPastDate = (date: Date): boolean =>
  new Date().getTime() > date.getTime();

export const getReadableTimeDifference = (
  date1: Date,
  date2: Date,
  t: TFunction
) => {
  return getReadableDuration((date1.getTime() - date2.getTime()) / MINUTE, t);
};

export const getReadableDuration = (_duration: number, t: TFunction) => {
  let duration = _duration;

  if (duration < 0 || Number.isNaN(duration)) {
    return '';
  }

  const values: { [key: string]: number } = {};

  const days = Math.floor(duration / (MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY));
  if (days > 0) {
    duration -= days * (MINUTES_IN_AN_HOUR * HOURS_IN_A_DAY);
    values['days'] = days;
  }

  const hours = Math.floor(duration / MINUTES_IN_AN_HOUR);
  const minutes = duration % MINUTES_IN_AN_HOUR;

  if (hours > 0) {
    values['hours'] = hours;
  }
  if (minutes > 0) {
    values['minutes'] = minutes;
  }

  return translateDuration(values, t);
};

const getPlural = (n: number, translationKey: 'hours' | 'minutes') => {
  if (n % 10 > 1 && n % 10 < 5 && (n % 100 < 10 || n % 100 > 20)) {
    return translationKey + 1;
  }
  return translationKey + 2;
};

export const translateDuration = (
  values: { [key: string]: number },
  t: TFunction
) => {
  const { days, hours, minutes } = values;
  const resultArr = [];

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

  if (resultArr.length === 3) {
    return `${resultArr[0]}, ${resultArr[1]} ${t('common:and')} ${
      resultArr[2]
    }`;
  }
  if (resultArr.length === 2) {
    return `${resultArr[0]} ${t('common:and')} ${resultArr[1]}`;
  }
  return resultArr[0];
};
