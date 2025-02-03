// * Previously CtAdmissibleParam
//   Counter related functions parameters restrictions

// * 🏗️⚙️🛑 Structure des définitions des restrictions de paramètres
//          À la carte, par fonction
//          Réutilisable

// JS Classes       / https://www.typescriptlang.org/docs/handbook/classes.html
// Optional params  / https://www.drewtown.dev/post/optional-function-parameters-with-default-values-via-javascripts-object-spreading/
//                  / https://medium.com/@kubiak.maciej/optional-spreading-in-js-f6891b6a3f04
export class AdmissibleParams {
  code: string; // ✨ unique
  canParameterBeType_Boolean: boolean = true;
  canParameterBeType_Date: boolean = true;
  canParameterBeType_Float: boolean = true;
  canParameterBeType_Number: boolean = true;
  canParameterBeType_String: boolean = true;
  // canParameterBeType_AdmissibleDays: boolean = true;

  canParameterBeEntityType_Constant: boolean = true;
  canParameterBeEntityType_Variable: boolean = true;
  canParameterBeEntityType_Function: boolean = true;
  canParameterBeEntityType_Counter: boolean = true;
  canParameterBeEntityType_ResourceField: boolean = true;
  canParameterBeEntityType_EventDuration: boolean = true;
  canParameterBeEntityType_EventQuantity: boolean = true;
  canParameterBeEntityType_EventDurationAggregated: boolean = true;
  canParameterBeEntityType_EventQuantityAggregated: boolean = true;
  canParameterBeEntityType_ReferenceValue: boolean = true;

  // Optionnal
  description?: string = null;

  constructor(
    code: string,

    // Optionnal
    optionalParams?: {
      description: string;

      canParameterBeType_Boolean?: boolean;
      canParameterBeType_Date?: boolean;
      canParameterBeType_Float?: boolean;
      canParameterBeType_Number?: boolean;
      canParameterBeType_String?: boolean;
      // canParameterBeType_AdmissibleDays?: boolean;

      canParameterBeEntityType_Constant?: boolean;
      canParameterBeEntityType_Variable?: boolean;
      canParameterBeEntityType_Function?: boolean;
      canParameterBeEntityType_Counter?: boolean;
      canParameterBeEntityType_ResourceField?: boolean;
      canParameterBeEntityType_EventDuration?: boolean;
      canParameterBeEntityType_EventQuantity?: boolean;
      canParameterBeEntityType_EventDurationAggregated?: boolean;
      canParameterBeEntityType_EventQuantityAggregated?: boolean;
      canParameterBeEntityType_ReferenceValue?: boolean;
    },
  ) {
    this.code = code;

    const optionalDefaults = {
      description: null,

      canParameterBeType_Boolean: true,
      canParameterBeType_Date: true,
      canParameterBeType_Float: true,
      canParameterBeType_Number: true,
      canParameterBeType_String: true,
      // canParameterBeType_AdmissibleDays: true,

      canParameterBeEntityType_Constant: true,
      canParameterBeEntityType_Variable: true,
      canParameterBeEntityType_Function: true,
      canParameterBeEntityType_Counter: true,
      canParameterBeEntityType_ResourceField: true,
      canParameterBeEntityType_EventDuration: true,
      canParameterBeEntityType_EventQuantity: true,
      canParameterBeEntityType_EventDurationAggregated: true,
      canParameterBeEntityType_EventQuantityAggregated: true,
      canParameterBeEntityType_ReferenceValue: true,

      // Default overload thourgh deconstruction
      ...optionalParams,
    };

    this.description = optionalDefaults.description;

    this.canParameterBeType_Boolean =
      optionalDefaults.canParameterBeType_Boolean;
    this.canParameterBeType_Date = optionalDefaults.canParameterBeType_Date;
    this.canParameterBeType_Float = optionalDefaults.canParameterBeType_Float;
    this.canParameterBeType_Number = optionalDefaults.canParameterBeType_Number;
    this.canParameterBeType_String = optionalDefaults.canParameterBeType_String;
    // this.canParameterBeType_AdmissibleDays = optionalDefaults.canParameterBeType_AdmissibleDays;

    this.canParameterBeEntityType_Constant =
      optionalDefaults.canParameterBeEntityType_Constant;
    this.canParameterBeEntityType_Variable =
      optionalDefaults.canParameterBeEntityType_Variable;
    this.canParameterBeEntityType_Function =
      optionalDefaults.canParameterBeEntityType_Function;
    this.canParameterBeEntityType_Counter =
      optionalDefaults.canParameterBeEntityType_Counter;
    this.canParameterBeEntityType_ResourceField =
      optionalDefaults.canParameterBeEntityType_ResourceField;
    this.canParameterBeEntityType_EventDuration =
      optionalDefaults.canParameterBeEntityType_EventDuration;
    this.canParameterBeEntityType_EventQuantity =
      optionalDefaults.canParameterBeEntityType_EventQuantity;
    this.canParameterBeEntityType_EventDurationAggregated =
      optionalDefaults.canParameterBeEntityType_EventDurationAggregated;
    this.canParameterBeEntityType_EventQuantityAggregated =
      optionalDefaults.canParameterBeEntityType_EventQuantityAggregated;
    this.canParameterBeEntityType_ReferenceValue =
      optionalDefaults.canParameterBeEntityType_ReferenceValue;
  }

  toString() {
    let paramsString = `code '${this.code}'`;

    paramsString += ` / description '${this.description}'`;

    paramsString += ` / canParameterBeType_Boolean '${this.canParameterBeType_Boolean}'`;
    paramsString += ` / canParameterBeType_Date '${this.canParameterBeType_Date}'`;
    paramsString += ` / canParameterBeType_Float '${this.canParameterBeType_Float}'`;
    paramsString += ` / canParameterBeType_Number '${this.canParameterBeType_Number}'`;
    paramsString += ` / canParameterBeType_String '${this.canParameterBeType_String}'`;
    // paramsString += ` / canParameterBeType_AdmissibleDays '${this.canParameterBeType_AdmissibleDays}'`;

    paramsString += ` / canParameterBeEntityType_Constant '${this.canParameterBeEntityType_Constant}'`;
    paramsString += ` / canParameterBeEntityType_Variable '${this.canParameterBeEntityType_Variable}'`;
    paramsString += ` / canParameterBeEntityType_Function '${this.canParameterBeEntityType_Function}'`;
    paramsString += ` / canParameterBeEntityType_Counter '${this.canParameterBeEntityType_Counter}'`;
    paramsString += ` / canParameterBeEntityType_ResourceField '${this.canParameterBeEntityType_ResourceField}'`;
    paramsString += ` / canParameterBeEntityType_EventDuration '${this.canParameterBeEntityType_EventDuration}'`;
    paramsString += ` / canParameterBeEntityType_EventQuantity '${this.canParameterBeEntityType_EventQuantity}'`;
    paramsString += ` / canParameterBeEntityType_EventDurationAggregated '${this.canParameterBeEntityType_EventDurationAggregated}'`;
    paramsString += ` / canParameterBeEntityType_EventQuantityAggregated '${this.canParameterBeEntityType_EventQuantityAggregated}'`;
    paramsString += ` / canParameterBeEntityType_ReferenceValue '${this.canParameterBeEntityType_ReferenceValue}'`;
    return paramsString;
  }
}

// * 📌 Tests / src/__tests-and-examples/tests-and-examples.resolver.ts
// 🌐 { admissible_params_test }
export const admissibleParams_test_onlyMandatory = new AdmissibleParams(
  'only code',
);
export const admissibleParams_test_wOptParams = new AdmissibleParams('code', {
  description: 'dat description',
});

// Test optionnal Params typing
// export const wOptParams = new AdmissibleParams();

// ---

// * 🛑⚙️ Restrictions des paramètres
//   Actual parameters restrictions instances

export const ANY = new AdmissibleParams('ANY', {
  description: 'Any type',
  canParameterBeType_Boolean: true,
  canParameterBeType_Date: true,
  canParameterBeType_Float: true,
  canParameterBeType_Number: true,
  canParameterBeType_String: true,
  // canParameterBeType_AdmissibleDays: true,
  canParameterBeEntityType_Constant: true,
  canParameterBeEntityType_Variable: true,
  canParameterBeEntityType_Function: true,
  canParameterBeEntityType_Counter: true,
  canParameterBeEntityType_ResourceField: true,
  canParameterBeEntityType_EventDuration: true,
  canParameterBeEntityType_EventQuantity: true,
  canParameterBeEntityType_EventDurationAggregated: true,
  canParameterBeEntityType_EventQuantityAggregated: true,
  canParameterBeEntityType_ReferenceValue: true,
});

export const NUMERIC = new AdmissibleParams('NUMERIC', {
  description: 'Number and Float only',
  canParameterBeType_Boolean: false,
  canParameterBeType_Date: false,
  canParameterBeType_String: false,
  // canParameterBeType_AdmissibleDays: false,
});

export const INTEGER = new AdmissibleParams('INTEGER', {
  description: 'Integer Numbers only',
  canParameterBeType_Boolean: false,
  canParameterBeType_Date: false,
  canParameterBeType_Float: false,
  canParameterBeType_String: false,
  // canParameterBeType_AdmissibleDays: false,
});

export const DATE__CONSTANT_FUNCTION = new AdmissibleParams(
  'DATE__CONSTANT_FUNCTION',
  {
    description: 'Date type, Constant and function only',
    canParameterBeType_Boolean: false,
    canParameterBeType_Float: false,
    canParameterBeType_Number: false,
    canParameterBeType_String: false,
    // canParameterBeType_AdmissibleDays: false,
    canParameterBeEntityType_Variable: false,
    canParameterBeEntityType_Counter: false,
    canParameterBeEntityType_ResourceField: false,
    canParameterBeEntityType_EventDuration: false,
    canParameterBeEntityType_EventQuantity: false,
    canParameterBeEntityType_EventDurationAggregated: false,
    canParameterBeEntityType_EventQuantityAggregated: false,
    canParameterBeEntityType_ReferenceValue: false,
  },
);

export const DATE__ANY = new AdmissibleParams('DATE__ANY', {
  description: 'Date type',
  canParameterBeType_Boolean: false,
  canParameterBeType_Float: false,
  canParameterBeType_Number: false,
  canParameterBeType_String: false,
  // canParameterBeType_AdmissibleDays: false,
});

export const STRING__ANY = new AdmissibleParams('STRING__ANY', {
  description: 'String type',
  canParameterBeType_Boolean: false,
  canParameterBeType_Date: false,
  canParameterBeType_Float: false,
  canParameterBeType_Number: false,
  // canParameterBeType_AdmissibleDays: false,
});

export const STRING__CONSTANT = new AdmissibleParams('STRING__CONSTANT', {
  description: 'String type, Constant only',
  canParameterBeType_Boolean: false,
  canParameterBeType_Date: false,
  canParameterBeType_Float: false,
  canParameterBeType_Number: false,
  // canParameterBeType_AdmissibleDays: false,
  canParameterBeEntityType_Variable: false,
  canParameterBeEntityType_Function: false,
  canParameterBeEntityType_Counter: false,
  canParameterBeEntityType_ResourceField: false,
  canParameterBeEntityType_EventDuration: false,
  canParameterBeEntityType_EventQuantity: false,
  canParameterBeEntityType_EventDurationAggregated: false,
  canParameterBeEntityType_EventQuantityAggregated: false,
  canParameterBeEntityType_ReferenceValue: false,
});

export const NUMBER__COUNTER = new AdmissibleParams('NUMBER__COUNTER', {
  description: 'Int or Float type, Counter only',
  canParameterBeType_Boolean: false,
  canParameterBeType_Date: false,
  canParameterBeType_Float: true,
  canParameterBeType_Number: true,
  canParameterBeType_String: false,
  canParameterBeEntityType_Constant: false,
  canParameterBeEntityType_Variable: false,
  canParameterBeEntityType_Function: false,
  canParameterBeEntityType_Counter: true,
  canParameterBeEntityType_ResourceField: false,
  canParameterBeEntityType_EventDuration: false,
  canParameterBeEntityType_EventQuantity: false,
  canParameterBeEntityType_EventDurationAggregated: false,
  canParameterBeEntityType_EventQuantityAggregated: false,
  canParameterBeEntityType_ReferenceValue: false,
});
