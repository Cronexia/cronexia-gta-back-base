// * 🗓️ + 1
export function addOneDayToDate(date: Date) {
  // 🔀 Convert to Date, if needed
  if (typeof date === 'string') {
    date = new Date(date);
  }

  // ---

  // * 🐛 Make a clone to prevent reference affectation
  //    🐛 Using to fill Array in loop > Avoid getting all dates == last date
  // date = new Date(date.getTime());

  // * 💥🐛 Ne gère pas les décalages heures d'été ~31 mars > 01 avril
  //    SO / https://stackoverflow.com/a/10040679/12026487 > comment 6
  //      "daylight saving times"
  //        👷🐛 const d = new Date('2024-03-31');
  //        👷🐛 console.log(d); // 2024-03-31T00:00:00.000Z
  //        👷🐛 console.log(addOneDayToDate(d)); // 2024-💥03-💥31T💥23:00:00.000Z // ~= 01/04 00:00 minus 1 hour
  // const datePlusOneDay: Date = new Date(date.getTime());
  // datePlusOneDay.setDate(date.getDate() + 1);

  // * ✅ Convert in and out to UTC to change Day
  //          Gestion des clones
  //          Gestion des changements d'heures / été, etc.
  const oneDayInMs = 86400000;
  // console.log(date.getTime());
  // console.log(new Date(date.getTime()));
  // console.log(new Date(date.getTime() + oneDayInMs));
  const datePlusOneDay: Date = new Date(date.getTime() + oneDayInMs);

  // console.log(
  //   `addOneDayToDate:
  //   `Old date "${date.toLocaleDateString(
  //     'fr-FR',
  //   )}", + 1 day = "${datePlusOneDay.toLocaleDateString('fr-FR')}"`,
  // );
  return datePlusOneDay;
}
