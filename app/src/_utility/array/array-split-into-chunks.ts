// * Split massive array into smaller chunks, in order to batch process
// [.........] => [[...] + [...] + [...]]
// https://stackoverflow.com/a/8495740/12026487
export function arraySplitIntoChunks(arrayToSplit, chunkSize = 2) {
  const splittedArrays = [];
  for (let i = 0; i < arrayToSplit.length; i += chunkSize) {
    const chunk = arrayToSplit.slice(i, i + chunkSize);
    // do whatever
    splittedArrays.push(chunk);
  }
  return splittedArrays;
}
