import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-scalars';

import { Prisma as PrismaClient } from '@prisma/client';

// * PopCritValue
// DTOs
import { FindUniquePopCritValue } from './find-unique-pop-crit-value';
import { PopCritValueOrderByInput } from './order-by-pop-crit-value.input';
import { PopCritValueWhereInput } from './where-pop-crit-value.input';
// ENUMs
import { PopCritValueDistinctEnum } from '../enums/pop-crit-value-distinct.enum';

@ArgsType()
export class FindArgs {
  constructor() {
    // ! 🔢 Dedicated ENUMs
    registerEnumType(PopCritValueDistinctEnum, {
      name: 'PopCritValueDistinctEnum',
      description: '👥 Filter out duplicates rows for one or all fields.',
      valuesMap: {
        allFields: {
          description:
            '👥 Filter out duplicates rows for all valueBol, valueDat, valueNbr, valueStr',
        },
        valueBol: {
          description: '👥 Filter out duplicates rows for valueBol',
        },
        valueDat: {
          description: '👥 Filter out duplicates rows for valueDat',
        },
        valueNbr: {
          description: '👥 Filter out duplicates rows for valueNbr',
        },
        valueStr: {
          description: '👥 Filter out duplicates rows for valueStr',
        },
        none: {
          description: 'Default value, no deduplicate.',
        },
      },
    });
  }

  // 1 Arg : where, 🚨 @InputType with all fields as optionnal
  @Field(() => PopCritValueWhereInput, {
    name: 'where',
    description: `🔍 Search by native field/column/property`,
    nullable: true,
  })
  @IsOptional()
  where: PopCritValueWhereInput;

  // 1 Arg : 🚨 NOT an @InputType : whereOpen, ~= Object
  @Field(() => GraphQLJSONObject, {
    name: 'whereOpen',
    description: `🔍♾️ Same as where, but with all GraphQL capabilities provided by Prisma Client`,
    nullable: true,
  })
  @IsOptional()
  whereOpen?: PrismaClient.PopCritValueWhereInput;

  // 1 Arg : where, 🚨 @InputType with all fields as optionnal
  @Field(() => PopCritValueOrderByInput, {
    name: 'orderBy',
    description: `🔀 Sort by one or multiple fields, ascendent or descendant.`,
    nullable: true,
  })
  @IsOptional()
  orderBy?: PopCritValueOrderByInput;

  // 1 Arg : 🚨 NOT an @InputType : whereOpen, ~= Object
  @Field(() => [GraphQLJSONObject], {
    name: 'orderByOpen',
    description: `🔀 Same as orderBy, but with all GraphQL capabilities provided by Prisma Client.
    Sort by one or multiple fields, and their relations.`,
    nullable: true,
  })
  @IsOptional()
  orderByOpen?: PrismaClient.PopCritValueOrderByWithRelationInput;

  @Field(() => FindUniquePopCritValue, {
    name: 'cursor',
    description: `🎯 Start the result from an element. ⚡️ Better performances than ~ > 10 000.`,
    nullable: true,
  })
  @IsOptional()
  cursor?: FindUniquePopCritValue;

  @Field(() => PopCritValueDistinctEnum, {
    name: 'distinct',
    description: `👥 Filter out duplicates rows for one or all fields.`,
    nullable: true,
    defaultValue: 'none',
  })
  @IsOptional()
  distinct?: PopCritValueDistinctEnum;
}
