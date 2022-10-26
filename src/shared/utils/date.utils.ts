import { TFunction } from 'i18next';
import {
  differenceInMinutes,
  differenceInSeconds,
  minutesToHours,
} from 'date-fns';

import { HOURS_IN_A_DAY, MINUTES_IN_AN_HOUR } from 'shared/consts/date';

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
