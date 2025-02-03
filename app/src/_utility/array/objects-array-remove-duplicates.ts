// * ⚗️👥 Remove duplicates from an Array of complex objects
//    1. Convert to an Array of strings
//    2. Convert to Set // array w only uniques
//    3. Convert Set back to array of objects, without duplicates
export function objectsArrayRemoveDuplicates(
  arrayOfObjects: Array<object>,
): Array<object> {
  // console.log(`👥 objectsArrayRemoveDuplicates, Array with duplicates`);
  // console.log(arrayOfObjects);
  // // console.log(JSON.stringify(arrayOfObjects));

  const arrayOfStrings = arrayOfObjects.map((x) => JSON.stringify(x));
  const arrayOfUniqueObjects = [...new Set(arrayOfStrings)].map((x) =>
    JSON.parse(x),
  );

  // console.log('---');
  // console.log(`⚗️👥 Same array without duplicates`);
  // console.log(arrayOfUniqueObjects);
  // console.log('---');

  return arrayOfUniqueObjects;
}
