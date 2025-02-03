import { isDate } from '../types/is-date';

// * Return last day of month, for a specific date
// returns a Date
// 📝 Basé sur les dépassements au niveau de la créations des dates
//    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
export function lastDayOfMonth(date: Date) {
  if (!isDate(date)) {
    const errorMsg = `🐛 lastDayOfMonth > Error: '${date}' isn't a Date, typeof: '${typeof date}'`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  const month = date.getMonth(); // between 0 and 11
  const year = date.getFullYear();
  //                                      v le mois d'après
  //                                      v        v le jour d'avant
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // console.log('lastDayOfMonth');
  // console.log(lastDayOfMonth);

  return lastDayOfMonth;
}
