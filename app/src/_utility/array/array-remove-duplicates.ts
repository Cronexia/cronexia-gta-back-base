// * ⚗️👥 Remove duplicates from an Array of simple objects
//    1. Convert to Set // array w only uniques
//    2. Convert Set back to array of objects, without duplicates
export function arrayRemoveDuplicates(
  // Array of primitives types
  array: Array<number | string | boolean | undefined | null | bigint>,
): Array<number | string | boolean | undefined | null | bigint> {
  // console.log(`👥 arrayRemoveDuplicates, Array with duplicates`);
  // console.log(array);
  // // console.log(JSON.stringify(array));

  const arrayOfUniqueStuff = [...new Set(array)];

  // console.log('---');
  // console.log(`⚗️👥 Same array without duplicates`);
  // console.log(arrayOfUniqueStuff);
  // console.log('---');

  return arrayOfUniqueStuff;
}
