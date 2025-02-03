// 'YaY fu!n   _Yolo-' > 'yayFunYolo'
export function toCamelCase(stringToConvert: string): string {
  const result = stringToConvert
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) =>
      idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase(),
    )
    .replace(/\s+/g, '');

  return result;
}
