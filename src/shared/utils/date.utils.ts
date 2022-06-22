import { TFunction } from 'i18next';
import { differenceInMinutes, minutesToHours } from 'date-fns';

import {
  DAY,
  HOUR,
  HOURS_IN_A_DAY,
  MINUTES_IN_AN_HOUR,
} from 'shared/consts/date';

export const timeLeft = (t: TFunction, deadline: Date): [string, number] => {
  const diffInMinutes = differenceInMinutes(deadline, new Date());
  let timeLeftString;

  if (diffInMinutes < 0) {
    timeLeftString = t('pastDeadline');
  } else if (diffInMinutes > DAY / 1000) {
    timeLeftString = `${Math.ceil(
      minutesToHours(diffInMinutes) / HOURS_IN_A_DAY
    )} ${t('daysLeft')}`;
  } else if (diffInMinutes > HOUR / 1000) {
    timeLeftString = `${Math.ceil(
      minutesToHours(diffInMinutes) / MINUTES_IN_AN_HOUR
    )} ${t('hoursLeft')}`;
  } else {
    timeLeftString = `${diffInMinutes} ${t('minutesLeft')}`;
  }

  return [timeLeftString, diffInMinutes];
};

export const isPastDate = (date: Date): boolean =>
  new Date().getTime() > date.getTime();
