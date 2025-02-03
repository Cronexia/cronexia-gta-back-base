import fs from 'fs';
import { getExtensionFromFileLocation } from '../get-extension-from-file-location';

// * ⬇️📄💬 Get all files location from a folder
//  returns a promise
// 🗺️ folderLocation: folder to get file paths from, with trailing '/'
// ⚗️ extensions:     gather only files with those extensions
export async function getAllFilesPathsFromFolderAsync(
  folderLocation: string,
  extensions: Array<string> = [],
): Promise<Array<string> | null> {
  return new Promise((resolve, reject) => {
    // * Load filenames
    fs.readdir(folderLocation, 'utf8', (err, fileNames) => {
      if (err) {
        console.error(err);
        reject(err);
        throw new Error(`Something went wrong, see console.\nError: ${err}`);
      }
      // * Filter files by extension
      if (extensions.length > 0) {
        fileNames = fileNames.reduce(
          (result: Array<string>, fileName: string) => {
            const fileExtension = getExtensionFromFileLocation(fileName);
            if (extensions.includes(fileExtension)) {
              result.push(fileName);
            }
            return result;
          },
          [],
        );
      }

      // * Add path in front of files
      const filePaths = fileNames.reduce(
        (result: Array<string>, fileName: string) => {
          result.push(folderLocation + fileName);
          return result;
        },
        [],
      );

      resolve(filePaths);
    });
  });
}
