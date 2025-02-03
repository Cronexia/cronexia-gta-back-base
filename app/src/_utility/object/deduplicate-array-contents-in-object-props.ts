import { objectsArrayRemoveDuplicates } from '../array/objects-array-remove-duplicates';

// * ⚗️👥 Remove duplicated custom fields
// Dedup
//    ResourceField
//    CycleReference
//    ScheduleReference
export function deduplicateArrayContentsInObjectProps(
  object: object,
): object | null {
  if (object === null) {
    return null;
  }

  for (const prop in object) {
    object[prop] = objectsArrayRemoveDuplicates(object[prop] as Array<any>);
  }

  return object;
}
