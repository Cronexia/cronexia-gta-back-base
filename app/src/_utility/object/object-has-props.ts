// * 📌 Test to see if an object has any property
//        📝 https://stackoverflow.com/a/39565817/12026487
// Return
//    No prop   > false
//        ~= {}
//    1+ props  > true
//        ~= { whatever: 'stuff' }
export function objectHasProps(object: object): boolean {
  return Object.keys(object).length > 0;
}
