// * Test if year is a leap year
// 🥖 Année bissextile

// https://stackoverflow.com/questions/9852837/leap-year-check-using-bitwise-operators-amazing-speed/9852989#comment44363797_9852989
export function isLeapYear(year: number) {
  return !(year & 3 || (year & 15 && !(year % 25)));
}
