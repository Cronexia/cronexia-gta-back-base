// * 🗓️ - n
// cf. ./date-add-one-day.ts
export function substractNDaysToDate(date: Date, n: number) {
  // 🔀 Convert to Date, if needed
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const oneDayInMs = 86400000;
  const dateMinusNDay: Date = new Date(date.getTime() - oneDayInMs * n);

  // console.log(
  //   `substractNDaysToDate:
  //   Old date "${date.toLocaleDateString(
  //     'fr-FR',
  //   )}", - 1 day = "${dateMinusNDay.toLocaleDateString('fr-FR')}"`,
  // );
  return dateMinusNDay;
}
