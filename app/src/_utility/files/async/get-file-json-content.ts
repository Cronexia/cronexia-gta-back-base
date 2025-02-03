import fs from 'fs';

// * ⬇️📄 Load JSON from a dedicated file, asynchronously
export async function getFileJsonContentAsync(
  jsonFilelocation: string,
): Promise<object | null> {
  // console.log(`loadJsonFromFile('${jsonFilelocation}')`);

  return new Promise((resolve, reject) => {
    fs.readFile(jsonFilelocation, 'utf8', (error, data) => {
      if (error) {
        console.error(
          `Error while loading JSON from file > app/src/_utility/files/load-json-from-file.ts > ${jsonFilelocation}`,
        );
        console.log(`ERROR: ${error}`);
        reject(error);
        return `ERROR: ${error}`;
      }

      const jsonData = JSON.parse(data); // Array of Objects
      // console.log(jsonData);
      // if (Array.isArray(jsonData)) {
      //   const length = jsonData.length;
      //   console.log(`${length} entries loaded from json.`);
      // }

      resolve(jsonData);
    });
  });
}
