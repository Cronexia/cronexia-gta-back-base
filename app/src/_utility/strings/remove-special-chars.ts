// 'YaY fu!n   _Yolo-' > 'YaY fun  Yolo'
export function removeSpecialChars(stringToConvert: string): string {
  // Remove special chars
  // stringToConvert = stringToConvert.replace(/[^a-zA-Z0-9 ]/g, '');
  // 👷 A-Z Allow alphabetic chars, uppercase
  // 👷 a-z Allow alphabetic chars, lowercase
  // 👷 0-9 Allow numbers
  // 👷 ' ' Allow spaces
  // 👷 Anything else get removed
  return stringToConvert.replace(/[^A-Za-z0-9 ]/g, '');
}
