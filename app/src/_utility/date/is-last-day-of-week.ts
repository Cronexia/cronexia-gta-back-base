import { isDate } from '../types/is-date';

// * Returns true if date is the last day of the week, for a specific date
export function isLastDayOfWeek(date: Date) {
  if (!isDate(date)) {
    const errorMsg = `🐛 isLastDayOfWeek > Error: '${date}' isn't a Date, typeof: '${typeof date}'`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  return date.getDay() === 0;
}
