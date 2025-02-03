import fs, { Dirent } from 'fs';
import { getExtensionFromFileLocation } from '../get-extension-from-file-location';

// * ⬇️📄💬 Get all files location from a folder
//  returns a promise
// 🗺️ folderLocation: folder to get file paths from, with trailing '/'
// ⚗️ extensions:     gather only files with those extensions
export async function getAllFilesPathsFromFolderForCounterGeneration(
  folderLocation: string,
  extensions: Array<string> = [],
): Promise<Array<string> | null> {
  const options: {
    encoding: BufferEncoding | null;
    withFileTypes?: boolean | undefined;
    recursive?: boolean | undefined;
  } = {
    encoding: 'utf8',
    withFileTypes: true,
    recursive: true,
  };

  // TODO: Convert to Set()
  const results: Array<string> = [];

  // * Load filenames
  // TG > https://nodejs.org/api/fs.html#fsreaddirpath-options-callback
  // TG > https://devdocs.io/node/fs#fsreaddirpath-options-callback
  // sans déconner juste STFU linter de merde
  // eslint-disable-next-line
  // prettier-ignore
  // * Avec option.withFileTypes = true, ne renvoie plus un Array<string> mais des <fs.Dirent>
  const locations:Array<Dirent> = await fs.readdirSync(folderLocation, options);

  console.log('getAllFilesPathsFromFolderForCounterGeneration > locations');
  // console.log(locations);
  // console.log();

  // * Also load all files in root folder
  const foldersToLoad: Set<string> = new Set();
  // ! go napalm 🔥 juste virer tous les putains de './' aléatoires
  let folderLocationSANSDOTSLASHLOL = folderLocation;
  if (folderLocationSANSDOTSLASHLOL.slice(0, 2) == './') {
    folderLocationSANSDOTSLASHLOL = folderLocationSANSDOTSLASHLOL.slice(2);
  }
  if (folderLocationSANSDOTSLASHLOL.slice(0, 2) == './') {
    folderLocationSANSDOTSLASHLOL = folderLocationSANSDOTSLASHLOL.slice(2);
  }
  if (folderLocationSANSDOTSLASHLOL.slice(0, 2) == './') {
    folderLocationSANSDOTSLASHLOL = folderLocationSANSDOTSLASHLOL.slice(2);
  }
  foldersToLoad.add(folderLocationSANSDOTSLASHLOL);

  for (let i = 0; i < locations.length; i++) {
    const dirent = locations[i];
    console.log(`${dirent.parentPath}\n\t${dirent.name}`);
    // console.log(`\t\tisDirectory : ${dirent.isDirectory()}`);
    // console.log(`\t\tisFile : ${dirent.isFile()}`);

    // * S'il s'agit d'un répertoire
    if (dirent.isDirectory()) {
      const folderLocation = `${dirent.parentPath}/${dirent.name}`;
      console.log(`\t\t📁 est un répertoire`);

      // * Vérifier s'il possède un fichier '_on.txt'
      const fileOnTxtLocation = `${folderLocation}/_on.txt`;

      // * On vérifie si le fichier '_on.txt' existe
      // https://sentry.io/answers/check-if-a-fileOnTxtLocation-or-directory-exists-synchronously-in-node-js/
      if (fs.existsSync(fileOnTxtLocation)) {
        console.log(`\t\tTest existence de ${fileOnTxtLocation} : ✅`);
        console.log(`\t\tLe dossier est ajouté à la liste de ceux à charger`);

        // c't'hilarant
        // const FILES_HAVE_A_FUCKING_DOT_SLASH_IN_FRONT_LOL = `./${folderLocation}`;
        // // OU DES FOIS NON ON SAIT PAS EN FAIT HAHAHAHA DROLE PUTAIN DROLE
        // foldersToLoad.add(FILES_HAVE_A_FUCKING_DOT_SLASH_IN_FRONT_LOL);

        // ! go napalm 🔥 juste virer tous les putains de './' aléatoires
        let folderLocationSANSDOTSLASHLOL = folderLocation;
        if (folderLocationSANSDOTSLASHLOL.slice(0, 2) == './') {
          folderLocationSANSDOTSLASHLOL =
            folderLocationSANSDOTSLASHLOL.slice(2);
        }
        if (folderLocationSANSDOTSLASHLOL.slice(0, 2) == './') {
          folderLocationSANSDOTSLASHLOL =
            folderLocationSANSDOTSLASHLOL.slice(2);
        }
        if (folderLocationSANSDOTSLASHLOL.slice(0, 2) == './') {
          folderLocationSANSDOTSLASHLOL =
            folderLocationSANSDOTSLASHLOL.slice(2);
        }
        foldersToLoad.add(folderLocationSANSDOTSLASHLOL);
      } else {
        console.log(`\t\tTest existence de ${fileOnTxtLocation} : ❌`);
      }

      console.log();
      console.log();
      console.log();
    }
  }

  console.log('foldersToLoad');
  console.log('foldersToLoad');
  console.log('foldersToLoad');
  console.log('foldersToLoad');
  console.log('foldersToLoad');
  console.log('foldersToLoad');
  console.log('foldersToLoad');
  console.log('foldersToLoad');
  console.log('foldersToLoad');
  console.log('foldersToLoad');
  console.log('foldersToLoad');
  console.log('foldersToLoad');
  console.log();
  console.log(foldersToLoad);
  console.log();
  console.log('/foldersToLoad');
  console.log('/foldersToLoad');
  console.log('/foldersToLoad');
  console.log('/foldersToLoad');
  console.log('/foldersToLoad');
  console.log('/foldersToLoad');
  console.log('/foldersToLoad');
  console.log('/foldersToLoad');
  console.log('/foldersToLoad');
  console.log('/foldersToLoad');
  console.log('/foldersToLoad');
  console.log('/foldersToLoad');
  console.log('/foldersToLoad');
  console.log('/foldersToLoad');

  // ---
  // ---
  // ---

  // * S'il s'agit d'un fichier
  // Deux fois la même boucle, parfois les dossiers sont avant, parfois non, putain de js
  // TODO: Opti regrouper les deux mais osef
  for (let i = 0; i < locations.length; i++) {
    const dirent = locations[i];
    // console.log('dirent.parentPath');
    // console.log(dirent.parentPath);
    // console.log('foldersToLoad.has(dirent.parentPath)');
    // console.log(foldersToLoad.has(dirent.parentPath));
    console.log(`${dirent.parentPath}\n\t${dirent.name}`);
    // console.log(`\t\tisDirectory : ${dirent.isDirectory()}`);
    // console.log(`\t\tisFile : ${dirent.isFile()}`);

    // * S'il s'agit d'un fichier
    if (dirent.isFile()) {
      console.log(`\t\t📄 Est un fichier`);

      // ! go napalm 🔥 juste virer tous les putains de './' aléatoires
      let fileLocationSANSDOTSLASHLOL = dirent.parentPath;
      if (fileLocationSANSDOTSLASHLOL.slice(0, 2) == './') {
        fileLocationSANSDOTSLASHLOL = fileLocationSANSDOTSLASHLOL.slice(2);
      }
      if (fileLocationSANSDOTSLASHLOL.slice(0, 2) == './') {
        fileLocationSANSDOTSLASHLOL = fileLocationSANSDOTSLASHLOL.slice(2);
      }
      if (fileLocationSANSDOTSLASHLOL.slice(0, 2) == './') {
        fileLocationSANSDOTSLASHLOL = fileLocationSANSDOTSLASHLOL.slice(2);
      }

      // * Si son dossier fait partie des dossiers à charger
      if (foldersToLoad.has(fileLocationSANSDOTSLASHLOL)) {
        console.log(`\t\t\t✅ Le dossier ne comporte un fichier 'on.txt'`);

        // * Filter files by extension
        const fileLocationAndName = `${dirent.parentPath}/${dirent.name}`;
        if (extensions.length > 0) {
          const fileExtension = getExtensionFromFileLocation(dirent.name);
          if (extensions.includes(fileExtension)) {
            console.log(`\t\t\t✅ Extension correcte, fichier chargé`);
            results.push(fileLocationAndName);
          } else {
            console.log(
              `\t\t\t❌ Fichier non chargé (mauvaise extension '${fileExtension}')`,
            );
          }
        }
        // No filter
        else {
          console.log(`\t\t\t✅ Fichier chargé`);
          results.push(fileLocationAndName);
        }
      } else {
        console.log(
          `\t\t\t❌ Fichier non chargé (le dossier ne comporte pas de fichier 'on.txt')`,
        );
      }
    }

    console.log();
  }

  return results;
}
