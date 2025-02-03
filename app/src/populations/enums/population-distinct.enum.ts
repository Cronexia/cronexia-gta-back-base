// cf. http://localhost:8043/#type-inputType-ReferenceScalarFieldEnum
export enum PopulationDistinctEnum {
  allFields = 'all',
  name = 'name',
  operatorLogical = 'operatorLogical',

  // Do nothing. Needs a default value else it crashes when the argument isn't provided
  none = 'none',
}
