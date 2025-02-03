import { getAllFilesPathsFromFolderForCounterGeneration } from './get-all-files-paths-from-folder-for-counter-generation';
import { getFileJsonContentAsync } from './get-file-json-content';

// * ⬇️📂📄 Get all files JSON contents from a folder, asynchronously
//  returns a promise
// 🗺️ folderLocation: folder to get file paths from, with trailing '/'
// ⚗️ extensions:     gather only files with those extensions
export async function getAllFilesJsonContentsFromFolderAsync(
  folderLocation: string,
  extensions: Array<string> = [],
): Promise<Array<object> | null> {
  const filesPaths = await getAllFilesPathsFromFolderForCounterGeneration(
    folderLocation,
    extensions,
  );

  // console.log(filesPaths);

  const promises: Array<Promise<object>> = [];
  filesPaths.forEach((filePath: string) => {
    const res = getFileJsonContentAsync(filePath);
    // console.log(res);
    promises.push(res);
  });

  const result = await Promise.all(promises);

  // console.log(result);

  return result;
}
