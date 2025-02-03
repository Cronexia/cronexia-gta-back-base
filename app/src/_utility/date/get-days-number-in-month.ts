// * Get the number of days in a month
// https://stackoverflow.com/a/27947860/12026487
export function getDaysNumberInMonth(month: number, year: number) {
  // In js month are 0 based through Date.getMonth()
  month++;
  const daysNumber =
    month === 2
      ? year & 3 || (!(year % 25) && year & 15)
        ? 28
        : 29
      : 30 + ((month + (month >> 3)) & 1);

  // console.log('getDaysNumberInMonth');
  // console.log(daysNumber);

  return daysNumber;
}
