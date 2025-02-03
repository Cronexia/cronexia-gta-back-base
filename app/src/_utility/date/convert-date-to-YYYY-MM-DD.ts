// * 📅 > YYYY-MM-DD
// Date("2023-12-15T00:00:00.000Z") to "2023-12-15"
export function convertDateToYYYYMMDD(
  date: Date | string,
  withDashes: boolean = true,
): string {
  // console.log(`convertDateToYYYYMMDD( ${date} ), typeof date : ${typeof date}`);

  // 🔀 Convert to Date, if needed
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString();
  const dd = date.getDate().toString();

  const mmChars = mm.split('');
  const ddChars = dd.split('');

  const monthString = mmChars[1] ? mm : '0' + mmChars[0];
  const dayString = ddChars[1] ? dd : '0' + ddChars[0];
  const dashString = withDashes ? '-' : '';

  const convertedDate: string = `${yyyy}${dashString}${monthString}${dashString}${dayString}`;
  // console.log(`Converted date: ${convertedDate}`);
  return convertedDate;
}
