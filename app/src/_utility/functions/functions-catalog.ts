// * 📖🦾 All instanciated functions
//   Grouped for easy access
//   Allow quick existance test
//   v2: Added singleton & cache

// * 📌 Tests / src/__tests-and-examples/tests-and-examples.resolver.ts
// 🌐 { function_catalog_get_test }
// 🌐 { function_catalog_get_test(code: "MODULO") }
// 🌐 { function_catalog_get_test(code: "bof") }
// 🌐 { function_catalog_keys_test }
// 🌐 { function_catalog_list_test }

// TODO: ♻️⚡️ Refacto functions calls in FCatalog to add cache
// TODO:
// TODO:          Yeah pas possible de cahce en l'état actuel des choses, j'ai trop bien bossé :')
// TODO:
// TODO:          - les calculs effectués par les fonctions ne sont pas fais via un gros switch des familles
// TODO:            - actuellement les définitions de fonctions embarquent des fonctions anonymes afin de respecter le SRP
// TODO:
// TODO:          Donc chaque fonction est indépendante, il fautdrait plus un bail du genre
// TODO:
// TODO:          - Actuellement functionCatalog renvoie une instance de function definition
// TODO:          - ---
// TODO:          - il faudrait
// TODO:          - functionCatalog
// TODO:            - cache
// TODO:            - fonctions directe ici
// TODO:            - ~= functionCatalog.modulo(5, 2)
// TODO:              - La on peut stocker l'index du cache 'modulo(5, 2)' & son résulat

import {
  FunctionDefinition, // TODO: Add proper types
  MODULO,
  MAX,
  MIN,
  PARTIE_ENTIERE,
  PARTIE_DECIMALE,
  ARRONDI,
  ABS, // VALEUR_ABSOLUE,
  INCREMENTATION,
  MOYENNE,
  SOMME,
  VALEUR_PRECEDENTE_PERIODICITE,
  EST_TYPE_JOUR,
  EST_ABSENCE_JOUR,
  EST_ABSENCE_HEURE,
  NB_JOUR_FERIE,
  NB_JOUR_OUVRES,
  NB_JOUR_OUVRABLES,
  NB_JOUR_CALENDAIRES,
  AUJOURDHUI,
  JOUR_INT,
  JOUR_STRING,
  DATE_DU_JOUR,
  DATE_DE_LA_VEILLE,
  FORMAT_DATE_COURANTE,
  FORMAT_DATE,
} from './function-definition';

// ---

let instance;

// JS Classes       / https://www.typescriptlang.org/docs/handbook/classes.html
// Optional params  / https://www.drewtown.dev/post/optional-function-parameters-with-default-values-via-javascripts-object-spreading/
//                  / https://medium.com/@kubiak.maciej/optional-spreading-in-js-f6891b6a3f04
class FunctionsCatalog {
  // functions: object = {};
  functions = {
    // Props definitions
    MODULO,
    MAX,
    MIN,
    PARTIE_ENTIERE,
    PARTIE_DECIMALE,
    ARRONDI,
    ABS, // VALEUR_ABSOLUE,
    INCREMENTATION,
    MOYENNE,
    SOMME,
    VALEUR_PRECEDENTE_PERIODICITE,
    EST_TYPE_JOUR,
    EST_ABSENCE_JOUR,
    EST_ABSENCE_HEURE,
    NB_JOUR_FERIE,
    NB_JOUR_OUVRES,
    NB_JOUR_OUVRABLES,
    NB_JOUR_CALENDAIRES,
    AUJOURDHUI,
    JOUR_INT,
    JOUR_STRING,
    DATE_DU_JOUR,
    DATE_DE_LA_VEILLE,
    FORMAT_DATE_COURANTE,
    FORMAT_DATE,
  };

  constructor() {
    if (instance) {
      return instance;
    }

    this.functions = {
      // Props content definition, eq. to props: FunctionDefintion imported instances
      MODULO,
      MAX,
      MIN,
      PARTIE_ENTIERE,
      PARTIE_DECIMALE,
      ARRONDI,
      ABS, // VALEUR_ABSOLUE,
      INCREMENTATION,
      MOYENNE,
      SOMME,
      VALEUR_PRECEDENTE_PERIODICITE,
      EST_TYPE_JOUR,
      EST_ABSENCE_JOUR,
      EST_ABSENCE_HEURE,
      NB_JOUR_FERIE,
      NB_JOUR_OUVRES,
      NB_JOUR_OUVRABLES,
      NB_JOUR_CALENDAIRES,
      AUJOURDHUI,
      JOUR_INT,
      JOUR_STRING,
      DATE_DU_JOUR,
      DATE_DE_LA_VEILLE,
      FORMAT_DATE_COURANTE,
      FORMAT_DATE,
    };

    // eslint-disable-next-line
    instance = this;
  }

  // If code is defined, returns the function, else returns all
  get(code?: string): FunctionDefinition | object | string {
    // console.log(`code: ${code}`);
    // console.log(this.functions);
    // console.log(this.functions.MODULO);

    if (code === undefined) {
      return this.functions;
    }

    // 📌 Check if function exist
    if (Object.hasOwn(this.functions, code)) {
      return this.functions[code];
    }

    const error = `FunctionDefinition not found. There is no function with the code '${code}'`;
    console.error(error);
    throw new Error(error);
  }

  keys(): Array<string> {
    return Object.keys(this.functions);
  }

  list(): string {
    return this.keys().join(', ');
  }

  allTests() {
    let result = '';

    const fnMODULO: FunctionDefinition = functionsCatalog.get(
      'MODULO',
    ) as FunctionDefinition;
    const fnMODULOReturn = `Test de MODULO(7, 2) : ${fnMODULO.chopChop(7, 2)}`;
    console.log(fnMODULOReturn);
    result += `${fnMODULOReturn}\n`;

    const fnMAX: FunctionDefinition = functionsCatalog.get(
      'MAX',
    ) as FunctionDefinition;
    const fnMAXReturn = `Test de MAX(5, 10) : ${fnMAX.chopChop(5, 10)}`;
    console.log(fnMAXReturn);
    result += `${fnMAXReturn}\n`;

    const fnMIN: FunctionDefinition = functionsCatalog.get(
      'MIN',
    ) as FunctionDefinition;
    const fnMINReturn = `Test de MIN(5, 10) : ${fnMIN.chopChop(5, 10)}`;
    console.log(fnMINReturn);
    result += `${fnMINReturn}\n`;

    const fnPARTIE_ENTIERE: FunctionDefinition = functionsCatalog.get(
      'PARTIE_ENTIERE',
    ) as FunctionDefinition;
    const fnPARTIE_ENTIEREReturn = `Test de PARTIE_ENTIERE(42.42) : ${fnPARTIE_ENTIERE.chopChop(
      42.42,
    )}`;
    console.log(fnPARTIE_ENTIEREReturn);
    result += `${fnPARTIE_ENTIEREReturn}\n`;

    const fnPARTIE_DECIMALE: FunctionDefinition = functionsCatalog.get(
      'PARTIE_DECIMALE',
    ) as FunctionDefinition;
    const fnPARTIE_DECIMALEReturn = `Test de PARTIE_DECIMALE(42.42) : ${fnPARTIE_DECIMALE.chopChop(
      42.42,
    )}`;
    console.log(fnPARTIE_DECIMALEReturn);
    result += `${fnPARTIE_DECIMALEReturn}\n`;

    const fnARRONDI: FunctionDefinition = functionsCatalog.get(
      'ARRONDI',
    ) as FunctionDefinition;
    const fnARRONDIReturn = `Test de ARRONDI(42.42, 1) : ${fnARRONDI.chopChop(
      42.42,
      1,
    )}`;
    console.log(fnARRONDIReturn);
    result += `${fnARRONDIReturn}\n`;

    const fnABS: FunctionDefinition = functionsCatalog.get(
      'ABS',
    ) as FunctionDefinition;
    const fnABSReturn = `Test de ABS(-5) : ${fnABS.chopChop(-5)}`;
    console.log(fnABSReturn);
    result += `${fnABSReturn}\n`;

    const fnINCREMENTATION = functionsCatalog.get(
      'INCREMENTATION',
    ) as FunctionDefinition;
    let fnINCREMENTATIONReturn = `Test de INCREMENTATION() : ${fnINCREMENTATION.chopChop()}`;
    console.log(fnINCREMENTATIONReturn);
    fnINCREMENTATIONReturn = `Test de INCREMENTATION(null) : ${fnINCREMENTATION.chopChop(null)}`;
    console.log(fnINCREMENTATIONReturn);
    fnINCREMENTATIONReturn = `Test de INCREMENTATION(true) : ${fnINCREMENTATION.chopChop(true)}`;
    console.log(fnINCREMENTATIONReturn);
    fnINCREMENTATIONReturn = `Test de INCREMENTATION(true, false) : ${fnINCREMENTATION.chopChop(true, false)}`;
    console.log(fnINCREMENTATIONReturn);
    fnINCREMENTATIONReturn = `Test de INCREMENTATION(true, true) : ${fnINCREMENTATION.chopChop(true, true)}`;
    console.log(fnINCREMENTATIONReturn);
    result += `${fnINCREMENTATIONReturn}\n`;

    // TODO: MOYENNE
    // TODO: SOMME
    // TODO: VALEUR_PRECEDENTE_PERIODICITE

    const fnAUJOURDHUI: FunctionDefinition = functionsCatalog.get(
      'AUJOURDHUI',
    ) as FunctionDefinition;
    const fnAUJOURDHUIReturn = `Test de AUJOURDHUI() : ${fnAUJOURDHUI.chopChop()}`;
    console.log(fnAUJOURDHUIReturn);
    result += `${fnAUJOURDHUIReturn}\n`;

    return result;
  }
}

// * 📌 Tests / src/__tests-and-examples/tests-and-examples.resolver.ts
// 🌐 { function_definition_test }
export const functionsCatalog = Object.freeze(new FunctionsCatalog());
