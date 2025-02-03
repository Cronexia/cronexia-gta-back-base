import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';

import { operatorComparisonEnum } from '../enums/operator-comparison.enum';
import { populationTableEnum } from '../enums/population-table.enum';
import { populationFieldTypeEnum } from '../enums/population-field-type.enum';

import { PopCritValueModel } from '../../pop-crit-values/models/pop-crit-value.model';
import { PopulationEntity } from '../../populations/entities/population.entity';

@ObjectType()
export class PopCriteriaModel {
  constructor() {
    // ! 🔢 Dedicated ENUMs
    registerEnumType(operatorComparisonEnum, {
      name: 'operatorComparisonEnum',
      description:
        'Supports only specific types: equals, not, in, notIn, lowerThan, lowerThanOrEqual, greaterThan, greaterThanOrEqual, contains, startsWith, endsWith, range',
      valuesMap: {
        equals: {
          description: 'equals operator',
        },
        not: {
          description: 'not operator',
        },
        in: {
          description: 'in operator',
        },
        notIn: {
          description: 'notIn operator',
        },
        lowerThan: {
          description: 'lowerThan operator',
        },
        lowerThanOrEqual: {
          description: 'lowerThanOrEqual operator',
        },
        greaterThan: {
          description: 'greaterThan operator',
        },
        greaterThanOrEqual: {
          description: 'greaterThanOrEqual operator',
        },
        contains: {
          description: 'contains operator',
        },
        startsWith: {
          description: 'startsWith operator',
        },
        endsWith: {
          description: 'endsWith operator',
        },
        range: {
          description: 'range operator',
        },
      },
    });

    registerEnumType(populationTableEnum, {
      name: 'populationTableEnum',
      description:
        'Supports only specific types: ResourceField, Resource, TodoCalendar, TodoCycle',
      valuesMap: {
        ResourceField: {
          description: 'ResourceField table',
        },
        Resource: {
          description: 'Resource table',
        },
        TodoCalendar: {
          description: 'TodoCalendar table',
        },
        TodoCycle: {
          description: 'TodoCycle table',
        },
      },
    });

    registerEnumType(populationFieldTypeEnum, {
      name: 'populationFieldTypeEnum',
      description:
        'Supports only specific types: Boolean, Date, Number, String, EnumBoolean, EnumDate, EnumNumber, EnumString',
      valuesMap: {
        Boolean: {
          description: 'Boolean type',
        },
        Date: {
          description: 'Date type',
        },
        Number: {
          description: 'Number type',
        },
        String: {
          description: 'String type',
        },
        EnumBoolean: {
          description: 'EnumBoolean type',
        },
        EnumDate: {
          description: 'EnumDate type',
        },
        EnumNumber: {
          description: 'EnumNumber type',
        },
        EnumString: {
          description: 'EnumString type',
        },
      },
    });
  }

  // * PopCriteria
  @Field(() => String, {
    name: 'name',
    description: 'Name of the PopCriteria.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  name?: string;

  // TODO: 🌱 Cannot determine a GraphQL output type for the "table".
  // TODO: 🌱 Make sure your class is decorated with an appropriate decorator.
  // @Field(() => populationTableEnum, {
  @Field(() => String, {
    name: 'table',
    description:
      'Supports only specific types: ResourceField, Resource, TodoCalendar, TodoCycle',
    nullable: false,
  })
  @IsDefined()
  @IsEnum(populationTableEnum)
  table: populationTableEnum;

  @Field(() => String, {
    name: 'field',
    description: 'Field of the PopCriteria.',
    nullable: false,
  })
  @IsDefined()
  @IsString()
  field: string;

  // TODO: 🌱 Cannot determine a GraphQL output type for the "fieldTypeHelper".
  // TODO: 🌱 Make sure your class is decorated with an appropriate decorator.
  // @Field(() => populationFieldTypeEnum, {
  @Field(() => String, {
    name: 'fieldTypeHelper',
    description:
      'Supports only specific types: Boolean, Date, Number, String, EnumBoolean, EnumDate, EnumNumber, EnumString',
    nullable: false,
  })
  @IsDefined()
  @IsEnum(populationFieldTypeEnum)
  fieldTypeHelper: populationFieldTypeEnum;

  // TODO: 🌱 Cannot determine a GraphQL output type for the "operatorComparison".
  // TODO: 🌱 Make sure your class is decorated with an appropriate decorator.
  // @Field(() => operatorComparisonEnum, {
  @Field(() => String, {
    name: 'operatorComparison',
    description:
      'Supports only specific types: equals, not, in, notIn, lowerThan, lowerThanOrEqual, greaterThan, greaterThanOrEqual, contains, startsWith, endsWith, range',
    nullable: false,
  })
  @IsDefined()
  @IsEnum(operatorComparisonEnum)
  operatorComparison: operatorComparisonEnum;

  // ---

  // * 🔗 Relations

  // Many to one / [0-N] 📦📦📦
  @Field(() => [PopCritValueModel], {
    name: 'popCritValues',
    description: 'Actuals values, String typed',
    // nullable: false,
    // Le tableau ne peut être nul, mais ses éléments oui
    nullable: 'items',
    // If both the array and its items are nullable, set nullable to 'itemsAndList' instead.
  })
  popCritValues: PopCritValueModel[];

  // ---

  // One to many / Only one 📦
  @Field(() => PopulationEntity, {
    name: 'population',
    description: 'Related Population field',
    nullable: false,
  })
  population: PopulationEntity;
}
