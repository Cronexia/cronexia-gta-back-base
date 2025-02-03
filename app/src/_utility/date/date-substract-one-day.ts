// * 🗓️ - 1
// cf. ./date-add-one-day.ts
export function substractOneDayToDate(date: Date) {
  // 🔀 Convert to Date, if needed
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const oneDayInMs = 86400000;
  const dateMinusOneDay: Date = new Date(date.getTime() - oneDayInMs);

  // console.log(
  //   `substractOneDayToDate:
  //   `Old date "${date.toLocaleDateString(
  //     'fr-FR',
  //   )}", - 1 day = "${dateMinusOneDay.toLocaleDateString('fr-FR')}"`,
  // );
  return dateMinusOneDay;
}
