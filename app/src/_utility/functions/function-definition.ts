import {
  AdmissibleParams,
  ANY,
  INTEGER,
  NUMERIC,
  NUMBER__COUNTER,
  STRING__ANY,
  STRING__CONSTANT,
} from './admissible-params';

// * Previously CtFunctionDefinition
//   Counter related functions structure and definition, hard coded instead of database stored

// * 🏗️📕🦾 Structure des définitions de fonctions
//          Décalaration des fonctions disponibles à l'utilisation dans les compteurs
//          ⚙️ Les nombre de paramètres peut être variables en fonction de la fonction appelée

// * 📌 Tests / src/__tests-and-examples/tests-and-examples.resolver.ts
// 🌐 { function_definition_test }

// TS Enums / https://masteringjs.io/tutorials/fundamentals/enum
// Date specific format to apply (FORMAT_DATE_COURANTE & FORMAT_DATE)
enum dateFormatEnum {
  AAAAMMJJ = '"AAAAMMJJ"',
  AAAAMM = '"AAAAMM"',
  AAAA = '"AAAA"',
  MMJJ = '"MMJJ"',
  MM = '"MM"',
  JJ = '"JJ"',
}

// Number of auhorized parameters for a function
enum ParamsNumberEnum {
  none = 'none',
  one = 'one',
  oneOptionnal = 'oneOptionnal',
  two = 'two',
  twoWithSecondOptionnal = 'twoWithSecondOptionnal',
  twoOptionnals = 'twoOptionnals',
}

// Return type of the function
enum ReturnTypeEnum {
  Boolean = 'Boolean',
  Date = 'Date',
  Float = 'Float',
  Integer = 'Integer',
}

// Type of the function
enum TypeEnum {
  Aggregation = 'Aggregation',
  Atomic = 'Atomic',
  Global = 'Global',
  Maths = 'Maths',
}

// JS Classes       / https://www.typescriptlang.org/docs/handbook/classes.html
// Optional params  / https://www.drewtown.dev/post/optional-function-parameters-with-default-values-via-javascripts-object-spreading/
//                  / https://medium.com/@kubiak.maciej/optional-spreading-in-js-f6891b6a3f04
export class FunctionDefinition {
  code: string; // ✨ unique
  paramsNumber: ParamsNumberEnum;
  returnType: ReturnTypeEnum;
  type: TypeEnum;
  // eslint-disable-next-line
  chopChop: Function;

  // Optionnal
  labelShort?: string = null;
  labelLong?: string = null;
  firstParamDescription?: string = null;
  secondParamDescription?: string = null;
  firstParamConstraints?: AdmissibleParams = null;
  secondParamConstraints?: AdmissibleParams = null;

  constructor(
    code: string,
    paramsNumber: ParamsNumberEnum,
    returnType: ReturnTypeEnum,
    type: TypeEnum,
    // eslint-disable-next-line
    chopChop: Function,

    // Optionnal
    optionalParams?: {
      labelShort?: string;
      labelLong?: string;
      firstParamDescription?: string;
      secondParamDescription?: string;
      firstParamConstraints?: AdmissibleParams;
      secondParamConstraints?: AdmissibleParams;
    },
  ) {
    this.code = code;
    this.paramsNumber = paramsNumber;
    this.returnType = returnType;
    this.type = type;
    this.chopChop = chopChop;

    const optionalDefaults = {
      labelShort: null,
      labelLong: null,
      firstParamDescription: null,
      secondParamDescription: null,
      firstParamConstraints: null,
      secondParamConstraints: null,
      // Default overload thourgh deconstruction
      ...optionalParams,
    };

    this.labelShort = optionalDefaults.labelShort;
    this.labelLong = optionalDefaults.labelLong;
    this.firstParamDescription = optionalDefaults.firstParamDescription;
    this.secondParamDescription = optionalDefaults.secondParamDescription;
    this.firstParamConstraints = optionalDefaults.firstParamConstraints;
    this.secondParamConstraints = optionalDefaults.secondParamConstraints;
  }

  toString() {
    let functionString = `code '${this.code}'`;
    functionString += ` / paramsNumber '${this.paramsNumber}'`;
    functionString += ` / returnType '${this.returnType}'`;
    functionString += ` / type '${this.type}'`;
    functionString += ` / chopChop '${this.chopChop.toString()}'`;

    functionString += ` / labelShort '${this.labelShort}'`;
    functionString += ` / labelLong '${this.labelLong}'`;
    functionString += ` / firstParamDescription '${this.firstParamDescription}'`;
    functionString += ` / secondParamDescription '${this.secondParamDescription}'`;
    functionString += ` / firstParamConstraints '${
      this.firstParamConstraints
        ? this.firstParamConstraints.toString()
        : this.firstParamConstraints
    }'`;
    functionString += ` / secondParamConstraints '${
      this.secondParamConstraints
        ? this.secondParamConstraints.toString()
        : this.secondParamConstraints
    }'`;
    return functionString;
  }
}

// * 📌 Tests / src/__tests-and-examples/tests-and-examples.resolver.ts
// 🌐 { function_definition_test }
export const functionDefinition_test_onlyMandatory = new FunctionDefinition(
  'only code',
  ParamsNumberEnum.one,
  ReturnTypeEnum.Boolean,
  TypeEnum.Aggregation,
  (doNothing: any) => doNothing,
);
export const functionDefinition_test_wOptParams = new FunctionDefinition(
  'dat code',
  ParamsNumberEnum.two,
  ReturnTypeEnum.Float,
  TypeEnum.Atomic,
  (doNothing: any) => doNothing,
  {
    labelShort: 'dat labelShort',
    labelLong: 'dat labelLong',
    firstParamDescription: 'dat firstParamDescription',
    secondParamDescription: 'dat secondParamDescription',
    firstParamConstraints: STRING__CONSTANT,
    secondParamConstraints: STRING__CONSTANT,
  },
);

// ---

// * 📕🦾 Catalogue de fonctions
//   Actual function definition instances

// Modulo %
export const MODULO = new FunctionDefinition(
  'MODULO',
  ParamsNumberEnum.two,
  ReturnTypeEnum.Float,
  TypeEnum.Maths,
  (a: number, b: number) => a % b,
  {
    labelShort: 'Modulo de la division effectuée',
    labelLong: 'Reste de la division euclidienne',
    firstParamDescription: 'Valeur numérique à limiter',
    secondParamDescription: 'Limite',
    firstParamConstraints: NUMERIC,
    secondParamConstraints: NUMERIC,
  },
);

// Max
export const MAX = new FunctionDefinition(
  'MAX',
  ParamsNumberEnum.two,
  ReturnTypeEnum.Float,
  TypeEnum.Maths,
  (a: number, b: number) => Math.max(a, b),
  {
    labelShort: 'Valeur max parmi celles comparées',
    labelLong: 'Valeur max parmi celles comparées',
    firstParamDescription: 'Source de valeurs ou constante',
    secondParamDescription: 'Source de valeurs ou constante',
    firstParamConstraints: NUMERIC,
    secondParamConstraints: NUMERIC,
  },
);

// Min
export const MIN = new FunctionDefinition(
  'MIN',
  ParamsNumberEnum.two,
  ReturnTypeEnum.Float,
  TypeEnum.Maths,
  (a: number, b: number) => Math.min(a, b),
  {
    labelShort: 'Valeur min parmi celles comparées',
    labelLong: 'Valeur min parmi celles comparées',
    firstParamDescription: 'Source de valeurs ou constante',
    secondParamDescription: 'Source de valeurs ou constante',
    firstParamConstraints: NUMERIC,
    secondParamConstraints: NUMERIC,
  },
);

// Partie Entiere
export const PARTIE_ENTIERE = new FunctionDefinition(
  'PARTIE_ENTIERE',
  ParamsNumberEnum.one,
  ReturnTypeEnum.Float,
  TypeEnum.Maths,
  (a: number) => Math.trunc(a),
  {
    labelShort: `Partie entière de la valeur de l'objet source`,
    labelLong: `Partie entière de la valeur de l'objet source`,
    firstParamDescription: 'Source de valeurs',
    firstParamConstraints: NUMERIC,
  },
);

// Partie Decimale
export const PARTIE_DECIMALE = new FunctionDefinition(
  'PARTIE_DECIMALE',
  ParamsNumberEnum.one,
  ReturnTypeEnum.Float,
  TypeEnum.Maths,
  // With (a: number) => a % 1,
  // Also with (a: number) => a - Math.trunc(a),
  // 42.42 returns 0.4200000000000017, javascript srsly -_-
  //    toFixed > remove artefacts, keeping some precision
  //    parseFloat > remove trailing 0 (~= 0.4200000000 > 0.42)
  (a: number) => parseFloat((a % 1).toFixed(10)),
  {
    labelShort: `Partie décimale de la valeur de l'objet source`,
    labelLong: `Partie décimale de la valeur de l'objet source
🚨Précision jusqu'à 10 chiffres après la virgule, afin d'éviter les artefacts laissés par Javascript.`,
    firstParamDescription: 'Source de valeurs',
    firstParamConstraints: NUMERIC,
  },
);

// Arrondi
export const ARRONDI = new FunctionDefinition(
  'ARRONDI',
  ParamsNumberEnum.two,
  ReturnTypeEnum.Float,
  TypeEnum.Maths,
  (a: number, b: number) => parseFloat(a.toFixed(b)),
  {
    labelShort: `Valeur arrondie au nombre de décimales indiqué dans l'un des objets sources`,
    labelLong: `Valeur arrondie au nombre de décimales indiqué dans l'un des objets sources`,
    firstParamDescription: 'Source de valeurs',
    secondParamDescription: 'Nombre de chiffre à conserver après la virgule',
    firstParamConstraints: NUMERIC,
    secondParamConstraints: INTEGER,
  },
);

// Valeur Absolue
// export const VALEUR_ABSOLUE = new FunctionDefinition(
export const ABS = new FunctionDefinition(
  'ABS',
  ParamsNumberEnum.one,
  ReturnTypeEnum.Float,
  TypeEnum.Maths,
  (a: number) => Math.abs(a),
  {
    labelShort: `Valeur absolue de la valeur de l'objet source`,
    labelLong: `Valeur absolue de la valeur de l'objet source`,
    firstParamDescription: 'Source de valeurs',
    firstParamConstraints: NUMERIC,
  },
);

// Incrémentation
export const INCREMENTATION = new FunctionDefinition(
  'INCREMENTATION',
  ParamsNumberEnum.twoOptionnals,
  ReturnTypeEnum.Integer,
  TypeEnum.Aggregation,
  // L'accumulation est gérée dans CounterExec
  (a?: any, b?: any): number => {
    const isAUndefined = a === undefined;
    const isBUndefined = b === undefined;
    const isANotNull = a !== null;

    // No params
    if (isAUndefined && isBUndefined) {
      return 1;
    }
    // 1 param
    if (isBUndefined) {
      return isANotNull ? 1 : 0;
    }
    // 2 params
    return a === b ? 1 : 0;
  },
  {
    labelShort: `Si la valeur passée en paramètre n'est pas nulle, la valeur augmente de +1 à chaque jour.`,
    labelLong: `Fonction d'aggrégation. Le résultat renvoyé sera cumulé.
Si aucun paramètre n'est passé, renvoie systématiquement 1.
TODO: Si un paramètre est passé, renvoie 1 si la valeur existe (not null, not undefined).
TODO: Si deux paramètres sont passés, la valeur du premier sera comparée à la valeur du deuxième. Si égale, renvoie 1.`,
    firstParamDescription: `Valeur dont tester l'existence`,
    firstParamConstraints: ANY,
  },
);

// Moyenne
export const MOYENNE = new FunctionDefinition(
  'MOYENNE',
  ParamsNumberEnum.two,
  ReturnTypeEnum.Float,
  TypeEnum.Aggregation,
  // TODO: Implement function
  (doNothing: any) => doNothing,
  {
    labelShort: `Moyenne de la somme d'objets sources divisés par un autre objet source`,
    labelLong: `Moyenne de la somme d'objets sources divisés par un autre objet source`,
    firstParamDescription: 'Source de valeurs',
    secondParamDescription: 'Valeur/s de division',
    firstParamConstraints: NUMERIC,
    secondParamConstraints: NUMERIC,
  },
);

// Somme
export const SOMME = new FunctionDefinition(
  'SOMME',
  ParamsNumberEnum.one,
  ReturnTypeEnum.Float,
  TypeEnum.Aggregation,
  // L'accumulation est gérée dans CounterExec
  (a: number): number => a,
  {
    labelShort: `Si la valeur passée en paramètre n'est pas nulle, la valeur augmente de +1 à chaque jour.
Reset à chaque ajout de résultat.`,
    labelLong: `Si la valeur passée en paramètre n'est pas nulle, la valeur augmente de +1 à chaque jour.
Reset à chaque ajout de résultat.`,
    firstParamDescription: 'Source de valeurs',
    firstParamConstraints: NUMERIC,
  },
);

// Valeur de la veille
export const VALEUR_PRECEDENTE_PERIODICITE = new FunctionDefinition(
  'VALEUR_PRECEDENTE_PERIODICITE',
  ParamsNumberEnum.oneOptionnal,
  ReturnTypeEnum.Integer,
  // TypeEnum.Atomic,
  TypeEnum.Aggregation,
  // La récupération est gérée dans CounterExec
  (a: number): number => a,
  {
    labelShort: `Renvoie la valeur retournée (via RETURN) de la veille (sinon 0).`,
    labelLong: `Renvoie la valeur retournée (via RETURN) de la veille (sinon 0).`,
    firstParamDescription: `Compteur à cibler pour la récupération de la valeur.
Si non rempli, renvoie la valeur de la veille du compteur actuel`,
    firstParamConstraints: NUMBER__COUNTER,
  },
);

// EstTypeJour
export const EST_TYPE_JOUR = new FunctionDefinition(
  'EST_TYPE_JOUR',
  ParamsNumberEnum.one,
  ReturnTypeEnum.Boolean,
  TypeEnum.Global,
  // TODO: Implement function
  (doNothing: any) => doNothing,
  {
    labelShort: `Booleen basé sur le type de jour en cours de calcul`,
    labelLong: `Booleen basé sur le type de jour en cours de calcul. 0 si pas le type de jour testé, 1 dans le cas contraire`,
    firstParamDescription: `Type/s de jour/s, mais aucune idée de comment l'implémenter sans AdmissibleDays lel, ptet un par un`,
    // firstParamConstraints: 'admissibleParam_AdmissibleDays__Constant',
    //    code: 'ADMISSIBLE_DAYS__CONSTANT',
    //    description: 'Date tye, Constant and function only',
    //    canParameterBeType_Boolean: false,
    //    canParameterBeType_Date: false,
    //    canParameterBeType_Float: false,
    //    canParameterBeType_Number: false,
    //    canParameterBeType_String: false,
    //    canParameterBeType_AdmissibleDays: true,

    //    canParameterBeEntityType_Constant: true,
    //    canParameterBeEntityType_Variable: false,
    //    canParameterBeEntityType_Function: false,
    //    canParameterBeEntityType_Counter: false,
    //    canParameterBeEntityType_ResourceField: false,
    //    canParameterBeEntityType_EventDuration: false,
    //    canParameterBeEntityType_EventQuantity: false,
    //    canParameterBeEntityType_EventDurationAggregated: false,
    //    canParameterBeEntityType_EventQuantityAggregated: false,
    //    canParameterBeEntityType_ReferenceValue: false,
    firstParamConstraints: STRING__CONSTANT,
  },
);

// EstAbsenceJour
export const EST_ABSENCE_JOUR = new FunctionDefinition(
  'EST_ABSENCE_JOUR',
  ParamsNumberEnum.none,
  ReturnTypeEnum.Float,
  TypeEnum.Global,
  // TODO: Implement function
  (doNothing: any) => doNothing,
  {
    labelShort: `0 si pas d'absence jour, quantité de l'absence dans le cas inverse (0,5 ou 1)`,
    labelLong: `0 si pas d'absence jour, quantité de l'absence dans le cas inverse (0,5 ou 1)`,
  },
);

// EstAbsenceHeure
export const EST_ABSENCE_HEURE = new FunctionDefinition(
  'EST_ABSENCE_HEURE',
  ParamsNumberEnum.none,
  ReturnTypeEnum.Float,
  TypeEnum.Global,
  // TODO: Implement function
  (doNothing: any) => doNothing,
  {
    labelShort: `0 si pas d'absence heure, durée de l'absence dans le cas inverse`,
    labelLong: `0 si pas d'absence heure, durée de l'absence dans le cas inverse`,
  },
);

// NombreDeJoursFeries
export const NB_JOUR_FERIE = new FunctionDefinition(
  'NB_JOUR_FERIE',
  ParamsNumberEnum.none,
  ReturnTypeEnum.Integer,
  TypeEnum.Global,
  // TODO: Implement function
  (doNothing: any) => doNothing,
  {
    labelShort: `Retourne le nombre de jours feries pour la periode du compteur selectionnée`,
    labelLong: `Retourne le nombre de jours feries pour la periode du compteur selectionnée`,
  },
);

// NombreDeJoursOuvres
export const NB_JOUR_OUVRES = new FunctionDefinition(
  'NB_JOUR_OUVRES',
  ParamsNumberEnum.none,
  ReturnTypeEnum.Integer,
  TypeEnum.Global,
  // TODO: Implement function
  (doNothing: any) => doNothing,
  {
    labelShort: `Retourne le nombre de jours ouvrés pour la periode du compteur selectionnée`,
    labelLong: `Retourne le nombre de jours ouvrés pour la periode du compteur selectionnée`,
  },
);

// NombreDeJoursOuvrables
export const NB_JOUR_OUVRABLES = new FunctionDefinition(
  'NB_JOUR_OUVRABLES',
  ParamsNumberEnum.none,
  ReturnTypeEnum.Integer,
  TypeEnum.Global,
  // TODO: Implement function
  (doNothing: any) => doNothing,
  {
    labelShort: `Retourne le nombre de jours ouvrables pour la periode du compteur selectionnée`,
    labelLong: `Retourne le nombre de jours ouvrables pour la periode du compteur selectionnée`,
  },
);

// NombreDeJoursCalendaires
export const NB_JOUR_CALENDAIRES = new FunctionDefinition(
  'NB_JOUR_CALENDAIRES',
  ParamsNumberEnum.none,
  ReturnTypeEnum.Integer,
  TypeEnum.Global,
  // TODO: Implement function
  (doNothing: any) => doNothing,
  {
    labelShort: `Retourne le nombre de jours calendaires pour la periode du compteur selectionnée`,
    labelLong: `Retourne le nombre de jours calendaires pour la periode du compteur selectionnée`,
  },
);

// Aujourdhui
export const AUJOURDHUI = new FunctionDefinition(
  'AUJOURDHUI',
  ParamsNumberEnum.none,
  // ReturnTypeEnum.Date,
  ReturnTypeEnum.Integer,
  TypeEnum.Global,
  () => {
    // Today as YYYYMMJJ
    const date = new Date();
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString();
    const dd = date.getDate().toString();

    const mmChars = mm.split('');
    const ddChars = dd.split('');

    return parseInt(
      yyyy +
        // '-' +
        (mmChars[1] ? mm : '0' + mmChars[0]) +
        // '-' +
        (ddChars[1] ? dd : '0' + ddChars[0]),
    );
  },
  {
    labelShort: `Date système`,
    labelLong: `Date système`,
  },
);

// Pour une date donnée, quel est le jour de la semaine ? Retour en nombre entier
//  ⚙️ Paramètre date<DATE>, 🤖🧮 passé automatiquement par le compteur
//          Spécifier une source de date autre que la date actuelle dans le compteur
//          Format YYYYMMJJ
//  ⚙️ Paramètre starts<{'Monday'|'Sunday'}>
//        monday > Monday - Sunday : 0 - 6
//          Lundi 0, Mardi 1, Mercredi 2, etc.
//        sunday > Sunday - Saturday : 0 - 6
//          Dimanche 0, Lundi 1, Mardi 2, etc.
export const JOUR_INT = new FunctionDefinition(
  'JOUR_INT',
  ParamsNumberEnum.oneOptionnal,
  ReturnTypeEnum.Integer,
  TypeEnum.Global,
  (dateYYYYMMJJ: string, starts?: string) => {
    // Besoin de '1995-12-17' > 'YYYY-MM-DD'
    const year = dateYYYYMMJJ.substring(0, 4);
    const month = dateYYYYMMJJ.substring(4, 6);
    const day = dateYYYYMMJJ.substring(6, 8);
    const dateWithDashes = `${year}-${month}-${day}`;
    const date = new Date(dateWithDashes);

    // Monday - Sunday : 0 - 6
    if (starts === 'Sunday') {
      // Sunday - Saturday : 0 - 6
      return date.getDay();
    }
    const dayIndex = date.getDay();
    // Sunday 0 > 6
    // Others - 1
    return dayIndex === 0 ? 6 : dayIndex - 1;
  },
  {
    labelShort: `Pour une date donnée, quel est le jour de la semaine ? Retour en nombre entier`,
    labelLong: `Pour une date donnée, quel est le jour de la semaine ? Retour en nombre entier
  ⚙️ Paramètre starts<{monday|sunday}>
  ⚙️ Paramètre date<DATE>`,
    firstParamDescription: `⚙️ Paramètre starts<{monday|sunday}>
monday > Monday - Sunday : 0 - 6
  Lundi 0, Mardi 1, Mercredi 2, etc.
sunday > Sunday - Saturday : 0 - 6
  Dimanche 0, Lundi 1, Mardi 2, etc.`,
    secondParamDescription: `⚙️ Paramètre date<DATE>
Spécifier une date autre que la date actuelle dans le compteur
Format YYYYMMJJ`,
    // TODO: Better constraints
    firstParamConstraints: ANY,
    secondParamConstraints: ANY,
  },
);

// Pour une date donnée, quel est le jour de la semaine ? Retour en string
//  ⚙️ Paramètre date<DATE>, 🤖🧮 passé automatiquement par le compteur
//          Spécifier une source de date autre que la date actuelle dans le compteur
//          Format YYYYMMJJ
//  ⚙️ Paramètre localization<{'fr_FR'|'en_US'}>
//        fr_FR : Lundi - Dimanche
//        en_US : Monday - Sunday
export const JOUR_STRING = new FunctionDefinition(
  'JOUR_STRING',
  ParamsNumberEnum.twoWithSecondOptionnal,
  ReturnTypeEnum.Integer,
  TypeEnum.Global,
  (dateYYYYMMJJ: string, localization?: string) => {
    // Besoin de '1995-12-17' > 'YYYY-MM-DD'
    const year = dateYYYYMMJJ.substring(0, 4);
    const month = dateYYYYMMJJ.substring(4, 6);
    const day = dateYYYYMMJJ.substring(6, 8);
    const dateWithDashes = `${year}-${month}-${day}`;
    const date = new Date(dateWithDashes);

    const dayIndex = date.getDay();

    if (localization === 'en_US') {
      switch (dayIndex) {
        case 0:
          return 'Sunday';
        case 1:
          return 'Monday';
        case 2:
          return 'Tuesday';
        case 3:
          return 'Wednesday';
        case 4:
          return 'Thursday';
        case 5:
          return 'Friday';
        case 6:
          return 'Saturday';
      }
    }

    switch (dayIndex) {
      case 0:
        return 'Dimanche';
      case 1:
        return 'Lundi';
      case 2:
        return 'Mardi';
      case 3:
        return 'Mercredi';
      case 4:
        return 'Jeudi';
      case 5:
        return 'Vendredi';
      case 6:
        return 'Samedi';
    }
  },
  {
    labelShort: `Pour une date donnée, quel est le jour de la semaine ? Retour en nombre entier`,
    labelLong: `Pour une date donnée, quel est le jour de la semaine ? Retour en nombre entier
  ⚙️ Paramètre localization<{monday|sunday}>
  ⚙️ Paramètre date<DATE>`,
    firstParamDescription: `⚙️ Paramètre localization<{monday|sunday}>
        fr_FR : Lundi - Dimanche
        en_US : Monday - Sunday`,
    secondParamDescription: `⚙️ Paramètre date<DATE>
Spécifier une date autre que la date actuelle dans le compteur
Format YYYYMMJJ`,
    // TODO: Better constraints
    firstParamConstraints: ANY,
    secondParamConstraints: ANY,
  },
);

// DateDuJour
export const DATE_DU_JOUR = new FunctionDefinition(
  'DATE_DU_JOUR',
  ParamsNumberEnum.none,
  // ReturnTypeEnum.Date,
  ReturnTypeEnum.Integer,
  TypeEnum.Global,
  // La récupération est gérée dans CounterExec
  (doNothing: any) => doNothing,
  {
    labelShort: `Compteur du jour J qui récupère la valeur de la journée`,
    labelLong: `Compteur du jour J qui récupère la valeur de la journée`,
  },
);

// DateDeLaVeille
export const DATE_DE_LA_VEILLE = new FunctionDefinition(
  'DATE_DE_LA_VEILLE',
  ParamsNumberEnum.none,
  // ReturnTypeEnum.Date,
  ReturnTypeEnum.Integer,
  TypeEnum.Global,
  // La récupération est gérée dans CounterExec
  (doNothing: any) => doNothing,
  {
    labelShort: `Compteur du jour J qui récupère la valeur de la journée d'avant`,
    labelLong: `Compteur du jour J qui récupère la valeur de la journée d'avant`,
  },
);

// FormatDateCourante
export const FORMAT_DATE_COURANTE = new FunctionDefinition(
  'FORMAT_DATE_COURANTE',
  ParamsNumberEnum.two,
  // ReturnTypeEnum.Date,
  ReturnTypeEnum.Integer,
  TypeEnum.Global,
  (dateYYYYMMJJ: string, format: dateFormatEnum) => {
    const year = dateYYYYMMJJ.substring(0, 4);
    const month = dateYYYYMMJJ.substring(4, 6);
    const day = dateYYYYMMJJ.substring(6, 8);

    switch (format) {
      case '"AAAAMMJJ"':
        return parseInt(year + month + day);
      case '"AAAAMM"':
        return parseInt(year + month);
      case '"AAAA"':
        return parseInt(year);
      case '"MMJJ"':
        return parseInt(month + day);
      case '"MM"':
        return parseInt(month);
      case '"JJ"':
        return parseInt(day);
    }
    const errorMsg = `🐛 Function Definition > FORMAT_DATE_COURANTE > Wrong format '${format}'.\nAllowed formats are AAAMMJJ, AAAAMM, AAAA, MMJJ, MM, JJ.`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  },
  {
    labelShort: `Date en cours de calcul au format demandé en paramètres (AAAMMJJ, AAAAMM, AAAA, MMJJ, MM, JJ)`,
    labelLong: `Date en cours de calcul (ex: 20230601). On pourra par exemple comparer cette date à la valeur d'une constante (SI Date AAAAMMJJ < Constante 20230901)`,
    firstParamDescription: 'Date du jour passée depuis le déroulé compteur',
    secondParamDescription:
      'Format souhaité (AAAMMJJ, AAAAMM, AAAA, MMJJ, MM, JJ)',
    firstParamConstraints: STRING__ANY,
    secondParamConstraints: STRING__ANY,
  },
);

// FormatDate
export const FORMAT_DATE = new FunctionDefinition(
  'FORMAT_DATE',
  ParamsNumberEnum.two,
  // ReturnTypeEnum.Date,
  ReturnTypeEnum.Integer,
  TypeEnum.Global,
  (dateYYYYMMJJ: number, format: dateFormatEnum) => {
    const dateYYYYMMJJ_string = dateYYYYMMJJ.toString();
    const year = dateYYYYMMJJ_string.substring(0, 4);
    const month = dateYYYYMMJJ_string.substring(4, 6);
    const day = dateYYYYMMJJ_string.substring(6, 8);

    switch (format) {
      case '"AAAAMMJJ"':
        return parseInt(year + month + day);
      case '"AAAAMM"':
        return parseInt(year + month);
      case '"AAAA"':
        return parseInt(year);
      case '"MMJJ"':
        return parseInt(month + day);
      case '"MM"':
        return parseInt(month);
      case '"JJ"':
        return parseInt(day);
    }
    const errorMsg = `🐛 Function Definition > FORMAT_DATE_COURANTE > Wrong format '${format}'.\nAllowed formats are AAAMMJJ, AAAAMM, AAAA, MMJJ, MM, JJ.`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  },
  {
    labelShort: `Date en cours de calcul au format demandé en paramètres (AAAMMJJ, AAAAMM, AAAA, MMJJ, MM, JJ)`,
    labelLong: `Date en cours de calcul (ex: 20230601). On pourra par exemple comparer cette date à la valeur d'une constante (SI Date AAAAMMJJ < Constante 20230901)`,
    firstParamDescription: 'Date, depuis une Constante ou une Fonction',
    secondParamDescription:
      'Format souhaité (AAAMMJJ, AAAAMM, AAAA, MMJJ, MM, JJ)',
    firstParamConstraints: STRING__ANY,
    secondParamConstraints: STRING__ANY,
  },
);
