// * 📄.. Extract and return extension from a filename or file path
// 'hey/file.name.with.dots.txt' > 'txt'

// https://stackoverflow.com/a/680982/12026487
export function getExtensionFromFileLocation(
  fileLocation: string,
): string | undefined {
  const re = /(?:\.([^./]+))?$/;

  return re.exec(fileLocation)[1];
}
