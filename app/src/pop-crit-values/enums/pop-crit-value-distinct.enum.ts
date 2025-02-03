// cf. http://localhost:8043/#type-inputType-ReferenceScalarFieldEnum
export enum PopCritValueDistinctEnum {
  allFields = 'all',
  valueBol = 'valueBol',
  valueDat = 'valueDat',
  valueNbr = 'valueNbr',
  valueStr = 'valueStr',

  // Do nothing. Needs a default value else it crashes when the argument isn't provided
  none = 'none',
}
