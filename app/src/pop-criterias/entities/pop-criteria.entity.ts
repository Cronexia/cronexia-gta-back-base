import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import { IsDefined, IsEnum } from 'class-validator';

import { operatorComparisonEnum } from '../enums/operator-comparison.enum';
import { populationTableEnum } from '../enums/population-table.enum';
import { populationFieldTypeEnum } from '../enums/population-field-type.enum';

@ObjectType()
export class PopCriteriaEntity {
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

  // * 👷 GraphQL Decorator template
  // @Field(() => Int, {
  //   defaultValue: 'any',
  //   deprecationReason: 'too old',
  //   description: 'Description to display in GraphQL',
  //   nullable: false,
  // })

  // * 🤖 Fields without @Field will have it generated by Nest CLI

  // * Managed by Prisma
  @Field(() => ID, {
    name: 'idPopCriteria',
    description: 'Unique ID',
    nullable: false,
  })
  idPopCriteria: string;

  @Field(() => GraphQLDate, {
    name: 'createdAt',
    description: 'Date of creation',
    nullable: false,
  })
  createdAt: Date;

  @Field(() => GraphQLDate, {
    name: 'updatedAt',
    description: 'Date of last update',
    nullable: false,
  })
  updatedAt: Date;

  // * Cronexia mandatory
  createdBy: string;
  updatedBy?: string;

  // ---

  // * PopCriteria

  @Field(() => String, {
    name: 'name',
    description: 'Name of the PopCriteria.',
    nullable: true,
  })
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
  //      Virtual fields, not present in database
  // popCritValues PopCritValue[]

  // ---

  // One to many / Only one 📦
  //      Virtual field, not present in database
  // population   Population @relation(fields: [populationId], populations: [idPopulation])

  // Only the scalar, present in database, as a foreign key
  @Field(() => String, {
    name: 'populationId',
    description: 'Foreign key to Population',
    nullable: true,
  })
  populationId?: string;
}
