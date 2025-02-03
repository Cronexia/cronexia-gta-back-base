import fs from 'fs';

// * ⬇️📄 Load file content, asynchronously
//  returns a promise
export async function getFileContentAsync(
  fileLocation: string,
): Promise<string | null> {
  return new Promise((resolve, reject) => {
    fs.readFile(fileLocation, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
        throw new Error(`Something went wrong, see console.\nError: ${err}`);
      }
      resolve(data);
    });
  });
}
