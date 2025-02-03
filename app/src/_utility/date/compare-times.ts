import { convertTimeToNumber } from './convert-time-to-number';

// * Function to be used with Array.sort
// * Array filled with times > Ascending reorder
//    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
//        Remember that (a, b) => a - b sorts numbers in ascending order.
//        A negative value indicates that a should come before b.
//        A positive value indicates that a should come after b.
//        Zero or NaN indicates that a and b are considered equal.
//
// * Usage: ⏱️⬆️ Reorder > filter by property
//            times.sort(compareTimes);
export function compareTimes(a, b) {
  // console.log(`compareTimes(${a.time}, ${b.time})`);

  const aa = convertTimeToNumber(a.timeStart);
  const bb = convertTimeToNumber(b.timeStart);

  // console.log(`compareTimes numbered : ${aa} < ${bb} ? `, aa < bb);

  return aa < bb ? -1 : 1;
}
