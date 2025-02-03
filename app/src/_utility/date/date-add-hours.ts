// * 🗓️ + ⌚
export function addHoursToDate(date: Date, hours: number) {
  // * 🐛 cf. src/_utility/date/date-add-one-day.ts

  // * ✅ Convert in and out to UTC to change Day
  //          Gestion des clones
  //          Gestion des changements d'heures / été, etc.
  // const oneHourInMs = 60 * 60 * 1000;
  const oneHourInMs = 3600000;
  // console.log(date.getTime());
  // console.log(new Date(date.getTime()));
  // console.log(new Date(date.getTime() + oneDayInMs));
  const datePlusHours: Date = new Date(date.getTime() + hours * oneHourInMs);

  // console.log(
  //   `Old date "${date.toLocaleDateString(
  //     'fr-FR',
  //   )}", + 1 day = "${datePlusHours.toLocaleDateString('fr-FR')}"`,
  // );
  return datePlusHours;
}
