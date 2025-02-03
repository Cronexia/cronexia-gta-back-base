import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsString, IsOptional } from 'class-validator';

import { operatorComparisonEnum } from '../enums/operator-comparison.enum';
import { populationTableEnum } from '../enums/population-table.enum';
import { populationFieldTypeEnum } from '../enums/population-field-type.enum';

@InputType({
  description: `🔍 Search by native field/column/property`,
})
export class PopCriteriaWhereInput {
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

  // Ajout de l'identifiant unique, mais optionnel
  // Vu qu'il n'est pas dans le create, via auto-increment
  @Field(() => String, {
    name: 'id',
    description: `Unique ID`,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  id?: string;

  // * Cronexia mandatory
  @Field(() => String, {
    name: 'createdBy',
    description: 'Who has created the entry',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @Field(() => String, {
    name: 'updatedBy',
    description: 'Who has last updated the entry',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

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
    nullable: true,
  })
  @IsOptional()
  @IsEnum(populationTableEnum)
  table: populationTableEnum;

  @Field(() => String, {
    name: 'field',
    description: 'Field of the PopCriteria.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  field: string;

  // TODO: 🌱 Cannot determine a GraphQL output type for the "fieldTypeHelper".
  // TODO: 🌱 Make sure your class is decorated with an appropriate decorator.
  // @Field(() => populationFieldTypeEnum, {
  @Field(() => String, {
    name: 'fieldTypeHelper',
    description:
      'Supports only specific types: Boolean, Date, Number, String, EnumBoolean, EnumDate, EnumNumber, EnumString',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(populationFieldTypeEnum)
  fieldTypeHelper: populationFieldTypeEnum;

  // TODO: 🌱 Cannot determine a GraphQL output type for the "operatorComparison".
  // TODO: 🌱 Make sure your class is decorated with an appropriate decorator.
  // @Field(() => operatorComparisonEnum, {
  @Field(() => String, {
    name: 'operatorComparison',
    description:
      'Supports only specific types: equals, not, in, notIn, lowerThan, lowerThanOrEqual, greaterThan, greaterThanOrEqual, contains, startsWith, endsWith, range',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(operatorComparisonEnum)
  operatorComparison: operatorComparisonEnum;
}
