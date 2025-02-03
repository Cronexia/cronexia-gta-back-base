// * 🗓️ + n
// cf. ./date-add-one-day.ts
export function addNDaysToDate(date: Date, n: number) {
  // 🔀 Convert to Date, if needed
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const oneDayInMs = 86400000;
  const datePlusNDays: Date = new Date(date.getTime() + oneDayInMs * n);

  // console.log(
  //   `addNDaysToDate:
  //    Old date "${date.toLocaleDateString(
  //     'fr-FR',
  //   )}", + 1 day = "${datePlusNDays.toLocaleDateString('fr-FR')}"`,
  // );
  return datePlusNDays;
}
