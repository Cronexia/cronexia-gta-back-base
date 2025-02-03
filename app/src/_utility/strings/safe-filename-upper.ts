// 'YaY fu!n   _Yolo-' > 'YAY_FUN___YOLO-'
export function safeFilenameUpper(stringToConvert: string): string {
  // Uppercase
  stringToConvert = stringToConvert.toUpperCase();
  // Remove special chars
  // stringToConvert = stringToConvert.replace(/[^a-zA-Z0-9\-\_ ]/g, '');
  // 👷 A-Z Allow alphabetic chars, uppercase
  // 👷 0-9 Allow numbers
  // 👷 \-  Allow -
  // 👷 \_  Allow _
  // 👷 ' ' Allow spaces
  // 👷 Anything else get removed
  stringToConvert = stringToConvert.replace(/[^A-Z0-9\-\_ ]/g, '');
  // Replace spaces by underescore
  const result = stringToConvert.replace(/ /g, '_');
  // safeFilenameUpper('hYaY fu!n   _Yolo-');

  return result;
}
