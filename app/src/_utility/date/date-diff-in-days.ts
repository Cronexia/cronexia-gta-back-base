// * 🧮 = 📅 - 📅
// * Compare 2 dates and return the result in days.
//      Signed result
//         01/04 vs 15/04 = 15 days
//         15/04 vs 01/04 = 🚨 - 15 days
export function dateDiffInDays(date1: Date, date2: Date) {
  const dateDiffInDays = Math.ceil(
    (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24),
  );

  // console.log(
  //   `dateDiffInDays(${date1.toLocaleDateString(
  //     'fr-FR',
  //   )}, ${date2.toLocaleDateString('fr-FR')}) = ${dateDiffInDays} day${
  //     dateDiffInDays > 1 ? 's' : ''
  //   }`,
  // );
  return dateDiffInDays;
}
