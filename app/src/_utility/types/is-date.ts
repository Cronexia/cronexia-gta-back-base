// * Déterminer s'il s'agit d'une date
//    cf. SO / https://stackoverflow.com/a/643827/12026487

export function isDate(toTest: any) {
  // console.log(toTest instanceof Date);
  // console.log(Object.prototype.toString.call(toTest) === '[object Date]');

  return Object.prototype.toString.call(toTest) === '[object Date]';
}
