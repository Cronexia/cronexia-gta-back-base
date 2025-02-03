// * Function to be used with Array.sort
// * Array filled with times > Ascending reorder
//    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
//        Remember that (a, b) => a - b sorts numbers in ascending order.
//        A negative value indicates that a should come before b.
//        A positive value indicates that a should come after b.
//        Zero or NaN indicates that a and b are considered equal.
//
// * Usage: ⬆️📅 Reorder > filter by property
//            dates.sort(compareDates);
export function compareDates(a, b) {
  // console.log(`compareDates(${a.date}, ${b.date})`);

  // 🔀 Convert to Dates, if needed
  if (typeof a.date === 'string') {
    a.date = new Date(a.date);
  }
  if (typeof b.date === 'string') {
    b.date = new Date(b.date);
  }

  const aa = a.date.getTime();
  const bb = b.date.getTime();

  // console.log(`compareDates numbered : ${aa} < ${bb} ? `, aa < bb);

  return aa < bb ? -1 : 1;
}
