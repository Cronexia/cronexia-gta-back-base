import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-scalars';

import { Prisma as PrismaClient } from '@prisma/client';

// * PopCriteria
// DTOs
import { FindUniquePopCriteria } from './find-unique-pop-criteria';
import { PopCriteriaOrderByInput } from './order-by-pop-criteria.input';
import { PopCriteriaWhereInput } from './where-pop-criteria.input';
// ENUMs
import { PopCriteriaDistinctEnum } from '../enums/pop-criteria-distinct.enum';

@ArgsType()
export class FindArgs {
  constructor() {
    // ! 🔢 Dedicated ENUMs
    registerEnumType(PopCriteriaDistinctEnum, {
      name: 'PopCriteriaDistinctEnum',
      description: '👥 Filter out duplicates rows for one or all fields.',
      valuesMap: {
        allFields: {
          description:
            '👥 Filter out duplicates rows for both name, table, field, fieldTypeHelper, operatorComparison',
        },
        name: {
          description: '👥 Filter out duplicates rows for name',
        },
        table: {
          description: '👥 Filter out duplicates rows for table',
        },
        field: {
          description: '👥 Filter out duplicates rows for field',
        },
        fieldTypeHelper: {
          description: '👥 Filter out duplicates rows for fieldTypeHelper',
        },
        operatorComparison: {
          description: '👥 Filter out duplicates rows for operatorComparison',
        },
        none: {
          description: 'Default value, no deduplicate.',
        },
      },
    });
  }

  // 1 Arg : where, 🚨 @InputType with all fields as optionnal
  @Field(() => PopCriteriaWhereInput, {
    name: 'where',
    description: `🔍 Search by native field/column/property`,
    nullable: true,
  })
  @IsOptional()
  where: PopCriteriaWhereInput;

  // 1 Arg : 🚨 NOT an @InputType : whereOpen, ~= Object
  @Field(() => GraphQLJSONObject, {
    name: 'whereOpen',
    description: `🔍♾️ Same as where, but with all GraphQL capabilities provided by Prisma Client`,
    nullable: true,
  })
  @IsOptional()
  whereOpen?: PrismaClient.PopCriteriaWhereInput;

  // 1 Arg : where, 🚨 @InputType with all fields as optionnal
  @Field(() => PopCriteriaOrderByInput, {
    name: 'orderBy',
    description: `🔀 Sort by one or multiple fields, ascendent or descendant.`,
    nullable: true,
  })
  @IsOptional()
  orderBy?: PopCriteriaOrderByInput;

  // 1 Arg : 🚨 NOT an @InputType : whereOpen, ~= Object
  @Field(() => [GraphQLJSONObject], {
    name: 'orderByOpen',
    description: `🔀 Same as orderBy, but with all GraphQL capabilities provided by Prisma Client.
    Sort by one or multiple fields, and their relations.`,
    nullable: true,
  })
  @IsOptional()
  orderByOpen?: PrismaClient.PopCriteriaOrderByWithRelationInput;

  @Field(() => FindUniquePopCriteria, {
    name: 'cursor',
    description: `🎯 Start the result from an element. ⚡️ Better performances than ~ > 10 000.`,
    nullable: true,
  })
  @IsOptional()
  cursor?: FindUniquePopCriteria;

  @Field(() => PopCriteriaDistinctEnum, {
    name: 'distinct',
    description: `👥 Filter out duplicates rows for one or all fields.`,
    nullable: true,
    defaultValue: 'none',
  })
  @IsOptional()
  distinct?: PopCriteriaDistinctEnum;
}
