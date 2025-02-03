// * ..📄 Extract and return name (without extension) from a filename or file path
// 'hey/file.name.with.dots.txt' > 'file.name.with.dots'

// https://stackoverflow.com/a/680982/12026487 > comments
export function getNameWithoutExtensionFromFileLocation(
  fileLocation: string,
): string | undefined {
  const re = /(.*)(?:\.)/;

  return re.exec(fileLocation)[1];
}
