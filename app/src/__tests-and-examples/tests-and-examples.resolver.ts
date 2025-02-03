import {
  Args,
  Int,
  Query,
  Resolver,
  // Other,
} from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { PrismaClient as PrismaClientLeVrai } from '@prisma/client';

import fs from 'fs';

// * ♻️🧰 Utility / Generics
import { delay } from '../_utility/async/delay';
import { getAllFilesContentsFromFolderAsync } from '../_utility/files/async/get-all-files-contents-from-folder-async';
import { getAllFilesJsonContentsFromFolderAsync } from '../_utility/files/async/get-all-files-json-contents-from-folder-async';
import { getAllFilesPathsFromFolderAsync } from '../_utility/files/async/get-all-files-paths-from-folder-async';
import { getFileContentAsync } from '../_utility/files/async/get-file-content';
import { getFileJsonContentAsync } from '../_utility/files/async/get-file-json-content';
import { dateOptions } from '../_utility/date/date-options';

// * 📌 Tests
import { PrismaService } from '../_prisma/prisma.service';
import { CachesService } from '../caches/caches.service';

// * Test ⚡️🟥 Cache Management / Redis // Everywhere
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

// * Quick Classes & instances export
import {
  onlyMandatory,
  wOptParams,
} from '../_utility/functions/_test_class_w_opt_props';

import {
  functionDefinition_test_onlyMandatory,
  functionDefinition_test_wOptParams,
  MODULO,
} from '../_utility/functions/function-definition';

import { functionsCatalog } from '../_utility/functions/functions-catalog';

import {
  admissibleParams_test_onlyMandatory,
  admissibleParams_test_wOptParams,
  NUMERIC,
} from '../_utility/functions/admissible-params';

// Calculations
import { calculation, runTests } from '../_utility/maths/calculation';

// Conditions
import {
  conditionEval,
  runConditionsEvalTests,
} from '../_utility/conditions/conditions-eval';

// 📌🦾📅 Date functions tests
import { addNDaysToDate } from '../_utility/date/date-add-n-days';
import { getDaysNumberInMonth } from '../_utility/date/get-days-number-in-month';
import { isLastDayOfWeek } from '../_utility/date/is-last-day-of-week';
import { isLeapYear } from '../_utility/date/is-leap-year';
import { lastDayOfWeek } from '../_utility/date/last-day-of-week';
import { lastDayOfMonth } from '../_utility/date/last-day-of-month';
import { isLastDayOfMonth } from '../_utility/date/is-last-day-of-month';
import { lastDayOfYear } from '../_utility/date/last-day-of-year';
import { isLastDayOfYear } from '../_utility/date/is-last-day-of-year';

// ⏳ wait x milliseconds
import { timeoutThenMessage } from '../_utility/time/timeout-then-message';
import { timeout } from '../_utility/time/timeout';

// ---
// ---
// ---
// ---
// ---
// ---
// ---
// ---
// ---

// 🔗 Relations
// import { RELATION_MAJ_FIRSTsService } from '../../RELATION_FILE_KEBAB_CASEs/RELATION_FILE_KEBAB_CASEs.service';
@Resolver()
export class TestsAndExamplesResolver {
  constructor(
    private prisma: PrismaService,
    private cache: CachesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  // constructor(
  //   // 🔗 Relations
  //   private readonly RELATION_LOWC_FIRSTsService: RELATION_MAJ_FIRSTsService,
  // ) {}

  // ! Constants
  // static readonly HEY_HEY = 'hoy';

  // * 🤖📁 Generate a Json file containing clockings for existing resources
  // 📝 Recommended documentations
  //   - [❤️ Exemples lisibles & utilisables](https://welovedevs.com/fr/articles/how-to-use-node-fs/#%C3%A9crire-dans-un-fichier-via-un-flux-avec-fscreatewritestream)
  //   - [❤️ Grafikart > Streams](https://grafikart.fr/tutoriels/nodejs-streams-2084#autoplay)
  //   - Mes trucs
  //     - [tutos grafikart appliqué](https://github.com/youpiwaza/nodejs-tutos-grafikart/tree/main/01-javascript-cote-serveur)
  //     - [cours nodejs](https://drive.google.com/drive/folders/1P3APT__tliOp9P0lCBZ9x4BlyWIJm4vu)
  //   - ---
  //   - Docs officielles assez nazes
  //   - [Doc Node.js > createWriteStream](https://nodejs.org/docs/v20.12.1/api/fs.html#fscreatewritestreampath-options)
  //   - [Devdocs.io > createWriteStream](https://devdocs.io/node/fs#fscreatewritestreampath-options)
  //     - createWriteStream > Pas mal d'options
  //   - Returns [fs.WriteStream](https://devdocs.io/node/fs#class-fswritestream)
  @Query(() => String, {
    name: 'example_GenerateLargeFile',
    description: `🤖📁 Generate a Large Json file using streams ⚡️
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { example_GenerateLargeFile }
    \n
    \n { example_GenerateLargeFile(linesNumber: 1000000) }
    \n
    `,
  })
  async example_GenerateLargeFile(
    @Args('linesNumber', {
      defaultValue: 1000000,
      nullable: true,
      type: () => Int,
    })
    linesNumber: number,
  ): Promise<string | null> {
    const fileLocation = './src/__tests-and-examples/jsons/test.txt';

    // * 💩⚡️ Create a file, one shot
    // const content = 'Some content!';
    // fs.writeFile(fileLocation, content, (err) => {
    //   if (err) {
    //     console.error(err);
    //     throw new BadRequestException(
    //       `Problem during json file generation, see console.\n
    //       Error: ${err}`,
    //     );
    //   } else {
    //     // file written successfully
    //   }
    // });

    // * 🎉⚡️ Create a file through a stream / multiples writes

    console.time('fs.createWriteStream');
    const timeStart = Date.now();

    // * 🌊📃 Create stream towards a file
    const writeStream = fs.createWriteStream(fileLocation);

    // * ➕ Then add as many lines as you want
    writeStream.write('Mon contenu de flux\n', 'utf-8');
    // ✅📌 Add more lines
    writeStream.write('Mon contenu de flux\n', 'utf-8');
    writeStream.write('Mon contenu de flux\n', 'utf-8');

    // for (let i = 0; i < 10000; i++) {
    // for (let i = 0; i < 1000000; i++) {
    for (let i = 1; i < linesNumber; i++) {
      writeStream.write(`Mon contenu de flux ${i}\n`, 'utf-8');
    }

    // * 🛑 Don't forget to end the file stream 🚨 when writing is over
    writeStream.on('finish', () => {
      console.log('Fichier mis à jour !');
    });
    writeStream.end();

    console.timeEnd('fs.createWriteStream');
    const timeEnd = Date.now();

    // 🚸 GraphiQL User feedback
    return `File with ${linesNumber} lines generated in ${
      timeEnd - timeStart
    } ms 🎉`;
  }

  // ---

  // * ⬇️📄 Load file content, asynchronously
  //          https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
  @Query(() => String, {
    name: 'example_getFileContent',
    description: `⬇️📄 Get a Json file from a folder
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { example_getFileContent }
    \n
    `,
  })
  async example_getFileContent(): Promise<string | null> {
    const fileLocation = './src/__tests-and-examples/jsons/get-me.json';

    const result = await getFileContentAsync(fileLocation);

    // console.log(result);
    // console.log(typeof result);

    return JSON.stringify(result);
  }

  // ---

  // * ⬇️📄 Load JSON from a dedicated file, asynchronously
  @Query(() => GraphQLJSONObject, {
    name: 'example_getFileJsonContentAsync',
    description: `⬇️📄 Get a Json file from a folder
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { example_getFileJsonContentAsync }
    \n
    `,
  })
  async example_getFileJsonContentAsync(): Promise<object | null> {
    const fileLocation = './src/__tests-and-examples/jsons/get-me.json';

    const result = await getFileJsonContentAsync(fileLocation);

    // console.log(result);
    // console.log(typeof result);

    return result;
  }

  // ---
  // ---
  // ---

  // * ⬇️📂📄💬 Get all files locations from a folder
  @Query(() => [String], {
    name: 'example_getFilesPathsFromFolder',
    description: `⬇️📄📄💬 Get all files location from a folder
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { example_getFilesPathsFromFolder }
    \n
    \n { example_getFilesPathsFromFolder(extensions: ["json"]) }
    \n
    `,
  })
  async example_getFilesPathsFromFolder(
    @Args({
      name: 'extensions',
      defaultValue: [],
      description: `Tableau contenant les extensions des fichiers à récupérer`,
      nullable: true,
      type: () => [String],
    })
    extensions: Array<string>,
  ): Promise<Array<string> | null> {
    const folderLocation = './src/__tests-and-examples/jsons/';

    const result = await getAllFilesPathsFromFolderAsync(
      folderLocation,
      extensions,
    );

    // console.log(result);
    // console.log(typeof result);

    return result;
  }

  // ---

  // * ⬇️📂📄 Get all files contents from a folder, asynchronously
  @Query(() => [String], {
    name: 'example_getAllFilesContentsFromFolder',
    description: `⬇️📂📄 Get all files contents from a folder
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { example_getAllFilesContentsFromFolder }
    \n
    \n { example_getAllFilesContentsFromFolder(extensions: ["json"]) }
    \n
    `,
  })
  async example_getAllFilesContentsFromFolder(
    @Args({
      name: 'extensions',
      defaultValue: [],
      description: `Tableau contenant les extensions des fichiers à récupérer`,
      nullable: true,
      type: () => [String],
    })
    extensions: Array<string>,
  ): Promise<Array<string | null>> {
    const folderLocation = './src/__tests-and-examples/jsons/';

    let result = await getAllFilesContentsFromFolderAsync(
      folderLocation,
      extensions,
    );

    // console.log(result);
    // console.log(typeof result);

    result = result.reduce((res: Array<string>, fileContent: any) => {
      res.push(JSON.stringify(fileContent));
      return res;
    }, []);

    return result;
  }

  // ---

  // * ⬇️📂📄 Get all files JSON contents from a folder, asynchronously
  @Query(() => [GraphQLJSONObject], {
    name: 'example_getAllFilesJsonContentsFromFolder',
    description: `⬇️📂📄 Get all files contents from a folder
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { example_getAllFilesJsonContentsFromFolder }
    \n
    \n { example_getAllFilesJsonContentsFromFolder(extensions: ["json"]) }
    \n
    `,
  })
  async example_getAllFilesJsonContentsFromFolder(
    @Args({
      name: 'extensions',
      defaultValue: [],
      description: `Tableau contenant les extensions des fichiers à récupérer`,
      nullable: true,
      type: () => [String],
    })
    extensions: Array<string>,
  ): Promise<Array<object | null>> {
    const folderLocation = './src/__tests-and-examples/jsons/';

    const result = await getAllFilesJsonContentsFromFolderAsync(
      folderLocation,
      extensions,
    );

    // console.log(result);
    // console.log(typeof result);

    return result;
  }

  // ---
  // ---
  // ---

  // * 💥👌🚸 GraphiQL > Proper error management
  //        throw new XXXException(`message ${var}`)
  //        Most Exceptions Types :
  //          app/../_utility/filters/exception/prisma-exception.filter.ts
  //        import from @nestjs/common
  // * imports
  //      import {
  //        BadRequestException,
  //        NotFoundException,
  //        UnauthorizedException,
  //        ForbiddenException,
  //        ConflictException,
  //        RequestTimeoutException,
  //      } from '@nestjs/common';
  @Query(() => String, {
    name: 'example_ThrowException',
    description: `💥👌 Thrown an error & warn user in Graphiql
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { example_ThrowException }
    `,
  })
  async example_ThrowException(): Promise<string | null> {
    const err = 'Some error, woops ¯\\_(ツ)_/¯';

    console.error(err);
    throw new Error(`Something went wrong, see console.\nError: ${err}`);

    // try {} catch(err) { ...
    console.error(err);
    // throw new BadRequestException(
    //   `Something went wrong, see console.\nError: ${err}`,
    // );
    // throw new NotFoundException(`404 not found, ${err} does not exist.`);
    // throw new UnauthorizedException(`401 not authorized, ${err}.`);
    // throw new ForbiddenException(`403 forbidden, ${err}.`);
    // throw new ConflictException(`409 conflict, ${err}.`);
    // throw new RequestTimeoutException(`408 timeout, ${err}.`);

    return 'Some return';
  }

  // ---

  // * 💾➡️ Prisma > Raw PostGreSQL queries
  //            PC > Raw queries
  //                https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries#queryraw
  //            GI > Proper syntax
  //                https://github.com/prisma/prisma/discussions/2664#discussioncomment-22769
  @Query(() => String, {
    name: 'example_RawQuery',
    description: `💾➡️ Direct PostGreSQL query
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { example_RawQuery }
    `,
  })
  async example_RawQuery(): Promise<string | null> {
    // * ✅ Requête simple
    // const resultRaw = await this.prisma
    // .$queryRaw`SELECT * FROM "public"."Resource"`;

    // * ✅ Requête avec variable
    // * 🚨 Si parenthèses $queryRaw(`SELECT ...`) > obligation de variable/tag
    const matricule = '123456A';
    const resultRaw = await this.prisma
      .$queryRaw`SELECT * FROM "public"."Resource" WHERE matricule = ${matricule}`;

    // ! NOTE: prisma.$queryRaw > lors de l'utilisation de ${ } il y a un genre de conversion de merde ~sanitize non documenté
    // ! Si besoin d'injecter des chaines de caractères complexes ou d'esquiver le typage cancer UUID passer par queryRawUnsafe
    // ~💩 Non recommandé pour des raisons de sécurité 🔒️ (injections SQL) mais plus ouvert
    // const resultRaw = await this.prisma.$queryRawUnsafe(`SELECT * FROM "public"."Resource"`);

    // Conversion en string afin de limiter les imports de Models ou autres
    return JSON.stringify(resultRaw);

    // * Regrouper sous forme de tableaux
    //    ¯\_(ツ)_/¯ Pas de doubles tableaux imbriqués nativement
    // 📝 Docs
    //    Postgre > 9.20. Aggregate Functions
    //      https://www.postgresql.org/docs/9.5/functions-aggregate.html
    //      ~~array_agg(any)~~
    //      jsonb_agg(any)                // Regrouper en tableau et renvoyer au format JSON
    //      json_object_agg	(any, any)    // Regrouper en objet (clés, valeurs) et renvoyer au format JSON
    //
    //    Postgre > Table 9.47. JSON Creation Functions
    //      https://www.postgresql.org/docs/current/functions-json.html
    //      jsonb_build_object (VARIADIC "any")    // Création d'objet complexes et renvoyer au format JSON
    //                                                                    ^ définition de multiples clés

    // * Exemples avec +- DISTINCT & GROUP BY
    // const resultRaw = await this.prisma.$queryRaw`
    //    SELECT "resourceId", "date", jsonb_agg("timeReal") AS clockings
    //    SELECT "resourceId", json_object_agg("date", "timeReal") AS clockings
    //    SELECT
    //      "resourceId",
    //      jsonb_build_object(
    //        "date", "date",
    //        "timeReal", "timeReal"
    //      ) AS clockings

    // * HAVING
    //      💩 Pas possible de réutiliser les alias, obligation de remettre la fonction
    // const resultRaw = await this.prisma.$queryRaw`
    //   SELECT "resourceId", "date", jsonb_agg("timeReal") as clockings, COUNT("timeReal") as clockingsCount
    //   FROM "public"."Clocking"
    //   GROUP BY "resourceId", "date"
    //   -- 💩 Pas possible de réutiliser "clockingsCount" dans HAVING, pk pas
    //   -- clockingsCount > 3
    //
    //   -- ✅ Seulement plus de 3 pointages, par resource par jour
    //   -- HAVING COUNT("timeReal") > 3
    //
    //   -- ✅ Seulement les pointages pairs, par resource par jour
    //   HAVING COUNT("timeReal") % 2 = 0
    //   ORDER BY "resourceId", "date", "clockings";
    // `;
  }

  // ---

  // * 🧮 Prisma > Computed fields
  //        https://www.prisma.io/docs/orm/prisma-client/queries/computed-fields
  @Query(() => String, {
    name: 'example_computedFields',
    description: `💾➡️ Prisma computed field example
    \n
    \n Resource > Concaténer plusieurs champs (matricule & SSN )
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { example_computedFields }
    `,
  })
  async example_computedFields(): Promise<string | null> {
    // * Extension du client lors de l'exécution
    // ! 🚨 Création d'une nouvelle instance de PrismaClient, != de Prisma as PrismaClient
    const prisma = new PrismaClientLeVrai().$extends({
      result: {
        // Entité concernée
        resource: {
          // Nom du nouveau champ
          fullName: {
            // Champs pré-requis
            needs: { matricule: true, socialSecurityNumber: true },
            // Entité concernée
            compute(resource) {
              // * Calculs, ici concaténation de chaînes
              return `${resource.matricule} ${resource.socialSecurityNumber}`;
            },
          },
        },
      },
    });

    // * Exécution via le client étendu
    const resourceWComputed = await prisma.resource.findFirst();
    console.log('resourceWComputed');
    console.log(resourceWComputed);
    console.log('/resourceWComputed');

    return JSON.stringify(resourceWComputed);
  }

  // ---

  // * ⚡️🟥 Cache Management > Manual test
  //        /_docs/05.1-cache-implementation-steps.md
  @Query(() => String, {
    name: 'test_cache_redis',
    description: `⚡️🟥 Ajouter une entrée dans la BDD Redis depuis nest
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { test_cache_redis }
    `,
  })
  async test_cache_redis(): Promise<string | null> {
    // https://docs.nestjs.com/techniques/caching#interacting-with-the-cache-store

    const cachedData = await this.cacheManager.get('test_cache_redis');

    if (cachedData) {
      console.log('Récupéré depuis le cache REDIS');
      console.log('Récupéré depuis le cache REDIS');
      console.log('Récupéré depuis le cache REDIS');
      console.log('Récupéré depuis le cache REDIS');
      console.log('Récupéré depuis le cache REDIS');
      console.log('Récupéré depuis le cache REDIS');
      console.log('Récupéré depuis le cache REDIS');
      console.log('Récupéré depuis le cache REDIS');
      return `Récupéré depuis le cache REDIS : ${
        cachedData as unknown as string
      }, Go checker Redis Insights : http://localhost:5540/`;
    }

    console.log('Pas encore en cache');
    console.log('Pas encore en cache');
    console.log('Pas encore en cache');
    console.log('Pas encore en cache');
    console.log('Pas encore en cache');
    console.log('Pas encore en cache');
    console.log('Pas encore en cache');
    // Récupérer depuis la BDD
    await this.cacheManager.set(
      'test_cache_redis',
      'La valeur à mettre en cache',
    );
    return `Pas encore en cache , on rajoute 'La valeur à mettre en cache' dans REDIS, Go checker Redis Insights : http://localhost:5540/`;
  }

  // ---

  // * ⚡️🟥 Cache Management > Test Manual cache module
  //        app/src/caches/caches.resolver.ts

  // 👷 C/c usage
  //            // Check for Cache & return if present
  //            const cachedData = await this.cache.getCache('test_cache_module', '');
  //            if (cachedData) {
  //              return cachedData;
  //            }
  //            // Else get datas
  //            const result = 'yay';
  //            // Set to cache and return
  //            this.cache.setCache('FUNCTION_NAME', 'ARGS', stringifiedResult);
  //            return value
  @Query(() => String, {
    name: 'test_cache_module',
    description: `⚡️🟥 Test Cronexia custom cache module
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { test_cache_module(value: "Ma valeur") }
    \n
    \n Call several times & check Redis Insights : http://localhost:5540/
    \n
    `,
  })
  async test_cache_module(
    @Args({
      name: 'value',
      defaultValue: 42,
      description: `La valeur à stocker/récupérer en cache`,
      nullable: true,
      type: () => String,
    })
    value: string,
  ): Promise<string | null> {
    // https://docs.nestjs.com/techniques/caching#interacting-with-the-cache-store

    const cachedData = await this.cache.tryCache('test_cache_module', '');
    // console.log('cachedData');
    // console.log(cachedData);
    // console.log('/cachedData');

    if (cachedData) {
      console.log('Récupéré depuis le cache REDIS');
      return `Récupéré depuis le cache REDIS : ${
        cachedData as unknown as string
      }, Go checker Redis Insights : http://localhost:5540/`;
    }

    console.log('Pas en cache, je vais chercher la donnée...');
    await delay(3000);
    console.log('Donnée récupérée, ajout au cache & renvoi classique');
    this.cache.setCache('test_cache_module', '', value);

    // * Cache manager auto converts back and forth to string
    // const valueObj = { yay: 'fun' };
    // this.cache.setCache('test_cache_module', '', valueObj);

    return `'${value}', récupérée sans cache, après 3 secondes. Elle vient d'être ajoutée au cache ou elle restera 30 secondes pour les futurs appels.`;
  }

  // ---

  // * Quick classes with optionnal props and instance
  @Query(() => String, {
    name: 'quick_classes_with_optionnal_props_and_instance_test',
    description: `Quickly test classes & instances
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { quick_classes_with_optionnal_props_and_instance_test }
    \n
    `,
  })
  async quick_classes_with_optionnal_props_and_instance_test(): Promise<
    string | null
  > {
    const onlyMandatoryMsg = onlyMandatory.toString();
    const wOptParamsMsg = wOptParams.toString();

    return `onlyMandatoryMsg : ${onlyMandatoryMsg} / wOptParamsMsg : ${wOptParamsMsg}`;
  }

  // ---

  // * Function Definition test
  @Query(() => String, {
    name: 'function_definition_test',
    description: `Quickly test function definition classe & instance
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { function_definition_test }
    \n
    `,
  })
  async function_definition_test(): Promise<string | null> {
    const onlyMandatoryMsg = functionDefinition_test_onlyMandatory.toString();
    const wOptParamsMsg = functionDefinition_test_wOptParams.toString();
    const moduloMsg = MODULO.toString();

    return `onlyMandatoryMsg : ${onlyMandatoryMsg} /// wOptParamsMsg : ${wOptParamsMsg} /// modulo : ${moduloMsg}`;
  }

  // ---

  // * AdmissibleParams test
  @Query(() => String, {
    name: 'admissible_params_test',
    description: `Quickly test function definition classe & instance
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { admissible_params_test }
    \n
    `,
  })
  async admissible_params_test(): Promise<string | null> {
    const onlyMandatoryMsg = admissibleParams_test_onlyMandatory.toString();
    const wOptParamsMsg = admissibleParams_test_wOptParams.toString();
    const numericMsg = NUMERIC.toString();

    return `onlyMandatoryMsg : ${onlyMandatoryMsg} /// wOptParamsMsg : ${wOptParamsMsg} /// numeric : ${numericMsg}`;
  }

  // ---

  // * Function catalog get() test
  @Query(() => String, {
    name: 'function_catalog_get_test',
    description: `Quickly test functions gathering
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { function_catalog_get_test }
    \n
    `,
  })
  async function_catalog_get_test(
    @Args({
      name: 'code',
      description: `Optionnel, le nom de la fonction à renvoyer`,
      nullable: true,
      type: () => String,
    })
    code: string,
  ): Promise<string | null> {
    const allFunctions = functionsCatalog.get(code ? code : undefined);

    return JSON.stringify(allFunctions);
  }

  // ---

  // * Function catalog keys() test
  @Query(() => String, {
    name: 'function_catalog_keys_test',
    description: `Quickly test functions gathering
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { function_catalog_keys_test }
    \n
    `,
  })
  async function_catalog_keys_test(): Promise<string | null> {
    const allFunctions = functionsCatalog.keys();

    return JSON.stringify(allFunctions);
  }

  // ---

  // * Function catalog list() test
  @Query(() => String, {
    name: 'function_catalog_list_test',
    description: `Quickly test functions gathering
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { function_catalog_list_test }
    \n
    `,
  })
  async function_catalog_list_test(): Promise<string | null> {
    const allFunctions = functionsCatalog.list();

    return allFunctions;
  }

  // ---

  // * Function catalog allTests()
  @Query(() => String, {
    name: 'function_catalog_all_tests',
    description: `Quickly test functions gathering
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { function_catalog_all_tests }
    \n
    `,
  })
  async function_catalog_all_tests(): Promise<string | null> {
    const allFunctions = functionsCatalog.allTests();

    return allFunctions;
  }

  // ---

  // * 📟 Calculation class test
  @Query(() => String, {
    name: 'calculation_class_test',
    description: `📟 Quickly test Calculation class
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { calculation_class_test }
    \n
    `,
  })
  async calculation_class_test(): Promise<string | null> {
    // ✨ Nothing in console if everything works fine
    runTests();

    const expression: string = '3+5*2';

    // calculation
    const result = calculation.calculate(expression);

    return `Expression '${expression}', result = ${result}`;
  }

  // ---

  // * 📌🦾📅 Date functions tests
  @Query(() => String, {
    name: 'test_date_functions',
    description: `📌🦾📅 Date functions tests
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { test_date_functions }
    \n
    `,
  })
  async test_date_functions(): Promise<string | null> {
    const samples_dates = [
      new Date('2024-01-01'),
      new Date('2024-01-15'),
      new Date('2024-01-27'),
      new Date('2024-01-28'),
      new Date('2024-02-01'),
      new Date('2024-02-15'),
      new Date('2024-02-27'),
      new Date('2024-04-01'),
      new Date('2024-04-15'),
      new Date('2024-04-27'),
      new Date('2024-08-01'),
      new Date('2024-08-15'),
      new Date('2024-08-27'),
      new Date('2024-12-27'),
      new Date('2025-01-01'),
      new Date('2025-02-27'),
      new Date('2025-08-15'),
      new Date('2025-12-27'),
      new Date('2026-01-01'),
      new Date('2026-02-27'),
      new Date('2026-08-15'),
      new Date('2028-01-01'),
      new Date('2028-02-27'),
      new Date('2028-08-15'),
      new Date('2028-12-27'),
      new Date('2029-12-27'),
      new Date('2029-12-31'),
      new Date('2030-12-27'),
      new Date('2031-12-27'),
      new Date('2032-12-27'),
      new Date('2033-12-27'),
      new Date('2034-12-27'),
      new Date('2024-01-31'),
      new Date('2024-02-29'),
      new Date('2026-02-28'),
      new Date('2024-08-31'),
      new Date('2024-12-31'),
      new Date('2033-12-31'),
      new Date('2034-12-31'),
    ];

    // normalize original dates for vertical reading
    const dates: any = samples_dates.reduce((res: any, date: any) => {
      let str = date.toLocaleDateString('fr-FR', dateOptions);
      str = str.padEnd(25, ' ');

      date = {
        date: date,
        str: str,
      };
      res.push(date);
      return res;
    }, []);

    console.log(dates);

    // ! addNDaysToDate
    console.log('addNDaysToDate > add 5 days');
    for (const date of dates) {
      console.log(
        `\t${date.str}\t\t ${addNDaysToDate(date.date, 5).toLocaleDateString('fr-FR', dateOptions)}`,
      );
    }
    console.log('\n\n\n');

    // ! getDaysNumberInMonth
    console.log('getDaysNumberInMonth');
    for (const date of dates) {
      const month = date.date.getMonth();
      const year = date.date.getFullYear();
      console.log(`\t${date.str}\t\t ${getDaysNumberInMonth(month, year)}`);
    }
    console.log('\n\n\n');

    // ! isLastDayOfWeek
    console.log('isLastDayOfWeek');
    for (const date of dates) {
      console.log(`\t${date.str}\t\t ${isLastDayOfWeek(date.date)}`);
    }
    console.log('\n\n\n');

    // ! isLeapYear
    console.log('isLeapYear');
    for (const date of dates) {
      const year = date.date.getFullYear();
      console.log(`\t${date.str}\t\t ${isLeapYear(year)}`);
    }
    console.log('\n\n\n');

    // ! lastDayOfWeek
    console.log('lastDayOfWeek');
    for (const date of dates) {
      console.log(
        `\t${date.str}\t\t ${lastDayOfWeek(date.date).toLocaleDateString('fr-FR', dateOptions)}`,
      );
    }
    console.log('\n\n\n');

    // ! lastDayOfMonth
    console.log('lastDayOfMonth');
    for (const date of dates) {
      console.log(
        `\t${date.str}\t\t ${lastDayOfMonth(date.date).toLocaleDateString('fr-FR', dateOptions)}`,
      );
    }
    console.log('\n\n\n');

    // ! isLastDayOfMonth
    console.log('isLastDayOfMonth');
    for (const date of dates) {
      console.log(`\t${date.str}\t\t ${isLastDayOfMonth(date.date)}`);
    }
    console.log('\n\n\n');

    // ! lastDayOfYear
    console.log('lastDayOfYear');
    for (const date of dates) {
      console.log(
        `\t${date.str}\t\t ${lastDayOfYear(date.date).toLocaleDateString('fr-FR', dateOptions)}`,
      );
    }
    console.log('\n\n\n');

    // ! isLastDayOfYear
    console.log('isLastDayOfYear');
    for (const date of dates) {
      console.log(`\t${date.str}\t\t ${isLastDayOfYear(date.date)}`);
    }
    console.log('\n\n\n');

    return `Go check console.`;
  }

  // ---

  // * 📌 Conditions eval test
  @Query(() => String, {
    name: 'conditions_eval_class_test',
    description: `📌 Quickly test Conditions eval class
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { conditions_eval_class_test }
    \n
    \n { conditions_eval_class_test(expression: "true === false") }
    \n
    `,
  })
  async conditions_eval_class_test(
    @Args({
      name: 'expression',
      description: `Optionnel, l'expression à evaluer. Défaut: '5 > 2'`,
      nullable: true,
      type: () => String,
    })
    expressionArgs?: string,

    @Args({
      name: 'displayAllTests',
      description: `Optionnel, afficher tous les tests internes.`,
      defaultValue: false,
      nullable: true,
      type: () => Boolean,
    })
    displayAllTests?: boolean,
  ): Promise<string | null> {
    // ✨ Nothing in console if everything works fine
    const allTests = runConditionsEvalTests();

    const expression: string = expressionArgs ? expressionArgs : '5 > 2';

    // conditions_eval
    const userResult = conditionEval.calculate(expression);

    const result = `Expression '${expression}', result = ${userResult}${displayAllTests ? `\n${allTests}` : ''}`;
    console.log(result);

    return result;
  }

  // ---
  // ---
  // ---

  // ! 📌⏳ Tests bon fonctionnement asynchrone
  // - 🎯📌 Faire des tests ayant pour objectifs
  // - Gestion correcte des retours console
  // - Gestion correcte de l'attente entre deux requêtes
  //   - Que cela soit BDD ou Node
  //   - Provenance de différents fichiers
  // * 📌⏳ 01 / ⏳🤞 Test promesse basique
  @Query(() => String, {
    name: 'tests_async_01_promise_simple',
    description: `📌 01 / ⏳🤞 Test promesse basique > attend 3 secondes et renvoie un message
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { tests_async_01_promise_simple }
    \n
    `,
  })
  async tests_async_01_promise_simple(): Promise<string | null> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return `OK / J'ai attendu 2 secondes`;
  }

  // * 📌⏳ 02 / ⏳🤞🐛 Test promesse echec et gestion erreur
  @Query(() => String, {
    name: 'tests_async_02_promise_echec_avec_erreur',
    description: `📌 02 / ⏳🤞🐛 Test promesse echec et gestion erreur, attend 2 secondes et echec
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { tests_async_02_promise_echec_avec_erreur }
    \n
    `,
  })
  async tests_async_02_promise_echec_avec_erreur(): Promise<string | null> {
    try {
      await new Promise((resolve, reject) => setTimeout(reject, 2000));
    } catch (e) {
      console.error(e);
      return `KO / Erreur forcée mais récupérée : ${e}`;
    }
    return `OK / J'ai attendu 2 secondes`;
  }

  // * 📌⏳ 03 / 🤞🤞🤞 Composition > sans delai (syntaxe)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#composition
  @Query(() => String, {
    name: 'tests_async_03_composition_sans_delai',
    description: `📌 03 / 🤞🤞🤞 Test composition de promesses, 3 fonctions chainées qui renvoient respectivement 1, 2, 3
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { tests_async_03_composition_sans_delai }
    \n
    `,
  })
  async tests_async_03_composition_sans_delai(): Promise<string | null> {
    let result = '0';
    // const wait1sec = async (x) => x + '1'; // Si x passé en paramètre, sera 0 car result initialisé à 0 via f(result);
    const wait1sec = async () => '1';
    const wait2sec = async (x) => x + '2';
    const wait3sec = async (x) => x + '3';
    for (const f of [wait1sec, wait2sec, wait3sec]) {
      result = await f(result);
      // Affiché en série
      console.log(result);
    }
    return result;
  }

  // * 📌⏳ 04 / ⏳🤞🤞🤞 Composition > async await
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#composition
  @Query(() => String, {
    name: 'tests_async_04_composition_async_await',
    description: `📌 04 / ⏳🤞🤞🤞 Test composition de promesses, 3 fonctions chainées qui renvoient respectivement 1, 2, 3 après 1 seconde chacune
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { tests_async_04_composition_async_await }
    \n
    `,
  })
  async tests_async_04_composition_async_await(): Promise<string | null> {
    let result = '0';
    const wait1_1sec = async (x) => x + (await timeoutThenMessage(1000, '1'));
    const wait2_1sec = async (x) => x + (await timeoutThenMessage(1000, '2'));
    const wait3_1sec = async (x) => x + (await timeoutThenMessage(1000, '3'));
    for (const f of [wait1_1sec, wait2_1sec, wait3_1sec]) {
      result = await f(result);
      // Affiché de manière asynchrone, en série
      console.log(result);
    }
    return result;
  }

  // * 📌⏳ 05 / ⏳🤞🤞🤞🐛 Composition > async await
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#composition
  @Query(() => String, {
    name: 'tests_async_05_composition_async_await_erreur',
    description: `📌 05 / ⏳🤞🤞🤞🐛 Test composition de promesses, 3 fonctions chainées qui renvoient respectivement 1, 2, 3 après 1 seconde chacune, Erreur à la deuxième
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { tests_async_05_composition_async_await_erreur }
    \n
    `,
  })
  async tests_async_05_composition_async_await_erreur(): Promise<
    string | null
  > {
    let result = '0';
    const wait1_1sec = async (x) => x + (await timeoutThenMessage(1000, '1'));
    const wait2_1sec_and_throw = async (x) => {
      await timeout(1000);
      const errorMsgFn2 = `Message d'erreur depuis la fonction 2`;
      console.error(errorMsgFn2);
      throw errorMsgFn2;
      return x + '2';
    };
    const wait3_1sec = async (x) => x + (await timeoutThenMessage(1000, '3'));

    try {
      for (const f of [wait1_1sec, wait2_1sec_and_throw, wait3_1sec]) {
        result = await f(result);
        // Affiché de manière asynchrone, en série
        console.log(result);
      }
    } catch (e) {
      const errorMsg = `Racine : Attrapage d'une éventuelle erreur sur la série de promesses\n${e}`;
      console.error(errorMsg);
      // return errorMsg;
      throw errorMsg;
    }
    return result;
  }

  // * 📌⏳ 06 / ⏳🤞🤞💯🐛 Composition > allSettled and status
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#composition
  @Query(() => String, {
    name: 'tests_async_06_composition_async_await_allSettled_and_status',
    description: `📌 06 / ⏳🤞🤞💯🐛 Test composition de promesses (3, la 2eme est HS), allSettled & status a la fin
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { tests_async_06_composition_async_await_allSettled_and_status }
    \n
    `,
  })
  async tests_async_06_composition_async_await_allSettled_and_status(): Promise<
    string | null
  > {
    let result = '0';
    const wait1_1sec = timeoutThenMessage(1000, '1');

    const wait2_1sec_and_throw = new Promise(async (resolve, reject) => {
      // try {
      await timeout(1500);
      const errorMsgFn2 = `Message d'erreur depuis la fonction 2`;
      console.error(errorMsgFn2);
      reject(errorMsgFn2);
      throw errorMsgFn2; // plante le allSettled ... même avec try/catch

      resolve('2');
      return '2';
      // } catch (e) {
      //   const errorMsg = `Racine : Attrapage d'une éventuelle erreur sur la série de promesses\n${e}`;
      //   console.error(errorMsg);
      //   // return errorMsg;
      //   throw errorMsg;
      // }
    });

    const wait3_1sec = timeoutThenMessage(2000, '3');

    // Try/catch inutile ici -_-
    // try {
    Promise.allSettled([wait1_1sec, wait2_1sec_and_throw, wait3_1sec]).then(
      (results) =>
        results.forEach((localResult) => {
          console.log(localResult.status);

          result += localResult;
          // Affiché de manière asynchrone, en série
          console.log(localResult);
        }),
    );
    //   } catch (e) {
    //     const errorMsg = `Racine : Attrapage d'une éventuelle erreur sur la série de promesses\n${e}`;
    //     console.error(errorMsg);
    //     // return errorMsg;
    //     throw errorMsg;
    //   }
    return result;
  }
}
