import { getAllFilesPathsFromFolderAsync } from './get-all-files-paths-from-folder-async';
import { getFileContentAsync } from './get-file-content';

// * ⬇️📂📄 Get all files contents from a folder, asynchronously
//  returns a promise
// 🗺️ folderLocation: folder to get file paths from, with trailing '/'
// ⚗️ extensions:     gather only files with those extensions
export async function getAllFilesContentsFromFolderAsync(
  folderLocation: string,
  extensions: Array<string> = [],
): Promise<Array<string> | null> {
  const filesPaths = await getAllFilesPathsFromFolderAsync(
    folderLocation,
    extensions,
  );

  // console.log(filesPaths);

  const promises: Array<Promise<string>> = [];
  filesPaths.forEach((filePath: string) => {
    const res = getFileContentAsync(filePath);
    // console.log(res);
    promises.push(res);
  });

  const result = await Promise.all(promises);

  // console.log(result);

  return result;
}
