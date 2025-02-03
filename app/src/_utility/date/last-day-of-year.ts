import { isDate } from '../types/is-date';

// * Return last day of year, for a specific date
// returns a Date
// 📝 Basé sur les dépassements au niveau de la créations des dates
//    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
export function lastDayOfYear(date: Date) {
  if (!isDate(date)) {
    const errorMsg = `🐛 lastDayOfYear > Error: '${date}' isn't a Date, typeof: '${typeof date}'`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  const year = date.getFullYear();
  //                                    v le premier mois de l'année d'après (months indéxés à 0 - 11)
  //                                    v  v le jour d'avant
  // const lastDayOfYear = new Date(year, 12, 0);
  // ^ 🍻 yeah c'est sûr c'est opti lel

  // ⚡️ Avoid as much Date calculation as possible
  const lastDayOfYear = new Date(year, 11, 31);

  // console.log('lastDayOfYear');
  // console.log(lastDayOfYear);

  return lastDayOfYear;
}
