import { isDate } from '../types/is-date';
import { addNDaysToDate } from './date-add-n-days';

// * Return last day of week, for a specific date
// returns a Date

export function lastDayOfWeek(date: Date) {
  if (!isDate(date)) {
    const errorMsg = `🐛 lastDayOfWeek > Error: '${date}' isn't a Date, typeof: '${typeof date}'`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  // Which day of the week is it ?
  // Sunday - Saturday : 0 - 6
  const dayIndex = date.getDay();

  // Already sunday
  if (dayIndex === 0) {
    return date;
  }

  // Else, add missing amount of days
  const numberOfDaysInAWeek = 7;
  const numberOfDaysToAdd = numberOfDaysInAWeek - dayIndex;

  // console.log(dayIndex);
  // console.log(numberOfDaysToAdd);

  return addNDaysToDate(date, numberOfDaysToAdd);
}
