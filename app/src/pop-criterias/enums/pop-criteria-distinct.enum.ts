// cf. http://localhost:8043/#type-inputType-ReferenceScalarFieldEnum
export enum PopCriteriaDistinctEnum {
  allFields = 'all',
  name = 'name',
  table = 'table',
  field = 'field',
  fieldTypeHelper = 'fieldTypeHelper',
  operatorComparison = 'operatorComparison',

  // Do nothing. Needs a default value else it crashes when the argument isn't provided
  none = 'none',
}
