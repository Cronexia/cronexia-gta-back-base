import { isDate } from '../types/is-date';
// import { dateDiffInDays } from './date-diff-in-days';
// import { lastDayOfYear } from './last-day-of-year';

// * Returns true if date is the last day of it's year, for a specific date
export function isLastDayOfYear(date: Date) {
  if (!isDate(date)) {
    const errorMsg = `🐛 isLastDayOfYear > Error: '${date}' isn't a Date, typeof: '${typeof date}'`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // 🍻
  // const lastDayOfYearDate = lastDayOfYear(date);
  // const isLastDayOfYear = dateDiffInDays(date, lastDayOfYearDate) < 2;

  //   console.log('isLastDayOfYear');
  //   console.log(`date ${date} === lastDayOfYearDate ${lastDayOfYearDate}
  // > ${isLastDayOfYear}`);

  // return isLastDayOfYear;

  // ⚡️ Avoid as much Date calculation as possible
  const day = date.getDate(); // between 1 and 31
  const month = date.getMonth(); // between 0 and 11

  return day === 31 && month === 11;
}
