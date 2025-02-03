// * Function to be used with Array.sort
// * Array filled with times > Ascending reorder
//    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
//        Remember that (a, b) => a - b sorts numbers in ascending order.
//        A negative value indicates that a should come before b.
//        A positive value indicates that a should come after b.
//        Zero or NaN indicates that a and b are considered equal.
//
// * Usage: ⬆️📁 Reorder > filter by property
//            resources.sort(compareResources);
export function compareResources(a, b) {
  // console.log(`compareResources(${a}, ${b})`);

  // * Compare either matricule or idResource or resourceId
  if (a.hasOwnProperty('matricule') && b.hasOwnProperty('matricule')) {
    // console.log(
    //   `compareResources by matricule : ${a.matricule} < ${b.matricule} ? `,
    //   a.matricule < b.matricule,
    // );
    return a.matricule < b.matricule ? -1 : 1;
  }
  if (a.hasOwnProperty('idResource') && b.hasOwnProperty('idResource')) {
    // console.log(
    //   `compareResources by idResource : ${a.idResource} < ${b.idResource} ? `,
    //   a.idResource < b.idResource,
    // );
    return a.idResource < b.idResource ? -1 : 1;
  }
  if (a.hasOwnProperty('resourceId') && b.hasOwnProperty('resourceId')) {
    // console.log(
    //   `compareResources by resourceId : ${a.resourceId} < ${b.resourceId} ? `,
    //   a.resourceId < b.resourceId,
    // );
    return a.resourceId < b.resourceId ? -1 : 1;
  }

  console.error(
    `In order to be compared, 2 Resources must have in common one of those props: matricule, idResource, resourceId`,
  );
  return 0;
}
