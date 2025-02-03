// * From a date get next monday. Returns same day if already a monday
// https://stackoverflow.com/a/33078673/12026487
export function getNextMonday(date: string | Date) {
  // console.log('getNextMonday > date');
  // console.log(date);

  // 🔀 Convert to Dates, if needed
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const nextMonday = new Date(date.getTime());
  nextMonday.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7));

  // console.log('getNextMonday > nextMonday');
  // console.log(nextMonday);

  return nextMonday;
}
