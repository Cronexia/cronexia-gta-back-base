import { isDate } from '../types/is-date';
import { getDaysNumberInMonth } from './get-days-number-in-month';

// * Returns true if date is the last day of it's month, for a specific date
export function isLastDayOfMonth(date: Date) {
  if (!isDate(date)) {
    const errorMsg = `🐛 isLastDayOfMonth > Error: '${date}' isn't a Date, typeof: '${typeof date}'`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  const day = date.getDate(); // between 1 and 31

  // ⚡️ Avoid as much Date calculation as possible
  //      Shortest month is february
  if (day < 28) {
    return false;
  }

  const month = date.getMonth(); // between 0 and 11
  const year = date.getFullYear();

  // 🔀 Si HS > lastDayOfMonth.getDate()
  const daysNumber = getDaysNumberInMonth(month, year);

  const isLastDayOfMonth = day === daysNumber;

  //   console.log('isLastDayOfMonth');
  //   console.log(`day ${day} === daysNumberInMonth ${daysNumber}
  // > ${isLastDayOfMonth}`);

  return isLastDayOfMonth;
}
