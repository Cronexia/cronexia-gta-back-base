// * 📅 > ⏱️
export function convertDateToTime(date: Date | string) {
  // console.log(`convertDateToTime( ${date} ), typeof date : ${typeof date}`);

  // 🔀 Convert to Date, if needed
  if (typeof date === 'string') {
    date = new Date(date);
  }

  // Removes Date
  //      "2024-04-07T12:34:56.000Z" > "12:34:56.000Z"
  let time = date.toISOString().slice(-13);

  // Remove ms "12:34:56.000Z" > "12:34:56Z"
  time = `${time.slice(0, 8)}Z`;
  return time;
}
